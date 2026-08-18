import { totalConvertibleMass } from './PlanetState';
import type { PlanetState } from './PlanetState';

export interface MaterialLedgerSnapshot {
  convertibleRemaining: number;
  harvestedFromPlanet: number;
  gorevaultInternal: number;
  refinedFeedstock: number;
  acceptedByRingthroat: number;
  risingMaterial: number;
  orbitalLooseMaterial: number;
  shapedBandMaterial: number;
  pipelineAccounted: number;
  pipelineError: number;
  environmentalResidueMass: number;
  systemAccounted: number;
  systemError: number;
}

export function materialLedger(state: PlanetState): MaterialLedgerSnapshot {
  const g = state.gorevault;
  const o = state.orbital;
  const gorevaultInternal = g.collectedOrganics + g.oils + g.ash + g.mineralResidue + g.organicSlurry + g.stabilizedMaterial + g.refinedFeedstock;
  const downstream = o.queuedForLift + o.risingMaterial + o.orbitalLooseMaterial + o.shapedBandMaterial;
  const pipelineAccounted = gorevaultInternal + downstream;
  const convertibleRemaining = totalConvertibleMass(state);
  const systemAccounted = convertibleRemaining + state.environmentalResidueMass + pipelineAccounted;
  return {
    convertibleRemaining,
    harvestedFromPlanet: g.totalHarvested,
    gorevaultInternal,
    refinedFeedstock: g.refinedFeedstock,
    acceptedByRingthroat: o.totalAccepted,
    risingMaterial: o.risingMaterial,
    orbitalLooseMaterial: o.orbitalLooseMaterial,
    shapedBandMaterial: o.shapedBandMaterial,
    pipelineAccounted,
    pipelineError: g.totalHarvested - pipelineAccounted,
    environmentalResidueMass: state.environmentalResidueMass,
    systemAccounted,
    systemError: state.initialConvertibleMass - systemAccounted
  };
}
