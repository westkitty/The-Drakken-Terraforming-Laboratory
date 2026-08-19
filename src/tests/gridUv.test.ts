import { describe, expect, it } from 'vitest';
import { uvToGridCell } from '../render/gridUv';
import { CELL_COUNT, GRID_HEIGHT, GRID_WIDTH } from '../simulation/types';

describe('renderer UV grid mapping', () => {
  it('clamps SphereGeometry pole/seam offsets into the authoritative grid', () => {
    expect(uvToGridCell(-0.5 / GRID_WIDTH, 0)).toEqual({ x: 0, y: 0, index: 0 });
    expect(uvToGridCell(1 + 0.5 / GRID_WIDTH, 1)).toEqual({ x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1, index: CELL_COUNT - 1 });
  });

  it('maps ordinary UV coordinates without leaving the grid', () => {
    const cell = uvToGridCell(0.5, 0.5);
    expect(cell.x).toBe(64);
    expect(cell.y).toBe(32);
    expect(cell.index).toBeGreaterThanOrEqual(0);
    expect(cell.index).toBeLessThan(CELL_COUNT);
  });
});
