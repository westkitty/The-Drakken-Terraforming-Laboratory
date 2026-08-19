import { describe, expect, it } from 'vitest';
import { SimulationEngine } from '../simulation/SimulationEngine';

describe('timeline event causality', () => {
  it('inherits the visible parent timeline through the fork boundary and freezes it', () => {
    const e = new SimulationEngine(6201);
    e.deploy('fault-tongue', 0, 0, 18, 0.7);
    e.step(25);
    const parentAtFork = e.timelineEvents('A', 25).map(({ tick, type, message }) => ({ tick, type, message }));
    e.fork('B', 25);
    const childAtFork = e.timelineEvents('B', 25);
    expect(childAtFork.slice(0, parentAtFork.length).map(({ tick, type, message }) => ({ tick, type, message }))).toEqual(parentAtFork);
    expect(childAtFork.at(-1)?.type).toBe('BRANCH CREATED');
    e.switchBranch('A', 25);
    e.deploy('cloudmaw', 12, 40, 20, 0.8);
    expect(e.timelineEvents('B', 25).some(event => event.message === 'Cloudmaw deployed')).toBe(false);
  });

  it('does not expose future timeline events while viewing an earlier restored tick', () => {
    const e = new SimulationEngine(6202);
    e.step(50);
    expect(e.events.some(event => event.tick > 0)).toBe(true);
    e.restore(0);
    expect(e.timelineEvents('A', 0).every(event => event.tick <= 0)).toBe(true);
    expect(e.timelineEvents('A', 0).some(event => event.type.startsWith('OCEAN COVERAGE '))).toBe(false);
  });

  it('records a closed orbital band on the exact tick the authoritative closed state is observed', () => {
    const e = new SimulationEngine(6203);
    e.state.orbital.closed = true;
    e.step(1);
    const closed = e.timelineEvents('A', 1).find(event => event.type === 'ORBITAL BAND CLOSED');
    expect(closed?.tick).toBe(1);
  });
});
