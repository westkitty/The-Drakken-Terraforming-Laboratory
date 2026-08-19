import { describe, expect, it } from 'vitest';
import { materialLedger } from '../simulation/MaterialLedger';
import { SimulationEngine } from '../simulation/SimulationEngine';
import type { PlanetState } from '../simulation/PlanetState';

const MASS_FIELDS = ['surfaceWaterMass','atmosphericWaterMass','vegetationMass','microbialMass','animalMass','organicSoilMass','populationMass'] as const;
const BOUNDED_FIELDS = ['crustIntegrity','crustStress','fractureIntensity','humidity','aerosolDensity','drakkenInfluence'] as const;

function assertFiniteState(state: PlanetState): void {
  for (const field of MASS_FIELDS) for (const value of state[field]) {
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThanOrEqual(-1e-6);
  }
  for (const field of BOUNDED_FIELDS) for (const value of state[field]) {
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThanOrEqual(-1e-6);
    expect(value).toBeLessThanOrEqual(1 + 1e-6);
  }
  for (const value of state.elevation) expect(Number.isFinite(value)).toBe(true);
  for (const value of Object.values(state.gorevault)) {
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThanOrEqual(-1e-6);
  }
  for (const [key, value] of Object.entries(state.orbital)) if (key !== 'closed') {
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThanOrEqual(-1e-6);
  }
}

describe('multi-seed simulation stress', () => {
  it('keeps planetary and material invariants stable across varied worlds and seam/pole deployments', () => {
    for (let n = 0; n < 16; n++) {
      const seed = (0x9e3779b9 * (n + 1)) >>> 0;
      const engine = new SimulationEngine(seed);
      engine.deploy('fault-tongue', 90, 179.9, 40, 1);
      engine.deploy('cloudmaw', -90, -179.9, 40, 1);
      engine.deploy('gorevault', 18 - n, 178 - n * 13, 40, 1);
      engine.deploy('ringthroat', -18 + n, -178 + n * 11, 40, 1);
      engine.step(120);
      assertFiniteState(engine.state);
      const ledger = materialLedger(engine.state);
      expect(Math.abs(engine.metrics().waterDrift)).toBeLessThan(1e-3);
      expect(Math.abs(ledger.pipelineError)).toBeLessThan(1e-3);
      expect(Math.abs(ledger.systemError)).toBeLessThan(1e-3);
      if (engine.state.orbital.closed) {
        expect(engine.state.orbital.bandCoverage).toBeGreaterThanOrEqual(0.995);
        expect(engine.state.orbital.continuity).toBeGreaterThanOrEqual(0.995);
        expect(engine.state.orbital.bandIntegrity).toBeGreaterThanOrEqual(0.82);
      }
    }
  }, 30_000);
});
