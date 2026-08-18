import type { PlanetState } from '../PlanetState';
import { CELL_COUNT } from '../types';
import { CAUSE, markCell } from '../processes/ProcessRuntime';

export function updateEnvironment(state: PlanetState, tick: number): void {
  for (let i = 0; i < CELL_COUNT; i++) {
    const water = state.surfaceWaterMass[i]!;
    const temp = state.temperature[i]!;
    const evaporate = Math.min(water * 0.00012, Math.max(0, temp) * 0.00004);
    state.surfaceWaterMass[i] = water - evaporate;
    state.atmosphericWaterMass[i] = state.atmosphericWaterMass[i]! + evaporate;
    const condense = Math.min(state.atmosphericWaterMass[i]! * 0.00018, Math.max(0, 0.25 - temp) * 0.00005);
    state.atmosphericWaterMass[i] = state.atmosphericWaterMass[i]! - condense;
    state.surfaceWaterMass[i] = state.surfaceWaterMass[i]! + condense;
    state.humidity[i] = Math.min(1, 0.12 + state.atmosphericWaterMass[i]! * 6);

    const flood = Math.max(0, state.surfaceWaterMass[i]! - Math.max(0.16, -state.elevation[i]! * 0.3));
    const damage = Math.min(0.012, flood * 0.0022 + state.fractureIntensity[i]! * 0.0012 + state.aerosolDensity[i]! * 0.00015);
    if (damage > 0.00001) {
      const vegetationBefore = state.vegetationMass[i]!;
      const animalBefore = state.animalMass[i]!;
      const populationBefore = state.populationMass[i]!;
      state.vegetationMass[i] = Math.max(0, vegetationBefore * (1 - damage));
      state.animalMass[i] = Math.max(0, animalBefore * (1 - damage * 0.8));
      state.populationMass[i] = Math.max(0, populationBefore * (1 - damage * 0.65));
      state.environmentalResidueMass +=
        (vegetationBefore - state.vegetationMass[i]!) +
        (animalBefore - state.animalMass[i]!) +
        (populationBefore - state.populationMass[i]!);
      state.infrastructureDensity[i] = Math.max(0, state.infrastructureDensity[i]! * (1 - damage * 0.35));
      markCell(state, tick, i, CAUSE.environment, 3, damage);
    }
    state.aerosolDensity[i] = state.aerosolDensity[i]! * 0.999;
  }
}
