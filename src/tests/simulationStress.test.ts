import { describe, expect, it } from 'vitest';
import { materialLedger } from '../simulation/MaterialLedger';
import { SimulationEngine } from '../simulation/SimulationEngine';
import type { PlanetState } from '../simulation/PlanetState';

const MASS_FIELDS = ['surfaceWaterMass','atmosphericWaterMass','vegetationMass','microbialMass','animalMass','organicSoilMass','populationMass'] as const;
const BOUNDED_FIELDS = ['crustIntegrity','crustStress','fractureIntensity','humidity','aerosolDensity','drakkenInfluence'] as const;

function assertFiniteState(state: PlanetState): void {
  for (const field of MASS_FIELDS) assertArrayRange(field, state[field], -1e-6, Number.POSITIVE_INFINITY);
  for (const field of BOUNDED_FIELDS) assertArrayRange(field, state[field], -1e-6, 1 + 1e-6);
  assertArrayRange('elevation', state.elevation, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  assertRecordRange('gorevault', state.gorevault, -1e-6, Number.POSITIVE_INFINITY);
  const orbital = Object.fromEntries(Object.entries(state.orbital).filter(([key]) => key !== 'closed'));
  assertRecordRange('orbital', orbital, -1e-6, Number.POSITIVE_INFINITY);
}

function assertArrayRange(name: string, values: ArrayLike<number>, min: number, max: number): void {
  for (let index = 0; index < values.length; index++) {
    const value = values[index]!;
    if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${name}[${index}] outside finite range: ${value}`);
  }
}

function assertRecordRange(name: string, values: object, min: number, max: number): void {
  for (const [key, raw] of Object.entries(values)) {
    if (typeof raw !== 'number') continue;
    if (!Number.isFinite(raw) || raw < min || raw > max) throw new Error(`${name}.${key} outside finite range: ${raw}`);
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
