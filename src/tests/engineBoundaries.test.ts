import { describe, expect, it } from 'vitest';
import { SimulationEngine } from '../simulation/SimulationEngine';

describe('engine boundary hardening', () => {
  it('normalizes deployment inputs at the authoritative boundary', () => {
    const engine = new SimulationEngine(7);
    const id = engine.deploy('fault-tongue', 400, 725, -10, 9);
    const process = engine.processes.get(id)!;
    expect(process.lat).toBe(90);
    expect(process.lon).toBe(5);
    expect(process.radius).toBe(4);
    expect(process.intensity).toBe(1);
    expect(process.cells.length).toBeGreaterThan(0);
  });

  it('uses deterministic defaults for non-finite deployment input', () => {
    const engine = new SimulationEngine(8);
    const id = engine.deploy('cloudmaw', Number.NaN, Number.POSITIVE_INFINITY, Number.NaN, Number.NaN);
    const process = engine.processes.get(id)!;
    expect(process.lat).toBe(0);
    expect(process.lon).toBe(0);
    expect(process.radius).toBe(18);
    expect(process.intensity).toBe(0.65);
  });

  it('normalizes step count instead of accidentally rounding upward', () => {
    const engine = new SimulationEngine(9);
    engine.step(2.9);
    expect(engine.state.tick).toBe(2);
    engine.step(-5);
    engine.step(Number.NaN);
    expect(engine.state.tick).toBe(2);
  });

  it('rejects toggles for unknown process instances', () => {
    const engine = new SimulationEngine(10);
    expect(() => engine.setProcessActive('missing', false)).toThrow(/Unknown process instance/);
  });

  it('clamps explicit future forks to the currently observed state', () => {
    const engine = new SimulationEngine(11);
    engine.step(5);
    engine.fork('B', 500);
    expect(engine.state.tick).toBe(5);
    expect(engine.branches.get('B')?.forkTick).toBe(5);
  });

  it('clamps inspector indices to an existing authoritative cell', () => {
    const engine = new SimulationEngine(12);
    expect(engine.selectedCell(-100).elevation).toBe(engine.selectedCell(0).elevation);
    expect(engine.selectedCell(Number.POSITIVE_INFINITY).elevation).toBe(engine.selectedCell(0).elevation);
  });
});

describe('failure-state sequencing', () => {
  it('can fork at tick zero without corrupting shared history', () => {
    const engine = new SimulationEngine(13);
    const originalHash = engine.hash();
    engine.fork('B', 0);
    expect(engine.state.tick).toBe(0);
    expect(engine.hash()).toBe(originalHash);
    engine.switchBranch('A', 0);
    expect(engine.hash()).toBe(originalHash);
  });

  it('replays same-tick deploy and toggle actions in deterministic order', () => {
    const engine = new SimulationEngine(14);
    const id = engine.deploy('fault-tongue', 0, 0, 18, 0.5);
    engine.setProcessActive(id, false);
    engine.setProcessActive(id, true);
    engine.step(25);
    const expected = engine.hash();
    engine.restore(0);
    engine.restore(25);
    expect(engine.hash()).toBe(expected);
    expect(engine.processes.get(id)?.active).toBe(true);
  });
});
