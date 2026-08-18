import type { PlanetState } from '../PlanetState';
import type { LayerId } from '../types';

export function layerValue(state: PlanetState, index: number, layer: LayerId): [number, number, number] {
  if (layer === 'crust') return heat(1 - state.crustIntegrity[index]! + state.fractureIntensity[index]! * 0.6);
  if (layer === 'hydrology') return [0.05, 0.25 + Math.min(0.65, state.surfaceWaterMass[index]!), 0.65 + Math.min(0.35, state.humidity[index]! * 0.3)];
  if (layer === 'atmosphere') return heat(Math.min(1, state.humidity[index]! * 0.55 + state.aerosolDensity[index]! * 0.8));
  if (layer === 'biosphere') return [0.08, Math.min(0.85, 0.15 + state.vegetationMass[index]! * 1.4), 0.18];
  if (layer === 'feedstock') return heat(Math.min(1, state.drakkenInfluence[index]! * 0.5 + (state.populationMass[index]! + state.vegetationMass[index]!) * 0.9));
  if (layer === 'drakken') return heat(state.drakkenInfluence[index]!);
  if (layer === 'provenance') return causeColor(state.latestCause[index]!);
  const water = state.surfaceWaterMass[index]! > 0.18;
  if (water) return [0.035, 0.18 + Math.min(0.28, state.surfaceWaterMass[index]! * 0.18), 0.38 + Math.min(0.32, state.surfaceWaterMass[index]! * 0.18)];
  const vegetation = Math.min(1, state.vegetationMass[index]! * 2.4);
  const fracture = state.fractureIntensity[index]!;
  const drakken = state.drakkenInfluence[index]!;
  return [0.18 + drakken * 0.38 + fracture * 0.16, 0.20 + vegetation * 0.42 - drakken * 0.12, 0.16 + vegetation * 0.12];
}

function heat(value: number): [number, number, number] { const x = Math.max(0, Math.min(1, value)); return [0.12 + x * 0.64, 0.16 + (1 - x) * 0.28, 0.22 + (1 - x) * 0.36]; }
function causeColor(cause: number): [number, number, number] { return cause === 1 ? [0.65,0.23,0.18] : cause === 2 ? [0.10,0.46,0.76] : cause === 3 ? [0.56,0.08,0.14] : cause === 4 ? [0.86,0.16,0.24] : cause === 5 ? [0.58,0.52,0.30] : [0.18,0.24,0.28]; }
