# Operational State: The Drakken Terraforming Laboratory

<!-- operational-state:metadata
{
  "schema_version": 1,
  "project_id": "drakken-terraforming-laboratory",
  "project_name": "The Drakken Terraforming Laboratory",
  "project_root": "/mnt/data/The-Drakken-Terraforming-Laboratory",
  "artifact_path": null,
  "state_revision": 6,
  "last_updated": "2026-08-19T10:20:00-04:00",
  "current_baseline": {
    "identity": "final pre-test defect-sweep release b353be7d78bf8c1a3e6d41ec063cac2c46a7838e on main",
    "state": "partially-verified",
    "last_verified": "2026-08-19T10:20:00-04:00"
  },
  "scope_boundaries": [
    "Initial browser-based deterministic Three.js Drakken terraforming laboratory prototype"
  ],
  "linked_parent_state": null
}
-->

## 1. Project Identity and Scope

- **Project ID:** `drakken-terraforming-laboratory`
- **Repository:** `westkitty/The-Drakken-Terraforming-Laboratory`
- **Purpose:** Deterministic planetary causality laboratory where Drakken processes transform authoritative planetary state and Three.js renders that state.
- **Project type:** Vanilla TypeScript + Three.js browser application.
- **Primary root:** `/mnt/data/The-Drakken-Terraforming-Laboratory`.
- **Published application baseline:** final pre-test defect-sweep release `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e` on `main`.
- **Canonical authority:** current build contract, `docs/CANON_BOUNDARIES.md`, then applicable Starsilk/Drakken canon.
- **Governed v1 scope:** Fault-Tongue, Cloudmaw, Gorevault, Ringthroat; deterministic planet state; environment response; conservation ledgers; provenance; snapshots/rewind; branching; comparison; state-derived Three.js rendering; DOM laboratory UI; tests/docs.
- **Out of scope:** remaining Drakken entries, Mother, Notebook mutation editor, combat/game progression, backend/database/cloud persistence, external runtime assets, React/R3F, WebGPU, workers, physics, audio, production deployment.

## 2. Current Baseline

- **Application source:** final pre-test defect-sweep PR #4 squash-merged to `main` as `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e`.
- **Dependency reproducibility:** committed npm lockfile; clean `npm ci` verified in GitHub Actions.
- **Dependency-backed validation:** strict TypeScript, 13 Vitest files / 46 tests, Vite `7.3.5` production build, runtime dependency gate, static safeguards, and build artifact export pass on final run `32262340227`.
- **Authoritative simulation:** current-generator dependency-backed stress, conservation, determinism, history, and full-pipeline regression suites pass; the older 64-seed direct stress remains historical evidence because seeded world topology changed in this sweep.
- **Three.js architecture:** static health audit remains 100/100 with 0 findings.
- **Browser path:** final candidate exercised in Google Chrome `151.0.7922.108`; 10/10 Playwright tests pass, including real WebGL startup, first-look journeys, keyboard/responsive checks, pathological controls, repeated resets, explicit targeting-feedback ownership, and context loss/restoration.
- **Browser evidence:** artifact `9368894009` (`sha256:829efd8a84c15662dea28a22fa86b6c41f5c7cdae7de9dfb4d74643f0bc448c3`) contains final Playwright results, performance smoke data, and eight state screenshots.
- **Runtime lifecycle:** CI software-renderer evidence verifies reset-cycle resource stability and context recovery; target-hardware frame-time/thermal performance remains unverified.
- **Overall state:** PARTIAL / partially verified because human visual judgment, representative physical touch/coarse-pointer feel, target-hardware performance, sustained thermals, and long-session behavior remain outside current evidence.

## 3. Artifact Contract

- Vanilla TypeScript, Three.js, Vite, Vitest, Playwright, semantic HTML, vanilla CSS.
- 128 x 64 / 8,192-cell authoritative planetary lattice.
- Fixed-step deterministic simulation; Three.js and DOM are presentation only.
- Exactly four simulated v1 processes: Fault-Tongue, Cloudmaw, Gorevault, Ringthroat.
- Conserved modeled water and convertible material.
- Ringthroat may build orbital material only from Gorevault-refined feedstock.
- Genuine snapshot/replay rewind, branch fork/divergence, numerical A/B comparison.
- State-derived incomplete crystalline Blood Ring band; no generic Saturn-like representation.
- No external runtime networking/assets, React/R3F, backend, database, or unmodeled material creation.
- Browser diagnostics are opt-in via `?diagnostics=1`, read-only, and may not become an authoritative state owner or second frame loop.

## 4. Active Invariants

- **INV-001:** `PlanetState` owns planetary truth; renderer and DOM only present it.
- **INV-002:** One fixed-step authoritative simulation; frame cadence does not change equations.
- **INV-003:** No `Math.random()` in authoritative simulation.
- **INV-004:** Cloudmaw conserves surface + atmospheric modeled water within `1e-3` abstract units.
- **INV-005:** Convertible matter closes through harvestable pools, environmental residue, Gorevault inventories, and Ringthroat/orbital inventories.
- **INV-006:** Ringthroat cannot create orbital mass with zero refined feedstock.
- **INV-007:** Rewind is snapshot + deterministic replay and must restore the same state hash.
- **INV-008:** Branches are identical through the fork and diverge only from branch-specific post-fork actions.
- **INV-009:** Once a fork exists, shared history before that fork is immutable for both parent and child; the fork tick is the first editable boundary.
- **INV-010:** Timeline views never expose future events relative to the viewed tick, and child timelines inherit frozen pre-fork chronology.
- **INV-011:** Blood Ring visuals derive from orbital state and remain partial until material/continuity/integrity requirements are met.
- **INV-012:** CANON FUNCTION and LAB MODEL remain explicitly separate.
- **INV-013:** No runtime network calls or hotlinked runtime assets.
- **INV-014:** Git history remains additive and non-destructive; no force push/hard reset/clean.
- **INV-015:** Clean checkout validation uses the committed lockfile and `npm ci`.
- **INV-016:** Renderer UV-to-grid mapping must wrap longitude periodically, clamp latitude, normalize non-finite input safely, and never leave the authoritative 128 x 64 cell lattice.
- **INV-017:** Browser diagnostics and test instrumentation remain presentation/read-only observability and must not create a second application frame loop.
- **INV-018:** Seeded initial-world fields derived from procedural noise must be exactly periodic across the longitude boundary; the antimeridian may not contain a generator-only discontinuity.
- **INV-019:** Integrity state hashing must consume full Float64 precision for JavaScript-number totals and pipeline/orbital scalar inventories; sub-Float32 state differences may not collapse to the same hash.
- **INV-020:** Explicit deployment/history-lock targeting feedback may not be erased by incidental pointer hover and must clear when a real navigation, mode, selection, play, rewind, fork, branch-switch, or reset transition re-derives current targeting state.

## 5. Verified Working Behavior

- **VER-001:** Correct GitHub repository, `main`, public visibility, and push/admin permission verified through the GitHub connector.
- **VER-002:** Pre-look hardening release `10de6dbe0459a97528a27f2df3e13e1850eef0eb`, browser-validation release `9e43a8be856facb43953305d95efd81b3f1f0e74`, and final pre-test defect-sweep release `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e` were merged non-destructively.
- **VER-003:** Clean `npm ci` succeeds from the committed lockfile on the Node 22 GitHub-hosted Ubuntu runner.
- **VER-004:** Strict TypeScript typecheck passes.
- **VER-005:** Dependency-backed Vitest passes 13 files / 46 tests, including determinism, periodic planet topology, full-precision scalar hashing, conservation, history, branch isolation, boundaries, stress, full material-chain closure, keyboard logic, and renderer UV wrapping/clamping.
- **VER-006:** Vite `7.3.5` production build passes and produces a CI build artifact.
- **VER-007:** Runtime dependency gate reports 0 runtime vulnerabilities; full install reports one low dev-only issue and no moderate/high/critical findings.
- **VER-008:** Current-generator CI stress passes 16 seeds x 120 ticks, including seam/pole deployments, with all declared planetary/material invariants intact. The earlier 64-seed x 160-tick direct measurements remain historical pre-periodic-generator evidence only.
- **VER-009:** Lawful high-coverage Gorevault -> Ringthroat run reaches closed state at tick 1026 with conservation errors inside `1x-3`.
- **VER-010:** Hydrological authoritative mass fields use Float64 storage; declared water tolerance remains unchanged.
- **VER-011:** Frozen branch inheritance, stale-future snapshot invalidation, tick-zero replay, repeated rewind, nested-fork isolation, common-history lock, and comparison/capture restoration retain regression evidence.
- **VER-012:** Timeline event inheritance, rewind visibility filtering, derived-event regeneration, and exact-tick closed-band chronology retain regression evidence.
- **VER-013:** Engine boundaries normalize/clamp invalid deployment/count/fork/selected-cell inputs and reject unknown process toggles.
- **VER-014:** Three.js static health scan reports 100/100, 0 findings, after browser diagnostics and renderer UV work.
- **VER-015:** Fail-closed CI safeguards reject authoritative randomness, runtime networking references, forbidden literal ring-description terminology, stale implementation markers, and Git whitespace errors.
- **VER-016:** Chrome first-look startup verifies a real WebGL canvas, nonzero canvas dimensions, branch A/tick 0 state, and no unexpected console/page errors.
- **VER-017:** Chrome pointer/raycast journeys verify Fault-Tongue, Cloudmaw, Ringthroat starvation, Gorevault feedstock-to-orbital growth, rewind, fork/common history, branch divergence/comparison, and provenance inspection.
- **VER-018:** Browser semantics verify named regions/buttons, keyboard cell traversal and activation, disabled branch/comparison states, reduced-motion damping behavior, and `390 x 844` composition without global horizontal overflow.
- **VER-019:** Pathological Chrome interaction test passes rapid play/pause, layer switching, branch switching, timeline scrubbing, resize storms, camera input, five reset cycles, and WebGL loss/restoration.
- **VER-020:** WebGL context recovery is directly verified with `WEBGL_lose_context`: lost state becomes visible, restoration event completes, the lost-state marker clears, diagnostics report `contextLost=false`, and rendering resumes.
- **VER-021:** Final CI lifecycle smoke returns renderer geometry/texture and unique scene resource counts to baseline after three reset cycles; heap delta is `+424396` bytes and latest simulation step is about `0.829 ms`.
- **VER-022:** Eight browser screenshots were reviewed objectively with no blank canvas, primary-region overlap, global narrow-viewport overflow, or tested state/layer mismatch observed.
- **VER-023:** Renderer longitude mapping is periodic (`u=0` and `u=1` map to the same meridian), latitude remains clamped, and non-finite UV inputs normalize to a safe in-grid fallback; dedicated regressions pass.
- **VER-024:** Seeded planet noise is exactly periodic across the longitude boundary for all generator scales used by terrain, humidity, and crust fields; the artificial antimeridian scar measured in the prior generator is removed.
- **VER-025:** State hashing distinguishes scalar pipeline/orbital differences below Float32 resolution by hashing full Float64 scalar bits.
- **VER-026:** Chrome stress validation proves explicit `DEPLOYED · PRESS PLAY` feedback survives pointer hover and is cleared/re-derived on play, rewind, fork, branch switch, and reset.
- **VER-027:** Final run `32262340227` passes both jobs on exact PR #4 head `2b10b7ab0c4652f013e986641fd2a379c25e3a51`; PR #4 was scope-clean and squash-merged as `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e`.

## 6. Known Not Working

- **BRK-001:** The current local Chromium policy still blocks localhost HTTP and `file://` before application load. This is an execution-environment limitation, not a current product failure; GitHub Actions Chrome is the verified browser route.
- **BRK-002:** Direct shell networking from this execution container remains unreliable for GitHub/npm acquisition; GitHub Actions provides the verified clean-build/browser environment instead.

## 7. Implemented but Unverified

- **UNV-001:** Subjective visual quality, clarity, and first-impression effectiveness for the user on their own display/hardware.
- **UNV-002:** Physical touch/coarse-pointer feel on representative devices rather than viewport emulation alone.
- **UNV-003:** Target-GPU frame-time distributions, GPU-specific cost, sustained long-session stability, and physical-device thermals.
- **UNV-004:** Cross-browser behavior outside the verified Chrome path.

## 8. Unknown or Evidence-Stale State

- **UNK-001:** Whether the current presentation meets the user's visual taste remains unknown until the user's first look.
- **UNK-002:** The 601.26 kB minified main JavaScript chunk produces a Vite advisory warning; whether code splitting improves real startup is unknown without representative network/device evidence.
- **UNK-003:** CI frame timings are not target-hardware evidence because the renderer is ANGLE/SwiftShader.

## 9. Pending Work

- **PND-001:** User performs the human first-look review using `docs/FIRST_LOOK.md` and reports any visual/interaction issues that automation cannot judge.
- **PND-002:** If performance matters after first look, execute `docs/PERFORMANCE_BENCHMARK.md` on representative target hardware and record frame-time percentiles, GPU identity, lifecycle, long-session, and thermal evidence.
- **PND-003:** Revisit bundle splitting only if representative startup evidence shows a meaningful problem worth the added loading/lifecycle complexity.

## 10. Active Decisions, Defaults, and Prohibitions

- **DEC-001:** Use 128 x 64 / 8,192 authoritative cells for v1.
- **DEC-002:** Use normalized/abstract laboratory units unless a physical unit is explicitly defined.
- **DEC-003:** Four implemented process definitions only; no fake completeness for the other 33 entries.
- **DEC-004:** Crimson primarily communicates modeled Drakken material/influence; interface chrome remains dark graphite/cold azure.
- **DEC-005:** Use the single-globe state-delta comparison layer plus numerical deltas as the permitted v1 visual A/B fallback.
- **DEC-006:** Hydrological mass uses Float64 for conservation precision; other high-volume cell fields remain Float32 unless evidence justifies expansion.
- **DEC-007:** Vite remains pinned at `7.3.5`; do not force unsupported transitive overrides without evidence.
- **DEC-008:** Keep the current single-bundle warning visible rather than hiding it or adding speculative code splitting.
- **DEC-009:** Canvas UI effects remain rejected because a second effects layer would compete with the simulated planet and add GPU/lifecycle cost.
- **DEC-010:** Chrome CI screenshots/runtime evidence may verify objective behavior/layout, but may not be promoted into subjective user-taste or target-hardware performance claims.
- **DEC-011:** Browser CI uses the GitHub runner's installed Chrome rather than downloading Playwright Chromium through apt-dependent provisioning.
- **DEC-012:** Playwright owns `tests/browser`; Vitest is scoped to `src/tests` so the runners do not discover each other's suites.

## 11. Validation and Evidence Matrix

| ID | Claim or behavior | State | Evidence | Recheck trigger |
|---|---|---|---|---|
| VAL-001 | Repo identity / `main` / publication | verified | GitHub connector + merged PR #4 `b353be7d...` | before future publication |
| VAL-002 | Clean dependency install | verified | committed lock + run `32262340227` `npm ci` | package/lock/workflow change |
| VAL-003 | Full pinned typecheck | verified | run `32262340227` typecheck PASS | TS/dependency/config change |
| VAL-004 | Unit/regression suite | verified | 13 files / 46 tests PASS | simulation/history/renderer-helper/test change |
| VAL-005 | Production build | verified | Vite 7.3.5 build + artifact | source/dependency/build change |
| VAL-006 | Runtime dependency gate | verified | runtime audit: 0 vulnerabilities | dependency/lock change |
| VAL-007 | Current-generator multi-seed conservation/stress | verified | run `32262340227`: 16 seeds x 120 ticks PASS | simulation/generator/state numeric change |
| VAL-008 | Lawful closed-band reachability | verified | direct tick-1026 closure + CI fullPipeline | Gorevault/Ringthroat change |
| VAL-009 | Branch/history/timeline invariants | verified | direct + Vitest fixtures | history/event/action change |
| VAL-010 | Three.js static architecture | verified | health audit 100/100, 0 findings | renderer/UI architecture change |
| VAL-011 | Static source safeguards | verified | fail-closed CI | source/doc change |
| VAL-012 | Chrome WebGL startup / console | verified | run `32262340227` Playwright | renderer/entry/build change |
| VAL-013 | Automated first-look journeys | verified | run `32262340227`: 10/10 Playwright browser suite | UI/simulation/render interaction change |
| VAL-014 | Pointer/raycast and periodic UX boundary mapping | verified | Chrome journeys + periodic `gridUv` regressions | renderer geometry/picking/grid change |
| VAL-015 | Responsive/keyboard/reduced motion | verified | Playwright semantics tests + 390 x 844 screenshot | UI/CSS/input change |
| VAL-016 | WebGL context loss/restoration | verified | spec-compliant `WEBGL_lose_context` browser test | renderer lifecycle change |
| VAL-017 | CI reset/resource lifecycle | verified | 3 reset cycles return resource counts to baseline | renderer/disposal/reset change |
| VAL-018 | CI frame-time smoke | partially-verified | capture exists; SwiftShader makes target-hardware comparison invalid | target hardware capture |
| VAL-019 | Human visual judgment | unknown | user has not yet performed first look | user inspection |
| VAL-020 | Target-hardware sustained performance/thermals | implemented-unverified | benchmark contract exists; no representative-device capture | representative hardware run |
| VAL-021 | Periodic seeded world / antimeridian continuity | verified | exact `planetNoise(0)==planetNoise(GRID_WIDTH)` regressions + final 46-test suite | generator/noise/grid change |
| VAL-022 | Full-precision state hash | verified | sub-Float32 scalar-delta regression | state/hash/scalar-storage change |
| VAL-023 | Targeting feedback ownership/state synchronization | verified | final Chrome stress test in run `32262340227` | UI targeting/hover/navigation change |

## 12. Current Change Scope and Impact Radius

- **Allowed to change:** v1 repository source/docs/continuity files required by the build contract.
- **Protected:** deterministic causality, conservation, canon/model boundary, branch/history truth, non-destructive Git history, no external runtime assets/networking, one application-owned frame loop.
- **Mandatory checks on simulation changes3��� clean install/typecheck, full tests, determinism/conservation/history fixtures, static safeguards.
- **Mandatory checks on renderer/UI/browser changes:** production build, browser first-look/semantics/stress path, and relevant lifecycle evidence.
- **Current repair class:** final pre-test defect sweep merged; no unresolved confirmed causal-core/history/build/topology/hash/primary-Chrome-journey defect remains in the inspected scope.
- **Completion boundary:** automation cannot replace the user's subjective first look or representative target-hardware performance/thermal evidence.

## 13. Compact Revision Log

### Revision 1 — 2026-08-18T19:03:00-04:00

- Initialized control plane against an empty local/remote baseline.

### Revision 2 — 2026-08-18T20:13:41-04:00

- Promoted the initial published implementation and direct causal-core validation; dependency/browser proof remained unavailable.

### Revision 3 — 2026-08-18T20:55:11-04:00

- Promoted merged bug-sweep commit `ef9f7adf61621369b0463e53d004dc65e01a7312`; verified history/timeline repairs while dependency/browser proof remained unverified.

### Revision 4 — 2026-08-18T23:12:00-04:00

- Promoted pre-look hardening release `10de6dbe0459a97528a27f2df3e13e1850eef0eb`.
- Verified genuine lockfile and clean `npm ci`, strict typecheck, 12 files / 41 tests, Vite build, dependency gate, 64-seed stress, lawful closed-band reachability, Three.js static health, and fail-closed source hygiene.
- Browser/WebGL first-look and runtime lifecycle remained unverified.

### Revision 5 — 2026-08-19T09:21:54-04:00

- **Baseline promoted:** browser-validation release `9e43a8be856facb43953305d95efd81b3f1f0e74` on `main`.
- **Newly verified:** real Chrome/WebGL startup; 10/10 Playwright journeys; Fault-Tongue/Cloudmaw/Gorevault/Ringthroat first-look paths; pointer/raycast interaction; rewind/fork/comparison/provenance; keyboard/responsive/reduced-motion behavior; pathological controls; repeated reset lifecycle; WebGL context loss/restoration; renderer UV seam/pole clamping.
- **Dependency suite expanded:** 13 Vitest files / 43 tests PASS; clean build and static gates remain green.
- **Runtime evidence added:** CI lifecycle capture shows stable renderer resource counts across resets, bounded heap delta, and sub-millisecond latest simulation step.
- **Evidence boundary preserved:** SwiftShader frame timings are NOT COMPARABLE to target hardware; subjective visual taste, physical touch feel, target-device FPS/thermals, and long-session stability remain unverified.
- **Completion state:** PARTIAL / partially verified pending the user's human first look and, if warranted, representative target-hardware performance validation.

### Revision 6 — 2026-08-19T10:20:00-04:00

- **Baseline promoted:** final pre-test defect-sweep release `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e` on `main`.
- **Confirmed defects repaired:** periodic renderer longitude mapping, periodic seeded initial-world noise, full-precision scalar state hashing, stale targeting state across navigation transitions, and pointer-hover erasure of explicit deployment/history-lock feedback.
- **Regression suite expanded:** 13 Vitest files / 46 tests PASS on run `32262340227`; final real-Chrome suite remains 10/10 PASS on the exact merged candidate.
- **Scope gate:** seven authorized source/test files only; no dependency/lock/config change, no helper-workflow residue, no generated artifacts, no unrelated formatting churn.
- **Evidence boundary corrected:** the older 64-seed direct stress numbers are retained as historical pre-periodic-generator evidence; current-generator proof is the dependency-backed stress/full-pipeline suite on run `32262340227`.
- **Deliberate non-change:** the 128 x 64 pole-row representation was not redesigned; doing that correctly would change the simulation model rather than repair a bounded pre-test defect.
- **Completion state:** PARTIAL / partially verified only for subjective user judgment and representative physical-device/target-hardware performance, thermals, and long-session behavior.
