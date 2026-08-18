import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GRID_HEIGHT, GRID_WIDTH, type LayerId } from '../simulation/types';
import type { PlanetState } from '../simulation/PlanetState';
import type { SimulationEngine } from '../simulation/SimulationEngine';

export class LaboratoryRenderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  readonly controls: OrbitControls;
  private readonly scene = new THREE.Scene();
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly geometry: THREE.SphereGeometry;
  private readonly material: THREE.MeshStandardMaterial;
  private readonly mesh: THREE.Mesh;
  private readonly atmosphere: THREE.Mesh;
  private readonly ringGroup = new THREE.Group();
  private readonly basePositions: Float32Array;
  private layer: LayerId = 'normal';
  private dirty = true;
  private selectedIndex = -1;
  private comparisonState: PlanetState | null = null;
  onCellPick?: (index: number, lat: number, lon: number) => void;
  onCellHover?: (index: number, lat: number, lon: number) => void;

  constructor(private readonly container: HTMLElement, private readonly engine: SimulationEngine) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.append(this.renderer.domElement);
    this.camera.position.set(0, 0.4, 3.1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false; this.controls.minDistance = 1.65; this.controls.maxDistance = 5.4; this.controls.enableDamping = true;
    this.scene.background = new THREE.Color(0x06090d);
    this.scene.add(new THREE.HemisphereLight(0xbddcff, 0x100d12, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(3, 2, 4); this.scene.add(key);
    this.geometry = new THREE.SphereGeometry(1, GRID_WIDTH, GRID_HEIGHT - 1);
    this.basePositions = new Float32Array(this.geometry.attributes.position!.array as Float32Array);
    const colors = new Float32Array(this.geometry.attributes.position!.count * 3); this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0.03 });
    this.mesh = new THREE.Mesh(this.geometry, this.material); this.scene.add(this.mesh);
    this.atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.025, 64, 32), new THREE.MeshBasicMaterial({ color: 0x74a8cc, transparent: true, opacity: 0.08, side: THREE.BackSide, depthWrite: false })); this.scene.add(this.atmosphere);
    this.scene.add(this.ringGroup);
    this.renderer.domElement.addEventListener('click', e => this.pick(e, false));
    this.renderer.domElement.addEventListener('pointermove', e => this.pick(e, true));
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  setLayer(layer: LayerId): void { this.layer = layer; this.dirty = true; }
  markDirty(): void { this.dirty = true; }
  resetCamera(): void { this.camera.position.set(0, 0.4, 3.1); this.controls.target.set(0,0,0); this.controls.update(); }
  setSelected(index: number): void { this.selectedIndex = index; this.dirty = true; }
  setComparisonState(state: PlanetState | null): void { this.comparisonState = state; this.dirty = true; }

  render(): void {
    if (this.dirty) { this.updatePlanet(); this.updateAtmosphere(); this.updateRing(); this.dirty = false; }
    this.controls.update(); this.renderer.render(this.scene, this.camera);
  }

  private updatePlanet(): void {
    const pos = this.geometry.attributes.position as THREE.BufferAttribute;
    const color = this.geometry.attributes.color as THREE.BufferAttribute;
    const uv = this.geometry.attributes.uv as THREE.BufferAttribute;
    for (let v = 0; v < pos.count; v++) {
      const u = uv.getX(v); const vv = uv.getY(v);
      const x = Math.min(GRID_WIDTH - 1, Math.floor(u * GRID_WIDTH)); const y = Math.min(GRID_HEIGHT - 1, Math.floor(vv * GRID_HEIGHT)); const i = y * GRID_WIDTH + x;
      const elevation = this.engine.state.elevation[i]!;
      const scale = 1 + Math.max(-0.02, Math.min(0.035, elevation * 0.025));
      pos.setXYZ(v, this.basePositions[v*3]! * scale, this.basePositions[v*3+1]! * scale, this.basePositions[v*3+2]! * scale);
      const [r,g,b] = this.layer === 'comparison' && this.comparisonState ? comparisonColor(this.engine.state, this.comparisonState, i) : this.engine.layerValue(i, this.layer); const selected = i === this.selectedIndex ? 0.25 : 0;
      color.setXYZ(v, Math.min(1,r+selected), Math.min(1,g+selected), Math.min(1,b+selected));
    }
    pos.needsUpdate = true; color.needsUpdate = true; this.geometry.computeVertexNormals();
  }

  private updateAtmosphere(): void {
    let humidity = 0, aerosol = 0;
    for (let i = 0; i < this.engine.state.humidity.length; i += 8) { humidity += this.engine.state.humidity[i]!; aerosol += this.engine.state.aerosolDensity[i]!; }
    const count = this.engine.state.humidity.length / 8;
    const mat = this.atmosphere.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.min(0.24, 0.035 + humidity / count * 0.08 + aerosol / count * 0.12);
    mat.color.setRGB(0.25 + aerosol/count*0.35, 0.48 + humidity/count*0.25, 0.66 + humidity/count*0.18);
  }

  private updateRing(): void {
    disposeGroup(this.ringGroup);
    this.ringGroup.clear();
    const o = this.engine.state.orbital; if (o.shapedBandMaterial <= 0.001) return;
    const segments = 96; const covered = Math.max(1, Math.floor(segments * o.bandCoverage));
    const positions: number[] = [];
    for (let s = 0; s < covered; s++) {
      const a0 = (s / segments) * Math.PI * 2; const a1 = ((s + 0.82) / segments) * Math.PI * 2;
      const jitter0 = 0.018 * Math.sin(s * 12.9898 + this.engine.seed * 0.001); const jitter1 = 0.018 * Math.sin((s+1) * 12.9898 + this.engine.seed * 0.001);
      const r0 = 1.34 + jitter0; const r1 = 1.34 + jitter1; const w = 0.015 + o.bandIntegrity * 0.035;
      positions.push(Math.cos(a0)*(r0-w),0,Math.sin(a0)*(r0-w), Math.cos(a0)*(r0+w),0,Math.sin(a0)*(r0+w), Math.cos(a1)*(r1+w),0,Math.sin(a1)*(r1+w));
      positions.push(Math.cos(a0)*(r0-w),0,Math.sin(a0)*(r0-w), Math.cos(a1)*(r1+w),0,Math.sin(a1)*(r1+w), Math.cos(a1)*(r1-w),0,Math.sin(a1)*(r1-w));
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ color: 0x8e1730, emissive: 0x22030a, transparent: true, opacity: 0.68, roughness: 0.34, metalness: 0.18, side: THREE.DoubleSide });
    const band = new THREE.Mesh(geo, mat); band.rotation.x = 0.18; band.rotation.z = -0.11; this.ringGroup.add(band);
    const activeRing = [...this.engine.processes.values()].find(p => p.active && p.processId === 'ringthroat');
    if (activeRing && o.risingMaterial > 0.001) {
      const lat = activeRing.lat * Math.PI/180; const lon = activeRing.lon * Math.PI/180;
      const p0 = new THREE.Vector3(Math.cos(lat)*Math.cos(lon), Math.sin(lat), Math.cos(lat)*Math.sin(lon)).multiplyScalar(1.01);
      const p1 = p0.clone().multiplyScalar(1.35); const curve = new THREE.LineCurve3(p0,p1); const tube = new THREE.TubeGeometry(curve, 8, 0.006, 5, false);
      this.ringGroup.add(new THREE.Mesh(tube, new THREE.MeshBasicMaterial({ color: 0xb32b46, transparent:true, opacity:0.62 })));
    }
  }

  private pick(event: PointerEvent | MouseEvent, hover: boolean): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((event.clientX-rect.left)/rect.width)*2-1, -((event.clientY-rect.top)/rect.height)*2+1);
    this.raycaster.setFromCamera(this.pointer,this.camera); const hit = this.raycaster.intersectObject(this.mesh)[0]; if (!hit?.uv) return;
    const x = Math.min(GRID_WIDTH-1,Math.floor(hit.uv.x*GRID_WIDTH)); const y = Math.min(GRID_HEIGHT-1,Math.floor(hit.uv.y*GRID_HEIGHT)); const i=y*GRID_WIDTH+x;
    const lat = hit.uv.y*180-90; const lon=hit.uv.x*360-180;
    if (hover) this.onCellHover?.(i,lat,lon); else this.onCellPick?.(i,lat,lon);
  }

  private resize = (): void => { const w=this.container.clientWidth||640,h=this.container.clientHeight||480; this.renderer.setSize(w,h,false); this.camera.aspect=w/h; this.camera.updateProjectionMatrix(); };

  dispose(): void {
    window.removeEventListener('resize', this.resize); this.controls.dispose(); this.geometry.dispose(); this.material.dispose();
    (this.atmosphere.geometry as THREE.BufferGeometry).dispose(); (this.atmosphere.material as THREE.Material).dispose();
    disposeGroup(this.ringGroup);
    this.renderer.dispose(); this.renderer.domElement.remove();
  }
}

function comparisonColor(a: PlanetState, b: PlanetState, i: number): [number, number, number] {
  const water = Math.abs(a.surfaceWaterMass[i]! - b.surfaceWaterMass[i]!) * 1.8;
  const crust = Math.abs(a.crustIntegrity[i]! - b.crustIntegrity[i]!) * 1.5;
  const bioA = a.vegetationMass[i]! + a.animalMass[i]! + a.microbialMass[i]!;
  const bioB = b.vegetationMass[i]! + b.animalMass[i]! + b.microbialMass[i]!;
  const bio = Math.abs(bioA - bioB) * 1.4;
  const delta = Math.min(1, water + crust + bio);
  if (delta < 0.015) return [0.10, 0.16, 0.19];
  const moreTransformed = (a.crustIntegrity[i]! + bioA) < (b.crustIntegrity[i]! + bioB);
  return moreTransformed ? [0.30 + delta * 0.58, 0.08 + delta * 0.08, 0.12 + delta * 0.10] : [0.08, 0.24 + delta * 0.35, 0.36 + delta * 0.48];
}

function disposeGroup(group: THREE.Group): void {
  group.traverse(o => {
    if (!(o instanceof THREE.Mesh)) return;
    o.geometry.dispose();
    if (Array.isArray(o.material)) o.material.forEach(m => m.dispose()); else o.material.dispose();
  });
}
