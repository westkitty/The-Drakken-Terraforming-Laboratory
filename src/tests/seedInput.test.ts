import { describe, expect, it } from 'vitest';
import { DEFAULT_PLANET_SEED, parsePlanetSeed } from '../ui/seedInput';

describe('planet seed input', () => {
  it('accepts zero as a valid deterministic seed', () => {
    expect(parsePlanetSeed('0')).toBe(0);
  });

  it('normalizes integer input to the uint32 seed domain used by the simulation', () => {
    expect(parsePlanetSeed('-1')).toBe(0xffffffff);
    expect(parsePlanetSeed('42.9')).toBe(42);
  });

  it('uses the default only for empty or non-finite input', () => {
    expect(parsePlanetSeed('')).toBe(DEFAULT_PLANET_SEED);
    expect(parsePlanetSeed('not-a-number')).toBe(DEFAULT_PLANET_SEED);
  });
});
