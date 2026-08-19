import { expect, test } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { captureBrowserErrors, clickGlobe, diagnostics, openLab, runUntilTick, selectProcess, setRange, setTimelineTick } from './helpers';

function percentile(values: number[], p: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))]!;
}

async function clearFrameSamples(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(() => { (window as Window & { __DRAKKEN_FRAME_TIMES__?: number[] }).__DRAKKEN_FRAME_TIMES__ = []; });
}

test('CI performance and renderer-lifecycle smoke records bounded evidence without substituting for target hardware', async ({ page, context }) => {
  test.setTimeout(120_000);
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
      } catch { /* longtask timing is optional in this browser */ }
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
  await clearFrameSamples(page);
  await page.waitForTimeout(2_000);

  await selectProcess(page, 'fault-tongue');
  await setRange(page, 'intensity', 0.85);
  await setRange(page, 'radius', 24);
  await clickGlobe(page, 0.5, 0.5);
  await page.locator('#speed').selectOption('64');
  const firstStart = (await diagnostics(page)).tick;
  await runUntilTick(page, firstStart + 100);
  for (const layer of ['crust', 'hydrology', 'normal']) await page.locator(`[data-layer="${layer}"]`).click();

  await selectProcess(page, 'cloudmaw');
  await clickGlobe(page, 0.58, 0.48);
  await selectProcess(page, 'gorevault');
  await setRange(page, 'intensity', 1);
  await setRange(page, 'radius', 40);
  await clickGlobe(page, 0.45, 0.48);
  const secondStart = (await diagnostics(page)).tick;
  await runUntilTick(page, secondStart + 150);

  const currentTick = (await diagnostics(page)).tick;
  const forkTick = Math.max(0, currentTick - 75);
  await setTimelineTick(page, forkTick);
  await page.locator('#fork').click();
  await page.locator('#switchB').click();
  await selectProcess(page, 'cloudmaw');
  await clickGlobe(page, 0.64, 0.44);
  for (let i = 0; i < 5; i++) await page.locator(i % 2 === 0 ? '#switchA' : '#switchB').click();
  await page.locator('[data-layer="comparison"]').click();
  await page.waitForTimeout(2_000);

  const active = await diagnostics(page);
  const frameTimes = active.frameTimesMs.filter(value => value > 0 && value < 1000);
  expect(frameTimes.length).toBeGreaterThan(20);
  const p50 = percentile(frameTimes, 0.50);
  const p95 = percentile(frameTimes, 0.95);
  const p99 = percentile(frameTimes, 0.99);
  const maxFrame = Math.max(...frameTimes);
  const slowOver50Pct = frameTimes.filter(value => value > 50).length / frameTimes.length * 100;

  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('HeapProfiler.collectGarbage');
  const heapBefore = Number((await cdp.send('Performance.getMetrics')).metrics.find(metric => metric.name === 'JSHeapUsedSize')?.value ?? 0);

  const resetSnapshots = [];
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.locator('#regenerate').click();
    await expect(page.locator('#viewport canvas')).toHaveCount(1);
    await cdp.send('HeapProfiler.collectGarbage');
    resetSnapshots.push(await diagnostics(page));
  }
  const heapAfter = Number((await cdp.send('Performance.getMetrics')).metrics.find(metric => metric.name === 'JSHeapUsedSize')?.value ?? 0);
  const settled = resetSnapshots.at(-1)!;
  const longTasks = await page.evaluate(() => (window as Window & { __DRAKKEN_LONG_TASKS__?: number[] }).__DRAKKEN_LONG_TASKS__ ?? []);

  const provisionalBudgets = { p50Ms: 16.7, p95Ms: 25, over50MsPct: 1, simulationStepP95Ms: 8 };
  const softwareRenderer = /swiftshader|llvmpipe|software/i.test(active.renderer.gpuRenderer);
  const frameBudgetChecks = {
    p50: p50 <= provisionalBudgets.p50Ms,
    p95: p95 <= provisionalBudgets.p95Ms,
    over50Pct: slowOver50Pct < provisionalBudgets.over50MsPct
  };
  const evidence = {
    scenario: 'CI-PRELOOK-SMOKE-01',
    build: process.env.GITHUB_SHA ?? 'local',
    classification: softwareRenderer ? 'virtual-software-renderer-not-comparable-to-target-hardware' : 'hardware-renderer',
    navigation,
    browser: await page.evaluate(() => navigator.userAgent),
    viewport: page.viewportSize(),
    rendererIdentity: { vendor: active.renderer.gpuVendor, renderer: active.renderer.gpuRenderer },
    baselineRenderer: baseline.renderer,
    activeRenderer: active.renderer,
    settledRenderer: settled.renderer,
    frameTimeMs: { samples: frameTimes.length, p50, p95, p99, max: maxFrame, slowOver50MsPct: slowOver50Pct },
    projectProvisionalBudgets: provisionalBudgets,
    frameBudgetChecks,
    frameBudgetVerdict: softwareRenderer ? 'NOT_COMPARABLE' : Object.values(frameBudgetChecks).every(Boolean) ? 'PASS' : 'FAIL',
    simulationStepMs: { latest: active.simStepMs, withinP95Budget: active.simStepMs <= provisionalBudgets.simulationStepP95Ms },
    longTasks: { count: longTasks.length, maxMs: longTasks.length ? Math.max(...longTasks) : 0 },
    heapBytes: { beforeResetCycles: heapBefore, afterResetCycles: heapAfter, delta: heapAfter - heapBefore },
    resetCycles: resetSnapshots.length
  };
  mkdirSync('browser-evidence', { recursive: true });
  writeFileSync('browser-evidence/performance-smoke.json', JSON.stringify(evidence, null, 2));

  expect(settled.renderer.scene.uniqueGeometries).toBe(baseline.renderer.scene.uniqueGeometries);
  expect(settled.renderer.scene.uniqueMaterials).toBe(baseline.renderer.scene.uniqueMaterials);
  expect(settled.renderer.memory.geometries).toBeLessThanOrEqual(baseline.renderer.memory.geometries + 1);
  expect(settled.renderer.memory.textures).toBeLessThanOrEqual(baseline.renderer.memory.textures + 1);
  expect(heapAfter).toBeLessThanOrEqual(heapBefore * 1.8 + 5_000_000);
  expect(active.simStepMs).toBeLessThanOrEqual(provisionalBudgets.simulationStepP95Ms);
  if (!softwareRenderer) expect(Object.values(frameBudgetChecks).every(Boolean)).toBe(true);
  expect(errors).toEqual([]);
});
