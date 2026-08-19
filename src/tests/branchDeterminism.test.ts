import { describe, expect, it } from 'vitest';
import { SimulationEngine, hashPlanetState } from '../simulation/SimulationEngine';

describe('branch history', () => {
  it('forked branch has identical world state at the fork tick', () => {
    const e = new SimulationEngine(5001);
    e.deploy('fault-tongue', 8, 12, 18, 0.6);
    e.step(50);
    const aHash = e.hash();
    e.fork('B', 50);
    expect(e.hash()).toBe(aHash);
    e.switchBranch('A', 50);
    expect(e.hash()).toBe(aHash);
  });

  it('different post-fork actions deterministically diverge', () => {
    const e = new SimulationEngine(5002);
    e.step(25);
    e.fork('B', 25);
    e.deploy('cloudmaw', -10, 60, 24, 0.9);
    e.step(35);
    const bHash = e.hash();
    e.switchBranch('A', 25);
    e.deploy('fault-tongue', 10, -60, 22, 0.9);
    e.step(35);
    const aHash = e.hash();
    expect(aHash).not.toBe(bHash);
    const c = e.compare('A', 'B', 60);
    expect(Math.abs(c.delta.oceanCoverage) + Math.abs(c.delta.averageCrustIntegrity)).toBeGreaterThan(0);
  });


  it('freezes inherited actions at fork time so later parent edits cannot leak into the child', () => {
    const e = new SimulationEngine(5101);
    e.step(25);
    e.fork('B', 25);
    const childBefore = e.captureState('B', 26);

    e.switchBranch('A', 25);
    e.deploy('fault-tongue', 0, 0, 30, 1);
    const childAfter = e.captureState('B', 26);

    expect(hashPlanetState(childAfter)).toBe(hashPlanetState(childBefore));
  });


  it('comparison and capture replay do not mutate the timeline event log', () => {
    const e = new SimulationEngine(19870615);
    e.step(25);
    e.fork('B', 25);
    e.switchBranch('A', 25);
    const eventsBefore = e.events.map(event => ({ ...event }));

    e.compare('A', 'B', 25);
    e.captureState('B', 25);

    expect(e.events).toEqual(eventsBefore);
  });

});
