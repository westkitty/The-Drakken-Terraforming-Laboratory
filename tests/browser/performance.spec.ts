import { expect, test } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { captureBrowserErrors, clickGlobe, diagnostics, openLab, selectProcess, setRange } from './helpers';

function percentile(values: number[], p: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))]!;
}

test('performance and renderer-lifecycle smoke stays bounded under a representative workload', async ({ page, context }) => {
  const errors = captureBrowserErrors(page);
  await page.addInitScript(() => {
    (window as Window & { __DRAKKEN_LONG_TASKS__?: number[] }).__DRAKKEN_LONG_TASKS__ = [];
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          const target = (window as Window & { __DRAKKEN_LONG_TASKS__?: number[] }).__DRAKKEN_LONG_TASKS__!;
          for (const entry of list.getEntries()) target.push(entry.duration);
        });
        observer.observe({ type: 'longtask', buffered: true });
      } catch { /* unsupported entry type */ }
    }
  });
  await openLab(page);
  const navigation = await page.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    return entry ? { domContentLoadedMs: entry.domContentLoadedEventEnd, loadMs: entry.loadEventEnd } : null;
  });
  expect(navigation).not.toBeNull();
  expect(navigation!.domContentLoadedMs).toBeLessThan(5_000);

  const baseline = await diagnostics(page);
  await selectProcess(page, 'gorevault');
  await setRange(page, 'intensity', 1);
  await setRange(page, 'radius', 40);
  for (const [x, y] of [[0.42, 0.45], [0.50, 0.40], [0.58, 0.45], [0.46, 0.56], [0.54, 0.56]] as const) await clickGlobe(page, x, y);
  await selectProcess(page, 'ringthroat');
  await clickGlobe(page, 0.5, 0.5);
  await page.locator('#speed').selectOption('64');
  await page.locator('#play').click();

  const simSamples: number[] = [];
  for (let sample = 0; sample < 12; sample++) {
    await page.waitForTimeout(250);
    simSamples.push((await diagnostics(page)).simStepMs);
  }
  if ((await diagnostics(page)).playing) await page.locator('#play').click();
  const active = await diagnostics(page);
  const frameTimes = active.frameTimesMs.filter(value => value > 0 && value < 1000);
  expect(frameTimes.length).toBeGreaterThan(60);
  const p50 = percentile(frameTimes, 0.50);
  const p95 = percentile(frameTimes, 0.95);
  const p99 = percentile(frameTimes, 0.99);
  const maxFrame = Math.max(...frameTimes);
  const slowFramePct = frameTimes.filter(value => value > 33.34).length / frameTimes.length * 100;
  expect(p95).toBeLessThan(100);
  expect(slowFramePct).toBeLessThan(30);
  expect(Math.max(...simSamples)).toBeLessThan(50);

  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('HeapProfiler.collectGarbage');
  const heapBefore = Number((await cdp.send('Performance.getMetrics')).metrics.find(metric => metric.name === 'JSHeapUsedSize')?.value ?? 0);

  const resetSnapshots = [];
  for (let cycle = 0; cycle < 6; cycle++) {
    await page.locator('#regenerate').click();
    await expect(page.locator('#viewport canvas')).toHaveCount(1);
    await cdp.send('HeapProfiler.collectGarbage');
    resetSnapshots.push(await diagnostics(page));
  }
  const heapAfter = Number((await cdp.send('Performance.getMetrics')).metrics.find(metric => metric.name === 'JSHeapUsedSize')?.value ?? 0);
  const settled = resetSnapshots.at(-1)!;
  expect(settled.renderer.scene.uniqueGeometries).toBe(baseline.renderer.scene.uniqueGeometries);
  expect(settled.renderer.scene.uniqueMaterials).toBe(baseline.renderer.scene.uniqueMaterials);
  expect(settled.renderer.memory.geometries).toBeLessThanOrEqual(baseline.renderer.memory.geometries + 1);
  expect(settled.renderer.memory.textures).toBeLessThanOrEqual(baseline.renderer.memory.textures + 1);
  expect(heapAfter).toBeLessThanOrEqual(heapBefore * 1.8 + 5_000_000);

  const longTasks = await page.evaluate(() => (window as Window & { __DRAKKEN_LONG_TASKS__?: number[] }).__DRAKKEN_LONG_TASKS__ ?? []);
  const evidence = {
    navigation,
    browser: await page.evaluate(() => navigator.userAgent),
    viewport: page.viewportSize(),
    baselineRenderer: baseline.renderer,
    activeRenderer: active.renderer,
    settledRenderer: settled.renderer,
    frameTimeMs: { samples: frameTimes.length, p50, p95, p99, max: maxFrame, slowOver33msPct: slowFramePct },
    simulationStepMs: { samples: simSamples, max: Math.max(...simSamples) },
    longTasks: { count: longTasks.length, maxMs: longTasks.length ? Math.max(...longTasks) : 0 },
    heapBytes: { beforeResetCycles: heapBefore, afterResetCycles: heapAfter, delta: heapAfter - heapBefore },
    resetCycles: resetSnapshots.length
  };
  mkdirSync('browser-evidence', { recursive: true });
  writeFileSync('browser-evidence/performance-smoke.json', JSON.stringify(evidence, null, 2));
  expect(errors).toEqual([]);
});
