import * as THREE from 'three';
import { CAMERA_HOME, STARFIELD_MIN_RADIUS } from './celestialSystem';
import { SeededRandom, hashSeed } from '../simulation/SeededRandom';

export interface StarBand {
  name: 'near' | 'mid' | 'far';
  count: number;
  radiusMin: number;
  radiusMax: number;
  size: number;
  brightnessMin: number;
  brightnessMax: number;
}

export const STARFIELD_BANDS: readonly StarBand[] = [
  { name: 'near', count: 180, radiusMin: STARFIELD_MIN_RADIUS, radiusMax: STARFIELD_MIN_RADIUS + 90, size: 1.12, brightnessMin: 0.70, brightnessMax: 0.94 },
  { name: 'mid', count: 1100, radiusMin: STARFIELD_MIN_RADIUS + 160, radiusMax: STARFIELD_MIN_RADIUS + 340, size: 0.68, brightnessMin: 0.38, brightnessMax: 0.68 },
  { name: 'far', count: 3200, radiusMin: STARFIELD_MIN_RADIUS + 440, radiusMax: STARFIELD_MIN_RADIUS + 800, size: 0.80, brightnessMin: 0.16, brightnessMax: 0.40 }
];

export class Starfield {
  readonly group = new THREE.Group();
  private readonly points: THREE.Points[] = [];
  private readonly nearAnchor = new THREE.Vector3();
  private readonly farAnchor = new THREE.Vector3();

  constructor(seed: number) {
    this.group.name = 'starfield';
    this.rebuild(seed);
  }

  rebuild(seed: number): void {
    this.disposeContents();
    let nearPositions: THREE.BufferAttribute | null = null;
    let farPositions: THREE.BufferAttribute | null = null;
    for (const [index, band] of STARFIELD_BANDS.entries()) {
      const rng = new SeededRandom(hashSeed(seed, 0x5154, index + 1));
      const object = createBand(band, rng);
      this.points.push(object);
      this.group.add(object);
      const position = object.geometry.getAttribute('position');
      if (band.name === 'near' && position) nearPositions = position as THREE.BufferAttribute;
      if (band.name === 'far' && position) farPositions = position as THREE.BufferAttribute;
    }
    if (nearPositions && farPositions) {
      const pair = selectAlignedAnchors(nearPositions, farPositions);
      this.nearAnchor.copy(pair.near);
      this.farAnchor.copy(pair.far);
    }
  }

  anchors(): { near: { x: number; y: number; z: number }; far: { x: number; y: number; z: number } } {
    return {
      near: { x: this.nearAnchor.x, y: this.nearAnchor.y, z: this.nearAnchor.z },
      far: { x: this.farAnchor.x, y: this.farAnchor.y, z: this.farAnchor.z }
    };
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
    depthWrite: true,
    depthTest: true
  });
  const points = new THREE.Points(geometry, material);
  points.name = `starfield-${band.name}`;
  points.frustumCulled = false;
  return points;
}

function selectAlignedAnchors(
  nearPositions: THREE.BufferAttribute,
  farPositions: THREE.BufferAttribute
): { near: THREE.Vector3; far: THREE.Vector3 } {
  const preferred = new THREE.Vector3(-CAMERA_HOME.x, -CAMERA_HOME.y, -CAMERA_HOME.z).normalize();
  const nearRank: { index: number; preference: number }[] = [];
  for (let i = 0; i < nearPositions.count; i++) {
    const nx = nearPositions.getX(i);
    const ny = nearPositions.getY(i);
    const nz = nearPositions.getZ(i);
    const nLen = Math.hypot(nx, ny, nz);
    if (nLen === 0) continue;
    const preference = (nx * preferred.x + ny * preferred.y + nz * preferred.z) / nLen;
    if (preference > 0.2) nearRank.push({ index: i, preference });
  }
  nearRank.sort((a, b) => b.preference - a.preference);
  const candidates = nearRank.slice(0, 4);

  let bestNear = candidates[0]?.index ?? 0;
  let bestFar = 0;
  let bestAlignment = Number.NEGATIVE_INFINITY;
  for (const candidate of candidates) {
    const nx = nearPositions.getX(candidate.index);
    const ny = nearPositions.getY(candidate.index);
    const nz = nearPositions.getZ(candidate.index);
    const nLen = Math.hypot(nx, ny, nz);
    for (let j = 0; j < farPositions.count; j++) {
      const fx = farPositions.getX(j);
      const fy = farPositions.getY(j);
      const fz = farPositions.getZ(j);
      const fLen = Math.hypot(fx, fy, fz);
      if (fLen === 0) continue;
      const alignment = (nx * fx + ny * fy + nz * fz) / (nLen * fLen);
      if (alignment > bestAlignment) {
        bestAlignment = alignment;
        bestNear = candidate.index;
        bestFar = j;
      }
    }
  }

  return {
    near: new THREE.Vector3(nearPositions.getX(bestNear), nearPositions.getY(bestNear), nearPositions.getZ(bestNear)),
    far: new THREE.Vector3(farPositions.getX(bestFar), farPositions.getY(bestFar), farPositions.getZ(bestFar))
  };
}
