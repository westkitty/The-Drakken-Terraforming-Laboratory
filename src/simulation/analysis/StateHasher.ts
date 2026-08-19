import type { PlanetState } from '../PlanetState';

export function hashPlanetState(state: PlanetState): string {
  let hash = 2166136261 >>> 0;
  const mix = (value: number) => { hash ^= value >>> 0; hash = Math.imul(hash, 16777619) >>> 0; };
  mix(state.seed); mix(state.tick); mix(floatBits(state.simulationTime)); mix(floatBits(state.totalWater)); mix(floatBits(state.initialWaterMass)); mix(floatBits(state.initialConvertibleMass)); mix(floatBits(state.environmentalResidueMass));
  const arrays = [
    state.elevation, state.crustIntegrity, state.crustStress, state.fractureIntensity, state.exposedMineralMass,
    state.surfaceWaterMass, state.atmosphericWaterMass, state.humidity, state.aerosolDensity, state.temperature,
    state.vegetationMass, state.microbialMass, state.animalMass, state.organicSoilMass, state.populationMass,
    state.infrastructureDensity, state.drakkenInfluence, state.latestDelta
  ];
  for (const array of arrays) {
    const view = new Uint32Array(array.buffer, array.byteOffset, array.length);
    for (let i = 0; i < view.length; i++) mix(view[i]!);
  }
  for (const array of [state.latestCause, state.latestField, state.materialDestination]) for (let i = 0; i < array.length; i++) mix(array[i]!);
  for (let i = 0; i < state.latestChangeTick.length; i++) mix(state.latestChangeTick[i]!);
  for (const value of Object.values(state.gorevault)) mix(floatBits(value));
  for (const value of Object.values(state.orbital)) mix(typeof value === 'boolean' ? Number(value) : floatBits(value));
  return hash.toString(16).padStart(8, '0');
}

const buffer = new ArrayBuffer(4);
const floats = new Float32Array(buffer);
const uints = new Uint32Array(buffer);
function floatBits(value: number): number { floats[0] = value; return uints[0]!; }
