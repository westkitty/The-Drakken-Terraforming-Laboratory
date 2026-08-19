import { PlanetState, totalConvertibleMass, totalModeledWater } from './PlanetState';
import { hashSeed } from './SeededRandom';
import { GRID_HEIGHT, GRID_WIDTH } from './types';

function noise(seed: number, x: number, y: number, scale: number): number {
  const sx = Math.floor(x / scale);
  const sy = Math.floor(y / scale);
  const fx = (x / scale) - sx;
  const fy = (y / scale) - sy;
  const sample = (ix: number, iy: number) => hashSeed(seed, ((ix % GRID_WIDTH) + GRID_WIDTH) % GRID_WIDTH, Math.max(0, Math.min(GRID_HEIGHT - 1, iy))) / 0xffffffff;
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const ux = smooth(fx);
  const uy = smooth(fy);
  const a = sample(sx, sy) * (1 - ux) + sample(sx + 1, sy) * ux;
  const b = sample(sx, sy + 1) * (1 - ux) + sample(sx + 1, sy + 1) * ux;
  return a * (1 - uy) + b * uy;
}

export function generatePlanet(seed: number): PlanetState {
  const s = new PlanetState(seed);
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const lat = (y / (GRID_HEIGHT - 1)) * Math.PI - Math.PI / 2;
    for (let x = 0; x < GRID_WIDTH; x++) {
      const i = y * GRID_WIDTH + x;
      const continental = noise(seed, x, y, 22) * 0.7 + noise(seed ^ 0x51f2, x, y, 8) * 0.3;
      const detail = noise(seed ^ 0xa12b, x, y, 3);
      const elevation = (continental - 0.5) * 1.4 + (detail - 0.5) * 0.22;
      const temp = Math.max(0, Math.cos(lat)) * 0.9 - Math.max(0, elevation) * 0.28;
      const humidity = Math.max(0.04, Math.min(1, 0.25 + noise(seed ^ 0x1234, x, y, 10) * 0.65));
      const water = Math.max(0, -elevation * 1.8 + 0.12);
      const habitability = Math.max(0, Math.min(1, (temp + 0.1) * humidity * (water < 0.35 ? 1 : Math.max(0, 1.2 - water))));
      s.elevation[i] = elevation;
      s.crustIntegrity[i] = 0.72 + noise(seed ^ 0x9911, x, y, 12) * 0.28;
      s.crustStress[i] = noise(seed ^ 0x3311, x, y, 16) * 0.18;
      s.fractureIntensity[i] = 0;
      s.exposedMineralMass[i] = Math.max(0, elevation) * 0.12;
      s.surfaceWaterMass[i] = water;
      s.atmosphericWaterMass[i] = 0.03 + humidity * 0.04;
      s.humidity[i] = humidity;
      s.aerosolDensity[i] = 0.02;
      s.temperature[i] = temp;
      s.vegetationMass[i] = habitability * 0.42;
      s.microbialMass[i] = 0.08 + habitability * 0.17;
      s.animalMass[i] = habitability * 0.10;
      s.organicSoilMass[i] = habitability * 0.25;
      s.populationMass[i] = Math.pow(habitability, 3) * 0.08;
      s.infrastructureDensity[i] = Math.min(1, s.populationMass[i]! * 8);
    }
  }
  s.totalWater = totalModeledWater(s);
  s.initialWaterMass = s.totalWater;
  s.initialConvertibleMass = totalConvertibleMass(s);
  return s;
}

export function cellToLatLon(index: number): { lat: number; lon: number } {
  const y = Math.floor(index / GRID_WIDTH);
  const x = index % GRID_WIDTH;
  return { lat: (y / (GRID_HEIGHT - 1)) * 180 - 90, lon: (x / GRID_WIDTH) * 360 - 180 };
}
