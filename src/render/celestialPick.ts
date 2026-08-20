export const CELESTIAL_PICK_RADIUS_FINE_PX = 16;
export const CELESTIAL_PICK_RADIUS_COARSE_PX = 24;

export function celestialPickRadiusPx(coarsePointer: boolean): number {
  return coarsePointer ? CELESTIAL_PICK_RADIUS_COARSE_PX : CELESTIAL_PICK_RADIUS_FINE_PX;
}

export interface CelestialPickCandidate {
  id: string;
  screenX: number;
  screenY: number;
  depth: number;
  frontmost: boolean;
  inFrontOfCamera: boolean;
  inViewport: boolean;
}

export function selectCelestialFallback(
  pointerX: number,
  pointerY: number,
  candidates: readonly CelestialPickCandidate[],
  hitRadiusPx: number
): string | null {
  let winnerId: string | null = null;
  let winnerDepth = Number.POSITIVE_INFINITY;
  let winnerScreen = Number.POSITIVE_INFINITY;
  for (const candidate of candidates) {
    if (!candidate.inFrontOfCamera || !candidate.inViewport || !candidate.frontmost) continue;
    const screenDist = Math.hypot(candidate.screenX - pointerX, candidate.screenY - pointerY);
    if (screenDist > hitRadiusPx) continue;
    if (candidate.depth < winnerDepth - 1e-6 || (Math.abs(candidate.depth - winnerDepth) <= 1e-6 && screenDist < winnerScreen)) {
      winnerId = candidate.id;
      winnerDepth = candidate.depth;
      winnerScreen = screenDist;
    }
  }
  return winnerId;
}

export function celestialRayIsFrontmost(
  hits: ReadonlyArray<{ object: unknown; distance: number }>,
  bodyId: string,
  bodyDistance: number,
  bodyRadius: number,
  resolveId: (object: unknown) => string | null
): boolean {
  const first = hits[0];
  return Boolean(first && resolveId(first.object) === bodyId && first.distance <= bodyDistance + bodyRadius);
}

export function pointerIsCoarse(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}
