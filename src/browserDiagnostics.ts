import * as THREE from 'three';
import type { LaboratoryRenderer } from './render/LaboratoryRenderer';
import type { SimulationEngine } from './simulation/SimulationEngine';
import type { LayerId } from './simulation/types';
import type { LaboratoryApp } from './ui/LaboratoryApp';

export interface BrowserDiagnostics {
  seed: number;
  tick: number;
  branchId: string;
  stateHash: string;
  playing: boolean;
  speed: number;
  fps: number;
  simStepMs: number;
  activeProcesses: number;
  processCount: number;
  selectedCell: number;
  layer: LayerId;
  frameTimesMs: number[];
  renderer: {
    contextLost: boolean;
    pixelRatio: number;
    canvas: { width: number; height: number };
    render: { calls: number; triangles: number; points: number; lines: number };
    memory: { geometries: number; textures: number };
    scene: { objects: number; meshes: number; uniqueGeometries: number; uniqueMaterials: number };
    controlsDampingEnabled: boolean;
    gpuRenderer: string;
    gpuVendor: string;
    starfield: { bands: number; vertices: number };
  };
}

interface AppInternals {
  engine: SimulationEngine;
  renderer: LaboratoryRenderer;
  playing: boolean;
  speed: number;
  fps: number;
  simStepMs: number;
  selectedCell: number;
  currentLayer: LayerId;
}

interface RendererInternals {
  scene: THREE.Scene;
  contextLost: boolean;
}

declare global {
  interface Window {
    __DRAKKEN_LAB_DIAGNOSTICS__?: () => BrowserDiagnostics;
    __DRAKKEN_FRAME_TIMES__?: number[];
  }
}

export function installBrowserDiagnostics(app: LaboratoryApp): () => void {
  const internals = app as unknown as AppInternals;
  window.__DRAKKEN_LAB_DIAGNOSTICS__ = () => {
    const engine = internals.engine;
    const laboratoryRenderer = internals.renderer;
    const rendererInternals = laboratoryRenderer as unknown as RendererInternals;
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    let objects = 0;
    let meshes = 0;
    rendererInternals.scene.traverse(object => {
      objects++;
      const renderable = object as THREE.Mesh;
      const geometry = renderable.geometry;
      if (geometry instanceof THREE.BufferGeometry) { geometries.add(geometry); meshes++; }
      const material = renderable.material;
      if (Array.isArray(material)) for (const item of material) materials.add(item);
      else if (material instanceof THREE.Material) materials.add(material);
    });
    const processes = [...engine.processes.values()];
    const gl = laboratoryRenderer.renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const gpuRenderer = debugInfo ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : 'unavailable';
    const gpuVendor = debugInfo ? String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)) : 'unavailable';
    return {
      seed: engine.state.seed,
      tick: engine.state.tick,
      branchId: engine.state.branchId,
      stateHash: engine.hash(),
      playing: internals.playing,
      speed: internals.speed,
      fps: internals.fps,
      simStepMs: internals.simStepMs,
      activeProcesses: processes.filter(process => process.active).length,
      processCount: processes.length,
      selectedCell: internals.selectedCell,
      layer: internals.currentLayer,
      frameTimesMs: [...(window.__DRAKKEN_FRAME_TIMES__ ?? [])],
      renderer: {
        contextLost: rendererInternals.contextLost,
        pixelRatio: laboratoryRenderer.renderer.getPixelRatio(),
        canvas: { width: laboratoryRenderer.renderer.domElement.width, height: laboratoryRenderer.renderer.domElement.height },
        render: {
          calls: laboratoryRenderer.renderer.info.render.calls,
          triangles: laboratoryRenderer.renderer.info.render.triangles,
          points: laboratoryRenderer.renderer.info.render.points,
          lines: laboratoryRenderer.renderer.info.render.lines
        },
        memory: {
          geometries: laboratoryRenderer.renderer.info.memory.geometries,
          textures: laboratoryRenderer.renderer.info.memory.textures
        },
        scene: { objects, meshes, uniqueGeometries: geometries.size, uniqueMaterials: materials.size },
        controlsDampingEnabled: laboratoryRenderer.controls.enableDamping,
        gpuRenderer,
        gpuVendor,
        starfield: laboratoryRenderer.starfieldSnapshot()
      }
    };
  };
  return () => { delete window.__DRAKKEN_LAB_DIAGNOSTICS__; };
}
