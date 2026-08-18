import type { PlanetState } from '../PlanetState';
import { EPSILON, type ProcessInstance } from '../types';
import { CAUSE, markCell } from './ProcessRuntime';

export function applyGorevault(state: PlanetState, tick: number, process: ProcessInstance): void {
  let harvested = 0;
  const target = process.intensity * 0.15;
  for (let k = 0; k < process.cells.length && harvested < target; k++) {
    const i = process.cells[k]!;
    const cap = target * process.weights[k]! / 8;
    let remaining = cap;
    for (const pool of ['populationMass', 'animalMass', 'vegetationMass', 'microbialMass', 'organicSoilMass'] as const) {
      const take = Math.min(state[pool][i]!, remaining);
      state[pool][i] = state[pool][i]! - take;
      harvested += take;
      remaining -= take;
      if (remaining <= EPSILON) break;
    }
    const removed = cap - remaining;
    if (removed > EPSILON) {
      markCell(state, tick, i, CAUSE.gore, 4, removed, 1);
      state.drakkenInfluence[i] = Math.max(state.drakkenInfluence[i]!, process.weights[k]! * process.intensity);
    }
  }
  state.gorevault.collectedOrganics += harvested;
  state.gorevault.totalHarvested += harvested;
  processInventory(state);
}

function processInventory(state: PlanetState): void {
  const g = state.gorevault;
  const render = Math.min(g.collectedOrganics, 0.085);
  g.collectedOrganics -= render;
  g.organicSlurry += render * 0.55;
  g.oils += render * 0.18;
  g.ash += render * 0.12;
  g.mineralResidue += render * 0.15;
  const stabilize = Math.min(g.organicSlurry, 0.050);
  g.organicSlurry -= stabilize;
  g.stabilizedMaterial += stabilize;
  const refine = Math.min(g.stabilizedMaterial, 0.036);
  g.stabilizedMaterial -= refine;
  g.refinedFeedstock += refine;
}
