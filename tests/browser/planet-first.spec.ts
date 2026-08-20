import { expect, test } from '@playwright/test';
import {
  captureBrowserErrors,
  clickPlay,
  clickSystemView,
  closeControls,
  diagnostics,
  openControlFamily,
  openLab
} from './helpers';

test('12-dot laboratory menu starts closed, is keyboard accessible, and floats over a stable canvas', async ({ page }) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);

  const launcher = page.locator('#lab-controls-launcher');
  await expect(launcher).toBeVisible();
  await expect(launcher).toHaveAttribute('aria-label', 'Laboratory controls');
  await expect(launcher).toHaveAttribute('aria-expanded', 'false');
  await expect(launcher).toHaveAttribute('aria-controls', 'lab-controls-menu');
  await expect(page.locator('#lab-controls-menu')).toBeHidden();
  await expect(page.locator('.dot-grid .dot')).toHaveCount(12);
  await expect(page.getByRole('complementary', { name: 'Experiment rack' })).toBeHidden();
  await expect(page.getByRole('complementary', { name: 'Planetary autopsy inspector' })).toBeHidden();

  const canvas = page.locator('#viewport canvas');
  const before = await canvas.boundingBox();
  if (!before) throw new Error('Canvas has no bounding box');
  expect(before.width).toBeGreaterThan(600);
  expect(before.height).toBeGreaterThan(400);

  await launcher.focus();
  await expect(launcher).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(launcher).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#lab-controls-menu')).toBeVisible();
  await expect(page.locator('#family-run')).toBeHidden();

  const opened = await canvas.boundingBox();
  expect(opened?.width).toBe(before.width);
  expect(opened?.height).toBe(before.height);

  await page.keyboard.press('Escape');
  await expect(launcher).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#lab-controls-menu')).toBeHidden();

  await openControlFamily(page, 'run');
  await expect(page.getByRole('button', { name: 'PLAY' })).toBeVisible();
  await clickPlay(page);
  expect((await diagnostics(page)).playing).toBe(true);
  await clickPlay(page);

  await openControlFamily(page, 'drakken');
  await expect(page.getByRole('complementary', { name: 'Experiment rack' })).toBeVisible();
  await expect(page.locator('[data-process="fault-tongue"]')).toBeVisible();

  await closeControls(page);
  const closed = await canvas.boundingBox();
  expect(closed?.width).toBe(before.width);
  expect(closed?.height).toBe(before.height);
  expect(errors).toEqual([]);
});

test('starfield exists as Three.js scene content rather than CSS decoration', async ({ page }) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await page.waitForTimeout(120);
  const diag = await diagnostics(page);
  expect(diag.renderer.starfield.bands).toBe(3);
  expect(diag.renderer.starfield.vertices).toBeGreaterThan(4000);
  expect(diag.renderer.render.points).toBeGreaterThan(0);

  const cssStars = await page.evaluate(() => {
    const body = getComputedStyle(document.body).backgroundImage;
    const shell = getComputedStyle(document.querySelector('.lab-shell')!).backgroundImage;
    return `${body}|${shell}`.includes('radial-gradient') && /circle/.test(`${body}|${shell}`);
  });
  expect(cssStars).toBe(false);
  expect(errors).toEqual([]);
});

test('starfield near stars exhibit more projected parallax than far stars under camera dolly', async ({ page }) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  const home = await diagnostics(page);
  const homeNear = home.renderer.starfield.anchors.near;
  const homeFar = home.renderer.starfield.anchors.far;
  expect(Math.hypot(homeNear.world.x, homeNear.world.y, homeNear.world.z)).toBeLessThan(
    Math.hypot(homeFar.world.x, homeFar.world.y, homeFar.world.z)
  );

  await clickSystemView(page);
  const system = await diagnostics(page);
  const nearShift = Math.hypot(
    system.renderer.starfield.anchors.near.projected.x - homeNear.projected.x,
    system.renderer.starfield.anchors.near.projected.y - homeNear.projected.y
  );
  const farShift = Math.hypot(
    system.renderer.starfield.anchors.far.projected.x - homeFar.projected.x,
    system.renderer.starfield.anchors.far.projected.y - homeFar.projected.y
  );
  expect(nearShift).toBeGreaterThan(farShift);
  expect(nearShift).toBeGreaterThan(0.002);
  expect(system.renderer.render.points).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});
