import { expect, test } from '@playwright/test';
import {
  captureBrowserErrors,
  clickBranch,
  clickFork,
  clickGlobe,
  clickLayer,
  clickPlacement,
  clickPlay,
  diagnostics,
  ledgerValue,
  openControlFamily,
  openLab,
  runUntilTick,
  screenshotEvidence,
  selectProcess,
  setRange,
  setSpeed,
  setTimelineTick
} from './helpers';

test('initial application starts with a real WebGL canvas and clean console', async ({ page }, testInfo) => {
  const errors = captureBrowserErrors(page);
  await openLab(page, false);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('region', { name: /interactive planetary viewport/i })).toBeVisible();
  await expect(page.locator('#tickout')).toHaveText('TICK 0');
  await expect(page.locator('#lab-controls-launcher')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#lab-controls-menu')).toBeHidden();
  await expect(page.locator('#quickstart')).toBeHidden();
  const webgl = await page.locator('#viewport canvas').evaluate(canvas => {
    const element = canvas as HTMLCanvasElement;
    return Boolean(element.getContext('webgl2') || element.getContext('webgl'));
  });
  expect(webgl).toBe(true);
  const diag = await diagnostics(page);
  expect(diag.tick).toBe(0);
  expect(diag.branchId).toBe('A');
  expect(diag.renderer.canvas.width).toBeGreaterThan(0);
  expect(diag.renderer.canvas.height).toBeGreaterThan(0);
  await screenshotEvidence(page, '01-initial', testInfo);
  expect(errors).toEqual([]);
});

test('Fault-Tongue changes authoritative state before the rendered inspection result', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');
  await setRange(page, 'intensity', 0.85);
  await setRange(page, 'radius', 24);
  await clickGlobe(page, 0.5, 0.5);
  await expect.poll(async () => (await diagnostics(page)).processCount).toBe(1);
  await openControlFamily(page, 'drakken');
  await expect(page.locator('#instances')).toContainText('Fault-Tongue');
  const deployed = await diagnostics(page);
  await setSpeed(page, '4');
  await runUntilTick(page, 30);
  await clickLayer(page, 'crust');
  await clickPlacement(page);
  await clickGlobe(page, 0.5, 0.5);
  await openControlFamily(page, 'inspect');
  await expect(page.locator('#inspector')).toContainText('CRUST INTEGRITY');
  expect((await diagnostics(page)).stateHash).not.toBe(deployed.stateHash);
  await screenshotEvidence(page, '02-fault-tongue-crust', testInfo);
  expect(errors).toEqual([]);
});

test('Cloudmaw redistributes water while preserving modeled total water', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);
  const startingWater = await ledgerValue(page, 'WATER MASS');
  await selectProcess(page, 'cloudmaw');
  await clickGlobe(page, 0.62, 0.5);
  await setSpeed(page, '4');
  await runUntilTick(page, 45);
  await clickLayer(page, 'hydrology');
  const endingWater = await ledgerValue(page, 'WATER MASS');
  const drift = await ledgerValue(page, 'WATER DRIFT');
  expect(Math.abs(endingWater - startingWater)).toBeLessThan(1e-3);
  expect(Math.abs(drift)).toBeLessThan(1e-3);
  await screenshotEvidence(page, '03-cloudmaw-hydrology', testInfo);
  expect(errors).toEqual([]);
});

test('Ringthroat starves before Gorevault feedstock and grows only after the chain exists', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'ringthroat');
  await clickGlobe(page, 0.5, 0.5);
  await setSpeed(page, '64');
  await runUntilTick(page, 20);
  await openControlFamily(page, 'drakken');
  await expect(page.locator('#instances')).toContainText('STARVED');
  expect(await ledgerValue(page, 'SHAPED BAND')).toBe(0);
  await screenshotEvidence(page, '04-ringthroat-starved', testInfo);

  await selectProcess(page, 'gorevault');
  await setRange(page, 'intensity', 1);
  await setRange(page, 'radius', 40);
  for (const [x, y] of [[0.40, 0.44], [0.50, 0.40], [0.60, 0.44], [0.44, 0.56], [0.56, 0.56]] as const) await clickGlobe(page, x, y);
  await clickPlay(page);
  await expect.poll(() => ledgerValue(page, 'REFINED FEEDSTOCK'), { timeout: 20_000 }).toBeGreaterThan(0);
  await expect.poll(() => ledgerValue(page, 'SHAPED BAND'), { timeout: 20_000 }).toBeGreaterThan(0);
  if ((await diagnostics(page)).playing) await clickPlay(page);
  await screenshotEvidence(page, '05-gorevault-ringthroat-chain', testInfo);
  expect(errors).toEqual([]);
});

test('rewind restores the past, fork preserves common history, and later branch actions diverge', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');
  await clickGlobe(page, 0.5, 0.5);
  await setSpeed(page, '4');
  await runUntilTick(page, 60);
  await setTimelineTick(page, 20);
  const aAtFork = await diagnostics(page);
  const eventTicks = await page.locator('#events span b').allTextContents();
  expect(eventTicks.every(value => Number(value) <= 20)).toBe(true);

  await clickFork(page);
  await clickBranch(page, 'B');
  const bAtFork = await diagnostics(page);
  expect(bAtFork.tick).toBe(20);
  expect(bAtFork.stateHash).toBe(aAtFork.stateHash);

  await selectProcess(page, 'cloudmaw');
  await clickGlobe(page, 0.58, 0.48);
  await runUntilTick(page, 45);
  const bLater = await diagnostics(page);
  await clickBranch(page, 'A');
  await runUntilTick(page, 45);
  const aLater = await diagnostics(page);
  expect(aLater.stateHash).not.toBe(bLater.stateHash);
  await clickLayer(page, 'comparison');
  await openControlFamily(page, 'inspect');
  await expect(page.locator('#compare')).toContainText('A/B DELTA');
  await screenshotEvidence(page, '06-branch-comparison', testInfo);
  expect(errors).toEqual([]);
});

test('provenance answers what most recently changed a transformed cell', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors = captureBrowserErrors(page);
  await openLab(page);
  await selectProcess(page, 'fault-tongue');
  await clickGlobe(page, 0.5, 0.5);
  await setSpeed(page, '4');
  await runUntilTick(page, 8);
  await clickPlacement(page);
  await clickLayer(page, 'provenance');
  await clickGlobe(page, 0.5, 0.5);
  await openControlFamily(page, 'inspect');
  const inspector = page.locator('#inspector');
  await expect(inspector).toContainText('CAUSE');
  await expect(inspector).toContainText('CAUSE TICK');
  await expect(inspector).toContainText('CHANGED FIELD');
  await expect(inspector).toContainText('LATEST DELTA');
  await expect(inspector).toContainText('MATERIAL DESTINATION');
  const inspectorText = (await inspector.textContent()) ?? '';
  expect(inspectorText).not.toMatch(/CAUSE\s*none/i);
  expect(inspectorText).not.toMatch(/CHANGED FIELD\s*none/i);
  await screenshotEvidence(page, '07-provenance', testInfo);
  expect(errors).toEqual([]);
});
