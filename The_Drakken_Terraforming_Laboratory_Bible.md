# The Drakken Terraforming Laboratory Project Bible

## Bootstrap Prompt for Successor AI
Copy and paste the following to a successor AI working inside this repository:

```text
Read `The_Drakken_Terraforming_Laboratory_Bible.md` first and treat it as the authoritative additive project state record. Then read `OPERATIONAL_STATE.md` as the current control plane and inspect the repository itself to verify current state, file layout, implementation details, and validation evidence. If repository state has drifted from the bible, append a reconciliation entry instead of rewriting prior history. Use the bible plus repository as the complete handoff source. Continue from the current state and append every meaningful completed work unit additively. Never delete, reorder, or rewrite earlier ledger entries; append a correction entry when prior information is superseded.
```

## Project Goal
- Primary objective: Build a browser-based Three.js planetary causality laboratory where deterministic Drakken processes transform an authoritative simulated world state.
- Success criteria: Real state-driven tectonics/hydrology/material processing/orbital construction; conservation; seeded determinism; genuine rewind; branching; A/B comparison; inspection/provenance; state-derived rendering; complete local build and test evidence.

## Scope
- Included: Vanilla TypeScript, Three.js, Vite, Vitest, semantic HTML/CSS; 8,192-cell model; Fault-Tongue, Cloudmaw, Gorevault, Ringthroat; environmental response; ledgers; snapshots/replay; branches; comparison; laboratory UI; docs and tests.
- Excluded: Remaining Drakken implementation, Mother, Notebook mutation editor, combat/game progression, backend/database/cloud persistence, external runtime assets, React/R3F, WebGPU, physics, workers unless measured necessity, audio, production deployment.

## Constraints
- Technical constraints: PlanetState is authoritative; fixed-step simulation; deterministic PRNG; no external runtime networking/assets; no ex-nihilo material; state-derived Blood Ring; one frame-loop owner; explicit Three.js disposal.
- Tooling constraints: Current container cannot resolve `github.com` directly; GitHub connector remains available for remote reads/writes.
- Time or delivery constraints: Build the smallest v1 that proves the complete causality/history/comparison concept; no polish-driven scope expansion.

## Assumptions
- The current user build contract is controlling.
- Numerical rates/thresholds are LAB MODEL parameters, not canon.
- Node 22.16.0 and npm 10.9.2 are the available local runtime unless evidence changes.

## Architecture / Design
- System shape: `PlanetState -> SimulationEngine -> PlanetState`; separately `PlanetState -> Three.js renderer` and `PlanetState -> DOM UI`.
- Key components: deterministic grid/generator, fixed-step engine, four process systems, environmental system, material/provenance ledgers, snapshot/branch/replay system, delta comparison, planet/orbit renderers, semantic DOM controls.
- Important patterns: Structure-of-Arrays typed state; seeded integer PRNG; stable update order; cached spatial kernels; periodic bounded snapshots; state hash for deterministic verification.

## File Map
- `OPERATIONAL_STATE.md`: current evidence/control plane.
- `The_Drakken_Terraforming_Laboratory_Bible.md`: append-only project history and handoff ledger.
- `.gitignore`: generated/local exclusions.
- Application/docs/tests: pending bootstrap.

## Current State Summary
- Project status: Repository continuity bootstrap complete; application code not yet created.
- What already exists: Local Git repository on `main`, exact `origin`, `.gitignore`, Operational State, Project Bible.
- What is missing: Entire application/toolchain, tests, docs, commits, browser validation, remote publication.

## Open Questions
- Browser-interaction proof depends on whether a runnable browser path is available in this environment; if not, it must remain implemented-unverified rather than claimed.

## Chronological Ledger

### Entry 1 - Repository and continuity bootstrap
Summary:
- Confirmed the requested GitHub repository is still empty and initialized a safe local repository baseline after direct clone failed due container DNS.
- Created `.gitignore`, `OPERATIONAL_STATE.md`, and this Project Bible.

Reason / Intent:
- Establish repository identity, non-destructive local work surface, current evidence state, and append-only handoff history before substantive implementation.

Files Changed:
- `.gitignore`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Commands Run:
```text
pwd
ls -la
node --version
npm --version
git --version
whoami
hostname
git clone https://github.com/westkitty/The-Drakken-Terraforming-Laboratory.git /mnt/data/The-Drakken-Terraforming-Laboratory
git init -b main
git remote add origin https://github.com/westkitty/The-Drakken-Terraforming-Laboratory.git
```

Command Intent:
- Prove local execution identity/tool availability, attempt the prescribed clone, then use the safe empty-repo fallback after DNS prevented clone.

Outputs Generated:
- Local Git repository rooted at `/mnt/data/The-Drakken-Terraforming-Laboratory`.
- Continuity/control-plane files.

Decisions:
- Preserve exact `origin` URL and `main` branch.
- Record direct GitHub network access as unavailable rather than pretending clone/push works.
- Use GitHub connector for remote verification/publication if shell networking remains unavailable.

Bugs / Blockers:
- Direct `git clone` failed with `Could not resolve host: github.com` before any target directory was created.

Correction:
- None.

State After Completion:
- Safe local repository exists with no application code and no commits. Remote remains independently verified empty.

Next Step / Handoff:
- Read this bible and `OPERATIONAL_STATE.md`, lock canon/product purpose, then initialize the exact TypeScript/Three.js/Vite/Vitest toolchain.

### Entry 2 - Canon boundary lock
Summary:
- Added the controlling canon boundary document for the four v1 Drakken processes and the Gorevault-to-Ringthroat material chain.

Reason / Intent:
- Prevent simulation coefficients and implementation conveniences from silently becoming Starsilk lore while preserving the exact process functions required by the current build contract.

Files Changed:
- `docs/CANON_BOUNDARIES.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Commands Run:
```text
cat The_Drakken_Terraforming_Laboratory_Bible.md
mkdir -p docs
write docs/CANON_BOUNDARIES.md
append The_Drakken_Terraforming_Laboratory_Bible.md
```

Command Intent:
- Re-read the project history, create the canon/model boundary, and record the completed work unit additively.

Outputs Generated:
- `docs/CANON_BOUNDARIES.md`

Decisions:
- Current build contract controls where older compact canon summaries differ.
- Only Fault-Tongue, Cloudmaw, Gorevault, and Ringthroat receive v1 simulated behavior.
- Every rate, threshold, coefficient, capacity, and abstract unit is LAB MODEL unless explicitly identified otherwise.

Bugs / Blockers:
- None.

Correction:
- None.

State After Completion:
- Canon boundaries are explicit before implementation begins.

Next Step / Handoff:
- Resolve exact compatible dependency versions, initialize the TypeScript/Three.js/Vite/Vitest toolchain, and prove the blank application build.

### Entry 3 - Implementation and validation reconciliation
Summary:
- Reconciled the append-only ledger with the implemented and published v1 source after the earlier bootstrap/canon entries.
- The application source checkpoint is `7384957a748a925c03654093e4a79e09a5cfb41f` on `main`.
- Direct authoritative-simulation execution passes determinism, conservation, rewind, branch divergence, and A/B numerical comparison.
- Full dependency-backed build and real browser proof remain unavailable and are not claimed.

Reason / Intent:
- Earlier ledger history correctly recorded bootstrap and canon locking but did not contain every intermediate implementation work unit. This entry catches the ledger up additively rather than rewriting prior history.
- Preserve a successor-safe distinction between verified core behavior and implemented-but-unverified browser/build behavior.

Files Changed:
- Application/toolchain: `package.json`, `tsconfig.json`, `index.html`, `.github/workflows/validate.yml`.
- Authoritative simulation: `src/simulation/**`.
- Three.js presentation: `src/render/LaboratoryRenderer.ts`.
- DOM laboratory: `src/ui/LaboratoryApp.ts`, `src/styles.css`, `src/main.ts`.
- Focused tests: `src/tests/*.test.ts`.
- Documentation: `README.md`, `docs/ARCHITECTURE.md`, `docs/SIMULATION_MODEL.md`, `docs/CANON_BOUNDARIES.md`, `docs/VALIDATION.md`.
- Continuity control: `OPERATIONAL_STATE.md`, this Bible.

Commands Run:
```text
node --version
npm --version
git --version
npm install --ignore-scripts --offline --package-lock-only
tsc -p /mnt/data/drakken-core-validation/tsconfig.json
node /mnt/data/drakken-core-validation/smoke.cjs
git diff --check
grep static safeguards over src/ and docs/
python3 /home/oai/skills/web-authorship-gate/scripts/audit_web_authorship.py ...
python3 /home/oai/skills/threejs-project-engineer/scripts/inspect_threejs_project.py ...
headless Chromium validation attempts against localhost and file URLs
```

Command Intent:
- Prove local environment identity, attempt the bounded offline lockfile route, compile/execute the authoritative core, verify deterministic/conservation/history invariants, scrub product authorship residue, inspect Three.js ownership/lifecycle signals, and attempt browser execution without claiming unavailable evidence.

Outputs Generated:
- Working source for the deterministic 8,192-cell laboratory.
- Four implemented v1 process pipelines: Fault-Tongue, Cloudmaw, Gorevault, Ringthroat.
- Material and provenance ledgers, snapshot/replay history, branching, comparison, state-derived renderer, inspector/layers/timeline, and focused tests.
- Validation evidence recorded in `docs/VALIDATION.md` and Operational State revision 2.

Decisions:
- Keep `PlanetState` authoritative and Three.js/DOM presentation-only.
- Use the permitted single-globe comparison delta layer plus numerical deltas for v1 rather than expanding scope into split-scissor rendering.
- Add a compact state-field layer legend and explicit Ringthroat STARVED/readout telemetry.
- Accept five low static `scene.add()` inspector notices because every call is inside the single declared renderer owner and that owner provides explicit disposal.
- Allow only the required internal Project Bible `Successor AI` wording in the Web Authorship scanner; no user-facing production credit is allowed.
- Do not synthesize a fake `package-lock.json` without npm dependency resolution.

Bugs / Blockers:
- Shell/container DNS cannot acquire npm packages; offline npm attempt returns `ENOTCACHED` for `@types/three`.
- Chromium organization policy blocks localhost HTTP and `file://` pages before application load.
- The available GitHub connector exposes no workflow status for the push commits, so CI success is unknown.

Correction:
- Entry 1's statement that the remote remained empty is historical and was correct at bootstrap; it is now superseded by the published implementation commits on `main`.
- Source presence is not treated as browser/build verification. Operational State revision 2 is controlling for current proof state.

State After Completion:
- Source implementation is published and the difficult simulation core is directly verified.
- Overall completion state is PARTIAL because `package-lock.json`, pinned dependency typecheck/Vitest/Vite build, real Three.js browser journeys, and runtime performance/lifecycle proof remain unverified in this environment.

Next Step / Handoff:
- In a network-capable environment, generate `package-lock.json` with the pinned dependencies, run `npm ci`, `npm run typecheck`, `npm test`, and `npm run build`, then execute journeys A-G with the real renderer. Promote only the checks that actually pass.


### Entry 4 - Operational State schema correction
Summary:
- Corrected Operational State schema details discovered by the deterministic validator after revision 2 was drafted.

Reason / Intent:
- Keep the project control plane machine-valid instead of merely readable.

Files Changed:
- `OPERATIONAL_STATE.md`
- `docs/VALIDATION.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Commands Run:
```text
python3 /home/oai/skills/operational-state/scripts/operational_state.py validate --file OPERATIONAL_STATE.md --project-id drakken-terraforming-laboratory
python3 /home/oai/skills/web-authorship-gate/scripts/audit_web_authorship.py ...
git diff --check
```

Command Intent:
- Validate continuity schema, re-run authorship checks after final evidence edits, and preserve clean Git whitespace.

Outputs Generated:
- Machine-valid Operational State revision 2.

Decisions:
- Use stable project ID `drakken-terraforming-laboratory`; keep the GitHub repository identity separately as `westkitty/The-Drakken-Terraforming-Laboratory`.
- Preserve the required exact section heading `## 6. Known Not Working`.

Bugs / Blockers:
- Initial revision-2 draft used the repository slug as `project_id` and expanded the required section heading; the validator rejected both.

Correction:
- Supersedes only those two schema details in the earlier revision-2 draft. No application behavior changed.

State After Completion:
- Operational State validates successfully; application completion state remains PARTIAL for the previously recorded environment proof limits.

Next Step / Handoff:
- No further source changes are required in this environment; remaining work is dependency-backed and real-browser validation in a runtime that permits them.

### Entry 5 - Bug sweep history-integrity repair
Summary:
- Reproduced and repaired three deterministic-history defects found during the first bug sweep.
- Child branches now freeze inherited actions at fork time.
- New actions inserted in the past invalidate stale future snapshots for that branch.
- Replay from the generated baseline now correctly applies tick-zero actions after old snapshots are evicted.

Reason / Intent:
- Preserve the laboratory's core promise that rewind, branching, and deterministic replay reflect real authoritative history rather than stale or cross-contaminated state.

Files Changed:
- `src/simulation/types.ts`
- `src/simulation/history/SnapshotStore.ts`
- `src/simulation/SimulationEngine.ts`
- `src/tests/historyRestore.test.ts`
- `src/tests/branchDeterminism.test.ts`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Commands Run:
```text
tsc -p /mnt/data/drakken-bugsweep-core/tsconfig.json
node /mnt/data/drakken-bugsweep-core/repro.cjs
node /mnt/data/drakken-bugsweep-core/smoke.cjs
```

Command Intent:
- Compile the authoritative simulation with strict local TypeScript, reproduce the three history defects as hash mismatches, then rerun the same fixtures and the full prior core smoke suite after the bounded repair.

Outputs Generated:
- Three regression fixtures now pass:
  - post-fork parent-action isolation: `466dc81f == 466dc81f`;
  - past-edit future-snapshot replay: `ef331f8a == ef331f8a`;
  - tick-zero replay after snapshot eviction: `15bfd56c == 15bfd56c`.
- Prior causal-core smoke suite remains PASS, including water/material conservation and exact rewind.

Decisions:
- Branches snapshot their inherited action set at fork creation instead of consulting mutable parent history later.
- Snapshot storage replaces same-tick snapshots, remains tick-sorted, and supports branch-local truncation after past edits.
- Derived future threshold events are invalidated after a past action so they can be regenerated from the changed history.

Bugs / Blockers:
- Fixed BUG-001: parent actions added after a fork could leak into the child branch.
- Fixed BUG-002: past edits could restore stale future snapshots instead of replaying the edited history.
- Fixed BUG-003: replay with no retained baseline snapshot skipped tick-zero actions.
- Dependency-backed Vitest execution remains blocked by the previously recorded npm/network limitation; equivalent direct fixtures were executed successfully.

Correction:
- The earlier implementation statement that child branches inherit parent actions "only through the fork tick" was incomplete: the implementation previously re-read mutable parent history. This entry records the corrected frozen-inheritance behavior.

State After Completion:
- Authoritative history replay, child-branch isolation, and snapshot invalidation pass direct executable regression checks without regressing prior simulation invariants.

Next Step / Handoff:
- Continue the bug sweep across UI state reset, fixed-step backlog behavior, comparison controls, and orbital rendering lifecycle/continuity.

### Entry 6 - Bug sweep UI, renderer, timeline, and validation repair
Summary:
- Completed the second defect-sweep repair pass across timeline derivation, laboratory control state, renderer lifecycle work, accessibility, process telemetry, seed parsing, comparison replay cost, documentation, and validation routing.
- Added pull-request-triggered validation so connector-visible CI can be used for the bug-sweep candidate without changing production runtime behavior.

Reason / Intent:
- Close source-confirmed defects adjacent to the history repair while preserving deterministic causality, conservation, canon/model boundaries, presentation-only Three.js ownership, and non-destructive Git history.

Files Changed:
- `.github/workflows/validate.yml`
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/SIMULATION_MODEL.md`
- `docs/VALIDATION.md`
- `src/simulation/SimulationEngine.ts`
- `src/render/LaboratoryRenderer.ts`
- `src/ui/LaboratoryApp.ts`
- `src/ui/gridKeyboard.ts`
- `src/ui/processTelemetry.ts`
- `src/ui/seedInput.ts`
- `src/styles.css`
- `src/tests/historyRestore.test.ts`
- `src/tests/branchDeterminism.test.ts`
- `src/tests/gridKeyboard.test.ts`
- `src/tests/processTelemetry.test.ts`
- `src/tests/seedInput.test.ts`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Commands Run:
```text
tsc -p /mnt/data/drakken-bugsweep-core/tsconfig.json
node /mnt/data/drakken-bugsweep-core/event-regression.cjs
node /mnt/data/drakken-bugsweep-core/repro.cjs
node /mnt/data/drakken-bugsweep-core/adjacent.cjs
tsc -p /mnt/data/drakken-ui-pure-check/tsconfig.json
node <dependency-free keyboard/status/seed assertions>
node /mnt/data/drakken-bugsweep-core/closure-fast.cjs
python3 /home/oai/skills/threejs-project-engineer/scripts/inspect_threejs_project.py . --json /mnt/data/drakken-bugsweep-threejs-pass2.json
python3 /home/oai/skills/web-authorship-gate/scripts/audit_web_authorship.py . --allowlist /mnt/data/drakken-authorship-allowlist.json --format both --output-dir /mnt/data/drakken-authorship-audit-pass2
grep static safeguards over src/ and docs/
git diff --check
```

Command Intent:
- Reproduce and verify repaired derived-event chronology, prove adjacent history operations remain side-effect free, compile/execute dependency-free UI helpers, demonstrate that the full lawful Gorevault-to-Ringthroat pipeline can reach closed-band state, re-run Three.js static ownership inspection, re-run authorship/static safeguards, and establish a connector-observable CI route.

Outputs Generated:
- Derived milestone replay after a past edit: PASS.
- Comparison/capture event-log side-effect isolation: PASS.
- Repeated rewind/replay: `2200215f` PASS.
- Nested-fork isolation: `48b151a3` PASS.
- Comparison/capture active-state restoration: `0a03729a` PASS.
- Keyboard grid navigation: PASS.
- Ringthroat STARVED/ACTIVE telemetry helper: PASS.
- Seed parsing including seed `0`: PASS.
- Lawful multi-instance Gorevault -> Ringthroat closure stress run: closed at tick 1400 with `bandCoverage=1`, `bandIntegrity≈0.84`, pipeline error `≈1.42e-9`, system error `≈-5.75e-6`.
- Three.js static inspection: 0 high, 0 medium, 5 accepted low scene-owner notices.
- Web authorship audit: PASS with allowlist limited to required internal Project Bible handoff terminology.
- Static network/randomness/Blood Ring terminology checks: PASS.

Decisions:
- User-facing restore regenerates invalidated derived milestone events; comparison/capture replay remains event-side-effect free.
- Reset explicitly pauses playback, clears accumulator/timeline/comparison state, and restores the NORMAL layer instead of inheriting stale experiment UI state.
- Fixed-step backlog is capped at 24 ticks rather than allowed to grow without bound.
- Branch B and COMPARISON controls remain disabled until Branch B actually exists.
- Orbital geometry uses an orbital-state key so unrelated selection/layer dirtiness does not rebuild/dispose it.
- Ring segment span approaches full continuity as modeled continuity reaches 1, allowing the visual band to close when state closes.
- The viewport wrapper is keyboard-focusable; arrows traverse authoritative cells and Enter/Space activates the selected cell. The canvas is presentation-only in the accessibility tree.
- Ringthroat STARVED status ignores already-shaped band mass and instead reflects refined feedstock plus queued/rising/orbital-loose material that can still move.
- Seed parsing accepts `0`, normalizes to the simulation's uint32 seed domain, and only falls back for empty/non-finite input.
- A/B numerical/visual comparison is cached by active branch, comparison branch, and tick so cell inspection does not repeatedly replay unchanged histories.
- README no longer instructs `npm ci` before a genuine lockfile exists.
- Pull-request validation is enabled in addition to existing main-push/manual triggers; no production dependency or runtime route changes.

Bugs / Blockers:
- Fixed BUG-004: derived milestone events could disappear or be stamped late after past edits because restore suppressed regeneration.
- Fixed BUG-005: regenerate/reset left stale playback, accumulator, timeline, layer, and comparison UI state.
- Fixed BUG-006: fixed-step catch-up backlog could grow beyond the intended bounded workload.
- Fixed BUG-007: Branch B/comparison controls could present no-op or misleading states before Branch B existed.
- Fixed BUG-008: orbital geometry was disposed/rebuilt for unrelated renderer dirtiness.
- Fixed BUG-009: orbital segment span was permanently below full continuity, leaving visible gaps even when the modeled band closed.
- Fixed BUG-010: the planet-picking surface had no keyboard-accessible interaction route.
- Fixed BUG-011: Ringthroat could report ACTIVE solely because already-shaped band material existed after its processable supply was exhausted.
- Fixed BUG-012: seed `0` was silently replaced by the default seed.
- Fixed BUG-013: unchanged A/B comparison replay was repeated on each telemetry/selection refresh and null comparison state could dirty the renderer while paused.
- Fixed BUG-014: README instructed `npm ci` despite the repository having no lockfile.
- Remaining blocker: a genuine committed `package-lock.json`, dependency-backed typecheck/Vitest/Vite build, and real-browser Three.js journey proof still require external execution evidence unless the new PR-validation route exposes them.

Correction:
- Entry 5 correctly fixed branch/snapshot history, but its statement that invalidated derived threshold events “can be regenerated” was not yet fully implemented at that point. This entry records the completed event-regeneration mechanism and regression evidence.

State After Completion:
- No unresolved confirmed causal-core defect remains in the inspected source after pass two.
- UI/render fixes are applied and source/pure-helper validated; real DOM/WebGL behavior remains unverified until a runnable browser or dependency-backed CI path supplies that evidence.
- The lawful material chain has direct evidence that closed Blood Ring state is reachable without ex-nihilo material.

Next Step / Handoff:
- Publish this repair set to a non-destructive bug-sweep branch, open a PR against `main`, inspect the pull-request CI result/artifact, use any generated lockfile evidence to close reproducibility if possible, then resweep and merge only validated changes.

### Entry 7 - Bug sweep third-pass chronology and shared-history repair
Summary:
- Completed a third adversarial defect pass over timeline visibility, branch-event inheritance, exact closure chronology, and the invariant that A/B history must remain identical before a declared fork.
- Kept application repairs isolated in pull request #1 while enabling PR validation on the default-branch workflow.

Reason / Intent:
- The laboratory promises genuine causality, rewind, and one past branching into different futures. A timeline that shows future events while rewound, a child branch that loses inherited chronology, or edits that can rewrite shared pre-fork history would violate that purpose even if world-state hashing still appeared deterministic.

Files Changed:
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/SIMULATION_MODEL.md`
- `docs/VALIDATION.md`
- `src/simulation/SimulationEngine.ts`
- `src/ui/LaboratoryApp.ts`
- `src/tests/branchDeterminism.test.ts`
- `src/tests/timelineEvents.test.ts`
- `.github/workflows/validate.yml` on remote `main` only to enable pull-request validation
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Commands Run:
```text
node /mnt/data/drakken-bugsweep-core/<third-pass regression fixtures>
node <TypeScript transpileModule syntax sweep over src/**/*.ts>
python3 /home/oai/skills/threejs-project-engineer/scripts/inspect_threejs_project.py . --json /mnt/data/drakken-bugsweep-threejs-pass3.json
python3 /home/oai/skills/web-authorship-gate/scripts/audit_web_authorship.py . --allowlist /mnt/data/drakken-authorship-allowlist.json --format both --output-dir /mnt/data/drakken-authorship-audit-pass3
grep static safeguards over src/ and docs/
git diff --check
```

Command Intent:
- Reproduce chronology/common-history failures, prove their repairs, rerun adjacent history/conservation fixtures, syntax-scan every TypeScript source file without dependencies, and re-run Three.js ownership/authorship/static safeguards before publication.

Outputs Generated:
- Future-event rewind visibility regression: PASS.
- Forked timeline inheritance/freeze regression: PASS.
- Exact-tick closed-band chronology regression: PASS.
- Immutable shared pre-fork history regression: PASS for both parent and child mutation attempts.
- Exact-fork-tick mutation remains allowed while shared pre-fork hashes remain equal: PASS.
- Previously repaired history/conservation regressions remain PASS, including `466dc81f`, `ef331f8a`, `15bfd56c`, `2200215f`, `48b151a3`, and `0a03729a` fixtures.
- TypeScript source syntax sweep: 32 files PASS.
- Three.js static inspection: 0 high, 0 medium, 5 accepted low scene-owner notices.
- Web authorship and static safeguards: PASS.

Decisions:
- Timeline queries return only events at or before the viewed tick.
- Forked branches copy parent events through the fork boundary so inherited chronology is stable and branch-local afterward.
- `ORBITAL BAND CLOSED` is generated every tick when closed state first appears; percentage milestones remain on the 25-tick scan cadence.
- Branch mutation is prohibited before the immutable shared-history floor. For a child that floor is its fork tick; for a parent it is the latest direct-child fork tick. The fork tick itself remains editable because an action scheduled there changes the next state rather than the already-shared fork state.
- UI process deployment and activation/deactivation expose the history lock instead of allowing the engine to be corrupted silently.
- Pull-request validation was added to the default-branch workflow only; application fixes remain isolated in PR #1 pending final review/merge.

Bugs / Blockers:
- Fixed BUG-015: future timeline events remained visible when the world was rewound.
- Fixed BUG-016: a forked branch inherited world/actions but not the parent timeline through the fork.
- Fixed BUG-017: `ORBITAL BAND CLOSED` could be stamped late because event generation waited for the next 25-tick threshold scan.
- Fixed BUG-018: parent or child branches could be edited before an existing fork, allowing A and B to diverge before their declared split.
- Dependency-backed typecheck/Vitest/Vite build and real-browser Three.js user journeys remain externally blocked/unobserved at this point; no pass is claimed.

Correction:
- Earlier branch-isolation checks proved that later parent edits after the fork could not leak into the child, but they did not prohibit direct edits inside the already-shared pre-fork interval. This entry records the stronger and controlling invariant: shared pre-fork history is immutable once a fork exists.

State After Completion:
- No unresolved confirmed authoritative-history defect remains in the inspected source after three independent passes.
- Timeline chronology, branch event inheritance, shared-history immutability, snapshot replay, conservation, and lawful closed-band reachability have direct executable regression evidence.
- Browser/WebGL behavior and pinned dependency-backed build proof remain separate unverified surfaces.

Next Step / Handoff:
- Publish the third-pass delta into PR #1, inspect its final diff and any available CI evidence, merge the validated repairs into `main`, then reconcile Operational State and append the final bug-sweep handoff entry.

### Entry 8 - Bug sweep merge and final evidence reconciliation
Summary:
- Merged pull request #1 into `main` after three defect-sweep passes and direct regression/static validation.
- Promoted Operational State to revision 3 with only evidence-backed repairs marked verified.
- Preserved dependency-backed build and real-browser/WebGL proof as unverified rather than converting source presence into completion.

Reason / Intent:
- Close the bug sweep with a successor-safe current baseline: confirmed defects repaired on the actual branch, verified causal invariants promoted, and environmental proof limits left explicit.

Files Changed:
- Bug-sweep application/test/docs set merged through PR #1.
- `docs/VALIDATION.md`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`
- `.github/workflows/validate.yml` received a separate validation-only `pull_request` trigger on `main` before the repair merge.

Commands Run:
```text
final TypeScript syntax sweep over 32 src/**/*.ts files
python3 /home/oai/skills/threejs-project-engineer/scripts/inspect_threejs_project.py . --json /mnt/data/drakken-bugsweep-threejs-pass3.json
python3 /home/oai/skills/web-authorship-gate/scripts/audit_web_authorship.py . --allowlist /mnt/data/drakken-authorship-allowlist.json ...
grep static safeguards over src/ and docs/
git diff --check
python3 /home/oai/skills/operational-state/scripts/operational_state.py validate --file OPERATIONAL_STATE.md --project-id drakken-terraforming-laboratory
GitHub PR/diff/merge verification through the connected GitHub integration
```

Command Intent:
- Reconfirm syntax/architecture/authorship/static cleanliness, verify the repaired PR scope, merge non-destructively, validate the current control plane, and leave durable evidence for the next runtime capable of dependency/browser proof.

Outputs Generated:
- PR #1 merged into `main` as `ef9f7adf61621369b0463e53d004dc65e01a7312`.
- Default-branch validation workflow PR trigger committed as `80cefb03f9f048e2f082c0c48cd12a7f93724e15` before the repair merge.
- Operational State revision 3 validates successfully.
- Final post-fix source syntax sweep: 32 files PASS.
- Three.js static inspection: 0 high, 0 medium, 5 accepted low renderer-owner notices.
- Web authorship/static safeguards and Git whitespace: PASS.

Decisions:
- Merge the confirmed high-severity history/timeline repairs despite unavailable CI status because direct executable fixtures establish the repaired behavior and leaving known causal corruption on `main` would be worse than waiting on an opaque runner.
- Do not claim CI, package-lock reproducibility, full pinned dependency typecheck/Vitest/Vite build, real WebGL output, or browser journeys A-G without new evidence.
- Treat `ef9f7adf61621369b0463e53d004dc65e01a7312` as the current bug-sweep application baseline until a later verified commit supersedes it.

Bugs / Blockers:
- Fixed BUG-001 through BUG-018 across frozen branch inheritance, snapshot invalidation/replay, derived chronology, reset/backlog/comparison state, renderer lifecycle/continuity, keyboard operation, telemetry, seed parsing, comparison replay, documentation setup, future-event visibility, timeline inheritance, exact closed-band event timing, and immutable shared pre-fork history.
- Remaining blocker: no genuine committed `package-lock.json` and therefore no clean-install reproducibility proof.
- Remaining blocker: no observable dependency-backed full-project typecheck/Vitest/Vite build result through the current runtime or connected GitHub evidence surface.
- Remaining blocker: Chromium policy blocks local/file navigation before application load, so real Three.js/WebGL user journeys and runtime performance/lifecycle proof remain unavailable.

Correction:
- Entry 6 expected pull-request CI to provide a connector-visible dependency-backed route. Even after the default-branch workflow gained a `pull_request` trigger and the PR was synchronized, no workflow run became observable through the available connector. This entry supersedes that expectation with the actual evidence state: CI unknown, direct repair evidence verified.

State After Completion:
- `main` contains the three-pass bug-sweep repairs.
- No unresolved confirmed authoritative causal-core/history defect remains in the inspected source.
- Determinism, conservation, genuine rewind, branch isolation/common-history, timeline chronology, lawful Blood Ring closure, and static project boundaries retain direct evidence.
- Overall project completion remains PARTIAL because mandatory dependency-backed and real-browser proof surfaces are still unavailable.

Next Step / Handoff:
- On the next network- and browser-capable runtime: generate/review/commit `package-lock.json`; run `npm ci`, `npm run typecheck`, `npm test`, `npm run build`; execute browser journeys A-G with the real Three.js renderer; then run the performance/lifecycle audit and promote only the checks that actually pass.
