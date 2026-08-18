import type { PlanetState } from '../PlanetState';
import { EPSILON, type ProcessInstance } from '../types';
import { CAUSE, markCell } from './ProcessRuntime';

export const REQUIRED_BAND_MASS = 280;

export function applyRingthroat(state: PlanetState, tick: number, process: ProcessInstance): void {
  const orbital = state.orbital;
  const gorevault = state.gorevault;
  const accept = Math.min(gorevault.refinedFeedstock, 0.05 * process.intensity);
  gorevault.refinedFeedstock -= accept;
  orbital.queuedForLift += accept;
  orbital.totalAccepted += accept;

  const lift = Math.min(orbital.queuedForLift, 0.036 * process.intensity);
  orbital.queuedForLift -= lift; orbital.risingMaterial += lift;
  const orbit = Math.min(orbital.risingMaterial, 0.028 * process.intensity);
  orbital.risingMaterial -= orbit; orbital.orbitalLooseMaterial += orbit;
  const shape = Math.min(orbital.orbitalLooseMaterial, 0.020 * process.intensity);
  orbital.orbitalLooseMaterial -= shape; orbital.shapedBandMaterial += shape;

  orbital.bandCoverage = Math.min(1, orbital.shapedBandMaterial / REQUIRED_BAND_MASS);
  orbital.continuity = Math.min(1, orbital.shapedBandMaterial / (REQUIRED_BAND_MASS * 0.92));
  orbital.bandIntegrity = Math.min(1, orbital.bandIntegrity + shape / REQUIRED_BAND_MASS * 0.7);
  orbital.closed = orbital.bandCoverage >= 0.995 && orbital.continuity >= 0.995 && orbital.bandIntegrity >= 0.82;

  if (accept > EPSILON || orbital.risingMaterial > EPSILON) {
    for (let k = 0; k < process.cells.length; k++) {
      const i = process.cells[k]!;
      state.drakkenInfluence[i] = Math.max(state.drakkenInfluence[i]!, process.weights[k]! * process.intensity);
      markCell(state, tick, i, CAUSE.ring, 5, accept, 2);
    }
  }
}
