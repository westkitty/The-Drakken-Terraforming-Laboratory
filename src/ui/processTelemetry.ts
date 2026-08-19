import type { ProcessId } from '../simulation/types';

export function processStatus(processId: ProcessId, active: boolean, refinedFeedstock: number, inFlightMaterial: number): 'INACTIVE' | 'STARVED' | 'ACTIVE' {
  if (!active) return 'INACTIVE';
  if (processId === 'ringthroat' && refinedFeedstock <= 1e-5 && inFlightMaterial <= 1e-5) return 'STARVED';
  return 'ACTIVE';
}
