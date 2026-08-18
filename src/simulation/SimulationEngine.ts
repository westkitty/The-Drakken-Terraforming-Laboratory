import { PlanetState, totalConvertibleMass, totalModeledWater } from './PlanetState';
import { materialLedger, type MaterialLedgerSnapshot } from './MaterialLedger';
import { generatePlanet } from './PlanetGenerator';
import { hashPlanetState } from './analysis/StateHasher';
import { layerValue as readLayerValue } from './analysis/VisualLayers';
import { updateEnvironment } from './environment/EnvironmentSystem';
import { SnapshotStore } from './history/SnapshotStore';
import { DRAKKEN_PROCESS_REGISTRY } from './processRegistry';
import { applyCloudmaw } from './processes/CloudmawProcess';
import { applyFaultTongue } from './processes/FaultTongueProcess';
import { applyGorevault } from './processes/GorevaultProcess';
import { applyRingthroat } from './processes/RingthroatProcess';
import { buildKernel } from './processes/spatialKernel';
import { CELL_COUNT, SNAPSHOT_INTERVAL, type BranchRecord, type LayerId, type ProcessAction, type ProcessId, type ProcessInstance, type TimelineEvent } from './types';

export interface Metrics {
  oceanCoverage: number;
  biosphereRemaining: number;
  averageCrustIntegrity: number;
  populationRemaining: number;
  refinedFeedstock: number;
  orbitalMaterial: number;
  bandCoverage: number;
  waterMass: number;
  convertibleRemaining: number;
}

export class SimulationEngine {
  state: PlanetState;
  readonly seed: number;
  readonly processes = new Map<string, ProcessInstance>();
  readonly branches = new Map<string, BranchRecord>();
  readonly events: TimelineEvent[] = [];
  private readonly snapshots = new SnapshotStore();
  private actionSequence = 0;
  private replaying = false;

  constructor(seed = 19870615) {
    this.seed = seed >>> 0;
    this.state = generatePlanet(this.seed);
    this.branches.set('A', { id: 'A', parentId: null, forkTick: 0, actions: [] });
    this.snapshot();
  }

  deploy(processId: ProcessId, lat: number, lon: number, radius = 18, intensity = 0.65): string {
    const id = `${processId}-${this.state.tick}-${this.actionSequence++}`;
    const action: ProcessAction = { kind: 'deploy', tick: this.state.tick, branchId: this.state.branchId, processId, instanceId: id, lat, lon, radius, intensity };
    this.recordAction(action);
    this.applyAction(action);
    this.events.push({ tick: this.state.tick, branchId: this.state.branchId, type: 'PROCESS DEPLOYED', message: `${DRAKKEN_PROCESS_REGISTRY[processId].displayName} deployed` });
    return id;
  }

  setProcessActive(instanceId: string, active: boolean): void {
    const action: ProcessAction = { kind: 'toggle', tick: this.state.tick, branchId: this.state.branchId, instanceId, active };
    this.recordAction(action);
    this.applyAction(action);
  }

  step(count = 1): void {
    for (let n = 0; n < count; n++) {
      this.applyProcesses('physical');
      updateEnvironment(this.state, this.state.tick);
      this.applyProcesses('gorevault');
      this.applyProcesses('ringthroat');
      this.constrain();
      this.state.tick++;
      this.state.simulationTime += 1;
      this.state.totalWater = totalModeledWater(this.state);
      if (!this.replaying) this.generateThresholdEvents();
      if (!this.replaying && this.state.tick % SNAPSHOT_INTERVAL === 0) this.snapshot();
    }
  }

  metrics(): Metrics {
    let ocean = 0, biosphere = 0, crust = 0, population = 0;
    for (let i = 0; i < CELL_COUNT; i++) {
      if (this.state.surfaceWaterMass[i]! > 0.18) ocean++;
      biosphere += this.state.vegetationMass[i]! + this.state.microbialMass[i]! + this.state.animalMass[i]!;
      crust += this.state.crustIntegrity[i]!;
      population += this.state.populationMass[i]!;
    }
    const orbital = this.state.orbital;
    return {
      oceanCoverage: ocean / CELL_COUNT,
      biosphereRemaining: biosphere,
      averageCrustIntegrity: crust / CELL_COUNT,
      populationRemaining: population,
      refinedFeedstock: this.state.gorevault.refinedFeedstock,
      orbitalMaterial: orbital.queuedForLift + orbital.risingMaterial + orbital.orbitalLooseMaterial + orbital.shapedBandMaterial,
      bandCoverage: orbital.bandCoverage,
      waterMass: totalModeledWater(this.state),
      convertibleRemaining: totalConvertibleMass(this.state)
    };
  }

  ledger(): MaterialLedgerSnapshot { return materialLedger(this.state); }
  hash(): string { return hashPlanetState(this.state); }
  snapshotCount(branchId = this.state.branchId): number { return this.snapshots.count(branchId); }
  layerValue(index: number, layer: LayerId): [number, number, number] { return readLayerValue(this.state, index, layer); }

  restore(targetTick: number, branchId = this.state.branchId): void {
    if (!this.branches.has(branchId)) throw new Error(`Unknown branch ${branchId}`);
    const target = Math.max(0, Math.floor(targetTick));
    const actions = this.actionsForBranch(branchId);
    const nearest = this.snapshots.nearest(branchId, target);
    this.processes.clear();
    this.replaying = true;
    try {
      if (nearest) {
        for (const action of actions) if (action.tick <= nearest.tick) this.applyAction(action);
        this.state = nearest.state.clone();
        this.state.branchId = branchId;
      } else {
        this.state = generatePlanet(this.seed);
        this.state.branchId = branchId;
      }
      const startTick = this.state.tick;
      let cursor = 0;
      while (cursor < actions.length && actions[cursor]!.tick <= startTick) cursor++;
      while (this.state.tick < target) {
        while (cursor < actions.length && actions[cursor]!.tick === this.state.tick) this.applyAction(actions[cursor++]!);
        this.step(1);
      }
      while (cursor < actions.length && actions[cursor]!.tick === this.state.tick) this.applyAction(actions[cursor++]!);
    } finally {
      this.replaying = false;
    }
  }

  captureState(branchId: string, tick: number): PlanetState {
    const originalBranch = this.state.branchId;
    const originalTick = this.state.tick;
    this.restore(tick, branchId);
    const captured = this.state.clone();
    this.restore(originalTick, originalBranch);
    return captured;
  }

  fork(newId: string, forkTick = this.state.tick): void {
    if (this.branches.has(newId)) throw new Error(`Branch ${newId} already exists`);
    const parentId = this.state.branchId;
    this.restore(forkTick, parentId);
    this.branches.set(newId, { id: newId, parentId, forkTick, actions: [] });
    this.state.branchId = newId;
    this.events.push({ tick: forkTick, branchId: newId, type: 'BRANCH CREATED', message: `Branch ${newId} forked from ${parentId}` });
    this.snapshot();
  }

  switchBranch(branchId: string, tick = this.state.tick): void {
    if (!this.branches.has(branchId)) throw new Error(`Unknown branch ${branchId}`);
    this.restore(tick, branchId);
  }

  compare(branchA: string, branchB: string, tick: number): { a: Metrics; b: Metrics; delta: Metrics } {
    const originalBranch = this.state.branchId;
    const originalTick = this.state.tick;
    this.restore(tick, branchA); const a = this.metrics();
    this.restore(tick, branchB); const b = this.metrics();
    const delta = Object.fromEntries(Object.keys(a).map(key => [key, b[key as keyof Metrics] - a[key as keyof Metrics]])) as unknown as Metrics;
    this.restore(originalTick, originalBranch);
    return { a, b, delta };
  }

  selectedCell(index: number): Record<string, number | string> {
    const causeNames = ['none', 'Fault-Tongue', 'Cloudmaw', 'Gorevault', 'Ringthroat', 'environmental consequence'];
    return {
      elevation: this.state.elevation[index]!, water: this.state.surfaceWaterMass[index]!, humidity: this.state.humidity[index]!,
      crustIntegrity: this.state.crustIntegrity[index]!, crustStress: this.state.crustStress[index]!, fracture: this.state.fractureIntensity[index]!,
      vegetation: this.state.vegetationMass[index]!, microbes: this.state.microbialMass[index]!, animals: this.state.animalMass[index]!, soil: this.state.organicSoilMass[index]!,
      population: this.state.populationMass[index]!, infrastructure: this.state.infrastructureDensity[index]!, drakkenInfluence: this.state.drakkenInfluence[index]!,
      cause: causeNames[this.state.latestCause[index]!] ?? 'unknown', causeTick: this.state.latestChangeTick[index]!,
      changedField: provenanceFieldName(this.state.latestField[index]!), latestDelta: this.state.latestDelta[index]!,
      materialDestination: destinationName(this.state.materialDestination[index]!)
    };
  }

  private recordAction(action: ProcessAction): void {
    const branch = this.branches.get(this.state.branchId);
    if (!branch) throw new Error(`Unknown branch ${this.state.branchId}`);
    branch.actions.push({ ...action });
  }

  private applyAction(action: ProcessAction): void {
    if (action.kind === 'toggle') {
      const instance = this.processes.get(action.instanceId);
      if (instance) instance.active = action.active ?? true;
      return;
    }
    if (!action.processId) throw new Error('Deploy action missing processId');
    const { cells, weights } = buildKernel(action.lat ?? 0, action.lon ?? 0, action.radius ?? 18);
    this.processes.set(action.instanceId, {
      id: action.instanceId, processId: action.processId, deploymentTick: action.tick,
      lat: action.lat ?? 0, lon: action.lon ?? 0, radius: action.radius ?? 18,
      intensity: action.intensity ?? 0.65, active: true, cells, weights
    });
  }

  private applyProcesses(phase: 'physical' | 'gorevault' | 'ringthroat'): void {
    const order: ProcessId[] = phase === 'physical' ? ['fault-tongue', 'cloudmaw'] : phase === 'gorevault' ? ['gorevault'] : ['ringthroat'];
    for (const processId of order) {
      const instances = [...this.processes.values()].filter(p => p.active && p.processId === processId).sort((a, b) => a.id.localeCompare(b.id));
      for (const process of instances) {
        if (processId === 'fault-tongue') applyFaultTongue(this.state, this.seed, this.state.tick, process);
        else if (processId === 'cloudmaw') applyCloudmaw(this.state, this.state.tick, process);
        else if (processId === 'gorevault') applyGorevault(this.state, this.state.tick, process);
        else applyRingthroat(this.state, this.state.tick, process);
      }
    }
  }

  private constrain(): void {
    for (let i = 0; i < CELL_COUNT; i++) {
      this.state.crustIntegrity[i] = clamp01(this.state.crustIntegrity[i]!);
      this.state.crustStress[i] = clamp01(this.state.crustStress[i]!);
      this.state.fractureIntensity[i] = clamp01(this.state.fractureIntensity[i]!);
      this.state.humidity[i] = clamp01(this.state.humidity[i]!);
      this.state.aerosolDensity[i] = clamp01(this.state.aerosolDensity[i]!);
      this.state.drakkenInfluence[i] = clamp01(this.state.drakkenInfluence[i]! * 0.9995);
    }
  }

  private snapshot(): void { this.snapshots.record(this.state, this.hash()); }

  private actionsForBranch(branchId: string): ProcessAction[] {
    const branch = this.branches.get(branchId);
    if (!branch) return [];
    const own = branch.actions.map(action => ({ ...action }));
    if (!branch.parentId) return own.sort(actionSort);
    const inherited = this.actionsForBranch(branch.parentId).filter(action => action.tick <= branch.forkTick);
    return [...inherited, ...own].sort(actionSort);
  }

  private generateThresholdEvents(): void {
    if (this.state.tick % 25 !== 0) return;
    const metrics = this.metrics();
    const milestones: Array<[number, string, 'ocean' | 'band']> = [
      [0.25, 'OCEAN COVERAGE 25%', 'ocean'], [0.5, 'OCEAN COVERAGE 50%', 'ocean'],
      [0.25, 'ORBITAL BAND 25%', 'band'], [0.5, 'ORBITAL BAND 50%', 'band'], [0.75, 'ORBITAL BAND 75%', 'band']
    ];
    for (const [threshold, label, kind] of milestones) {
      const value = kind === 'ocean' ? metrics.oceanCoverage : metrics.bandCoverage;
      const already = this.events.some(event => event.branchId === this.state.branchId && event.type === label);
      if (value >= threshold && !already) this.events.push({ tick: this.state.tick, branchId: this.state.branchId, type: label, message: label });
    }
    if (this.state.orbital.closed && !this.events.some(event => event.branchId === this.state.branchId && event.type === 'ORBITAL BAND CLOSED')) {
      this.events.push({ tick: this.state.tick, branchId: this.state.branchId, type: 'ORBITAL BAND CLOSED', message: 'Blood Ring structural continuity reached' });
    }
  }
}

function actionSort(a: ProcessAction, b: ProcessAction): number { return a.tick - b.tick || a.instanceId.localeCompare(b.instanceId); }
function clamp01(value: number): number { return Math.max(0, Math.min(1, value)); }
function provenanceFieldName(value: number): string { return ['none','crust','water','biosphere','material','orbit'][value] ?? 'unknown'; }
function destinationName(value: number): string { return ['none','Gorevault processing','Ringthroat / orbital construction'][value] ?? 'unknown'; }
export { hashPlanetState } from './analysis/StateHasher';
