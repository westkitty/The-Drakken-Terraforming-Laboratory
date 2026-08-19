import { expect, test } from '@playwright/test';
import {
  captureBrowserErrors,
  clickGlobe,
  diagnostics,
  ledgerValue,
  openLab,
  runUntilTick,
  screenshotEvidence,
  selectProcess,
  setRange,
  setTimelineTick
} from './helpers';

test('initial application starts with a real WebGL canvas and clean console', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page, false);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('region', { name: /interactive planetary viewport/i })).toBeVisible();
  await expect(page.locator('#tickout')).toHaveText('TICK 0');
  await expect(page.locator('#quickstart')).toBeVisible();
  const webgl = await page.locator('#viewport canvas').evaluate(canvas => {
    const element = canvas as HTMLCanvasElement;
    return Boolean(element.getContext('webgl2') || element.getContext('webgl'));
  });
  expect(webgl).toBe(true);
  const diag = await diagnostics(page);
  expect(diag.branchId).toBe('A');
  expect(diag.renderer.canvas.width).toBeGreaterThan(0);
  expect(diag.renderer.canvas.height).toBeGreaterThan(0);
  await screenshotEvidence(page, '01-initial', testInfo);
  expect(errors).toEqual([]);
});

test('Fault-Tongue changes authoritative state before the rendered inspection result', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');
  await setRange(page, 'intensity', 0.85);
  await setRange(page, 'radius', 24);
  await clickGlobe(page, 0.5, 0.5);
  await expect(page.locator('#targeting')).toContainText('FAULT-TONGUE DEPLOYED');
  const deployed = await diagnostics(page);
  expect(deployed.processCount).toBe(1);
  await page.locator('#speed').selectOption('64');
  await runUntilTick(page, 30);
  await page.locator('[data-layer="crust"]').click();
  await page.locator('#placement').click();
  await clickGlobe(page, 0.5, 0.5);
  await expect(page.locator('#inspector')).toContainText('Fault-Tongue');
  expect((await diagnostics(page)).stateHash).not.toBe(deployed.stateHash);
  await screenshotEvidence(page, '02-fault-tongue-crust', testInfo);
  expect(errors).toEqual([]);
});

test('Cloudmaw redistributes water while preserving modeled total water', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  const startingWater = await ledgerValue(page, 'WATER MASS');
  await selectProcess(page, 'cloudmaw');
  await clickGlobe(page, 0.62, 0.5);
  await page.locator('#speed').selectOption('64');
  await runUntilTick(page, 45);
  await page.locator('[data-layer="hydrology"]').click();
  const endingWater = await ledgerValue(page, 'WATER MASS');
  const drift = await ledgerValue(page, 'WATER DRIFT');
  expect(Math.abs(endingWater - startingWater)).toBeLessThan(1e-3);
  expect(Math.abs(drift)).toBeLessThan(1e-3);
  await screenshotEvidence(page, '03-cloudmaw-hydrology', testInfo);
  expect(errors).toEqual([]);
});

test('Ringthroat starves before Gorevault feedstock and grows only after the chain exists', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'ringthroat');
  await clickGlobe(page, 0.5, 0.5);
  await page.locator('#speed').selectOption('64');
  await runUntilTick(page, 20);
  await expect(page.locator('#instances')).toContainText('STARVED');
  expect(await ledgerValue(page, 'SHAPED BAND')).toBe(0);
  await screenshotEvidence(page, '04-ringthroat-starved', testInfo);

  await selectProcess(page, 'gorevault');
  await setRange(page, 'intensity', 1);
  await setRange(page, 'radius', 40);
  for (const [x, y] of [[0.40, 0.44], [0.50, 0.40], [0.60, 0.44], [0.44, 0.56], [0.56, 0.56]] as const) await clickGlobe(page, x, y);
  await page.locator('#play').click();
  await expect.poll(() => ledgerValue(page, 'REFINED FEEDSTOCK'), { timeout: 20_000 }).toBeGreaterThan(0);
  await expect.poll(() => ledgerValue(page, 'SHAPED BAND'), { timeout: 20_000 }).toBeGreaterThan(0);
  if ((await diagnostics(page)).playing) await page.locator('#play').click();
  await screenshotEvidence(page, '05-gorevault-ringthroat-chain', testInfo);
  expect(errors).toEqual([]);
});

test('rewind restores the past, fork preserves common history, and later branch actions diverge', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');
  await clickGlobe(page, 0.5, 0.5);
  await page.locator('#speed').selectOption('64');
  await runUntilTick(page, 60);
  await setTimelineTick(page, 20);
  const aAtFork = await diagnostics(page);
  const eventTicks = await page.locator('#events span b').allTextContents();
  expect(eventTicks.every(value => Number(value) <= 20)).toBe(true);

  await page.locator('#fork').click();
  await page.locator('#switchB').click();
  const bAtFork = await diagnostics(page);
  expect(bAtFork.tick).toBe(20);
  expect(bAtFork.stateHash).toBe(aAtFork.stateHash);

  await selectProcess(page, 'cloudmaw');
  await clickGlobe(page, 0.58, 0.48);
  await runUntilTick(page, 45);
  const bLater = await diagnostics(page);
  await page.locator('#switchA').click();
  await runUntilTick(page, 45);
  const aLater = await diagnostics(page);
  expect(aLater.stateHash).not.toBe(bLater.stateHash);
  await page.locator('[data-layer="comparison"]').click();
  await expect(page.locator('#compare')).toContainText('A/B DELTA');
  await screenshotEvidence(page, '06-branch-comparison', testInfo);
  expect(errors).toEqual([]);
});

test('provenance answers why a transformed cell changed', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');
  await clickGlobe(page, 0.5, 0.5);
  await page.locator('#speed').selectOption('64');
  await runUntilTick(page, 30);
  await page.locator('#placement').click();
  await page.locator('[data-layer="provenance"]').click();
  await clickGlobe(page, 0.5, 0.5);
  await expect(page.locator('#inspector')).toContainText('CAUSE');
  await expect(page.locator('#inspector')).toContainText('Fault-Tongue');
  await expect(page.locator('#inspector')).toContainText('CAUSE TICK');
  await expect(page.locator('#inspector')).toContainText('CHANGED FIELD');
  await expect(page.locator('#inspector')).toContainText('LATEST DELTA');
  await expect(page.locator('#inspector')).toContainText('MATERIAL DESTINATION');
  await screenshotEvidence(page, '07-provenance', testInfo);
  expect(errors).toEqual([]);
});
