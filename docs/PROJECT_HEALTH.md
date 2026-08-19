# Three.js Project Health

## Current static verdict

**Healthy — 100 / 100 in the repository health scan.** This is a static architecture verdict, not a substitute for browser/runtime proof.

## Protected architecture

- Vanilla TypeScript + Three.js; no React or React Three Fiber ownership layer.
- `PlanetState` and `SimulationEngine` own authoritative planetary truth.
- Three.js renders state and never becomes the source of simulation truth.
- One application-owned `requestAnimationFrame` loop advances rendering and bounded fixed-step simulation.
- Core Three.js dependencies are pinned.
- Device pixel ratio is capped.
- Scene resources, controls, listeners, geometry, materials, and renderer resources have explicit cleanup paths.
- WebGL context-loss/restoration is surfaced and restoration re-dirties state-derived presentation.
- No runtime hotlinks or remote asset dependencies are part of the laboratory.

## Pre-look performance hardening

- Planet geometry deformation/normals are updated only when authoritative planet state changes.
- Layer changes update colors without recomputing geometry normals.
- Cell selection uses a presentation-only surface marker instead of recoloring/rebuilding the entire globe.
- Pointer-hover raycasts are coalesced into the existing frame loop instead of executing for every raw pointer event.
- Heavy DOM telemetry/ledger work is keyed to simulation state; keyboard cell movement refreshes the cell inspector rather than replaying unrelated metrics/comparison work.
- A/B comparison replay remains cached by branch/tick.

## Remaining runtime proof

A real browser session is still required to verify:

- visual correctness and interaction feel;
- WebGL context restoration on an actual GPU/browser path;
- sustained FPS and memory/resource recovery;
- responsive composition at representative viewport sizes;
- complete user journeys in `docs/FIRST_LOOK.md`.
