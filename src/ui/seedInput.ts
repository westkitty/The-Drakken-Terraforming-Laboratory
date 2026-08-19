export const DEFAULT_PLANET_SEED = 19870615;

export function parsePlanetSeed(value: string, fallback = DEFAULT_PLANET_SEED): number {
  const trimmed = value.trim();
  if (trimmed === '') return fallback >>> 0;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return fallback >>> 0;
  return Math.trunc(parsed) >>> 0;
}
