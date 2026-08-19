# The Drakken Terraforming Laboratory

A browser-based planetary causality laboratory for deterministic Drakken terraforming experiments.

The central rule is simple: **nothing visible happens unless authoritative planetary state changed first.** Three.js renders that state; it does not define it.

## What the prototype proves

- deterministic fictional planet generation from a seed;
- an authoritative 128 x 64 / 8,192-cell planetary state lattice;
- fixed-step simulation independent of render-frame cadence;
- deployable Fault-Tongue, Cloudmaw, Gorevault, and Ringthroat process instances;
- state-derived tectonic, hydrological, biosphere, atmospheric, material-processing, and orbital changes;
- Cloudmaw water conservation;
- Gorevault-to-Ringthroat mass accounting through a visible Material Ledger;
- bounded cell provenance answering what last changed a selected region and where harvested matter went;
- genuine snapshot/replay rewind;
- deterministic branch forks and post-fork divergence;
- numerical A/B deltas plus a state-derived visual comparison layer;
- an incomplete orbital band that grows only as modeled material reaches it.

## Canon and laboratory model

The interface and documentation deliberately separate **CANON FUNCTION** from **LAB MODEL**. Drakken functions and the Gorevault → Ringthroat ordering are canon constraints. Rates, thresholds, capacities, normalized units, and numerical coefficients are implementation parameters for the laboratory and are not new lore.

See [`docs/CANON_BOUNDARIES.md`](docs/CANON_BOUNDARIES.md).

## Local setup

Requirements: a current Node 22 runtime and npm. Dependency versions are pinned in `package.json` and `package-lock.json`.

```bash
npm ci
npm run dev
```

Then open the local Vite address shown in the terminal. For a compact tour of the causality model, use [`docs/FIRST_LOOK.md`](docs/FIRST_LOOK.md).

## Controls

### Experiment Rack

- enter a seed and regenerate the starting planet;
- select one of the four implemented processes;
- set intensity and influence radius;
- leave **PLACEMENT ARMED** active, then click the planet to deploy;
- switch to inspection mode to select cells without deploying;
- activate/deactivate deployed instances.

### Planet viewport

- drag to rotate;
- scroll/pinch to zoom;
- keyboard: focus the viewport, use the arrow keys to move the selected simulation cell, then press Enter or Space to deploy/inspect according to the current placement mode;
- reset camera from the timeline bar;
- select inspection layers: NORMAL, CRUST, HYDROLOGY, ATMOSPHERE, BIOSPHERE, FEEDSTOCK, DRAKKEN, PROVENANCE, and COMPARISON.

### Timeline

- play/pause;
- choose 0.25x, 1x, 4x, 16x, or 64x tick consumption;
- scrub to restore an actual earlier state;
- fork Branch B from the current restored tick;
- after a fork, shared pre-fork history becomes inspection-only for both parent and child, preserving identical history before the fork;
- switch between A and B at the current time.

### Comparison

After Branch B exists, the inspector reports metric deltas between A and B at the selected tick. The COMPARISON layer shows spatial divergence: crimson means the active branch is more transformed; azure means the comparison branch is more transformed. Numerical values remain available so meaning does not rely on color alone.

## Architecture

```text
PlanetState -> SimulationEngine -> updated PlanetState
PlanetState -> Three.js Renderer
PlanetState -> Laboratory DOM UI
```

Simulation truth is never read back from scene transforms or materials. One DOM-owned animation loop renders the scene and consumes bounded fixed simulation steps. Procedural behavior uses explicit seeded integer hashing rather than `Math.random()`.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/SIMULATION_MODEL.md`](docs/SIMULATION_MODEL.md), and [`docs/PROJECT_HEALTH.md`](docs/PROJECT_HEALTH.md).

## Testing

```bash
npm run typecheck
npm test
npm run test:stress
npm run build
```

The suite checks determinism, water and material conservation, Ringthroat prerequisites, snapshot restoration, stale-snapshot invalidation, frozen branch inheritance, derived-event replay after past edits, branch divergence, stable process ordering, engine-boundary failure states, keyboard grid navigation, seed parsing, process telemetry, multi-seed stress invariants, and a lawful Gorevault → Ringthroat closure path. CI also rejects runtime networking and authoritative `Math.random()` use.

See [`docs/VALIDATION.md`](docs/VALIDATION.md).

## Known v1 limits

- Main-thread simulation only.
- Abstract laboratory units rather than geophysical calibration.
- Civilization is represented as population mass and infrastructure density, not individual agents or cities.
- Only four representative Drakken processes are simulated.
- Snapshot history is intentionally bounded.
- The visual orbital structure is a procedural state readout rather than a production asset.

These limits protect the prototype's actual purpose: proving deterministic planetary causality, material-chain integrity, history restoration, and branch comparison before adding breadth.
