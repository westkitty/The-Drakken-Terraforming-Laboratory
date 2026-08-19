import type { PlanetState } from '../PlanetState';

export function hashPlanetState(state: PlanetState): string {
  let hash = 2166136261 >>> 0;
  const mix = (value: number) => { hash ^= value >>> 0; hash = Math.imul(hash, 16777619) >>> 0; };
  const mixFloat64 = (value: number) => {
    float64s[0] = value;
    mix(float64Words[0]!);
    mix(float64Words[1]!);
  };

  mix(state.seed);
  mix(state.tick);
  mixFloat64(state.simulationTime);
  mixFloat64(state.totalWater);
  mixFloat64(state.initialWaterMass);
  mixFloat64(state.initialConvertibleMass);
  mixFloat64(state.environmentalResidueMass);

  const arrays = [
    state.elevation, state.crustIntegrity, state.crustStress, state.fractureIntensity, state.exposedMineralMass,
    state.surfaceWaterMass, state.atmosphericWaterMass, state.humidity, state.aerosolDensity, state.temperature,
    state.vegetationMass, state.microbialMass, state.animalMass, state.organicSoilMass, state.populationMass,
    state.infrastructureDensity, state.drakkenInfluence, state.latestDelta
  ];
  for (const array of arrays) {
    const view = new Uint32Array(array.buffer, array.byteOffset, array.byteLength / Uint32Array.BYTES_PER_ELEMENT);
    for (let i = 0; i < view.length; i++) mix(view[i]!);
  }
  for (const array of [state.latestCause, state.latestField, state.materialDestination]) for (let i = 0; i < array.length; i++) mix(array[i]!);
  for (let i = 0; i < state.latestChangeTick.length; i++) mix(state.latestChangeTick[i]!);
  for (const value of Object.values(state.gorevault)) mixFloat64(value);
  for (const value of Object.values(state.orbital)) {
    if (typeof value === 'boolean') mix(Number(value));
    else mixFloat64(value);
  }
  return hash.toString(16).padStart(8, '0');
}

const float64Buffer = new ArrayBuffer(Float64Array.BYTES_PER_ELEMENT);
const float64s = new Float64Array(float64Buffer);
const float64Words = new Uint32Array(float64Buffer);
