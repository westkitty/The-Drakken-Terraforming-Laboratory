import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  CELESTIAL_PICK_RADIUS_COARSE_PX,
  CELESTIAL_PICK_RADIUS_FINE_PX,
  celestialPickRadiusPx,
  celestialRayIsFrontmost,
  selectCelestialFallback,
  type CelestialPickCandidate
} from '../render/celestialPick';

function candidate(partial: Partial<CelestialPickCandidate> & Pick<CelestialPickCandidate, 'id'>): CelestialPickCandidate {
  return {
    screenX: 200,
    screenY: 200,
    depth: 10,
    frontmost: true,
    inFrontOfCamera: true,
    inViewport: true,
    ...partial
  };
}

describe('celestial screen-space pick fallback', () => {
  it('selects an on-screen visible body inside the pixel tolerance', () => {
    const id = selectCelestialFallback(210, 204, [candidate({ id: 'outer-1' })], CELESTIAL_PICK_RADIUS_FINE_PX);
    expect(id).toBe('outer-1');
  });

  it('rejects the same body when it is occluded or not frontmost', () => {
    const hidden = candidate({ id: 'outer-1', frontmost: false });
    expect(selectCelestialFallback(200, 200, [hidden], CELESTIAL_PICK_RADIUS_FINE_PX)).toBeNull();
  });

  it('rejects a body outside the pixel tolerance', () => {
    const id = selectCelestialFallback(200 + CELESTIAL_PICK_RADIUS_FINE_PX + 1, 200, [candidate({ id: 'outer-1' })], CELESTIAL_PICK_RADIUS_FINE_PX);
    expect(id).toBeNull();
  });

  it('prefers the nearer frontmost body when hit areas overlap', () => {
    const id = selectCelestialFallback(200, 200, [
      candidate({ id: 'outer-1', depth: 18, screenX: 204 }),
      candidate({ id: 'primary-moon', depth: 9, screenX: 196 })
    ], CELESTIAL_PICK_RADIUS_FINE_PX);
    expect(id).toBe('primary-moon');
  });

  it('uses screen-space distance when depths match', () => {
    const id = selectCelestialFallback(200, 200, [
      candidate({ id: 'outer-1', depth: 12, screenX: 210 }),
      candidate({ id: 'outer-2', depth: 12, screenX: 203 })
    ], CELESTIAL_PICK_RADIUS_FINE_PX);
    expect(id).toBe('outer-2');
  });

  it('keeps coarse-pointer tolerance larger than fine-pointer tolerance', () => {
    expect(celestialPickRadiusPx(true)).toBe(CELESTIAL_PICK_RADIUS_COARSE_PX);
    expect(celestialPickRadiusPx(false)).toBe(CELESTIAL_PICK_RADIUS_FINE_PX);
    expect(CELESTIAL_PICK_RADIUS_COARSE_PX).toBeGreaterThan(CELESTIAL_PICK_RADIUS_FINE_PX);
    const body = candidate({ id: 'outer-1', screenX: 200 + 20 });
    expect(selectCelestialFallback(200, 200, [body], CELESTIAL_PICK_RADIUS_FINE_PX)).toBeNull();
    expect(selectCelestialFallback(200, 200, [body], CELESTIAL_PICK_RADIUS_COARSE_PX)).toBe('outer-1');
  });
});

describe('celestial ray occlusion', () => {
  it('does not award a body whose ray hits the primary planet first', () => {
    const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12));
    planet.position.set(0, 0, 0);
    const hidden = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6));
    hidden.position.set(0, 0, -5);
    hidden.userData.celestialId = 'outer-1';
    const origin = new THREE.Vector3(0, 0, 8);
    const target = hidden.position.clone();
    const raycaster = new THREE.Raycaster();
    raycaster.set(origin, target.clone().sub(origin).normalize());
    const hits = raycaster.intersectObjects([planet, hidden], true);
    const resolveId = (object: unknown): string | null => {
      let current = object as THREE.Object3D | null;
      while (current) {
        const id = current.userData.celestialId;
        if (typeof id === 'string') return id;
        current = current.parent;
      }
      return null;
    };
    expect(hits[0]?.object).toBe(planet);
    expect(celestialRayIsFrontmost(hits, 'outer-1', origin.distanceTo(hidden.position), 0.2, resolveId)).toBe(false);
  });
});
