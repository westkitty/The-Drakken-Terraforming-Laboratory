import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { Starfield } from '../render/Starfield';

describe('starfield', () => {
  it('builds the same world-space points for the same seed', () => {
    const a = new Starfield(19870615);
    const b = new Starfield(19870615);
    expect(snapshot(a)).toEqual(snapshot(b));
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

  it('keeps stars in multiple actual depth bands outside the planet', () => {
    const field = new Starfield(4102);
    expect(field.bandCount()).toBe(3);
    expect(field.vertexCount()).toBeGreaterThan(4000);
    const radii = radiiOf(field);
    expect(Math.min(...radii)).toBeGreaterThan(5.4);
    expect(Math.max(...radii)).toBeGreaterThan(100);
    const near = radii.filter(radius => radius < 18).length;
    const mid = radii.filter(radius => radius >= 18 && radius < 60).length;
    const far = radii.filter(radius => radius >= 60).length;
    expect(near).toBeGreaterThan(50);
    expect(mid).toBeGreaterThan(near);
    expect(far).toBeGreaterThan(mid);
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
