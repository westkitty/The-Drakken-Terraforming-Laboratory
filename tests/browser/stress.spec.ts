import { expect, test } from '@playwright/test';
import { captureBrowserErrors, clickGlobe, diagnostics, openLab, runUntilTick, selectProcess, setTimelineTick } from './helpers';

test('rapid controls, resize storms, branch switching, scrubbing, camera input, reset, and context recovery remain operable', async ({ page }) => {
  test.setTimeout(90_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);

  for (let i = 0; i < 12; i++) await page.locator('#play').click();
  expect((await diagnostics(page)).playing).toBe(false);

  await selectProcess(page, 'fault-tongue');
  await clickGlobe(page, 0.5, 0.5);
  await expect(page.locator('#targeting')).toContainText('DEPLOYED');
  await expect(page.locator('#targeting')).toContainText('PRESS PLAY');
  await page.locator('#speed').selectOption('4');
  await runUntilTick(page, 40);
  await expect(page.locator('#targeting')).not.toContainText('PRESS PLAY');
  await expect(page.locator('#targeting')).not.toContainText('DEPLOYED');
  await setTimelineTick(page, 20);
  await expect(page.locator('#targeting')).not.toContainText('DEPLOYED');
  await page.locator('#fork').click();
  for (let i = 0; i < 8; i++) await page.locator(i % 2 === 0 ? '#switchB' : '#switchA').click();
  await expect(page.locator('#targeting')).not.toContainText('DEPLOYED');

  for (const layer of ['crust', 'hydrology', 'atmosphere', 'biosphere', 'feedstock', 'drakken', 'provenance', 'normal']) await page.locator(`[data-layer="${layer}"]`).click();

  for (const size of [{ width: 1024, height: 700 }, { width: 390, height: 844 }, { width: 1280, height: 720 }, { width: 800, height: 900 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(size);
    await expect(page.locator('#viewport canvas')).toBeVisible();
  }

  const canvas = page.locator('#viewport canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Canvas unavailable for camera stress');
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.42, { steps: 8 });
  await page.mouse.up();
  await page.mouse.wheel(0, -500);
  await page.mouse.wheel(0, 500);
  await page.locator('#camera').click();

  for (const tick of [5, 18, 9, 20, 0, 20]) await setTimelineTick(page, tick);

  for (let cycle = 0; cycle < 5; cycle++) {
    await page.locator('#regenerate').click();
    await expect(page.locator('#viewport canvas')).toHaveCount(1);
    expect((await diagnostics(page)).tick).toBe(0);
    await expect(page.locator('#targeting')).not.toContainText('DEPLOYED');
    await expect(page.locator('#targeting')).not.toContainText('HISTORY LOCKED');
    await expect(page.locator('#targeting')).toContainText(/PLACEMENT|INSPECT/);
  }

  const contextResult = await page.locator('#viewport canvas').evaluate(async canvasNode => {
    const canvasElement = canvasNode as HTMLCanvasElement;
    const gl = canvasElement.getContext('webgl2') || canvasElement.getContext('webgl');
    const extension = gl?.getExtension('WEBGL_lose_context');
    const viewport = canvasElement.parentElement;
    if (!gl || !extension || !viewport) return { supported: false, lostStateVisible: false, restored: false, restoredStateCleared: false };

    return await new Promise<{ supported: boolean; lostStateVisible: boolean; restored: boolean; restoredStateCleared: boolean }>((resolve, reject) => {
      let lostStateVisible = false;
      const timeout = window.setTimeout(() => reject(new Error('Timed out waiting for webglcontextrestored')), 8_000);

      canvasElement.addEventListener('webglcontextlost', () => {
        lostStateVisible = viewport.getAttribute('data-render-state') === 'lost';
        window.setTimeout(() => extension.restoreContext(), 0);
      }, { once: true });

      canvasElement.addEventListener('webglcontextrestored', () => {
        window.clearTimeout(timeout);
        resolve({
          supported: true,
          lostStateVisible,
          restored: !gl.isContextLost(),
          restoredStateCleared: viewport.getAttribute('data-render-state') !== 'lost'
        });
      }, { once: true });

      extension.loseContext();
    });
  });

  expect(contextResult.supported).toBe(true);
  expect(contextResult.lostStateVisible).toBe(true);
  expect(contextResult.restored).toBe(true);
  expect(contextResult.restoredStateCleared).toBe(true);
  await expect(page.locator('#viewport')).not.toHaveAttribute('data-render-state', 'lost');
  await page.waitForTimeout(100);
  const restoredDiagnostics = await diagnostics(page);
  expect(restoredDiagnostics.renderer.contextLost).toBe(false);
  expect(restoredDiagnostics.renderer.render.calls).toBeGreaterThan(0);
  expect(errors.filter(error => !/context (lost|restored)/i.test(error))).toEqual([]);
});
