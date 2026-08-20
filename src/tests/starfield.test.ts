import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  INTERACTIVE_SYSTEM_ENVELOPE,
  STARFIELD_ENVELOPE_MARGIN,
  STARFIELD_MIN_RADIUS
} from '../render/celestialSystem';
import { STARFIELD_BANDS, Starfield } from '../render/Starfield';

describe('starfield', () => {
  it('builds the same world-space points for the same seed', () => {
    const a = new Starfield(19870615);
    const b = new Starfield(19870615);
    expect(snapshot(a)).toEqual(snapshot(b));
    expect(a.anchors()).toEqual(b.anchors());
    a.dispose();
    b.dispose();
  });

  it('changes star positions when the seed changes', () => {
    const a = new Starfield(19870615);
    const b = new Starfield(19870616);
    expect(snapshot(a)).not.toEqual(snapshot(b));
    a.dispose();
    b.dispose();
  });

  it('keeps every background star outside the interactive system envelope', () => {
    expect(STARFIELD_MIN_RADIUS).toBe(INTERACTIVE_SYSTEM_ENVELOPE + STARFIELD_ENVELOPE_MARGIN);
    expect(STARFIELD_MIN_RADIUS).toBeGreaterThan(INTERACTIVE_SYSTEM_ENVELOPE);
    expect(STARFIELD_BANDS[0]!.radiusMin).toBe(STARFIELD_MIN_RADIUS);
    expect(STARFIELD_BANDS[0]!.radiusMax).toBeLessThan(STARFIELD_BANDS[1]!.radiusMin);
    expect(STARFIELD_BANDS[1]!.radiusMax).toBeLessThan(STARFIELD_BANDS[2]!.radiusMin);

    const field = new Starfield(4102);
    expect(field.bandCount()).toBe(3);
    expect(field.vertexCount()).toBeGreaterThan(4000);
    const radii = radiiOf(field);
    expect(Math.min(...radii)).toBeGreaterThan(STARFIELD_MIN_RADIUS - 1e-6);
    expect(Math.min(...radii)).toBeGreaterThan(INTERACTIVE_SYSTEM_ENVELOPE);

    const near = radii.filter(radius => radius >= STARFIELD_BANDS[0]!.radiusMin && radius <= STARFIELD_BANDS[0]!.radiusMax).length;
    const mid = radii.filter(radius => radius >= STARFIELD_BANDS[1]!.radiusMin && radius <= STARFIELD_BANDS[1]!.radiusMax).length;
    const far = radii.filter(radius => radius >= STARFIELD_BANDS[2]!.radiusMin && radius <= STARFIELD_BANDS[2]!.radiusMax).length;
    expect(near).toBe(STARFIELD_BANDS[0]!.count);
    expect(mid).toBe(STARFIELD_BANDS[1]!.count);
    expect(far).toBe(STARFIELD_BANDS[2]!.count);
    expect(mid).toBeGreaterThan(near);
    expect(far).toBeGreaterThan(mid);
    field.dispose();
  });

  it('selects a same-direction near/far probe pair from actual star geometry', () => {
    const field = new Starfield(19870615);
    const { near, far } = field.anchors();
    const nearLen = Math.hypot(near.x, near.y, near.z);
    const farLen = Math.hypot(far.x, far.y, far.z);
    expect(nearLen).toBeGreaterThan(STARFIELD_MIN_RADIUS - 1e-6);
    expect(farLen).toBeGreaterThan(nearLen);
    const alignment = (near.x * far.x + near.y * far.y + near.z * far.z) / (nearLen * farLen);
    expect(alignment).toBeGreaterThan(0.995);
    expect(containsVertex(field, near)).toBe(true);
    expect(containsVertex(field, far)).toBe(true);
    field.dispose();
  });
});

function snapshot(field: Starfield): number[] {
  const values: number[] = [];
  field.group.traverse(object => {
    if (!(object instanceof THREE.Points)) return;
    const position = object.geometry.getAttribute('position');
    if (!position) return;
    for (let i = 0; i < position.count; i++) {
      values.push(position.getX(i), position.getY(i), position.getZ(i));
    }
  });
  return values;
}

function radiiOf(field: Starfield): number[] {
  const radii: number[] = [];
  field.group.traverse(object => {
    if (!(object instanceof THREE.Points)) return;
    const position = object.geometry.getAttribute('position');
    if (!position) return;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      radii.push(Math.hypot(x, y, z));
    }
  });
  return radii;
}

function containsVertex(field: Starfield, point: { x: number; y: number; z: number }): boolean {
  let found = false;
  field.group.traverse(object => {
    if (found || !(object instanceof THREE.Points)) return;
    const position = object.geometry.getAttribute('position');
    if (!position) return;
    for (let i = 0; i < position.count; i++) {
      if (
        Math.abs(position.getX(i) - point.x) < 1e-6 &&
        Math.abs(position.getY(i) - point.y) < 1e-6 &&
        Math.abs(position.getZ(i) - point.z) < 1e-6
      ) {
        found = true;
        return;
      }
    }
  });
  return found;
}
