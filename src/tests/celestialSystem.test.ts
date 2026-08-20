import { describe, expect, it } from 'vitest';
import { defineCelestialSystem, poseAtTick, posesAtTick } from '../render/celestialSystem';

describe('celestial system', () => {
  it('is deterministic for a seed and tick', () => {
    const a = posesAtTick(defineCelestialSystem(19870615), 120);
    const b = posesAtTick(defineCelestialSystem(19870615), 120);
    expect(a).toEqual(b);
  });

  it('keeps the primary planet at the origin', () => {
    const planet = poseAtTick(defineCelestialSystem(4102).find(item => item.id === 'primary')!, 80);
    expect(planet.x).toBe(0);
    expect(planet.y).toBe(0);
    expect(planet.z).toBe(0);
  });

  it('defines a system star, major moon, and two outer bodies', () => {
    const system = defineCelestialSystem(19870615);
    expect(system.some(item => item.kind === 'star')).toBe(true);
    expect(system.some(item => item.kind === 'moon' && item.name === 'Primary Moon')).toBe(true);
    expect(system.filter(item => item.kind === 'minor').map(item => item.name)).toEqual(['Outer Body 1', 'Outer Body 2']);
  });

  it('moves orbiting bodies with simulation tick and restores the same pose on rewind', () => {
    const moon = defineCelestialSystem(19870615).find(item => item.id === 'primary-moon')!;
    const at40 = poseAtTick(moon, 40);
    const at180 = poseAtTick(moon, 180);
    expect(at40.x).not.toBeCloseTo(at180.x, 6);
    expect(poseAtTick(moon, 40)).toEqual(at40);
    expect(poseAtTick(moon, 180)).toEqual(at180);
  });

  it('does not advance orbital phase from a wall-clock value', () => {
    const moon = defineCelestialSystem(77).find(item => item.id === 'primary-moon')!;
    expect(poseAtTick(moon, 16)).toEqual(poseAtTick(moon, 16));
    expect(poseAtTick(moon, 16).phase).not.toBe(poseAtTick(moon, 32).phase);
  });
});
