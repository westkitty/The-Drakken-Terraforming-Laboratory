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


  it('invalidates stale future snapshots after an action is inserted in the past', () => {
    const e = new SimulationEngine(4101);
    e.deploy('fault-tongue', 0, 0, 20, 0.8);
    e.step(100);
    e.restore(25);
    e.deploy('cloudmaw', 10, 20, 24, 0.9);
    e.restore(100);

    const reference = new SimulationEngine(4101);
    reference.deploy('fault-tongue', 0, 0, 20, 0.8);
    reference.step(25);
    reference.deploy('cloudmaw', 10, 20, 24, 0.9);
    reference.step(75);
    expect(e.hash()).toBe(reference.hash());
  });


  it('regenerates derived timeline milestones after past edits invalidate future events', () => {
    const e = new SimulationEngine(19870615);
    e.step(25);
    expect(e.events.some(event => event.type === 'OCEAN COVERAGE 25%' && event.tick === 25)).toBe(true);

    e.restore(0);
    e.deploy('fault-tongue', 0, 0, 12, 0.2);
    expect(e.events.some(event => event.type === 'OCEAN COVERAGE 25%' && event.tick === 25)).toBe(false);

    e.restore(25);
    expect(e.events.some(event => event.type === 'OCEAN COVERAGE 25%' && event.tick === 25)).toBe(true);
  });


  it('replays tick-zero actions after the oldest snapshots have been evicted', () => {
    const e = new SimulationEngine(4102);
    e.deploy('fault-tongue', 0, 0, 20, 0.9);
    e.step(1600);
    e.restore(50);

    const reference = new SimulationEngine(4102);
    reference.deploy('fault-tongue', 0, 0, 20, 0.9);
    reference.step(50);
    expect(e.hash()).toBe(reference.hash());
  });

});
