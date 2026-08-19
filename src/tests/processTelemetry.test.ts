import { describe, expect, it } from 'vitest';
import { processStatus } from '../ui/processTelemetry';

describe('process telemetry', () => {
  it('reports Ringthroat as starved when only completed shaped-band material remains', () => {
    expect(processStatus('ringthroat', true, 0, 0)).toBe('STARVED');
  });

  it('keeps Ringthroat active while feedstock or in-flight material can still move', () => {
    expect(processStatus('ringthroat', true, 0.1, 0)).toBe('ACTIVE');
    expect(processStatus('ringthroat', true, 0, 0.1)).toBe('ACTIVE');
  });

  it('reports disabled processes as inactive', () => {
    expect(processStatus('ringthroat', false, 10, 10)).toBe('INACTIVE');
    expect(processStatus('fault-tongue', false, 0, 0)).toBe('INACTIVE');
  });
});
