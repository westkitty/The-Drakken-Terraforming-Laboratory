import { describe, expect, it } from 'vitest';
import { uvToGridCell } from '../render/gridUv';
import { CELL_COUNT, GRID_HEIGHT, GRID_WIDTH } from '../simulation/types';

describe('renderer UV grid mapping', () => {
  it('wraps longitude across the spherical seam while clamping latitude', () => {
    expect(uvToGridCell(0, 0)).toEqual({ x: 0, y: 0, index: 0 });
    expect(uvToGridCell(1, 0)).toEqual({ x: 0, y: 0, index: 0 });
    expect(uvToGridCell(-0.5 / GRID_WIDTH, 0).x).toBe(GRID_WIDTH - 1);
    expect(uvToGridCell(1 + 0.5 / GRID_WIDTH, 1)).toEqual({ x: 0, y: GRID_HEIGHT - 1, index: (GRID_HEIGHT - 1) * GRID_WIDTH });
    expect(uvToGridCell(0.25, -0.1).y).toBe(0);
    expect(uvToGridCell(0.25, 1.1).y).toBe(GRID_HEIGHT - 1);
  });

  it('maps ordinary UV coordinates without leaving the grid', () => {
    const cell = uvToGridCell(0.5, 0.5);
    expect(cell.x).toBe(64);
    expect(cell.y).toBe(32);
    expect(cell.index).toBeGreaterThanOrEqual(0);
    expect(cell.index).toBeLessThan(CELL_COUNT);
  });

  it('normalizes non-finite UV input to a safe in-grid fallback', () => {
    expect(uvToGridCell(Number.NaN, Number.NaN)).toEqual({ x: 0, y: 0, index: 0 });
    expect(uvToGridCell(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)).toEqual({ x: 0, y: 0, index: 0 });
  });
});
