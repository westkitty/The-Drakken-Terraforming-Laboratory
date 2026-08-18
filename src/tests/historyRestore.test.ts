import { describe, expect, it } from 'vitest';
import { SimulationEngine } from '../simulation/SimulationEngine';

describe('history restoration', () => {
  it('restores an earlier authoritative state hash exactly', () => {
    const e = new SimulationEngine(4001);
    e.deploy('fault-tongue', 10, 10, 20, 0.8);
    e.deploy('cloudmaw', -15, 30, 18, 0.7);
    e.step(50);
    expect(e.snapshotCount()).toBeGreaterThan(1);
    const hashAt50 = e.hash();
    e.step(45);
    expect(e.hash()).not.toBe(hashAt50);
    e.restore(50);
    expect(e.hash()).toBe(hashAt50);
  });

  it('restored future replay remains deterministic', () => {
    const e = new SimulationEngine(4002);
    e.deploy('fault-tongue', 0, 0, 16, 0.9);
    e.step(75);
    const hashAt75 = e.hash();
    e.restore(25);
    e.step(50);
    expect(e.hash()).toBe(hashAt75);
  });
});
