import { describe, expect, it } from 'vitest';
import { SimulationEngine } from '../simulation/SimulationEngine';

describe('process prerequisites and stable ordering', () => {
  it('Ringthroat cannot create orbital material with zero refined feedstock', () => {
    const e = new SimulationEngine(901);
    e.deploy('ringthroat', 0, 0, 12, 1);
    e.step(250);
    expect(e.state.gorevault.refinedFeedstock).toBe(0);
    expect(e.metrics().orbitalMaterial).toBe(0);
    expect(e.state.orbital.shapedBandMaterial).toBe(0);
  });

  it('incidental process Map insertion order does not alter the result', () => {
    const setup = () => {
      const e = new SimulationEngine(902);
      e.deploy('fault-tongue', 20, 15, 22, 0.8);
      e.deploy('cloudmaw', -12, 42, 18, 0.75);
      e.deploy('fault-tongue', 5, -55, 14, 0.5);
      return e;
    };
    const a = setup();
    const b = setup();
    const reversed = [...b.processes.entries()].reverse();
    b.processes.clear();
    for (const [id, instance] of reversed) b.processes.set(id, instance);
    a.step(50); b.step(50);
    expect(a.hash()).toBe(b.hash());
  });
});
