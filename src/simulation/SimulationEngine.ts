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
import { CELL_COUNT, GRID_HEIGHT, GRID_WIDTH, SNAPSHOT_INTERVAL, type BranchRecord, type LayerId, type ProcessAction, type ProcessId, type ProcessInstance, type TimelineEvent } from './types';

export interface Metrics {
  oceanCoverage: number;
  biosphereRemaining: number;
  averageCrustIntegrity: number;
  populationRemaining: number;
  refinedFeedstock: number;
  orbitalMaterial: number;
  bandCoverage: number;
  waterMass: number;
  waterDrift: number;
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
  private recordReplayEvents = false;

  constructor(seed = 19870615) {
    this.seed = seed >>> 0;
    this.state = generatePlanet(this.seed);
    this.branches.set('A', { id: 'A', parentId: null, forkTick: 0, inheritedActions: [], actions: [] });
    this.snapshot();
  }

  deploy(processId: ProcessId, lat: number, lon: number, radius = 18, intensity = 0.65): string {
    const safeLat = clamp(finiteOr(lat, 0), -90, 90);
    const safeLon = normalizeLongitude(finiteOr(lon, 0));
    const safeRadius = clamp(finiteOr(radius, 18), 4, 40);
    const safeIntensity = clamp(finiteOr(intensity, 0.65), 0, 1);
    const id = `${processId}-${this.state.tick}-${this.actionSequence++}`;
    const action: ProcessAction = { kind: 'deploy', tick: this.state.tick, branchId: this.state.branchId, processId, instanceId: id, lat: safeLat, lon: safeLon, radius: safeRadius, intensity: safeIntensity };
    this.recordAction(action);
    this.applyAction(action);
    this.events.push({ tick: this.state.tick, branchId: this.state.branchId, type: 'PROCESS DEPLOYED', message: `${DRAKKEN_PROCESS_REGISTRY[processId].displayName} deployed` });
    return id;
  }

  setProcessActive(instanceId: string, active: boolean): void {
    if (!this.processes.has(instanceId)) throw new Error(`Unknown process instance ${instanceId}`);
    const action: ProcessAction = { kind: 'toggle', tick: this.state.tick, branchId: this.state.branchId, instanceId, active };
    this.recordAction(action);
    this.applyAction(action);
  }

  step(count = 1): void {
    const steps = Math.max(0, Math.floor(finiteOr(count, 0)));
    for (let n = 0; n < steps; n++) {
      this.applyProcesses('physical');
      updateEnvironment(this.state, this.state.tick);
      this.applyProcesses('gorevault');
      this.applyProcesses('ringthroat');
      this.constrain();
      this.state.tick++;
      this.state.simulationTime += 1;
      this.state.totalWater = totalModeledWater(this.state);
      if (!this.replaying || this.recordReplayEvents) this.generateThresholdEvents();
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
    const waterMass = totalModeledWater(this.state);
    return {
      oceanCoverage: ocean / CELL_COUNT,
      biosphereRemaining: biosphere,
      averageCrustIntegrity: crust / CELL_COUNT,
      populationRemaining: population,
      refinedFeedstock: this.state.gorevault.refinedFeedstock,
      orbitalMaterial: orbital.queuedForLift + orbital.risingMaterial + orbital.orbitalLooseMaterial + orbital.shapedBandMaterial,
      bandCoverage: orbital.bandCoverage,
      waterMass,
      waterDrift: waterMass - this.state.initialWaterMass,
      convertibleRemaining: totalConvertibleMass(this.state)
    };
  }

  ledger(): MaterialLedgerSnapshot { return materialLedger(this.state); }
  hash(): string { return hashPlanetState(this.state); }
  snapshotCount(branchId = this.state.branchId): number { return this.snapshots.count(branchId); }
  layerValue(index: number, layer: LayerId): [number, number, number] { return readLayerValue(this.state, index, layer); }

  restore(targetTick: number, branchId = this.state.branchId, recordDerivedEvents = true): void {
    if (!this.branches.has(branchId)) throw new Error(`Unknown branch ${branchId}`);
    const target = Math.max(0, Math.floor(targetTick));
    const actions = this.actionsForBranch(branchId);
    const nearest = this.snapshots.nearest(branchId, target);
    this.processes.clear();
    this.replaying = true;
    this.recordReplayEvents = recordDerivedEvents;
    try {
      let cursor = 0;
      if (nearest) {
        while (cursor < actions.length && actions[cursor]!.tick <= nearest.tick) this.applyAction(actions[cursor++]!);
        this.state = nearest.state.clone();
        this.state.branchId = branchId;
      } else {
        this.state = generatePlanet(this.seed);
        this.state.branchId = branchId;
      }
      while (this.state.tick < target) {
        while (cursor < actions.length && actions[cursor]!.tick === this.state.tick) this.applyAction(actions[cursor++]!);
        this.step(1);
      }
      while (cursor < actions.length && actions[cursor]!.tick === this.state.tick) this.applyAction(actions[cursor++]!);
    } finally {
      this.replaying = false;
      this.recordReplayEvents = false;
    }
  }

  captureState(branchId: string, tick: number): PlanetState {
    const originalBranch = this.state.branchId;
    const originalTick = this.state.tick;
    this.restore(tick, branchId, false);
    const captured = this.state.clone();
    this.restore(originalTick, originalBranch, false);
    return captured;
  }

  fork(newId: string, forkTick = this.state.tick): void {
    if (this.branches.has(newId)) throw new Error(`Branch ${newId} already exists`);
    const parentId = this.state.branchId;
    const targetTick = Math.min(this.state.tick, Math.max(0, Math.floor(finiteOr(forkTick, this.state.tick))));
    this.restore(targetTick, parentId);
    const inheritedActions = this.actionsForBranch(parentId).filter(action => action.tick <= targetTick).map(action => ({ ...action }));
    const inheritedEvents = this.timelineEvents(parentId, targetTick).map(event => ({ ...event, branchId: newId }));
    this.branches.set(newId, { id: newId, parentId, forkTick: targetTick, inheritedActions, actions: [] });
    this.state.branchId = newId;
    this.events.push(...inheritedEvents);
    this.events.push({ tick: targetTick, branchId: newId, type: 'BRANCH CREATED', message: `Branch ${newId} forked from ${parentId}` });
    this.snapshot();
  }

  switchBranch(branchId: string, tick = this.state.tick): void {
    if (!this.branches.has(branchId)) throw new Error(`Unknown branch ${branchId}`);
    this.restore(tick, branchId);
  }

  compare(branchA: string, branchB: string, tick: number): { a: Metrics; b: Metrics; delta: Metrics } {
    const originalBranch = this.state.branchId;
    const originalTick = this.state.tick;
    this.restore(tick, branchA, false); const a = this.metrics();
    this.restore(tick, branchB, false); const b = this.metrics();
    const delta = Object.fromEntries(Object.keys(a).map(key => [key, b[key as keyof Metrics] - a[key as keyof Metrics]])) as unknown as Metrics;
    this.restore(originalTick, originalBranch, false);
    return { a, b, delta };
  }

  timelineEvents(branchId = this.state.branchId, throughTick = this.state.tick): TimelineEvent[] {
    return this.events.filter(event => event.branchId === branchId && event.tick <= throughTick).map(event => ({ ...event }));
  }

  editableFromTick(branchId = this.state.branchId): number {
    const branch = this.branches.get(branchId);
    if (!branch) throw new Error(`Unknown branch ${branchId}`);
    let floor = branch.parentId ? branch.forkTick : 0;
    for (const child of this.branches.values()) if (child.parentId === branchId) floor = Math.max(floor, child.forkTick);
    return floor;
  }

  canMutateAt(tick = this.state.tick, branchId = this.state.branchId): boolean {
    return tick >= this.editableFromTick(branchId);
  }

  selectedCell(index: number): Record<string, number | string> {
    const safeIndex = Math.max(0, Math.min(CELL_COUNT - 1, Math.floor(finiteOr(index, 0))));
    const causeNames = ['none', 'Fault-Tongue', 'Cloudmaw', 'Gorevault', 'Ringthroat', 'environmental consequence'];
    return {
      elevation: this.state.elevation[safeIndex]!, water: this.state.surfaceWaterMass[safeIndex]!, humidity: this.state.humidity[safeIndex]!,
      crustIntegrity: this.state.crustIntegrity[safeIndex]!, crustStress: this.state.crustStress[safeIndex]!, fracture: this.state.fractureIntensity[safeIndex]!,
      vegetation: this.state.vegetationMass[safeIndex]!, microbes: this.state.microbialMass[safeIndex]!, animals: this.state.animalMass[safeIndex]!, soil: this.state.organicSoilMass[safeIndex]!,
      population: this.state.populationMass[safeIndex]!, infrastructure: this.state.infrastructureDensity[safeIndex]!, drakkenInfluence: this.state.drakkenInfluence[safeIndex]!,
      cause: causeNames[this.state.latestCause[safeIndex]!] ?? 'unknown', causeTick: this.state.latestChangeTick[safeIndex]!,
      changedField: provenanceFieldName(this.state.latestField[safeIndex]!), latestDelta: this.state.latestDelta[safeIndex]!,
      materialDestination: destinationName(this.state.materialDestination[safeIndex]!)
    };
  }

  private recordAction(action: ProcessAction): void {
    const branch = this.branches.get(this.state.branchId);
    if (!branch) throw new Error(`Unknown branch ${this.state.branchId}`);
    const editableFrom = this.editableFromTick(branch.id);
    if (action.tick < editableFrom) throw new Error(`Branch ${branch.id} history is frozen before tick ${editableFrom}`);
    branch.actions.push({ ...action });
    this.snapshots.truncateAfter(branch.id, action.tick);
    for (let i = this.events.length - 1; i >= 0; i--) {
      const event = this.events[i]!;
      if (event.branchId === branch.id && event.tick > action.tick && isDerivedTimelineEvent(event.type)) this.events.splice(i, 1);
    }
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
    return [...branch.inheritedActions, ...branch.actions].map(action => ({ ...action })).sort(actionSort);
  }

  private generateThresholdEvents(): void {
    if (this.state.orbital.closed && !this.events.some(event => event.branchId === this.state.branchId && event.type === 'ORBITAL BAND CLOSED')) {
      this.events.push({ tick: this.state.tick, branchId: this.state.branchId, type: 'ORBITAL BAND CLOSED', message: 'Blood Ring structural continuity reached' });
    }
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
  }
}

function actionSort(a: ProcessAction, b: ProcessAction): number {
  return a.tick - b.tick || a.instanceId.localeCompare(b.instanceId) || (a.kind === b.kind ? 0 : a.kind === 'deploy' ? -1 : 1);
}
function clamp01(value: number): number { return clamp(value, 0, 1); }
function clamp(value: number, min: number, max: number): number { return Math.max(min, Math.min(max, value)); }
function finiteOr(value: number, fallback: number): number { return Number.isFinite(value) ? value : fallback; }
function normalizeLongitude(value: number): number { return ((value + 180) % 360 + 360) % 360 - 180; }
function provenanceFieldName(value: number): string { return ['none','crust','water','biosphere','material','orbit'][value] ?? 'unknown'; }
function destinationName(value: number): string { return ['none','Gorevault processing','Ringthroat / orbital construction'][value] ?? 'unknown'; }
function isDerivedTimelineEvent(type: string): boolean { return type.startsWith('OCEAN COVERAGE ') || type.startsWith('ORBITAL BAND '); }
export { hashPlanetState } from './analysis/StateHasher';
