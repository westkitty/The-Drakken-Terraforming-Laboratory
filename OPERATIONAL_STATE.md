# Operational State: The Drakken Terraforming Laboratory

<!-- operational-state:metadata
{
  "schema_version": 1,
  "project_id": "drakken-terraforming-laboratory",
  "project_name": "The Drakken Terraforming Laboratory",
  "project_root": "/mnt/data/The-Drakken-Terraforming-Laboratory",
  "artifact_path": null,
  "state_revision": 4,
  "last_updated": "2026-08-18T23:12:00-04:00",
  "current_baseline": {
    "identity": "pre-look hardening release 10de6dbe0459a97528a27f2df3e13e1850eef0eb on main",
    "state": "partially-verified",
    "last_verified": "2026-08-18T23:12:00-04:00"
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
- **Published application baseline:** `10de6dbe0459a97528a27f2df3e13e1850eef0eb` on `main`.
- **Canonical authority:** Current build contract, `docs/CANON_BOUNDARIES.md`, then applicable Starsilk/Drakken canon.
- **Governed v1 scope:** Fault-Tongue, Cloudmaw, Gorevault, Ringthroat; deterministic planet state; environment response; conservation ledgers; provenance; snapshots/rewind; branching; comparison; state-derived Three.js rendering; DOM laboratory UI; tests/docs.
- **Out of scope:** Remaining Drakken entries, Mother, Notebook mutation editor, combat/game progression, backend/database/cloud persistence, external runtime assets, React/R3F, WebGPU, workers, physics, audio, production deployment.

## 2. Current Baseline

- **Application source:** Pre-look hardening release merged to `main` as `10de6dbe0459a97528a27f2df3e13e1850eef0eb`.
- **Dependency reproducibility:** Genuine npm lockfile committed; clean `npm ci` verified in GitHub Actions.
- **Dependency-backed validation:** TypeScript typecheck, 12 Vitest files / 41 tests, Vite production build, runtime dependency gate, and build artifact export pass on the release candidate.
- **Authoritative simulation:** Direct extended stress and dependency-backed regression suites pass.
- **Three.js architecture:** Static health audit scores 100/100 with 0 findings; this does not substitute for browser runtime proof.
- **Three.js renderer and DOM UI:** Source-hardened and statically inspected; real rendered/browser interaction remains unverified in this environment.
- **Delivery:** Source is published on `main`; build artifact has been produced by CI.
- **Overall state:** PARTIAL / partially verified because the actual browser/WebGL first-look path and runtime performance/lifecycle capture remain unavailable here.

## 3. Artifact Contract

- Vanilla TypeScript, Three.js, Vite, Vitest, semantic HTML, vanilla CSS.
- 128 x 64 / 8,192-cell authoritative planetary lattice.
- Fixed-step deterministic simulation; Three.js and DOM are presentation only.
- Exactly four simulated v1 processes: Fault-Tongue, Cloudmaw, Gorevault, Ringthroat.
- Conserved modeled water and convertible material.
- Ringthroat may build orbital material only from Gorevault-refined feedstock.
- Genuine snapshot/replay rewind, branch fork/divergence, numerical A/B comparison.
- State-derived incomplete crystalline Blood Ring band; no generic Saturn-like representation.
- No external runtime networking/assets, React/R3F, backend, database, or unmodeled material creation.

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

## 5. Verified Working Behavior

- **VER-001:** Correct GitHub repository, `main`, public visibility, and push/admin permission verified through the GitHub connector.
- **VER-002:** Pre-look hardening PR #2 was reviewed, CI-gated, and squash-merged non-destructively as `10de6dbe0459a97528a27f2df3e13e1850eef0eb`.
- **VER-003:** Clean `npm ci` succeeds from the committed `package-lock.json` on Node 22 / npm 10 GitHub-hosted Ubuntu runner.
- **VER-004:** `npm run typecheck` passes with strict TypeScript plus unused-local/unused-parameter checks.
- **VER-005:** Dependency-backed Vitest passes 12 test files / 41 tests, including determinism, conservation, history, branch isolation, engine boundaries, stress, and full material-chain closure.
- **VER-006:** Vite `7.3.5` production build passes and produces a CI build artifact.
- **VER-007:** Runtime dependency audit gate reports 0 runtime vulnerabilities; full audit reports one low dev-only transitive `esbuild` issue and 0 moderate/high/critical findings.
- **VER-008:** Extended direct 64-seed x 160-tick stress run passes with worst water drift `2.4101609596982598e-11`, pipeline error `8.881784197001252e-14`, and whole-system error `0.00001378257275064243`.
- **VER-009:** Lawful high-coverage Gorevault -> Ringthroat direct run reaches closed state at tick 1026 with coverage 1, continuity 1, integrity about 0.8208, and conservation errors well inside `1e-3`.
- **VER-010:** Hydrological authoritative mass fields use Float64 storage; the declared water tolerance remains unchanged.
- **VER-011:** Frozen branch inheritance, stale-future snapshot invalidation, tick-zero replay after snapshot eviction, repeated rewind, nested-fork isolation, common-history lock, and comparison/capture restoration retain direct regression evidence.
- **VER-012:** Timeline event inheritance, rewind visibility filtering, derived-event regeneration, and exact-tick closed-band chronology retain direct regression evidence.
- **VER-013:** Engine boundaries normalize/clamp invalid deployment, count, fork, and selected-cell inputs and reject unknown process toggles; fixtures pass.
- **VER-014:** Three.js static health scan reports 100/100, 0 findings, with one loop, fixed-step signals, pinned Three.js, cleanup paths, DPR cap, and explicit WebGL context-loss/restoration handling.
- **VER-015:** Web Authorship Gate passes with only scoped allowances for the required internal Project Bible successor-handoff wording and generated npm lock metadata.
- **VER-016:** Fail-closed CI safeguards reject authoritative randomness, runtime networking references, forbidden literal ring-description terminology, stale implementation markers, and Git whitespace errors.

## 6. Known Not Working

- **BRK-001:** The current local Chromium policy blocks both localhost HTTP and `file://` before application load, so this environment cannot perform real WebGL/browser user-path validation.
- **BRK-002:** Direct shell networking from this execution container remains unreliable for GitHub/npm acquisition; GitHub Actions provides the verified clean-build environment instead.

## 7. Implemented but Unverified

- **UNV-001:** Actual Three.js WebGL visual composition and GPU output on a normal browser/device.
- **UNV-002:** End-to-end pointer/raycast and complete `docs/FIRST_LOOK.md` journeys through the real rendered application.
- **UNV-003:** Responsive composition and coarse-pointer behavior on representative real viewports/devices.
- **UNV-004:** WebGL context-loss/restoration behavior on an actual GPU/browser path.
- **UNV-005:** Measured FPS/frame-time/memory/resource recovery, long-session stability, and target-device thermal behavior using `docs/PERFORMANCE_BENCHMARK.md`.

## 8. Unknown or Evidence-Stale State

- **UNK-001:** Visual taste/clarity of the first-look UI remains unknown until a normal browser renders the current `main` build.
- **UNK-002:** The 599.24 kB minified main JavaScript chunk produces a Vite advisory warning; whether code splitting would improve first-load experience is unknown without browser/network evidence.

## 9. Pending Work

- **PND-001:** Run all seven checks in `docs/FIRST_LOOK.md` in a normal browser and record pass/fail evidence.
- **PND-002:** Execute `docs/PERFORMANCE_BENCHMARK.md` and record frame-time percentiles, slow-frame rate, simulation timing, `renderer.info` reset-cycle behavior, and context-loss result.
- **PND-003:** Revisit bundle splitting only if browser evidence shows startup cost worth the added loading/lifecycle complexity.

## 10. Active Decisions, Defaults, and Prohibitions

- **DEC-001:** Use 128 x 64 / 8,192 authoritative cells for v1.
- **DEC-002:** Use normalized/abstract laboratory units unless a physical unit is explicitly defined.
- **DEC-003:** Four implemented process definitions only; no fake completeness for the other 33 entries.
- **DEC-004:** Crimson primarily communicates modeled Drakken material/influence; interface chrome remains dark graphite/cold azure.
- **DEC-005:** Use the single-globe state-delta comparison layer plus numerical deltas as the permitted v1 visual A/B fallback.
- **DEC-006:** Hydrological mass uses Float64 for conservation precision; other high-volume cell fields remain Float32 unless evidence justifies expansion.
- **DEC-007:** Vite is pinned at `7.3.5`; do not force a transitive `esbuild` override without a supported Vite 7 path or a verified need.
- **DEC-008:** Keep the current single bundle warning visible rather than raising the warning threshold or adding speculative code splitting.
- **DEC-009:** Canvas UI effects were evaluated and rejected for this pass because a second effects layer would compete with the simulated planet and add GPU/lifecycle cost.
- **DEC-010:** Do not upgrade any browser/runtime `UNV-*` item from source presence, build success, or static inspection alone.

## 11. Validation and Evidence Matrix

| ID | Claim or behavior | State | Evidence | Recheck trigger |
|---|---|---|---|---|
| VAL-001 | Repo identity / `main` / publication | verified | GitHub connector + merged PR #2 | before future publication |
| VAL-002 | Clean dependency install | verified | committed lock + CI `npm ci` | package/lock/workflow change |
| VAL-003 | Full pinned typecheck | verified | CI `npm run typecheck` PASS | TS/dependency/config change |
| VAL-004 | Full test suite | verified | 12 files / 41 tests PASS | simulation/history/test change |
| VAL-005 | Production build | verified | Vite 7.3.5 CI build + artifact | source/dependency/build change |
| VAL-006 | Runtime dependency gate | verified | `npm audit --omit=dev --audit-level=high`: 0 | dependency/lock change |
| VAL-007 | Extended multi-seed conservation | verified | 64 x 160 direct stress | simulation/state numeric change |
| VAL-008 | Lawful closed-band reachability | verified | direct tick-1026 closure + CI fullPipeline | Gorevault/Ringthroat change |
| VAL-009 | Branch/history/timeline invariants | verified | direct + Vitest fixtures | history/event/action change |
| VAL-010 | Three.js static architecture | verified | health audit 100/100, 0 findings | renderer/UI architecture change |
| VAL-011 | Static source safeguards | verified | fail-closed CI + local scan | any source/doc change |
| VAL-012 | Web authorship | verified | scanner PASS with scoped internal/generated allowances | user-facing copy/metadata change |
| VAL-013 | Browser first-look journeys | unknown | local browser blocked before load | normal browser available |
| VAL-014 | Runtime performance/lifecycle | implemented-unverified | benchmark contract exists; no real capture | runnable browser/device available |

## 12. Current Change Scope and Impact Radius

- **Allowed to change:** v1 repository source/docs/continuity files required by the build contract.
- **Protected:** deterministic causality, conservation, canon/model boundary, branch/history truth, non-destructive Git history, no external runtime assets/networking.
- **Mandatory checks on simulation changes:** clean install/typecheck, full tests, determinism/conservation/history fixtures, static safeguards.
- **Mandatory checks before COMPLETE:** real browser `FIRST_LOOK` journeys plus runtime/lifecycle capture where required by the build contract.
- **Current repair class:** Pre-look hardening release merged; no unresolved confirmed causal-core/history/build defect remains in inspected scope.

## 13. Compact Revision Log

### Revision 1 — 2026-08-18T19:03:00-04:00

- Initialized control plane against an empty local/remote baseline.

### Revision 2 — 2026-08-18T20:13:41-04:00

- Promoted the initial published implementation and direct causal-core validation; dependency/browser proof remained unavailable.

### Revision 3 — 2026-08-18T20:55:11-04:00

- Promoted merged bug-sweep commit `ef9f7adf61621369b0463e53d004dc65e01a7312`; verified history/timeline repairs while dependency/browser proof remained unverified.

### Revision 4 — 2026-08-18T23:12:00-04:00

- **Baseline promoted:** pre-look hardening release `10de6dbe0459a97528a27f2df3e13e1850eef0eb` on `main`.
- **Newly verified:** genuine lockfile and clean `npm ci`; strict typecheck; 12 files / 41 tests; Vite 7.3.5 production build; runtime dependency gate; 64-seed stress; lawful closed-band reachability; 100/100 Three.js static health; fail-closed source hygiene.
- **Improved:** first-session UI hierarchy, responsive/coarse-pointer source rules, keyboard operation, renderer dirty-state/allocation behavior, WebGL context recovery path, engine input boundaries, first-look and benchmark documentation.
- **Resolved stale evidence:** prior “CI unknown / package install unavailable” project claims are superseded by current GitHub Actions evidence. Direct local shell/browser constraints remain environment-specific.
- **Still unverified:** real rendered browser/WebGL first-look journeys and measured runtime performance/lifecycle behavior.
- **Completion state:** PARTIAL / partially verified until those user-facing runtime proofs exist.
