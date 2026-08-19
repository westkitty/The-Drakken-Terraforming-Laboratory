import { expect, type Page, type TestInfo } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

export interface BrowserDiagnostics {
  seed: number;
  tick: number;
  branchId: string;
  stateHash: string;
  playing: boolean;
  speed: number;
  fps: number;
  simStepMs: number;
  activeProcesses: number;
  processCount: number;
  selectedCell: number;
  layer: string;
  frameTimesMs: number[];
  renderer: {
    contextLost: boolean;
    pixelRatio: number;
    canvas: { width: number; height: number };
    render: { calls: number; triangles: number; points: number; lines: number };
    memory: { geometries: number; textures: number };
    scene: { objects: number; meshes: number; uniqueGeometries: number; uniqueMaterials: number };
    controlsDampingEnabled: boolean;
    gpuRenderer: string;
    gpuVendor: string;
  };
}

export function captureBrowserErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return errors;
}

export async function openLab(page: Page, dismissGuide = true): Promise<void> {
  await page.addInitScript(() => {
    const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
    let lastFrame = 0;
    (window as Window & { __DRAKKEN_FRAME_TIMES__?: number[] }).__DRAKKEN_FRAME_TIMES__ = [];
    window.requestAnimationFrame = callback => nativeRequestAnimationFrame(timestamp => {
      if (lastFrame > 0) {
        const frames = (window as Window & { __DRAKKEN_FRAME_TIMES__?: number[] }).__DRAKKEN_FRAME_TIMES__!;
        frames.push(timestamp - lastFrame);
        if (frames.length > 600) frames.splice(0, frames.length - 600);
      }
      lastFrame = timestamp;
      callback(timestamp);
    });
  });
  await page.goto('/?diagnostics=1', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#viewport canvas')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => typeof (window as Window & { __DRAKKEN_LAB_DIAGNOSTICS__?: unknown }).__DRAKKEN_LAB_DIAGNOSTICS__)).toBe('function');
  if (dismissGuide && await page.locator('#quickstartDismiss').isVisible()) await page.locator('#quickstartDismiss').click();
}

export async function diagnostics(page: Page): Promise<BrowserDiagnostics> {
  return page.evaluate(() => {
    const getter = (window as Window & { __DRAKKEN_LAB_DIAGNOSTICS__?: () => BrowserDiagnostics }).__DRAKKEN_LAB_DIAGNOSTICS__;
    if (!getter) throw new Error('Diagnostics hook unavailable');
    return getter();
  });
}

export async function clickGlobe(page: Page, xRatio = 0.5, yRatio = 0.5): Promise<void> {
  const canvas = page.locator('#viewport canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Canvas has no bounding box');
  await page.mouse.click(box.x + box.width * xRatio, box.y + box.height * yRatio);
}

export async function selectProcess(page: Page, id: 'fault-tongue' | 'cloudmaw' | 'gorevault' | 'ringthroat'): Promise<void> {
  await page.locator(`[data-process="${id}"]`).click();
}

export async function setRange(page: Page, id: 'intensity' | 'radius', value: number): Promise<void> {
  await page.locator(`#${id}`).evaluate((node, nextValue) => {
    const input = node as HTMLInputElement;
    input.value = String(nextValue);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
}

export async function runUntilTick(page: Page, tick: number): Promise<void> {
  if ((await diagnostics(page)).playing === false) await page.locator('#play').click();
  await expect.poll(async () => (await diagnostics(page)).tick, { timeout: 20_000 }).toBeGreaterThanOrEqual(tick);
  if ((await diagnostics(page)).playing) await page.locator('#play').click();
}

export async function ledgerValue(page: Page, label: string): Promise<number> {
  const row = page.locator('#ledger span').filter({ hasText: label }).first();
  await expect(row).toBeVisible();
  const value = await row.locator('b').textContent();
  if (value == null) throw new Error(`Missing ledger value ${label}`);
  return Number(value.replace(/,/g, ''));
}

export async function setTimelineTick(page: Page, tick: number): Promise<void> {
  await page.locator('#timeline').evaluate((node, nextTick) => {
    const input = node as HTMLInputElement;
    input.value = String(nextTick);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, tick);
  await expect.poll(async () => (await diagnostics(page)).tick).toBe(tick);
}

export async function screenshotEvidence(page: Page, name: string, testInfo: TestInfo): Promise<void> {
  const path = join('browser-evidence', 'screenshots', `${name}.png`);
  mkdirSync(dirname(path), { recursive: true });
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach(name, { path, contentType: 'image/png' });
}
