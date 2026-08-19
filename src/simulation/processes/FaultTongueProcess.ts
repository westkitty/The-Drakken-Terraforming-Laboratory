import { hashSeed } from '../SeededRandom';
import type { PlanetState } from '../PlanetState';
import { GRID_HEIGHT, GRID_WIDTH, type ProcessInstance } from '../types';
import { CAUSE, markCell } from './ProcessRuntime';

export function applyFaultTongue(state: PlanetState, seed: number, tick: number, process: ProcessInstance): void {
  for (let k = 0; k < process.cells.length; k++) {
    const i = process.cells[k]!;
    const weight = process.weights[k]! * process.intensity;
    const orientation = ((hashSeed(seed, i, process.deploymentTick) / 0xffffffff) - 0.5) * 2;
    state.crustStress[i] = Math.min(1, state.crustStress[i]! + 0.018 * weight);
    if (state.crustStress[i]! > 0.38) {
      const fracture = Math.min(1, state.fractureIntensity[i]! + (state.crustStress[i]! - 0.34) * 0.022 * weight);
      state.fractureIntensity[i] = fracture;
      state.crustIntegrity[i] = Math.max(0, state.crustIntegrity[i]! - fracture * 0.010 * weight);
      state.elevation[i] = state.elevation[i]! + orientation * fracture * 0.005 * weight;
      state.exposedMineralMass[i] = state.exposedMineralMass[i]! + fracture * 0.004 * weight;
      state.aerosolDensity[i] = Math.min(1, state.aerosolDensity[i]! + fracture * 0.004 * weight);
      propagateStress(state, i, fracture * 0.0018 * weight);
      markCell(state, tick, i, CAUSE.fault, 1, fracture);
    }
    state.drakkenInfluence[i] = Math.max(state.drakkenInfluence[i]!, weight);
  }
}

function propagateStress(state: PlanetState, index: number, amount: number): void {
  if (amount <= 0) return;
  const y = Math.floor(index / GRID_WIDTH);
  const x = index % GRID_WIDTH;
  const west = y * GRID_WIDTH + ((x + GRID_WIDTH - 1) % GRID_WIDTH);
  const east = y * GRID_WIDTH + ((x + 1) % GRID_WIDTH);
  state.crustStress[west] = Math.min(1, state.crustStress[west]! + amount);
  state.crustStress[east] = Math.min(1, state.crustStress[east]! + amount);
  if (y > 0) {
    const north = (y - 1) * GRID_WIDTH + x;
    state.crustStress[north] = Math.min(1, state.crustStress[north]! + amount);
  }
  if (y < GRID_HEIGHT - 1) {
    const south = (y + 1) * GRID_WIDTH + x;
    state.crustStress[south] = Math.min(1, state.crustStress[south]! + amount);
  }
}
