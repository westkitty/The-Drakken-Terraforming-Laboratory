import { describe, expect, it } from 'vitest';
import { SimulationEngine } from '../simulation/SimulationEngine';
import { totalConvertibleMass, totalModeledWater } from '../simulation/PlanetState';

const TOLERANCE = 1e-3;

describe('conservation ledgers', () => {
  it('Cloudmaw conserves total surface + atmospheric water', () => {
    const e = new SimulationEngine(3001);
    const before = totalModeledWater(e.state);
    e.deploy('cloudmaw', 5, 25, 28, 1);
    e.step(120);
    const after = totalModeledWater(e.state);
    expect(Math.abs(after - before)).toBeLessThan(TOLERANCE);
  });

  it('Gorevault harvested mass equals current internal + downstream pipeline mass', () => {
    const e = new SimulationEngine(3002);
    e.deploy('gorevault', 15, -20, 24, 1);
    e.step(180);
    const ledger = e.ledger();
    expect(ledger.harvestedFromPlanet).toBeGreaterThan(0);
    expect(Math.abs(ledger.pipelineError)).toBeLessThan(TOLERANCE);
  });

  it('Gorevault source reduction above environmental baseline matches harvested material', () => {
    const control = new SimulationEngine(3003);
    const harvested = new SimulationEngine(3003);
    harvested.deploy('gorevault', 25, 10, 20, 1);
    control.step(80); harvested.step(80);
    const attributableSourceReduction = totalConvertibleMass(control.state) - totalConvertibleMass(harvested.state);
    expect(attributableSourceReduction).toBeGreaterThan(0);
    expect(Math.abs(attributableSourceReduction - harvested.state.gorevault.totalHarvested)).toBeLessThan(0.05);
  });

  it('Ringthroat only transfers mass already present in the Gorevault pipeline', () => {
    const e = new SimulationEngine(3004);
    e.deploy('gorevault', 10, 0, 24, 1);
    e.step(220);
    const before = e.ledger();
    expect(before.refinedFeedstock).toBeGreaterThan(0);
    e.deploy('ringthroat', 10, 0, 15, 1);
    e.step(180);
    const after = e.ledger();
    expect(after.acceptedByRingthroat).toBeGreaterThan(0);
    expect(after.shapedBandMaterial).toBeGreaterThan(0);
    expect(Math.abs(after.pipelineError)).toBeLessThan(TOLERANCE);
  });
});
