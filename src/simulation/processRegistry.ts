import type { ProcessId } from './types';

export interface ProcessDefinition {
  id: ProcessId;
  displayName: string;
  phase: 'physical' | 'gorevault' | 'ringthroat';
  canonFunction: string;
  labModel: string;
  prerequisite: string;
  defaultRadius: number;
  defaultIntensity: number;
}

export const DRAKKEN_PROCESS_REGISTRY: Record<ProcessId, ProcessDefinition> = {
  'fault-tongue': {
    id: 'fault-tongue', displayName: 'Fault-Tongue', phase: 'physical', defaultRadius: 18, defaultIntensity: 0.65,
    canonFunction: 'Catastrophic structural splitting and geological fracture.',
    labModel: 'Deterministic stress accumulation, integrity loss, fault propagation, elevation displacement, exposed minerals, and aerosols.',
    prerequisite: 'None.'
  },
  cloudmaw: {
    id: 'cloudmaw', displayName: 'Cloudmaw', phase: 'physical', defaultRadius: 22, defaultIntensity: 0.65,
    canonFunction: 'Radical planetary hydrology manipulation, including raising oceans over inhabited regions.',
    labModel: 'Conservative redistribution of existing surface water plus atmosphere/surface exchange. No water is created.',
    prerequisite: 'Existing modeled water mass.'
  },
  gorevault: {
    id: 'gorevault', displayName: 'Gorevault', phase: 'gorevault', defaultRadius: 14, defaultIntensity: 0.7,
    canonFunction: 'Collection, rendering, separation, refinement, storage, and conversion of conquered planetary matter into usable Drakken feedstock.',
    labModel: 'Harvests only existing biological/population source pools and moves mass through explicit processing inventories.',
    prerequisite: 'Harvestable planetary matter in affected cells.'
  },
  ringthroat: {
    id: 'ringthroat', displayName: 'Ringthroat', phase: 'ringthroat', defaultRadius: 12, defaultIntensity: 0.7,
    canonFunction: 'Lift, extrusion, pressure, orbital transport, stream alignment, orbital shaping, and early Blood Ring construction.',
    labModel: 'Consumes refined Gorevault feedstock through queued, rising, orbital-loose, and shaped-band stages. Completion requires mass and continuity.',
    prerequisite: 'Refined Gorevault feedstock.'
  }
};

export const PROCESS_ORDER: ProcessId[] = ['fault-tongue', 'cloudmaw', 'gorevault', 'ringthroat'];
