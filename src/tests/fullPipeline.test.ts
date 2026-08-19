import { describe, expect, it } from 'vitest';
import { materialLedger } from '../simulation/MaterialLedger';
import { SimulationEngine } from '../simulation/SimulationEngine';

const HARVEST_SITES: Array<[number, number]> = [
  [-60,-150],[-60,-50],[-60,50],[-60,150],
  [-20,-150],[-20,-50],[-20,50],[-20,150],
  [20,-150],[20,-50],[20,50],[20,150],
  [60,-150],[60,-50],[60,50],[60,150]
];

describe('lawful full transformation path', () => {
  it('can close the orbital band from planetary source matter without breaking conservation', () => {
    const engine = new SimulationEngine(19870615);
    for (const [lat, lon] of HARVEST_SITES) engine.deploy('gorevault', lat, lon, 40, 1);
    for (let index = 0; index < 16; index++) engine.deploy('ringthroat', 0, -168 + index * 22.5, 40, 1);

    while (!engine.state.orbital.closed && engine.state.tick < 1200) engine.step();

    expect(engine.state.orbital.closed).toBe(true);
    expect(engine.state.orbital.bandCoverage).toBe(1);
    expect(engine.state.orbital.continuity).toBe(1);
    expect(engine.state.orbital.bandIntegrity).toBeGreaterThanOrEqual(0.82);
    const ledger = materialLedger(engine.state);
    expect(Math.abs(ledger.pipelineError)).toBeLessThan(1e-3);
    expect(Math.abs(ledger.systemError)).toBeLessThan(1e-3);
    expect(Math.abs(engine.metrics().waterDrift)).toBeLessThan(1e-3);
  }, 30_000);
});
