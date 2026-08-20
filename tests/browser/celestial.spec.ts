import { expect, test } from '@playwright/test';
import {
  captureBrowserErrors,
  clickCelestial,
  clickFocusPlanet,
  clickGlobe,
  clickSystemView,
  diagnostics,
  openControlFamily,
  openLab,
  runUntilTick,
  selectProcess,
  setTimelineTick
} from './helpers';

test('system-scale camera, star, moon, and outer bodies exist without leaving the planet-first default', async ({ page }) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  const home = await diagnostics(page);
  expect(home.renderer.camera.minDistance).toBeCloseTo(1.65, 5);
  expect(home.renderer.camera.maxDistance).toBeGreaterThan(20);
  expect(home.renderer.camera.far).toBeGreaterThan(220);
  expect(home.renderer.camera.distance).toBeLessThan(5);
  expect(home.renderer.celestial.star).not.toBeNull();
  expect(home.renderer.celestial.moon).not.toBeNull();
  expect(home.renderer.celestial.minors.length).toBeGreaterThanOrEqual(2);

  await clickSystemView(page);
  const system = await diagnostics(page);
  expect(system.renderer.camera.distance).toBeGreaterThan(home.renderer.camera.distance + 5);

  await clickFocusPlanet(page);
  const restored = await diagnostics(page);
  expect(restored.renderer.camera.distance).toBeLessThan(5);
  expect(errors).toEqual([]);
});

test('celestial transforms follow simulation time and rewind, and body clicks select without deploying', async ({ page }) => {
  test.setTimeout(60_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');

  const before = (await diagnostics(page)).processCount;
  await clickSystemView(page);
  await runUntilTick(page, 48);
  await clickSystemView(page);
  await clickCelestial(page, 'primary-moon');
  const selected = await diagnostics(page);
  expect(selected.renderer.celestial.selectedId).toBe('primary-moon');
  expect(selected.processCount).toBe(before);
  await openControlFamily(page, 'inspect');
  await expect(page.locator('#celestial-inspect')).toContainText('primary-moon');
  await expect(page.locator('#celestial-inspect')).toContainText('MOON');

  await openControlFamily(page, 'view');
  await page.locator('#focus-body').click();
  const anchoredTick = selected.tick;
  const anchoredMoon = selected.renderer.celestial.moon!;
  await runUntilTick(page, anchoredTick + 48);
  const later = await diagnostics(page);
  expect(later.renderer.celestial.moon!.phase).not.toBeCloseTo(anchoredMoon.phase, 5);
  expect(later.renderer.celestial.focusId).toBe('primary-moon');
  expect(Math.hypot(
    later.renderer.camera.target.x - later.renderer.celestial.moon!.x,
    later.renderer.camera.target.y - later.renderer.celestial.moon!.y,
    later.renderer.camera.target.z - later.renderer.celestial.moon!.z
  )).toBeLessThan(0.05);

  await setTimelineTick(page, anchoredTick);
  const rewound = await diagnostics(page);
  expect(rewound.renderer.celestial.moon!.x).toBeCloseTo(anchoredMoon.x, 5);
  expect(rewound.renderer.celestial.moon!.y).toBeCloseTo(anchoredMoon.y, 5);
  expect(rewound.renderer.celestial.moon!.z).toBeCloseTo(anchoredMoon.z, 5);

  await clickFocusPlanet(page);
  await clickGlobe(page, 0.5, 0.5);
  await expect.poll(async () => (await diagnostics(page)).processCount).toBe(before + 1);
  expect(errors).toEqual([]);
});

test('regenerate restores celestial resources without leaking unique geometries', async ({ page }) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  const baseline = await diagnostics(page);
  await openControlFamily(page, 'run');
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.locator('#regenerate').click();
    await expect(page.locator('#viewport canvas')).toHaveCount(1);
    await expect.poll(async () => (await diagnostics(page)).tick).toBe(0);
  }
  const settled = await diagnostics(page);
  expect(settled.renderer.scene.uniqueGeometries).toBe(baseline.renderer.scene.uniqueGeometries);
  expect(settled.renderer.scene.uniqueMaterials).toBe(baseline.renderer.scene.uniqueMaterials);
  expect(settled.renderer.celestial.star).not.toBeNull();
  expect(settled.renderer.celestial.moon).not.toBeNull();
  expect(errors).toEqual([]);
});
