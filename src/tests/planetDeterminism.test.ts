import { describe, expect, it } from 'vitest';
import { SimulationEngine } from '../simulation/SimulationEngine';
import { SeededRandom } from '../simulation/SeededRandom';

describe('seeded determinism', () => {
  it('repeats the seeded random sequence exactly', () => {
    const a = new SeededRandom(42); const b = new SeededRandom(42);
    expect(Array.from({ length: 20 }, () => a.nextUint())).toEqual(Array.from({ length: 20 }, () => b.nextUint()));
  });

  it('same seed produces identical initial state hash', () => {
    expect(new SimulationEngine(123456).hash()).toBe(new SimulationEngine(123456).hash());
  });

  it('different seeds normally produce different initial state hashes', () => {
    expect(new SimulationEngine(123456).hash()).not.toBe(new SimulationEngine(123457).hash());
  });

  it('same ordered actions and tick count produce identical hashes', () => {
    const run = () => {
      const e = new SimulationEngine(77);
      e.deploy('fault-tongue', 12, 30, 18, 0.7);
      e.deploy('cloudmaw', -8, -70, 20, 0.6);
      e.step(60);
      return e.hash();
    };
    expect(run()).toBe(run());
  });

  it('distinguishes scalar state differences below Float32 resolution', () => {
    const a = new SimulationEngine(101);
    const b = new SimulationEngine(101);
    a.state.gorevault.refinedFeedstock = 1;
    b.state.gorevault.refinedFeedstock = 1 + 1e-10;
    expect(a.hash()).not.toBe(b.hash());
  });
});
