import * as THREE from 'three';
import { SeededRandom, hashSeed } from '../simulation/SeededRandom';

interface StarBand {
  name: 'near' | 'mid' | 'far';
  count: number;
  radiusMin: number;
  radiusMax: number;
  size: number;
  brightnessMin: number;
  brightnessMax: number;
}

const BANDS: readonly StarBand[] = [
  { name: 'near', count: 180, radiusMin: 7.2, radiusMax: 15.5, size: 0.072, brightnessMin: 0.70, brightnessMax: 0.94 },
  { name: 'mid', count: 1100, radiusMin: 22, radiusMax: 54, size: 0.048, brightnessMin: 0.40, brightnessMax: 0.70 },
  { name: 'far', count: 3200, radiusMin: 68, radiusMax: 175, size: 0.032, brightnessMin: 0.16, brightnessMax: 0.40 }
];

export class Starfield {
  readonly group = new THREE.Group();
  private readonly points: THREE.Points[] = [];

  constructor(seed: number) {
    this.group.name = 'starfield';
    this.rebuild(seed);
  }

  rebuild(seed: number): void {
    this.disposeContents();
    for (const [index, band] of BANDS.entries()) {
      const rng = new SeededRandom(hashSeed(seed, 0x5154, index + 1));
      const object = createBand(band, rng);
      this.points.push(object);
      this.group.add(object);
    }
  }

  bandCount(): number {
    return this.points.length;
  }

  vertexCount(): number {
    let count = 0;
    for (const object of this.points) {
      count += object.geometry.getAttribute('position')?.count ?? 0;
    }
    return count;
  }

  dispose(): void {
    this.disposeContents();
  }

  private disposeContents(): void {
    for (const object of this.points) {
      object.geometry.dispose();
      (object.material as THREE.Material).dispose();
      this.group.remove(object);
    }
    this.points.length = 0;
  }
}

function createBand(band: StarBand, rng: SeededRandom): THREE.Points {
  const positions = new Float32Array(band.count * 3);
  const colors = new Float32Array(band.count * 3);
  const minCubed = band.radiusMin * band.radiusMin * band.radiusMin;
  const maxCubed = band.radiusMax * band.radiusMax * band.radiusMax;

  for (let i = 0; i < band.count; i++) {
    const theta = rng.next() * Math.PI * 2;
    const phi = Math.acos(rng.range(-1, 1));
    const radius = Math.cbrt(rng.range(minCubed, maxCubed));
    const sinPhi = Math.sin(phi);
    positions[i * 3] = radius * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * sinPhi * Math.sin(theta);

    const bright = rng.range(band.brightnessMin, band.brightnessMax);
    const cool = rng.range(0, 0.07);
    colors[i * 3] = bright * (0.78 + cool * 0.12);
    colors[i * 3 + 1] = bright * (0.86 + cool * 0.08);
    colors[i * 3 + 2] = bright * (0.94 + cool * 0.06);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: band.size,
    sizeAttenuation: true,
    vertexColors: true,
    depthWrite: false
  });
  const points = new THREE.Points(geometry, material);
  points.name = `starfield-${band.name}`;
  points.frustumCulled = false;
  return points;
}
