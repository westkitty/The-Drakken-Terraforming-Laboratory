# Operational State: The Drakken Terraforming Laboratory

<!-- operational-state:metadata
{
  "schema_version": 1,
  "project_id": "drakken-terraforming-laboratory",
  "project_name": "The Drakken Terraforming Laboratory",
  "project_root": "/mnt/data/The-Drakken-Terraforming-Laboratory",
  "artifact_path": null,
  "state_revision": 5,
  "last_updated": "2026-08-19T09:21:54-04:00",
  "current_baseline": {
    "identity": "browser-validation release 9e43a8be856facb43953305d95efd81b3f1f0e74 on main",
    "state": "partially-verified",
    "last_verified": "2026-08-19T09:21:54-04:00"
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
- **Published application baseline:** browser-validation release `9e43a8be856facb43953305d95efd81b3f1f0e74` on `main`.
- **Canonical authority:** current build contract, `docs/CANON_BOUNDARIES.md`, then applicable Starsilk/Drakken canon.
- **Governed v1 scope:** Fault-Tongue, Cloudmaw, Gorevault, Ringthroat; deterministic planet state; environment response; conservation ledgers; provenance; snapshots/rewind; branching; comparison; state-derived Three.js rendering; DOM laboratory UI; tests/docs.
- **Out of scope:** remaining Drakken entries, Mother, Notebook mutation editor, combat/game progression, backend/database/cloud persistence, external runtime assets, React/R3F, WebGPU, workers, physics, audio, production deployment.

## 2. Current Baseline

- **Application source:** browser-validation PR #3 squash-merged to `main` as `9e43a8be856facb43953305d95efd81b3f1f0e74`.
- **Dependency reproducibility:** committed npm lockfile; clean `npm ci` verified in GitHub Actions.
- **Dependency-backed validation:** strict TypeScript, 13 Vitest files / 43 tests, Vite `7.3.5` production build, runtime dependency gate, static safeguards, and build artifact export pass on run `32256868714`.
- **Authoritative simulation:** direct extended stress and dependency-backed regression suites pass.
- **Three.js architecture:** static health audit remains 100/100 with 0 findings.
- **Browser path:** production build exercised in Google Chrome `151.0.7922.108`; 10/10 Playwright tests pass, including real WebGL startup, first-look journeys, keyboard/responsive checks, pathological controls, repeated resets, and context loss/restoration.
- **Browser evidence:** artifact `9366713842` contains Playwright results, performance smoke data, and eight state screenshots.
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
- **INV-016:** Renderer UV-to-grid mapping must clamp seam/pole offsets into the authoritative 128 x 64 cell lattice.
- **INV-017:** Browser diagnostics and test instrumentation remain presentation/read-only observability and must not create a second application frame loop.

## 5. Verified Working Behavior

- **VER-001:** Correct GitHub repository, `main`, public visibility, and push/admin permission verified through the GitHub connector.
- **VER-002:** Pre-look hardening release `10de6dbe0459a97528a27f2df3e13e1850eef0eb` and browser-validation release `9e43a8be856facb43953305d95efd81b3f1f0e74` were merged non-destructively.
- **VER-003:** Clean `npm ci` succeeds from the committed lockfile on the Node 22 GitHub-hosted Ubuntu runner.
- **VER-004:** Strict TypeScript typecheck passes.
- **VER-005:** Dependency-backed Vitest passes 13 files / 43 tests, including determinism, conservation, history, branch isolation, boundaries, stress, full material-chain closure, keyboard logic, and renderer UV clamping.
- **VER-006:** Vite `7.3.5` production build passes and produces a CI build artifact.
- **VER-007:** Runtime dependency gate reports 0 runtime vulnerabilities; full install reports one low dev-only issue and no moderate/high/critical findings.
- **VER-008:** Extended direct 64-seed x 160-tick stress passes with worst water drift `2.4101609596982598e-11`, pipeline error `8.881784197001252e-14`, and whole-system error `0.00001378257275064243`.
- **VER-009:** Lawful high-coverage Gorevault -> Ringthroat run reaches closed state at tick 1026 with conservation errors inside `1e-3`.
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
- **VER-021:** CI lifecycle smoke returns renderer geometry/texture and unique scene resource counts to baseline after three reset cycles; heap delta is `+412796` bytes and latest simulation step is about `0.465 ms`.
- **VER-022:** Eight browser screenshots were reviewed objectively with no blank canvas, primary-region overlap, global narrow-viewport overflow, or tested state/layer mismatch observed.

## 6. Known Not Working

- **BRK-001:** The current local Chromium policy still blocks localhost HTTP and `file://` before application load. This is an execution-environment limitation, not a current product failure; GitHub Actions Chrome is the verified browser route.
- **BRK-002:** Direct shell networking from this execution container remains unreliable for GitHub/npm acquisition; GitHub Actions provides the verified clean-build/browser environment.

## 7. Implemented but Unverified

- **UNV-001:** Subjective visual quality, clarity, and first-impression effectiveness for the user on their own display/hardware.
- **UNV-002:** Physical touch/coarse-pointer feel on representative devices rather than viewport emulation alone.
- **UNV-003:** Target-GPU frame-time distributions, GPU-specific cost, sustained long-session stability, and physical-device thermals.
- **UNV-004:** Cross-browser behavior outside the verified Chrome path.

## 8. Unknown or Evidence-Stale State

- **UNK-001:** Whether the current presentation meets the user's visual taste remains unknown until the user's first look.
- **UNK-002:** The 600.86 kB minified main JavaScript chunk produces a Vite advisory warning; whether code splitting improves real startup is unknown without representative network/device evidence.
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
| VAL-001 | Repo identity / `main` / publication | verified | GitHub connector + merged PR #3 `9e43a8be...` | before future publication |
| VAL-002 | Clean dependency install | verified | committed lock + run `32256868714` `npm ci` | package/lock/workflow change |
| VAL-003 | Full pinned typecheck | verified | run `32256868714` typecheck PASS | TS/dependency/config change |
| VAL-004 | Unit/regression suite | verified | 13 files / 43 tests PASS | simulation/history/renderer-helper/test change |
| VAL-005 | Production build | verified | Vite 7.3.5 build + artifact | source/dependency/build change |
| VAL-006 | Runtime dependency gate | verified | runtime audit: 0 vulnerabilities | dependency/lock change |
| VAL-007 | Extended multi-seed conservation | verified | 64 x 160 direct stress | simulation/state numeric change |
| VAL-008 | Lawful closed-band reachability | verified | direct tick-1026 closure + CI fullPipeline | Gorevault/Ringthroat change |
| VAL-009 | Branch/history/timeline invariants | verified | direct + Vitest fixtures | history/event/action change |
| VAL-010 | Three.js static architecture | verified | health audit 100/100, 0 findings | renderer/UI architecture change |
| VAL-011 | Static source safeguards | verified | fail-closed CI | source/doc change |
| VAL-012 | Chrome WebGL startup / console | verified | run `32256868714` Playwright | renderer/entry/build change |
| VAL-013 | Automated first-look journeys | verified | 10/10 Playwright browser suite | UI/simulation/render interaction change |
| VAL-014 | Pointer/raycast and UV boundary mapping | verified | Chrome journeys + `gridUv` regression tests | renderer geometry/picking/grid change |
| VAL-015 | Responsive/keyboard/reduced motion | verified | Playwright semantics tests + 390 x 844 screenshot | UI/CSS/input change |
| VAL-016 | WebGL context loss/restoration | verified | spec-compliant `WEBGL_lose_context` browser test | renderer lifecycle change |
| VAL-017 | CI reset/resource lifecycle | verified | 3 reset cycles return resource counts to baseline | renderer/disposal/reset change |
| VAL-018 | CI frame-time smoke | partially-verified | capture exists; SwiftShader makes target-hardware comparison invalid | target hardware capture |
| VAL-019 | Human visual judgment | unknown | user has not yet performed first look | user inspection |
| VAL-020 | Target-hardware sustained performance/thermals | implemented-unverified | benchmark contract exists; no representative-device capture | representative hardware run |

## 12. Current Change Scope and Impact Radius

- **Allowed to change:** v1 repository source/docs/continuity files required by the build contract.
- **Protected:** deterministic causality, conservation, canon/model boundary, branch/history truth, non-destructive Git history, no external runtime assets/networking, one application-owned frame loop.
- **Mandatory checks on simulation changes:** clean install/typecheck, full tests, determinism/conservation/history fixtures, static safeguards.
- **Mandatory checks on renderer/UI/browser changes:** production build, browser first-look/semantics/stress path, and relevant lifecycle evidence.
- **Current repair class:** browser-validation release merged; no unresolved confirmed causal-core/history/build/primary-Chrome-journey defect remains in the inspected scope.
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
