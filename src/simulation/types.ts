export const GRID_WIDTH = 128;
export const GRID_HEIGHT = 64;
export const CELL_COUNT = GRID_WIDTH * GRID_HEIGHT;
export const EPSILON = 1e-5;
export const SNAPSHOT_INTERVAL = 25;
export const MAX_SNAPSHOTS = 64;

export type ProcessId = 'fault-tongue' | 'cloudmaw' | 'gorevault' | 'ringthroat';
export type LayerId = 'normal' | 'crust' | 'hydrology' | 'atmosphere' | 'biosphere' | 'feedstock' | 'drakken' | 'provenance' | 'comparison';
export type ProvenanceField = 0 | 1 | 2 | 3 | 4 | 5; // none, crust, water, biosphere, material, orbit
export type MaterialDestination = 0 | 1 | 2; // none, Gorevault, Ringthroat/orbit

export interface ProcessInstance {
  id: string;
  processId: ProcessId;
  deploymentTick: number;
  lat: number;
  lon: number;
  radius: number;
  intensity: number;
  active: boolean;
  cells: Uint32Array;
  weights: Float32Array;
}

export interface ProcessAction {
  kind: 'deploy' | 'toggle';
  tick: number;
  branchId: string;
  processId?: ProcessId;
  instanceId: string;
  lat?: number;
  lon?: number;
  radius?: number;
  intensity?: number;
  active?: boolean;
}

export interface GorevaultInventory {
  collectedOrganics: number;
  oils: number;
  ash: number;
  mineralResidue: number;
  organicSlurry: number;
  stabilizedMaterial: number;
  refinedFeedstock: number;
  totalHarvested: number;
}

export interface OrbitalInventory {
  queuedForLift: number;
  risingMaterial: number;
  orbitalLooseMaterial: number;
  shapedBandMaterial: number;
  totalAccepted: number;
  bandCoverage: number;
  bandIntegrity: number;
  continuity: number;
  closed: boolean;
}

export interface TimelineEvent { tick: number; branchId: string; type: string; message: string; }
export interface BranchRecord { id: string; parentId: string | null; forkTick: number; actions: ProcessAction[]; }
export interface PlanetSnapshot { tick: number; branchId: string; state: PlanetStateData; hash: string; }

export interface PlanetStateData {
  seed: number;
  branchId: string;
  tick: number;
  simulationTime: number;
  elevation: Float32Array;
  crustIntegrity: Float32Array;
  crustStress: Float32Array;
  fractureIntensity: Float32Array;
  exposedMineralMass: Float32Array;
  surfaceWaterMass: Float32Array;
  atmosphericWaterMass: Float32Array;
  humidity: Float32Array;
  aerosolDensity: Float32Array;
  temperature: Float32Array;
  vegetationMass: Float32Array;
  microbialMass: Float32Array;
  animalMass: Float32Array;
  organicSoilMass: Float32Array;
  populationMass: Float32Array;
  infrastructureDensity: Float32Array;
  drakkenInfluence: Float32Array;
  latestCause: Uint8Array;
  latestChangeTick: Uint32Array;
  latestField: Uint8Array;
  latestDelta: Float32Array;
  materialDestination: Uint8Array;
  gorevault: GorevaultInventory;
  orbital: OrbitalInventory;
  totalWater: number;
  initialConvertibleMass: number;
}
