import { SeededRandom, hashSeed } from '../simulation/SeededRandom';

export const CAMERA_HOME = { x: 0, y: 0.4, z: 3.1 } as const;
export const CAMERA_SYSTEM = { x: 6, y: 4, z: 24 } as const;
export const CAMERA_MIN_DISTANCE = 1.65;
export const CAMERA_MAX_DISTANCE = 48;
export const CAMERA_NEAR = 0.12;
export const CAMERA_FAR = 420;

export type CelestialKind = 'planet' | 'star' | 'moon' | 'minor';

export interface CelestialBodyDefinition {
  id: string;
  name: string;
  kind: CelestialKind;
  radius: number;
  orbitRadius: number;
  inclination: number;
  longitudeOfAscendingNode: number;
  phase0: number;
  periodTicks: number;
  restPosition: { x: number; y: number; z: number };
  color: number;
  emissive: number;
}

export interface CelestialPose {
  id: string;
  name: string;
  kind: CelestialKind;
  radius: number;
  orbitRadius: number;
  phase: number;
  periodTicks: number;
  x: number;
  y: number;
  z: number;
  distanceFromPrimary: number;
}

export function defineCelestialSystem(seed: number): CelestialBodyDefinition[] {
  const rng = new SeededRandom(hashSeed(seed, 0xC3A1, 7));
  const starDistance = rng.range(68, 80);
  const starYaw = rng.range(-2.85, -2.55);
  const starPitch = rng.range(0.12, 0.22);
  const star = {
    x: Math.cos(starPitch) * Math.sin(starYaw) * starDistance,
    y: Math.sin(starPitch) * starDistance,
    z: Math.cos(starPitch) * Math.cos(starYaw) * starDistance
  };

  return [
    {
      id: 'primary', name: 'Primary Planet', kind: 'planet', radius: 1,
      orbitRadius: 0, inclination: 0, longitudeOfAscendingNode: 0, phase0: 0, periodTicks: 0,
      restPosition: { x: 0, y: 0, z: 0 }, color: 0x4a7a94, emissive: 0x000000
    },
    {
      id: 'system-star', name: 'System Star', kind: 'star', radius: 3.15,
      orbitRadius: 0, inclination: 0, longitudeOfAscendingNode: 0, phase0: 0, periodTicks: 0,
      restPosition: star, color: 0xffe2b0, emissive: 0xffd089
    },
    {
      id: 'primary-moon', name: 'Primary Moon', kind: 'moon', radius: 0.27,
      orbitRadius: rng.range(5.05, 5.45), inclination: rng.range(0.12, 0.2),
      longitudeOfAscendingNode: rng.range(0.2, 1.1), phase0: rng.range(0.4, 1.8),
      periodTicks: 360, restPosition: { x: 0, y: 0, z: 0 }, color: 0x9aa7b4, emissive: 0x101418
    },
    {
      id: 'outer-1', name: 'Outer Body 1', kind: 'minor', radius: 0.09,
      orbitRadius: rng.range(9.4, 10.4), inclination: rng.range(-0.18, -0.08),
      longitudeOfAscendingNode: rng.range(1.2, 2.4), phase0: rng.range(2.1, 4.8),
      periodTicks: 920, restPosition: { x: 0, y: 0, z: 0 }, color: 0x6b5344, emissive: 0x080605
    },
    {
      id: 'outer-2', name: 'Outer Body 2', kind: 'minor', radius: 0.07,
      orbitRadius: rng.range(14.6, 16.2), inclination: rng.range(0.28, 0.4),
      longitudeOfAscendingNode: rng.range(3.4, 5.1), phase0: rng.range(0.2, 5.8),
      periodTicks: 1680, restPosition: { x: 0, y: 0, z: 0 }, color: 0x5d6570, emissive: 0x07080a
    }
  ];
}

export function poseAtTick(definition: CelestialBodyDefinition, tick: number): CelestialPose {
  const safeTick = Number.isFinite(tick) ? tick : 0;
  if (definition.periodTicks <= 0) {
    const { x, y, z } = definition.restPosition;
    return pose(definition, 0, x, y, z);
  }
  const phase = definition.phase0 + (safeTick / definition.periodTicks) * Math.PI * 2;
  const c = Math.cos(phase);
  const s = Math.sin(phase);
  const r = definition.orbitRadius;
  const cosI = Math.cos(definition.inclination);
  const sinI = Math.sin(definition.inclination);
  const cosO = Math.cos(definition.longitudeOfAscendingNode);
  const sinO = Math.sin(definition.longitudeOfAscendingNode);
  const xOrb = r * c;
  const zOrb = r * s;
  const yInc = zOrb * sinI;
  const zInc = zOrb * cosI;
  const x = xOrb * cosO - zInc * sinO;
  const z = xOrb * sinO + zInc * cosO;
  return pose(definition, phase, x, yInc, z);
}

export function posesAtTick(definitions: readonly CelestialBodyDefinition[], tick: number): CelestialPose[] {
  return definitions.map(definition => poseAtTick(definition, tick));
}

function pose(definition: CelestialBodyDefinition, phase: number, x: number, y: number, z: number): CelestialPose {
  return {
    id: definition.id,
    name: definition.name,
    kind: definition.kind,
    radius: definition.radius,
    orbitRadius: definition.orbitRadius,
    phase,
    periodTicks: definition.periodTicks,
    x, y, z,
    distanceFromPrimary: Math.hypot(x, y, z)
  };
}
