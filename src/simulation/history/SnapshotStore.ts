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
    list.push({ tick: state.tick, branchId: state.branchId, state: state.clone(), hash });
    while (list.length > MAX_SNAPSHOTS) list.shift();
    this.snapshots.set(state.branchId, list);
  }

  nearest(branchId: string, targetTick: number): StoredSnapshot | null {
    const candidates = (this.snapshots.get(branchId) ?? []).filter(snapshot => snapshot.tick <= targetTick);
    return candidates.length ? candidates[candidates.length - 1]! : null;
  }

  count(branchId: string): number { return (this.snapshots.get(branchId) ?? []).length; }
}
