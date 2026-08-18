import type { PlanetState } from '../PlanetState';
import { CELL_COUNT, EPSILON, type ProcessInstance } from '../types';
import { CAUSE, markCell } from './ProcessRuntime';

export function applyCloudmaw(state: PlanetState, tick: number, process: ProcessInstance): void {
  let desired = 0;
  for (let k = 0; k < process.cells.length; k++) desired += process.weights[k]! * process.intensity * 0.0014;

  let donorTotal = 0;
  for (let i = 0; i < CELL_COUNT; i++) donorTotal += Math.max(0, state.surfaceWaterMass[i]! - 0.18);
  const requestedTransfer = Math.min(desired, donorTotal * 0.03);
  if (requestedTransfer <= EPSILON || donorTotal <= EPSILON) return;

  let removed = 0;
  for (let i = 0; i < CELL_COUNT; i++) {
    const available = Math.max(0, state.surfaceWaterMass[i]! - 0.18);
    if (available <= 0) continue;
    const before = state.surfaceWaterMass[i]!;
    const take = requestedTransfer * (available / donorTotal);
    state.surfaceWaterMass[i] = before - Math.min(available, take);
    removed += before - state.surfaceWaterMass[i]!;
  }

  let weightTotal = 0;
  for (let k = 0; k < process.weights.length; k++) weightTotal += process.weights[k]!;
  if (weightTotal <= EPSILON) return;
  for (let k = 0; k < process.cells.length; k++) {
    const i = process.cells[k]!;
    const share = removed * process.weights[k]! / weightTotal;
    state.surfaceWaterMass[i] = state.surfaceWaterMass[i]! + share;
    state.humidity[i] = Math.min(1, state.humidity[i]! + share * 0.12);
    state.drakkenInfluence[i] = Math.max(state.drakkenInfluence[i]!, process.weights[k]! * process.intensity);
    markCell(state, tick, i, CAUSE.cloud, 2, share);
  }
}
