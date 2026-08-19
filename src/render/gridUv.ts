import { GRID_HEIGHT, GRID_WIDTH } from '../simulation/types';

export function uvToGridCell(u: number, v: number): { x: number; y: number; index: number } {
  const safeU = Number.isFinite(u) ? u : 0;
  const safeV = Number.isFinite(v) ? v : 0;
  const wrappedU = ((safeU % 1) + 1) % 1;
  const x = Math.min(GRID_WIDTH - 1, Math.floor(wrappedU * GRID_WIDTH));
  const y = Math.max(0, Math.min(GRID_HEIGHT - 1, Math.floor(safeV * GRID_HEIGHT)));
  return { x, y, index: y * GRID_WIDTH + x };
}
