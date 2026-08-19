# Validation Record

This file records evidence, not aspirations. Source presence is not runtime proof, a static audit is not browser proof, and a CI software renderer is not target-hardware performance proof.

## Current verdict

**PARTIALLY VERIFIED, WITH THE PRIMARY CHROME USER JOURNEY VERIFIED.** The repository has reproducible dependency-backed typecheck/test/build evidence, simulation stress and full-pipeline proof, clean static architecture checks, and a real Chrome/Playwright browser-validation lane. The remaining proof surfaces are subjective human first-look judgment, representative physical-device/coarse-pointer feel, and target-hardware sustained performance/thermal behavior.

## Reproducible dependency and build proof

GitHub Actions run `32256868714` validated PR #3 on Ubuntu 24.04 with Node `22.23.2` and npm `10.9.8` from the committed lockfile.

- `npm ci`: **PASS** — 56 packages installed.
- runtime dependency gate, `npm audit --omit=dev --audit-level=high`: **PASS** — 0 runtime vulnerabilities.
- full dependency audit: 1 low dev-only transitive issue; 0 moderate/high/critical findings.
- `npm run typecheck`: **PASS**.
- `npm test`: **PASS** — 13 Vitest files / 43 tests.
- `npm run build`: **PASS** with Vite `7.3.5`.
- static safeguards: **PASS**.
- dependency and production-build artifacts: **PASS**.

Production build output from that run:

```text
dist/index.html                  0.51 kB | gzip 0.32 kB
dist/assets/index-Bs8vjw42.css  8.69 kB | gzip 2.80 kB
dist/assets/index-LRUEqIqB.js 600.86 kB | gzip 153.45 kB
```

The single JavaScript chunk remains above Vite's 500 kB advisory threshold. This remains an observation, not an automatic code-splitting defect.

## Automated simulation and renderer regressions

The dependency-backed Vitest suite covers deterministic world generation, process prerequisites and ordering, water/material conservation, Ringthroat starvation, full Gorevault-to-Ringthroat closure, history/snapshot restoration, branch isolation/common-history rules, timeline chronology, engine input boundaries, keyboard grid navigation, seed handling, process telemetry, multi-seed stress, and renderer UV seam/pole clamping.

Run `32256868714` results:

```text
Test files: 13 passed
Tests:      43 passed
Vitest:     4.1.10
```

The earlier direct 64-seed x 160-tick stress result remains valid for unchanged authoritative numerical state:

```text
Worst water drift:        2.4101609596982598e-11
Worst pipeline error:     8.881784197001252e-14
Worst whole-system error: 0.00001378257275064243
Failures:                 0
```

A lawful high-coverage Gorevault -> Ringthroat direct run reached closed-band state at tick `1026` with conservation errors inside the declared `1e-3` tolerance.

## Real Chrome browser proof — 2026-08-19

PR #3 browser-validation run `32256868714` used the GitHub-hosted Ubuntu runner's installed Google Chrome `151.0.7922.108`. Playwright ran the production Vite build with one worker and reported:

```text
Browser tests: 10 passed / 10
Duration:      about 2 minutes
Evidence:      laboratory-browser-evidence artifact 9366713842
```

The browser suite directly verifies:

- application startup with a real WebGL canvas and no unexpected console/page errors;
- Fault-Tongue authoritative change followed by crust-layer inspection;
- Cloudmaw water redistribution with total modeled water conserved;
- Ringthroat starvation before feedstock and orbital growth only after the Gorevault material chain exists;
- rewind to an earlier authoritative state, future-event filtering, forked common history, post-fork divergence, and comparison rendering;
- provenance inspection of transformed cells;
- semantic regions/buttons, accessible naming, keyboard cell traversal and activation;
- narrow `390 x 844` viewport composition without global horizontal overflow;
- reduced-motion preference disabling OrbitControls damping;
- rapid play/pause, layer switching, branch switching, timeline scrubbing, resize storms, camera input, repeated reset, and WebGL context loss/restoration.

The browser evidence contains eight full-page state screenshots covering initial state, Fault-Tongue crust, Cloudmaw hydrology, Ringthroat starvation, Gorevault-to-Ringthroat material flow, branch comparison, provenance, and the `390 x 844` narrow viewport. Objective review found no blank canvas, primary-region overlap, global narrow-viewport overflow, or state/layer mismatch in those captures.

Browser testing also exposed a renderer UV boundary issue at SphereGeometry seam/pole offsets. `uvToGridCell()` now clamps those offsets into the 128 x 64 authoritative lattice, with dedicated regression coverage. The final Chrome run includes that repair.

## CI performance and lifecycle evidence

The Chrome suite records a bounded smoke scenario named `CI-PRELOOK-SMOKE-01`. The final run used ANGLE with SwiftShader, so frame-time results are deliberately classified **NOT COMPARABLE TO TARGET HARDWARE**.

Final run `32256868714` evidence:

```text
Navigation DOMContentLoaded: 167.8 ms
Navigation load:             180.1 ms
Frame samples:               529
Frame p50:                   33.3 ms
Frame p95:                   50.0 ms
Frame p99:                   66.6 ms
Frames > 50 ms:              2.46%
Latest simulation step:      0.465 ms
Long tasks:                  9, max 165 ms
Heap delta after 3 resets:   +412,796 bytes
Renderer geometries:         3 baseline / 3 settled
Renderer textures:           1 baseline / 1 settled
Scene unique geometries:     3 baseline / 3 settled
Scene unique materials:      3 baseline / 3 settled
```

The evidence verifies bounded CI lifecycle behavior: three reset cycles return renderer resource counts to baseline, heap growth remains inside the test bound, simulation-step timing remains inside the provisional 8 ms check, and the WebGL loss/restoration path returns to rendering. It does **not** prove target-device FPS, GPU cost, thermals, or long-session stability because SwiftShader is a virtual software renderer.

The target-hardware benchmark contract remains [`PERFORMANCE_BENCHMARK.md`](PERFORMANCE_BENCHMARK.md).

## Three.js architecture and static hygiene

The Three.js project-health scan remains **100 / 100 with 0 findings** after the browser-validation instrumentation. The application retains one frame-loop owner, fixed-step authoritative simulation, capped device pixel ratio, explicit resource cleanup, state-derived rendering, no runtime hotlinks/network calls, and an opt-in read-only diagnostics surface enabled only by `?diagnostics=1`.

Browser diagnostics do not create another render loop and do not own or mutate authoritative simulation state.

## Remaining human/device validation

The automated first-look path is now verified in Chrome. These items remain outside the evidence gathered here:

- subjective visual taste, clarity, and whether the laboratory feels compelling to the user;
- physical touch/coarse-pointer feel on representative hardware rather than viewport emulation alone;
- target-GPU frame-time distributions and GPU-specific rendering cost;
- sustained thermals and long-session behavior on representative physical devices.

The next useful action is the user's own first look using [`FIRST_LOOK.md`](FIRST_LOOK.md). Target-hardware performance work should follow only if that inspection warrants it.
