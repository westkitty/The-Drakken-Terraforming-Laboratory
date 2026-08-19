import { GRID_HEIGHT, GRID_WIDTH } from '../simulation/types';

export function uvToGridCell(u: number, v: number): { x: number; y: number; index: number } {
  const x = Math.max(0, Math.min(GRID_WIDTH - 1, Math.floor(u * GRID_WIDTH)));
  const y = Math.max(0, Math.min(GRID_HEIGHT - 1, Math.floor(v * GRID_HEIGHT)));
  return { x, y, index: y * GRID_WIDTH + x };
}
