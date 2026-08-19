# Validation Record

This file records evidence, not aspirations. Source presence is not runtime proof, a static audit is not browser proof, and an environment failure is not converted into an application pass.

## Current verdict

**PARTIAL.** The repository now has reproducible dependency-backed typecheck/test/build evidence, multi-seed and full-pipeline simulation proof, and clean static architecture/authorship checks. The remaining mandatory proof surface is the real browser/WebGL user journey and runtime performance/lifecycle capture.

## Reproducible dependency and build proof — 2026-08-18

GitHub Actions run `32210833573` validated the hardening candidate on Ubuntu 24.04 with Node `22.23.2` and npm `10.9.8` using the committed npm lockfile.

- `npm ci`: **PASS** — 53 packages installed from `package-lock.json`.
- runtime dependency gate, `npm audit --omit=dev --audit-level=high`: **PASS** — 0 runtime vulnerabilities reported.
- full dependency audit: 1 **low** dev-only transitive `esbuild` advisory affecting a Windows development-server file-read path; 0 moderate/high/critical findings.
- `npm run typecheck`: **PASS** with strict TypeScript plus unused-local/parameter checks.
- `npm test`: **PASS** — 12 test files, 41 tests.
- `npm run build`: **PASS** with Vite `7.3.5`.
- build artifact export: **PASS**.

Production build output from that run:

```text
dist/index.html                  0.64 kB | gzip 0.36 kB
dist/assets/index-Bs8vjw42.css  8.69 kB | gzip 2.80 kB
dist/assets/index-C54dnCox.js 599.24 kB | gzip 152.79 kB
```

Vite reports the single JavaScript chunk above its 500 kB advisory threshold. This is recorded as a bundle-size observation, not hidden by raising the warning limit. The renderer is part of the first usable screen, so arbitrary code splitting is not treated as a performance win without browser evidence that it improves startup.

## Automated regression coverage

The dependency-backed Vitest suite covers:

- same-seed determinism and different-seed divergence;
- process prerequisites and stable process ordering;
- Cloudmaw water conservation;
- Gorevault source harvesting and pipeline conservation;
- Ringthroat starvation and no source-free orbital mass;
- full Gorevault -> Ringthroat downstream transfer and closed-band reachability;
- snapshot restoration, stale-snapshot invalidation, and tick-zero replay after snapshot eviction;
- frozen branch inheritance, common-history immutability, post-fork divergence, and nested-fork behavior;
- timeline event inheritance, rewind visibility, derived-event regeneration, and exact closed-band chronology;
- seed `0`, keyboard grid navigation, and Ringthroat process telemetry;
- authoritative engine-boundary normalization for invalid coordinates/radius/intensity/counts/indices;
- fork-at-zero, future-fork clamping, unknown-toggle rejection, and same-tick deploy/toggle replay;
- multi-seed seam/pole stress invariants.

GitHub Actions run `32210833573` results:

```text
Test files: 12 passed
Tests:      41 passed
Vitest:     4.1.10
Stress:     16 seeds x 120 ticks PASS
Full path:  lawful source-matter -> closed orbital band PASS
```

## Extended direct simulation stress

A separate dependency-free 64-world stress run exercised 160 ticks per seed across representative process combinations. After hydrological storage was promoted to Float64, the same workload produced:

```text
Seeds:                    64
Ticks per seed:          160
Worst water drift:       2.4101609596982598e-11
Worst pipeline error:    8.881784197001252e-14
Worst whole-system error:0.00001378257275064243
Failures:                  0
```

The declared conservation tolerance remains `1e-3` abstract units; the implementation was made more precise rather than weakening that tolerance.

A lawful high-coverage Gorevault -> Ringthroat direct run reached closed-band state at tick `1026` with:

```text
bandCoverage:   1
continuity:     1
bandIntegrity:  0.8207999999999178
pipelineError:  1.3733369996771216e-10
systemError:   -0.0000020635061446228065
waterDrift:     1.1368683772161603e-11
```

## Three.js architecture and source-level performance

The final Three.js project-health scan reports **100 / 100**, 0 findings. This is static architecture evidence only.

Verified source-level hardening includes:

- one application-owned animation loop;
- authoritative simulation remains outside Three.js;
- device pixel ratio remains capped at 2;
- geometry deformation/normals update only when planet state changes;
- layer changes recolor without recomputing geometry normals;
- selected-cell indication uses a small presentation marker rather than forcing a globe rebuild;
- pointer-hover raycasts are coalesced into the existing frame loop;
- A/B comparison replay remains cached by branch/tick;
- heavy DOM panels are keyed to relevant simulation state;
- orbital geometry rebuilds only from orbital/process state changes;
- explicit WebGL context-loss/restoration handling is present;
- scene resources, controls, listeners, geometry, materials, and renderer resources have cleanup paths.

The runtime benchmark contract is in [`PERFORMANCE_BENCHMARK.md`](PERFORMANCE_BENCHMARK.md). No FPS, GPU-memory, thermal, or long-session runtime claim is promoted without that browser capture.

## UI/UX and first-session hardening

Source-level UI review produced:

- clearer CONFIGURE / INSPECT hierarchy;
- a short dismissible first-run guide;
- clearer placement/inspection and branch states;
- improved empty-state copy;
- keyboard-operable cell traversal/activation;
- responsive layouts for narrower widths and coarse pointers;
- reduced-motion accommodation;
- visible WebGL context-loss status;
- first-inspection instructions in [`FIRST_LOOK.md`](FIRST_LOOK.md).

These are implemented and source-reviewed. Their rendered quality remains subject to the real browser inspection.

## Static hygiene

The final source gate is intended to fail on:

- authoritative `Math.random()` use;
- runtime `fetch`, `XMLHttpRequest`, `WebSocket`, or HTTP(S) references in `src/`;
- forbidden literal Blood Ring halo wording in source/current docs;
- stale `TODO`, `FIXME`, or `HACK` implementation markers;
- Git whitespace errors.

Web Authorship Gate result after the hardening pass: **PASS**, 0 findings across the user-facing/source audit scope.

## Browser/runtime proof still unavailable here

The available local Chromium policy blocks both localhost HTTP and `file://` navigation before the application loads. Therefore the following remain **UNVERIFIED** in this execution environment:

- actual Three.js WebGL rendering quality;
- raycast/pointer interaction through the real browser;
- complete first-look user journeys in [`FIRST_LOOK.md`](FIRST_LOOK.md);
- responsive composition on representative real viewports/devices;
- WebGL context-loss recovery on an actual GPU/browser path;
- measured FPS/frame-time/memory/resource recovery and long-session stability.

The next decisive validation is not more source polishing. It is to open the built application in a normal browser and run [`FIRST_LOOK.md`](FIRST_LOOK.md), followed by the bounded capture in [`PERFORMANCE_BENCHMARK.md`](PERFORMANCE_BENCHMARK.md).
