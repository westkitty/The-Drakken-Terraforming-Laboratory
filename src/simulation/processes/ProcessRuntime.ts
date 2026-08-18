import type { PlanetState } from '../PlanetState';

export const CAUSE = { none: 0, fault: 1, cloud: 2, gore: 3, ring: 4, environment: 5 } as const;

export function markCell(state: PlanetState, tick: number, index: number, cause: number, field = 0, delta = 0, destination = 0): void {
  state.latestCause[index] = cause;
  state.latestChangeTick[index] = tick;
  state.latestField[index] = field;
  state.latestDelta[index] = delta;
  state.materialDestination[index] = destination;
}
