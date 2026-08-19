import { describe, expect, it } from 'vitest';
import { GRID_HEIGHT, GRID_WIDTH } from '../simulation/types';
import { moveGridSelection } from '../ui/gridKeyboard';

describe('keyboard planet navigation', () => {
  it('wraps longitude and clamps latitude', () => {
    const equatorWest = 31 * GRID_WIDTH;
    expect(moveGridSelection(equatorWest, 'ArrowLeft')).toBe(equatorWest + GRID_WIDTH - 1);
    expect(moveGridSelection(equatorWest + GRID_WIDTH - 1, 'ArrowRight')).toBe(equatorWest);
    expect(moveGridSelection(GRID_WIDTH - 1, 'ArrowDown')).toBe(GRID_WIDTH - 1);
    const north = (GRID_HEIGHT - 1) * GRID_WIDTH + 12;
    expect(moveGridSelection(north, 'ArrowUp')).toBe(north);
  });

  it('moves one latitude row at a time', () => {
    const cell = 20 * GRID_WIDTH + 42;
    expect(moveGridSelection(cell, 'ArrowUp')).toBe(cell + GRID_WIDTH);
    expect(moveGridSelection(cell, 'ArrowDown')).toBe(cell - GRID_WIDTH);
  });
});
