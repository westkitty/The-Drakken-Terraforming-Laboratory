import { expect, test } from '@playwright/test';
import { captureBrowserErrors, diagnostics, openLab, screenshotEvidence } from './helpers';

test('browser semantics, accessible naming, keyboard activation, and responsive composition hold', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);

  await expect(page.getByRole('complementary', { name: 'Experiment rack' })).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Planetary autopsy inspector' })).toBeVisible();
  await expect(page.getByRole('region', { name: /Interactive planetary viewport/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'PLAY' })).toBeVisible();
  await expect(page.getByRole('button', { name: /FORK B/ })).toBeVisible();
  await expect(page.locator('#switchB')).toBeDisabled();
  await expect(page.locator('[data-layer="comparison"]')).toBeDisabled();
  await expect(page.locator('#placement')).toHaveAttribute('aria-pressed', 'true');

  const duplicateIds = await page.evaluate(() => {
    const ids = [...document.querySelectorAll<HTMLElement>('[id]')].map(node => node.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds).toEqual([]);

  const emptyButtonNames = await page.getByRole('button').evaluateAll(buttons => buttons.filter(button => !(button.textContent ?? '').trim() && !button.getAttribute('aria-label')).length);
  expect(emptyButtonNames).toBe(0);

  await page.locator('#viewport').focus();
  await page.keyboard.press('ArrowRight');
  const movedCell = (await diagnostics(page)).selectedCell;
  expect(movedCell).toBeGreaterThan(0);
  await page.keyboard.press('Enter');
  expect((await diagnostics(page)).processCount).toBe(1);

  await page.locator('#placement').click();
  await expect(page.locator('#placement')).toHaveAttribute('aria-pressed', 'false');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.lab-shell')).toBeVisible();
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflows).toBe(false);
  await screenshotEvidence(page, '08-mobile-390x844', testInfo);
  expect(errors).toEqual([]);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('disables OrbitControls damping in the rendered application', async ({ page }) => {
    await openLab(page);
    expect((await diagnostics(page)).renderer.controlsDampingEnabled).toBe(false);
  });
});
