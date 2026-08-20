# Validation Record

This file records evidence, not aspirations. Source presence is not runtime proof, a static audit is not browser proof, and a CI software renderer is not target-hardware performance proof.

## Current verdict

**PARTIALLY VERIFIED, WITH THE PRIMARY CHROME USER JOURNEY VERIFIED.** The repository has reproducible dependency-backed typecheck/test/build evidence, simulation stress and full-pipeline proof, clean static safeguards, and a real Chrome/Playwright browser-validation lane. The remaining proof surfaces are subjective human first-look judgment, representative physical-device/coarse-pointer feel, and target-hardware sustained performance/thermal behavior.

## Final pre-test defect sweep — 2026-08-19

PR #4 was validated on final head `2b10b7ab0c4652f013e986641fd2a379c25e3a51` by GitHub Actions run `32262340227` and squash-merged to `main` as `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e`.

The sweep repaired four confirmed correctness defects and one browser-exposed feedback defect:

1. **Renderer longitude seam mapping:** Three.js UV longitude is periodic, but the previous helper clamped `u=1` to the opposite edge cell. `uvToGridCell()` now wraps longitude and clamps latitude, including safe handling of non-finite input.
2. **Seeded planet antimeridian scar:** initial terrain/humidity/crust noise used non-periodic longitude sampling. Direct measurement across 32 seeds x 64 latitude rows found the old median antimeridian elevation jump about 11.4 times the median ordinary neighbor jump. Seeded noise is now exactly periodic at the world-width boundary.
3. **Scalar state-hash precision:** JavaScript-number pipeline/orbital scalars were downcast to Float32 before hashing, allowing genuinely different states below Float32 resolution to report the same integrity hash. Scalars now contribute their full Float64 bit pattern.
4. **Stale targeting status:** play, rewind, fork, branch switch, and reset could leave deployment/history feedback inconsistent with the current authoritative navigation state. Those transitions now restore current targeting text.
5. **Pointer hover erasing explicit feedback:** the first browser attempt showed pointer-hover immediately overwriting the deliberate `DEPLOYED · PRESS PLAY` message. Deployment and history-lock feedback now retain ownership until a real navigation/mode/state transition clears the override.

The final diff-scope gate reports **PASS**: seven changed files, no dependency/lock/config changes, no generated artifacts, no temporary workflow residue, no deletions/renames, and no unrelated formatting churn.

## Reproducible dependency and build proof

Final run `32262340227` used Ubuntu 24.04, Node 22, npm 10, and the committed lockfile.

- `npm ci`: **PASS** — 56 packages installed.
- runtime dependency gate, `npm audit --omit=dev --audit-level=high`: **PASS** — 0 runtime vulnerabilities.
- full dependency audit: 1 low dev-only transitive issue; 0 moderate/high/critical findings.
- `npm run typecheck`: **PASS**.
- `npm test`: **PASS** — 13 Vitest files / 46 tests.
- `npm run build`: **PASS** with Vite `7.3.5`.
- fail-closed static safeguards: **PASS**.
- dependency and production-build artifacts: **PASS**.

Production build output from the final candidate:

```text
dist/index.html                  0.51 kB | gzip 0.32 kB
dist/assets/index-Bs8vjw42.css  8.69 kB | gzip 2.80 kB
dist/assets/index-QUgtCSlA.js 601.26 kB | gzip 153.56 kB
```

The single JavaScript chunk remains above Vite's 500 kB advisory threshold. This remains an observation, not an automatic code-splitting defect.

## Automated simulation and renderer regressions

The dependency-backed Vitest suite now reports:

```text
Test files: 13 passed
Tests:      46 passed
Vitest:     4.1.10
```

Coverage includes:

- seeded determinism and different-seed divergence;
- exact periodic seeded noise across the longitude boundary;
- state-hash sensitivity below Float32 scalar resolution;
- renderer longitude wrapping / latitude clamping / non-finite UV fallback;
- process prerequisites and stable ordering;
- Cloudmaw water conservation;
- Gorevault source harvesting and pipeline conservation;
- Ringthroat starvation and no source-free orbital material;
- lawful Gorevault -> Ringthroat full-path closure;
- snapshot restoration, stale-snapshot invalidation, and tick-zero replay after snapshot eviction;
- frozen branch inheritance, shared-history immutability, post-fork divergence, and nested-fork behavior;
- timeline inheritance, rewind visibility, derived-event regeneration, and exact closure chronology;
- engine input-boundary normalization;
- keyboard grid navigation, seed handling, and process telemetry;
- multi-seed seam/pole deployment stress.

The current CI stress fixture exercises 16 seeds x 120 ticks and passes all declared conservation/state invariants on the new periodic generator. The current full-pipeline fixture reaches closed orbital-band state from planetary source matter without breaking the `1e-3` conservation contract.

The earlier 64-seed direct stress measurements remain useful historical evidence for the unchanged simulation equations, but they are not promoted as current-generator proof because the final sweep intentionally changed seeded initial-world topology.

## Real Chrome browser proof

Final run `32262340227` used the GitHub-hosted runner's Google Chrome `151.0.7922.108`. Playwright ran the production build with one worker and reported:

```text
Browser tests: 10 passed / 10
Duration:      3.2 minutes
Evidence:      laboratory-browser-evidence artifact 9368894009
Digest:        sha256:829efd8a84c15662dea28a22fa86b6c41f5c7cdae7de9dfb4d74643f0bc448c3
```

The browser suite directly verifies:

- application startup with a real WebGL canvas and no unexpected console/page errors;
- Fault-Tongue authoritative change followed by crust-layer inspection;
- Cloudmaw water redistribution with modeled total water conserved;
- Ringthroat starvation before feedstock and orbital growth only after the Gorevault material chain exists;
- rewind, future-event filtering, forked common history, post-fork divergence, and comparison rendering;
- provenance inspection of transformed cells;
- semantic regions/buttons, accessible naming, keyboard traversal and activation;
- narrow `390 x 844` viewport composition without global horizontal overflow;
- reduced-motion preference disabling OrbitControls damping;
- rapid play/pause, layer switching, branch switching, timeline scrubbing, resize storms, camera input, repeated reset, and WebGL context loss/restoration;
- explicit deployment feedback surviving pointer hover, then clearing on play/navigation/reset so the targeting banner does not become stale.

The evidence artifact contains eight full-page state screenshots covering initial state, Fault-Tongue crust, Cloudmaw hydrology, Ringthroat starvation, Gorevault-to-Ringthroat material flow, branch comparison, provenance, and the narrow viewport.

## CI performance and lifecycle evidence

The final Chrome suite records `CI-PRELOOK-SMOKE-01`. The runner used ANGLE/SwiftShader, so frame-time results are deliberately classified **NOT COMPARABLE TO TARGET HARDWARE**.

Final run evidence:

```text
Navigation DOMContentLoaded: 195.6 ms
Navigation load:             206.7 ms
Frame samples:               473
Frame p50:                   50.0 ms
Frame p95:                   66.8 ms
Frame p99:                   83.4 ms
Frames > 50 ms:              43.76%
Latest simulation step:      0.829 ms
Long tasks:                  559, max 253 ms
Heap delta after 3 resets:   +424,396 bytes
Renderer geometries:         3 baseline / 3 settled
Renderer textures:           1 baseline / 1 settled
Scene unique geometries:     3 baseline / 3 settled
Scene unique materials:      3 baseline / 3 settled
Frame-budget verdict:        NOT_COMPARABLE
```

The evidence verifies bounded CI lifecycle behavior: reset cycles return renderer resource counts to baseline, heap growth remains inside the browser-test bound, the latest simulation-step timing remains inside the provisional 8 ms check, and WebGL loss/restoration returns to rendering. It does **not** prove target-device FPS, GPU cost, thermals, or long-session stability because SwiftShader is a virtual software renderer.

The target-hardware benchmark contract remains [`PERFORMANCE_BENCHMARK.md`](PERFORMANCE_BENCHMARK.md).

## Three.js architecture and static hygiene

The previously established Three.js project-health result remains 100/100 with 0 findings; the final sweep did not change frame-loop ownership, resource ownership, dependencies, or renderer lifecycle architecture. It changed only coordinate mapping and UI feedback/state synchronization in the browser layer.

The application retains one frame-loop owner, fixed-step authoritative simulation, capped device pixel ratio, explicit cleanup, state-derived rendering, no runtime hotlinks/network calls, and an opt-in read-only diagnostics surface enabled only by `?diagnostics=1`.

## Remaining human/device validation

The automated first-look path is verified in Chrome. These items remain outside the evidence gathered here:

- subjective visual taste, clarity, and whether the laboratory feels compelling to the user;
- physical touch/coarse-pointer feel on representative hardware rather than viewport emulation alone;
- target-GPU frame-time distributions and GPU-specific rendering cost;
- sustained thermals and long-session behavior on representative physical devices.

The next useful action is the user's own first look using [`FIRST_LOOK.md`](FIRST_LOOK.md). Further pre-look source polishing is not justified without new evidence from that inspection.

## Planet-first celestial integration QA — 2026-08-20

Local Chrome `151` on branch `planet-first-space-system` after a bounded repair pass (starfield depth write, unchanged-tick orbit skip, cached pickables, star placement in the default/system frustum).

Executed:

```text
npm ci: PASS
typecheck: PASS
Vitest: 15 files / 55 tests PASS
Vite 7.3.5 production build: PASS
Playwright Chrome --workers=1: 16 tests PASS in split reruns after overlay click timeouts
```

Objective screenshot states captured to `browser-evidence/screenshots/`:

- `qa-01-default-planet-view` — menu closed, planet dominant, starfield, visible system star
- `qa-02-menu-open` — VIEW overlay without taking over the scene
- `qa-03-system-view` — planet, moon, outer bodies, star, deeper starfield
- `qa-04-moon-focused`
- `qa-05-outer-focused`
- `qa-06-drakken-active` — Fault-Tongue deploy on the primary planet
- `qa-07-narrow-viewport` — 390 x 844, no global overflow, planet remains primary

Lifecycle smoke (local Metal, not a SwiftShader/target-hardware FPS claim): unique geometries 12 baseline / 12 after 3 regenerates; heap delta about +377 kB; latest simulation step about 1.34 ms.

This integration-QA capture is superseded by the 2026-08-20 interaction/QA correction pass below.

## Planet-first interaction and QA correction — 2026-08-20

Local Chrome `151.0.7922.138` on branch `planet-first-space-system` after the targeted correction pass. PLAY and other overlay controls use ordinary Playwright actionability. First-run guidance is inside RUN. `qa-01` is captured from an untouched first load (`openLab(page, false)`), with the 12-dot launcher closed and `#quickstart` not visible.

Executed:

```text
npm ci: PASS
typecheck: PASS
Vitest: 15 files / 55 tests PASS (`npx vitest run src/tests --testTimeout=20000`)
Vite 7.3.5 production build: PASS
  dist/index.html                  0.51 kB | gzip 0.32 kB
  dist/assets/index-BAr3i8z_.css   8.65 kB | gzip 2.80 kB
  dist/assets/index-CAEJZViE.js  616.76 kB | gzip 157.01 kB
Command: npm run test:browser -- --workers=1
Playwright Chrome: 18 passed (4.7m)
```

The single 18-test job included celestial pick/orbit/regenerate, first-look journeys, final QA screenshots, 12-dot/starfield/parallax, semantics, and stress. No `click({ force: true })` remains in `tests/browser`.

Objective screenshot states recaptured to `browser-evidence/screenshots/` during that same run:

- `qa-01-default-planet-view` — untouched first load: menu closed, no first-run overlay, planet dominant, starfield, visible system star
- `qa-02-menu-open` — VIEW overlay without taking over the scene
- `qa-03-system-view` — planet, moon, outer bodies, star, deeper starfield
- `qa-04-moon-focused`
- `qa-05-outer-focused`
- `qa-06-drakken-active` — Fault-Tongue deploy on the primary planet
- `qa-07-narrow-viewport` — 390 x 844, no global overflow, planet remains primary

`01-initial.png` matches `qa-01-default-planet-view.png` at 107725 bytes.

Lifecycle smoke (local Metal ANGLE, not a SwiftShader/target-hardware FPS claim): unique geometries 16 baseline / 16 after 3 regenerates; unique materials 16/16; heap delta about +418 kB; latest simulation step about 1.78 ms.

This does not replace human visual taste or representative physical-device thermals.
