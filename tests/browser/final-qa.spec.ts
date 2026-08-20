import { expect, test } from '@playwright/test';
import {
  captureBrowserErrors,
  clickCelestial,
  clickFocusPlanet,
  clickGlobe,
  clickSystemView,
  closeControls,
  diagnostics,
  openControlFamily,
  openLab,
  runUntilTick,
  screenshotEvidence,
  selectProcess,
  setRange
} from './helpers';

test('final planet-first QA captures required visual states and objective layout checks', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);

  const launcher = page.locator('#lab-controls-launcher');
  await expect(launcher).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#lab-controls-menu')).toBeHidden();
  await expect(page.locator('.dot-grid .dot')).toHaveCount(12);

  const canvas = page.locator('#viewport canvas');
  const homeBox = await canvas.boundingBox();
  if (!homeBox) throw new Error('Canvas has no bounding box');
  const viewport = page.viewportSize();
  if (!viewport) throw new Error('Viewport size unavailable');
  expect(homeBox.width).toBeGreaterThan(viewport.width * 0.9);
  expect(homeBox.height).toBeGreaterThan(viewport.height * 0.9);

  const home = await diagnostics(page);
  expect(home.renderer.camera.distance).toBeLessThan(5);
  expect(home.renderer.starfield.bands).toBe(3);
  expect(home.renderer.starfield.vertices).toBeGreaterThan(4000);
  expect(home.renderer.celestial.star).not.toBeNull();
  expect(home.renderer.celestial.moon).not.toBeNull();
  expect(home.renderer.celestial.minors.length).toBeGreaterThanOrEqual(2);
  expect(home.renderer.celestial.projected['system-star']?.visible).toBe(true);
  await screenshotEvidence(page, 'qa-01-default-planet-view', testInfo);

  await launcher.click();
  await expect(launcher).toHaveAttribute('aria-expanded', 'true');
  const openBox = await canvas.boundingBox();
  expect(openBox?.width).toBe(homeBox.width);
  expect(openBox?.height).toBe(homeBox.height);
  await openControlFamily(page, 'view');
  await expect(page.getByRole('button', { name: 'FOCUS PLANET / HOME' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'SYSTEM VIEW' })).toBeVisible();
  await screenshotEvidence(page, 'qa-02-menu-open', testInfo);

  await page.locator('#system-view').click();
  await closeControls(page);
  const system = await diagnostics(page);
  expect(system.renderer.camera.distance).toBeGreaterThan(home.renderer.camera.distance + 5);
  expect(system.renderer.celestial.star).not.toBeNull();
  expect(system.renderer.celestial.moon).not.toBeNull();
  expect(system.renderer.celestial.projected['system-star']?.visible).toBe(true);
  await screenshotEvidence(page, 'qa-03-system-view', testInfo);

  await runUntilTick(page, 48);
  await clickSystemView(page);
  await clickCelestial(page, 'primary-moon');
  await openControlFamily(page, 'view');
  await page.locator('#focus-body').click();
  await closeControls(page);
  expect((await diagnostics(page)).renderer.celestial.selectedId).toBe('primary-moon');
  expect((await diagnostics(page)).renderer.celestial.focusId).toBe('primary-moon');
  await screenshotEvidence(page, 'qa-04-moon-focused', testInfo);

  await runUntilTick(page, 96);
  await clickSystemView(page);
  await clickCelestial(page, 'outer-1');
  await openControlFamily(page, 'view');
  await page.locator('#focus-body').click();
  await closeControls(page);
  expect((await diagnostics(page)).renderer.celestial.selectedId).toBe('outer-1');
  await screenshotEvidence(page, 'qa-05-outer-focused', testInfo);

  await clickFocusPlanet(page);
  await selectProcess(page, 'fault-tongue');
  await setRange(page, 'intensity', 0.85);
  await setRange(page, 'radius', 24);
  const before = (await diagnostics(page)).processCount;
  await clickGlobe(page, 0.5, 0.5);
  await expect.poll(async () => (await diagnostics(page)).processCount).toBe(before + 1);
  await expect(page.locator('#targeting')).toContainText('DEPLOYED');
  await closeControls(page);
  await screenshotEvidence(page, 'qa-06-drakken-active', testInfo);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(canvas).toBeVisible();
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflows).toBe(false);
  const narrow = await canvas.boundingBox();
  expect(narrow?.width).toBeGreaterThan(300);
  expect(narrow?.height).toBeGreaterThan(400);
  await screenshotEvidence(page, 'qa-07-narrow-viewport', testInfo);
  expect(errors).toEqual([]);
});
