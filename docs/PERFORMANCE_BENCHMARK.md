# Runtime Performance Benchmark Contract

This repository has completed a source-level allocation/lifecycle hardening pass, but the current execution environment cannot load the real WebGL application. No frame-time, GPU-memory, thermal, or long-session runtime result is claimed here.

## Scenario PRELOOK-01

- **Seed:** `19870615`
- **Renderer:** Three.js `WebGLRenderer`
- **DPR policy:** capped at `2`
- **Preferred first capture:** desktop Chromium-family browser, 1440 x 900 viewport, native network speed, no devtools throttling
- **Warm/cold state:** record one cold page load, then a warm interaction run

### Ordered actions

1. Hold the untouched initial globe for 10 seconds.
2. Deploy Fault-Tongue at intensity `0.85`, radius `24°`; run 100 ticks at `64x`.
3. Switch NORMAL -> CRUST -> HYDROLOGY -> NORMAL while rotating the globe.
4. Deploy Cloudmaw and Gorevault; run another 150 ticks.
5. Scrub backward 75 ticks, fork Branch B, add one divergent deployment, then switch A/B five times.
6. Enter COMPARISON, rotate and inspect cells for 15 seconds.
7. Regenerate the same seed three times, returning to the initial state after each reset.
8. If the browser exposes a safe WebGL-context-loss test, lose and restore context once and verify the presentation rebuilds from authoritative state.

## Provisional budgets

These are release-triage budgets, not verified measurements:

- p50 frame time <= 16.7 ms during ordinary inspection;
- p95 frame time <= 25 ms during simulation + interaction;
- frames above 50 ms < 1% outside initial shader/build warm-up;
- simulation step p95 <= 8 ms at the representative seed/process mix;
- no monotonic `renderer.info` geometry/texture/program growth across the three reset cycles after settle;
- no unrecovered WebGL context loss;
- no interaction loss while the 64x simulation catch-up cap is active.

## What the source-level pass already changed

- geometry deformation and normal recomputation occur only when authoritative planet state changes;
- layer changes update colors without recomputing geometry normals;
- cell selection uses a presentation-only surface marker instead of recoloring/rebuilding the entire globe;
- pointer-hover raycasts are coalesced into the existing frame loop instead of executing for every raw pointer event;
- A/B comparison replay is cached by branch/tick;
- heavy DOM telemetry/ledger work is keyed to relevant state rather than refreshed by every selected-cell move;
- orbital geometry is rebuilt only when orbital/process state changes;
- WebGL context loss/restoration has an explicit recovery path;
- there remains exactly one application-owned animation loop.

## Evidence required to promote runtime performance

Record frame-time percentiles, slow-frame percentage, simulation-step timing, `renderer.info` before/after reset cycles, browser/device/viewport identity, and context-loss outcome. Until that capture exists, runtime performance and lifecycle stability remain **unverified**, not failed.
