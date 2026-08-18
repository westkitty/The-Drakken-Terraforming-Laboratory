import { GRID_HEIGHT, GRID_WIDTH } from '../types';

export function buildKernel(lat: number, lon: number, radiusDeg: number): { cells: Uint32Array; weights: Float32Array } {
  const cells: number[] = [];
  const weights: number[] = [];
  const latR = lat * Math.PI / 180;
  const lonR = lon * Math.PI / 180;
  const radiusR = Math.max(1, radiusDeg) * Math.PI / 180;
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const cellLat = ((y / (GRID_HEIGHT - 1)) * 180 - 90) * Math.PI / 180;
    for (let x = 0; x < GRID_WIDTH; x++) {
      const cellLon = ((x / GRID_WIDTH) * 360 - 180) * Math.PI / 180;
      const cosDistance = Math.sin(latR) * Math.sin(cellLat) + Math.cos(latR) * Math.cos(cellLat) * Math.cos(cellLon - lonR);
      const distance = Math.acos(Math.max(-1, Math.min(1, cosDistance)));
      if (distance > radiusR) continue;
      const q = 1 - distance / radiusR;
      cells.push(y * GRID_WIDTH + x);
      weights.push(q * q * (3 - 2 * q));
    }
  }
  return { cells: Uint32Array.from(cells), weights: Float32Array.from(weights) };
}
