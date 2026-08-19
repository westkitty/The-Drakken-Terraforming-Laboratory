import type { PlanetState } from '../PlanetState';
import { MAX_SNAPSHOTS } from '../types';

export interface StoredSnapshot {
  tick: number;
  branchId: string;
  state: PlanetState;
  hash: string;
}

export class SnapshotStore {
  private readonly snapshots = new Map<string, StoredSnapshot[]>();

  record(state: PlanetState, hash: string): void {
    const list = this.snapshots.get(state.branchId) ?? [];
    const snapshot = { tick: state.tick, branchId: state.branchId, state: state.clone(), hash };
    const existing = list.findIndex(item => item.tick === state.tick);
    if (existing >= 0) list[existing] = snapshot;
    else list.push(snapshot);
    list.sort((a, b) => a.tick - b.tick);
    while (list.length > MAX_SNAPSHOTS) list.shift();
    this.snapshots.set(state.branchId, list);
  }

  truncateAfter(branchId: string, tick: number): void {
    const list = this.snapshots.get(branchId);
    if (!list) return;
    this.snapshots.set(branchId, list.filter(snapshot => snapshot.tick <= tick));
  }

  nearest(branchId: string, targetTick: number): StoredSnapshot | null {
    const list = this.snapshots.get(branchId) ?? [];
    for (let i = list.length - 1; i >= 0; i--) if (list[i]!.tick <= targetTick) return list[i]!;
    return null;
  }

  count(branchId: string): number { return (this.snapshots.get(branchId) ?? []).length; }
}
