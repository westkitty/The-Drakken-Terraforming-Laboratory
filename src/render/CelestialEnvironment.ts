import * as THREE from 'three';
import {
  defineCelestialSystem,
  poseAtTick,
  type CelestialBodyDefinition,
  type CelestialKind,
  type CelestialPose
} from './celestialSystem';

export class CelestialEnvironment {
  readonly group = new THREE.Group();
  readonly definitions: readonly CelestialBodyDefinition[];
  private readonly meshes = new Map<string, THREE.Mesh>();
  private readonly glow = new Map<string, THREE.Mesh>();
  private readonly marker: THREE.Mesh;
  private selectedId: string | null = null;
  private tick = 0;

  constructor(seed: number) {
    this.group.name = 'celestial-environment';
    this.definitions = defineCelestialSystem(seed);
    for (const definition of this.definitions) {
      if (definition.kind === 'planet') continue;
      const mesh = createBodyMesh(definition);
      this.meshes.set(definition.id, mesh);
      this.group.add(mesh);
      if (definition.kind === 'star') {
        const halo = createStarHalo(definition.radius);
        this.glow.set(definition.id, halo);
        this.group.add(halo);
      }
    }
    this.marker = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 12),
      new THREE.MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.22, depthWrite: false, wireframe: true })
    );
    this.marker.visible = false;
    this.marker.renderOrder = 6;
    this.group.add(this.marker);
    this.setTick(0);
  }

  setTick(tick: number): void {
    this.tick = tick;
    for (const definition of this.definitions) {
      const mesh = this.meshes.get(definition.id);
      if (!mesh) continue;
      const pose = poseAtTick(definition, tick);
      mesh.position.set(pose.x, pose.y, pose.z);
      const halo = this.glow.get(definition.id);
      if (halo) halo.position.copy(mesh.position);
    }
    this.syncMarker();
  }

  pickables(): THREE.Object3D[] {
    return [...this.meshes.values()];
  }

  bodyIdFromObject(object: THREE.Object3D | null): string | null {
    let current: THREE.Object3D | null = object;
    while (current) {
      const id = current.userData.celestialId;
      if (typeof id === 'string') return id;
      current = current.parent;
    }
    return null;
  }

  pose(id: string, tick = this.tick): CelestialPose | null {
    const definition = this.definitions.find(item => item.id === id);
    return definition ? poseAtTick(definition, tick) : null;
  }

  setSelected(id: string | null): void {
    this.selectedId = id && id !== 'primary' ? id : null;
    this.syncMarker();
  }

  snapshot(tick = this.tick): {
    star: CelestialPose | null;
    moon: CelestialPose | null;
    minors: CelestialPose[];
    selectedId: string | null;
  } {
    const poses = this.definitions.map(definition => poseAtTick(definition, tick));
    return {
      star: poses.find(item => item.kind === 'star') ?? null,
      moon: poses.find(item => item.kind === 'moon') ?? null,
      minors: poses.filter(item => item.kind === 'minor'),
      selectedId: this.selectedId
    };
  }

  starDirection(): THREE.Vector3 {
    const star = this.pose('system-star');
    if (!star) return new THREE.Vector3(3, 2, 4);
    return new THREE.Vector3(star.x, star.y, star.z);
  }

  dispose(): void {
    this.group.remove(this.marker);
    this.marker.geometry.dispose();
    (this.marker.material as THREE.Material).dispose();
    for (const mesh of [...this.meshes.values(), ...this.glow.values()]) {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      this.group.remove(mesh);
    }
    this.meshes.clear();
    this.glow.clear();
  }

  private syncMarker(): void {
    if (!this.selectedId) { this.marker.visible = false; return; }
    const pose = this.pose(this.selectedId);
    if (!pose) { this.marker.visible = false; return; }
    this.marker.position.set(pose.x, pose.y, pose.z);
    this.marker.scale.setScalar(pose.radius * 1.35);
    this.marker.visible = true;
  }
}

function createBodyMesh(definition: CelestialBodyDefinition): THREE.Mesh {
  const segments = definition.kind === 'star' ? 32 : definition.kind === 'moon' ? 24 : 16;
  const geometry = new THREE.SphereGeometry(definition.radius, segments, Math.max(10, segments / 2));
  const material = definition.kind === 'star'
    ? new THREE.MeshBasicMaterial({ color: definition.color })
    : new THREE.MeshStandardMaterial({
      color: definition.color,
      emissive: definition.emissive,
      roughness: definition.kind === 'moon' ? 0.92 : 0.86,
      metalness: 0.04
    });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = definition.id;
  mesh.userData.celestialId = definition.id;
  if (definition.kind === 'minor') mesh.scale.set(1, 0.82, 0.94);
  return mesh;
}

function createStarHalo(radius: number): THREE.Mesh {
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.55, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xffd7a0, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.BackSide })
  );
  halo.name = 'system-star-halo';
  halo.renderOrder = -1;
  return halo;
}

export type { CelestialKind, CelestialPose };
