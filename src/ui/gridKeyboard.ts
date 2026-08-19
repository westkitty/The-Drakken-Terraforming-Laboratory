import { CELL_COUNT, GRID_HEIGHT, GRID_WIDTH } from '../simulation/types';

export type GridNavigationKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

export function moveGridSelection(index: number, key: GridNavigationKey): number {
  const safe = Math.max(0, Math.min(CELL_COUNT - 1, Math.floor(index)));
  let x = safe % GRID_WIDTH;
  let y = Math.floor(safe / GRID_WIDTH);
  if (key === 'ArrowLeft') x = (x - 1 + GRID_WIDTH) % GRID_WIDTH;
  else if (key === 'ArrowRight') x = (x + 1) % GRID_WIDTH;
  else if (key === 'ArrowUp') y = Math.min(GRID_HEIGHT - 1, y + 1);
  else y = Math.max(0, y - 1);
  return y * GRID_WIDTH + x;
}

export function isGridNavigationKey(key: string): key is GridNavigationKey {
  return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown';
}
