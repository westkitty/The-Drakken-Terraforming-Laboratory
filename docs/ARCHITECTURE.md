# Architecture

## Purpose

The Drakken Terraforming Laboratory is a deterministic planetary simulation with a Three.js presentation layer. The renderer is not a game-state database. The governing direction is:

```text
PlanetState -> SimulationEngine -> updated PlanetState
PlanetState -> Three.js renderer
PlanetState -> semantic DOM laboratory UI
```

No important simulation fact is inferred from mesh transforms, material opacity, scene membership, or shader state.

## Runtime ownership

### Authoritative state

`PlanetState` owns an 8,192-cell, 128 x 64 latitude/longitude lattice represented by Structure-of-Arrays typed arrays. Per-cell lithosphere, hydrosphere, atmosphere, biosphere, civilization abstraction, Drakken influence, and bounded provenance all live there. Global Gorevault and orbital inventories live there as well.

### Simulation

`SimulationEngine` owns process instances, fixed integer simulation ticks, stable process ordering, environmental response, action history, snapshots, branches, metrics, deterministic replay, and state hashing.

The declared update order is:

1. user actions already scheduled for the current tick;
2. Fault-Tongue;
3. Cloudmaw;
4. environmental response;
5. Gorevault;
6. Ringthroat;
7. constraints and derived totals;
8. provenance and threshold events;
9. periodic snapshot.

Deployment order does not decide process phase. Instances inside a process phase are sorted by stable instance ID before update.

### Rendering

`LaboratoryRenderer` owns one `WebGLRenderer`, one scene, one camera, one `OrbitControls` instance, one procedural planet mesh, one atmosphere shell, and state-derived orbital geometry. It samples PlanetState to displace sphere vertices and derive colors. It disposes replaced orbital geometry/materials before rebuilding them.

### Frame loop

`LaboratoryApp` owns the only `requestAnimationFrame` loop. Render timing and simulation timing are separate. A bounded accumulator consumes fixed simulation ticks. Speed changes only the rate at which fixed ticks are consumed; it does not modify simulation equations.

### DOM UI

Ordinary controls, telemetry, process cards, inspector values, timeline, branch controls, comparison numbers, and legends are semantic DOM surfaces. The canvas is reserved for planetary visualization and raycast picking. The viewport wrapper is keyboard-focusable: arrow keys traverse authoritative cells and Enter/Space activates the selected cell, providing a DOM-owned alternative to pointer-only planet picking.

## Determinism

Authoritative procedural variation comes from integer seed hashing and `SeededRandom`; authoritative code does not use `Math.random()`. `hashPlanetState()` hashes the complete authoritative per-cell arrays plus global inventories and simulation tick. Branch labels are intentionally omitted from the world-state hash so two identical pre-fork worlds compare equal.

## History model

The engine stores bounded periodic snapshots and branch action logs. Restore finds the nearest retained snapshot at or before the target tick when one exists, reconstructs process-instance state at that boundary, restores the planetary snapshot, and deterministically replays only the remainder. Replay always suppresses snapshot generation. User-facing restore may regenerate invalidated derived milestone events, while comparison/capture replay suppresses event mutation so inspection does not alter history storage.

Each branch records parent ID, fork tick, a frozen copy of inherited actions through the fork boundary, and branch-local actions. Once a child is created, later edits to the parent cannot leak into the child's past. Inserting an action into an earlier tick truncates future snapshots for that branch so restore cannot select stale state. Derived milestone events invalidated by the edit are regenerated during user-facing deterministic replay; comparison/capture replays remain side-effect free.

## A/B comparison

Comparison has two forms:

- numerical metric deltas for ocean coverage, biosphere, crust integrity, population, refined feedstock, orbital material, and band coverage;
- a single-globe `COMPARISON` layer comparing the active branch against the other branch at the same tick. Crimson means the active branch is more transformed at that cell; azure means the comparison branch is more transformed. Numeric deltas remain visible so color is not the sole information channel.

## Resource lifecycle

- device pixel ratio is capped at 2;
- the scene graph is persistent rather than rebuilt every tick;
- planet geometry is deformed from retained base positions, preventing cumulative drift;
- orbital geometry is rebuilt only when its orbital-material/process state key changes, not for unrelated layer/selection dirtiness, and previous resources are explicitly disposed;
- resize listeners, controls, geometries, materials, and renderer are disposed on teardown;
- process spatial kernels are cached on each deployment instance;
- snapshot count is bounded.

## Dependency boundary

Runtime dependency: Three.js only. TypeScript, Vite, Vitest, and `@types/three` are development dependencies. The application performs no runtime network request and loads no remote texture, model, font, audio, shader, JSON, or CDN script.
