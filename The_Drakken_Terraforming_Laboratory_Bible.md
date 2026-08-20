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
### Entry 9 - Pre-look hardening implementation
Summary:
- Completed the requested ten-part pre-look hardening pass before user visual inspection.
- Audited Three.js architecture, improved source-level UI/UX and first-session guidance, stress-tested many deterministic worlds, hardened engine failure boundaries, reduced avoidable render/UI work, expanded regressions, improved initial presentation, and added a seven-step first-look guide.

Reason / Intent:
- Reduce the chance that the user's first browser inspection is dominated by preventable architecture, numerical, usability, lifecycle, or repository-readiness defects while preserving the laboratory's actual purpose and canon boundaries.

Files Changed:
- Simulation precision/boundaries: `src/simulation/PlanetState.ts`, `PlanetGenerator.ts`, `SimulationEngine.ts`, `analysis/StateHasher.ts`, `types.ts`.
- Three.js/UI: `src/render/LaboratoryRenderer.ts`, `src/ui/LaboratoryApp.ts`, `src/styles.css`, `index.html`.
- Tests: `src/tests/engineBoundaries.test.ts`, `simulationStress.test.ts`, `fullPipeline.test.ts`, plus existing suites retained.
- Tooling/readiness: `package.json`, `package-lock.json`, `tsconfig.json`, `src/vite-env.d.ts`, `.github/workflows/validate.yml`.
- Documentation: `README.md`, `docs/FIRST_LOOK.md`, `docs/PROJECT_HEALTH.md`, `docs/PERFORMANCE_BENCHMARK.md`, `docs/SIMULATION_MODEL.md`, `docs/VALIDATION.md`.

Commands Run:
```text
python3 /home/oai/skills/threejs-project-health-auditor/scripts/audit_threejs_project.py ...
python3 /home/oai/skills/web-authorship-gate/scripts/audit_web_authorship.py ...
dependency-free 64-seed x 160-tick direct simulation stress
lawful high-coverage Gorevault -> Ringthroat closure run
GitHub Actions clean npm install / npm ci validation loops
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
static fail-closed randomness/network/terminology/marker/whitespace checks
```

Command Intent:
- Inspect architecture before editing, reproduce numerical/failure-state weaknesses, repair only evidence-backed defects, prove the full causal/material/history model under broader workloads, and keep source-level visual/performance changes bounded until real browser evidence exists.

Outputs Generated:
- Three.js static health: 100/100, 0 findings.
- Web Authorship Gate: PASS with scoped allowances only for required internal Bible successor-handoff wording and generated npm lock metadata.
- Extended direct stress: 64 seeds x 160 ticks, failures 0; worst water drift `2.4101609596982598e-11`; worst pipeline error `8.881784197001252e-14`; worst whole-system error `0.00001378257275064243`.
- Lawful full material path: closed state at tick 1026, coverage 1, continuity 1, integrity about 0.8208, conservation errors inside `1e-3`.
- `docs/FIRST_LOOK.md`: seven-check first-inspection path.
- `docs/PERFORMANCE_BENCHMARK.md`: bounded real-browser performance/lifecycle proof contract.

Decisions:
- Promote surface and atmospheric water mass storage to Float64 rather than relaxing the `1e-3` conservation tolerance.
- Keep Three.js presentation-only and preserve one application-owned animation loop.
- Split renderer dirty state so layer/selection changes do not needlessly recompute planet geometry/normals.
- Coalesce hover raycasts into the existing frame loop; keep A/B replay and heavy DOM panels state-keyed.
- Add explicit WebGL context-loss/restoration source handling without claiming runtime proof.
- Add a short dismissible first-run overlay and stronger CONFIGURE / INSPECT hierarchy while preserving the graphite/cold-azure laboratory language and restrained crimson Drakken material signal.
- Reject Canvas UI effects for this pass because a second effects layer would compete with the simulated planet and add GPU/lifecycle cost.
- Keep the current main-bundle size warning visible; do not hide it or add speculative splitting without browser evidence.

Bugs / Blockers:
- Repaired multi-seed water drift that previously reached about `0.00123697`, slightly outside the declared tolerance.
- Repaired authoritative boundary handling for invalid coordinates, intensity/radius, step counts, future fork requests, selected-cell indices, and unknown process toggles.
- Repaired source-level avoidable renderer/UI work and added context-loss recovery signaling.
- Remaining blocker is environmental rather than source/build: local Chromium policy prevents the real application from loading, so rendered visual quality, pointer/raycast path, responsive composition, context recovery, and measured runtime performance remain unverified here.

Correction:
- Entry 8's dependency/build blockers are superseded by Entry 10. The browser/runtime limitation remains current.

State After Completion:
- The requested pre-look source hardening is implemented and extensively validated without expanding v1 canon scope or replacing the project architecture.
- No unresolved confirmed causal-core/history/build defect remains in the inspected scope.

Next Step / Handoff:
- Use the published `docs/FIRST_LOOK.md` in a normal browser. If the seven checks pass, execute `docs/PERFORMANCE_BENCHMARK.md` before making runtime-performance claims or speculative bundle/renderer changes.

### Entry 10 - Reproducible release, CI reconciliation, and publication
Summary:
- Converted the project from source/core-only validation to a reproducible dependency-backed build with a genuine committed npm lockfile.
- CI-gated and squash-merged pre-look hardening PR #2 into `main` as `10de6dbe0459a97528a27f2df3e13e1850eef0eb`.
- Published Operational State revision 4 as `0fc56a2f784e0e2bb41b0335a58191d57d8488eb` before this final Bible append.

Reason / Intent:
- Ensure the repository the user opens is not merely polished source but a clean-install, typechecked, tested, built, dependency-audited, traceable baseline whose remaining unknowns are explicitly limited to real browser/runtime proof.

Files Changed:
- PR #2 hardening set, including `package-lock.json` and the final read-only validation workflow.
- `OPERATIONAL_STATE.md` revision 4.
- `The_Drakken_Terraforming_Laboratory_Bible.md` Entries 9-10.

Commands Run:
```text
GitHub Actions run 32210833573: clean npm ci, runtime audit, typecheck, 41 tests, Vite build
GitHub Actions run 32211276724 / final hardening gate: fail-closed static safeguards
GitHub PR #2 scope comparison and expected-head squash merge
python3 /home/oai/skills/operational-state/scripts/operational_state.py validate --file OPERATIONAL_STATE.md --project-id drakken-terraforming-laboratory
local Git staging/diff/commit hygiene on the recovered CI checkout
GitHub connector publication and final main readback
```

Command Intent:
- Prove reproducibility from the lockfile, use CI failures as evidence instead of bypassing them, publish only the inspected hardening envelope, update current evidence state after the real merged SHA exists, and leave an additive successor-safe handoff.

Outputs Generated:
- Genuine `package-lock.json` committed and proven with clean `npm ci`.
- Vite pinned to `7.3.5`.
- Dependency-backed suite: 12 test files / 41 tests PASS.
- Vite production build PASS; CI build artifact produced.
- Runtime dependency audit: 0 vulnerabilities; full audit: one low dev-only transitive `esbuild` advisory, 0 moderate/high/critical.
- Final hardening PR #2 merge: `10de6dbe0459a97528a27f2df3e13e1850eef0eb`.
- Operational State revision 4: valid and published.

Decisions:
- Use current read-only GitHub Actions majors with mandatory `npm ci` after the lock was promoted.
- Keep the one low dev-only transitive `esbuild` advisory documented; do not force an unsupported override inside Vite 7 without evidence.
- Make source hygiene checks fail closed rather than relying on shell negation patterns that can print matches without reliably failing.
- Treat the 599.24 kB minified JavaScript chunk as an observed warning, not a defect automatically requiring code splitting.
- Overall completion remains PARTIAL / partially verified until normal-browser first-look and runtime/lifecycle evidence exist.

Bugs / Blockers:
- Earlier CI surfaced an npm Arborist install failure before the lock existed; a bounded temporary legacy-peer-deps path was used only to generate/prove the lock, then removed.
- Vite client CSS typing was missing; `src/vite-env.d.ts` repaired the real dependency-backed TypeScript failure.
- New strict unused-code flags found and removed stale imports.
- Stress-fixture assertion overhead and one fixture typing issue were repaired without reducing the workload or invariant coverage.
- Fail-closed static guards initially self-matched wording in `docs/VALIDATION.md`; documentation was corrected while the guards remained strict.
- Real browser/WebGL and performance/lifecycle proof remain unavailable because of the current Chromium policy block.

Correction:
- Entry 8 said CI status was unknown and dependency-backed build proof was unavailable. Historical PR #1 CI later became observable, and this hardening pass established a current clean `npm ci` / typecheck / 41-test / Vite-build path. That earlier evidence state is superseded.
- Entry 8's pending task to generate and commit a genuine lockfile is complete.

State After Completion:
- `main` contains the complete pre-look hardening release plus Operational State revision 4.
- Repository clean-build reproducibility, strict typecheck, expanded tests, production build, dependency gate, numerical stress, and static architecture/authorship are verified.
- The only major unverified product surface is the actual rendered browser/WebGL experience and its runtime performance/lifecycle behavior.

Next Step / Handoff:
- Open the current `main` build in a normal browser and follow `docs/FIRST_LOOK.md` before changing design or architecture. Then run `docs/PERFORMANCE_BENCHMARK.md`. Promote only directly observed browser/runtime results.

### Entry 11 - Real Chrome first-look and runtime validation
Summary:
- Completed the requested pre-look browser-validation pass and merged PR #3 to `main` as `9e43a8be856facb43953305d95efd81b3f1f0e74`.
- Added a bounded Playwright/Chrome validation lane covering the seven first-look behaviors, screenshots, accessibility/keyboard/responsive semantics, CI performance/lifecycle smoke, pathological browser interaction sequences, and WebGL context loss/restoration.
- Promoted Operational State to revision 5 in commit `3abd8353980c8c0aa84c2ea52aec2b0ead5031ea` and reconciled `docs/VALIDATION.md` in commit `4001e428be90f97dc85385acec56c67256eab874`.

Reason / Intent:
- Close the largest remaining pre-look blind spot by exercising the actual production browser application rather than relying on source inspection, unit tests, or static Three.js analysis.
- Preserve strict evidence boundaries: automated Chrome behavior can verify objective interaction/runtime properties, but it cannot substitute for the user's subjective first impression or representative target-hardware performance/thermal evidence.

Files Changed:
- Browser CI/tooling: `.github/workflows/validate.yml`, `package.json`, `package-lock.json`, `playwright.config.ts`, `.gitignore`.
- Read-only diagnostics/testability: `src/browserDiagnostics.ts`, `src/main.ts`.
- Renderer boundary repair: `src/render/LaboratoryRenderer.ts`, `src/render/gridUv.ts`, `src/tests/gridUv.test.ts`.
- Browser suites: `tests/browser/first-look.spec.ts`, `helpers.ts`, `performance.spec.ts`, `semantics.spec.ts`, `stress.spec.ts`.
- Minor document/entry metadata: `index.html`, `docs/VALIDATION.md`, `OPERATIONAL_STATE.md`.

Commands / Validation Paths:
```text
GitHub Actions run 32256868714
npm ci
npm audit --omit=dev --audit-level=high
npm run typecheck
npm test
npm run build
npm run test:browser
Google Chrome 151.0.7922.108 on GitHub-hosted Ubuntu 24.04
Playwright one-worker production-preview journey suite
Three.js static project-health audit
objective review of eight browser evidence screenshots
Operational State schema validation
```

Outputs Generated:
- Dependency-backed unit/regression suite: 13 files / 43 tests PASS.
- Production Vite build: PASS.
- Runtime dependency gate: 0 runtime vulnerabilities.
- Browser suite: 10 / 10 Playwright tests PASS in about two minutes.
- Browser artifact: `9366713842`, containing Playwright report/results, performance smoke JSON, and eight screenshots.
- Automated browser paths cover startup/WebGL, Fault-Tongue, Cloudmaw, Ringthroat starvation, Gorevault -> Ringthroat material flow, rewind, branch common history/divergence, comparison, provenance, semantic/keyboard operation, narrow viewport, reduced motion, rapid controls, resize storms, camera movement, repeated reset, and WebGL loss/restoration.
- Screenshot evidence: initial, Fault-Tongue crust, Cloudmaw hydrology, Ringthroat starved, Gorevault/Ringthroat chain, branch comparison, provenance, and `390 x 844` narrow viewport.
- Objective screenshot review found no blank canvas, primary-region overlap, global narrow-viewport overflow, or mismatch between the tested state/layer and its capture.

Browser / Lifecycle Evidence:
```text
Scenario: CI-PRELOOK-SMOKE-01
Renderer: ANGLE / SwiftShader virtual software renderer
DOMContentLoaded: 167.8 ms
Load: 180.1 ms
Frame samples: 529
Frame p50: 33.3 ms
Frame p95: 50.0 ms
Frame p99: 66.6 ms
Frames over 50 ms: 2.46%
Latest simulation step: about 0.465 ms
Long tasks: 9, max 165 ms
Heap delta after 3 reset cycles: +412,796 bytes
Renderer geometries: 3 baseline / 3 settled
Renderer textures: 1 baseline / 1 settled
Unique scene geometries: 3 baseline / 3 settled
Unique scene materials: 3 baseline / 3 settled
Frame-budget verdict: NOT_COMPARABLE to target hardware
```

Findings / Repairs:
- Initial browser CI attempted `playwright install --with-deps chromium`; Ubuntu package-mirror retries consumed the browser job timeout. The final workflow instead uses the GitHub runner's already-installed Google Chrome and keeps CI read-only.
- Vitest initially discovered Playwright specs. Test ownership is now explicit: Vitest runs `src/tests`; Playwright runs `tests/browser`.
- Browser work exposed SphereGeometry seam/pole UV offsets that could map outside the authoritative lattice. `uvToGridCell()` now clamps renderer geometry/color/picking UVs into the 128 x 64 grid and has dedicated regression tests.
- The first WebGL restoration test called `restoreContext()` too soon after observing state set during `webglcontextlost`. The final test follows the WebGL loss/restore lifecycle: it waits until the loss event has completed, restores on the next task using the same extension object, waits for `webglcontextrestored`, and then verifies the lost marker clears and rendering resumes. Renderer behavior did not require a speculative rewrite.

Decisions:
- Keep browser diagnostics opt-in under `?diagnostics=1`, read-only, and subordinate to the existing application/simulation owners.
- Do not create another animation loop for instrumentation; frame timing wraps the existing requestAnimationFrame path only inside browser tests.
- Treat the Chrome/SwiftShader frame-time capture as lifecycle/smoke evidence, not a target-device performance benchmark.
- Keep human visual judgment, physical touch feel, target-GPU frame timing, sustained thermals, and long-session target-device behavior explicitly unverified until directly observed.
- Do not continue pre-look source polishing after the green browser gate without new evidence from the user's inspection.

State After Completion:
- `main` contains the browser-validation release `9e43a8be856facb43953305d95efd81b3f1f0e74` plus current validation/state reconciliation.
- The primary Chrome/WebGL user journey is verified end-to-end by CI rather than inferred from source.
- No unresolved confirmed causal-core, history, build, or primary-Chrome-journey defect remains in the inspected scope.
- Overall project state remains PARTIAL / partially verified only because automation cannot establish subjective visual quality or representative target-hardware performance/thermal behavior.

Next Step / Handoff:
- The next meaningful evidence is the user's actual first look using `docs/FIRST_LOOK.md`. Do not perform another speculative pre-look polish cycle. If the user identifies a visual/interaction issue, repair that evidence-backed issue. If performance becomes a concern, run `docs/PERFORMANCE_BENCHMARK.md` on representative target hardware.


### Entry 12 - Final pre-test defect sweep and error-correction release
Summary:
- Completed the final bounded defect sweep requested before human testing and squash-merged PR #4 to `main` as `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e`.
- Repaired periodic renderer longitude mapping, periodic seeded planet generation, full-precision scalar state hashing, targeting-state synchronization, and browser-exposed pointer-hover erasure of explicit deployment/history-lock feedback.
- Reconciled `docs/VALIDATION.md` in commit `683eb9d9e11172469132a4390184913da17852ff` and promoted Operational State revision 6 in commit `2658d71fcd4a19ff7a5b3a83c39c16953844132e`.

Reason / Intent:
- Use one final evidence-driven sweep to catch correctness defects that automated source review and the first browser-validation release could still prove before the user's own first look.
- Stop at the bounded defect boundary rather than redesigning simulation topology, adding features, changing dependencies, or performing subjective polish without user evidence.

Confirmed Findings and Repairs:
- **Periodic renderer seam:** the prior `uvToGridCell()` clamped longitude, so the duplicate spherical seam vertices at `u=0` and `u=1` could map to opposite authoritative edge cells. Longitude now wraps periodically, latitude clamps, and non-finite UV inputs normalize to a safe in-grid fallback.
- **Artificial antimeridian scar:** seeded initial-world noise was not periodic across longitude even though process topology wraps. Measurement across 32 seeds x 64 latitude rows found the old median antimeridian elevation jump about 11.4 times the median ordinary neighboring-cell jump. Generator noise is now exactly periodic at `x=0` and `x=GRID_WIDTH` for all scales used by terrain, humidity, and crust fields.
- **State-hash precision:** scalar JavaScript-number totals and Gorevault/orbital inventories were downcast to Float32 before hashing, allowing genuinely different sub-Float32 scalar states to share an integrity hash. Scalars now contribute their complete Float64 bit patterns.
- **Stale targeting status:** play, rewind, fork, branch switch, and reset could leave deployment/history feedback inconsistent with the current authoritative navigation state. These transitions now re-derive current targeting text.
- **Hover ownership defect:** final-sweep browser run `32261514650` passed 9/10 tests but showed pointer-hover immediately replacing `DEPLOYED · PRESS PLAY` after a click. Explicit deployment/history-lock messages now own the banner until a real navigation/mode/state transition clears the override.

Files Changed by PR #4:
- `src/render/gridUv.ts`
- `src/tests/gridUv.test.ts`
- `src/simulation/PlanetGenerator.ts`
- `src/simulation/analysis/StateHasher.ts`
- `src/tests/planetDeterminism.test.ts`
- `src/ui/LaboratoryApp.ts`
- `tests/browser/stress.spec.ts`

Validation / Evidence:
```text
Final GitHub Actions run: 32262340227
Exact validated PR head: 2b10b7ab0c4652f013e986641fd2a379c25e3a51
Clean npm ci: PASS
Runtime dependency audit: 0 vulnerabilities
Strict TypeScript: PASS
Vitest: 13 files / 46 tests PASS
Current-generator stress: 16 seeds x 120 ticks PASS
Full Gorevault -> Ringthroat pipeline fixture: PASS
Vite 7.3.5 production build: PASS
Fail-closed static safeguards: PASS
Google Chrome 151.0.7922.108
Playwright browser suite: 10 / 10 PASS
Browser evidence artifact: 9368894009
Artifact digest: sha256:829efd8a84c15662dea28a22fa86b6c41f5c7cdae7de9dfb4d74643f0bc448c3
Diff-scope verifier: PASS
```

Final CI Lifecycle Smoke:
```text
Renderer: ANGLE / SwiftShader virtual software renderer
DOMContentLoaded: 195.6 ms
Load: 206.7 ms
Frame samples: 473
Frame p50: 50.0 ms
Frame p95: 66.8 ms
Frame p99: 83.4 ms
Latest simulation step: about 0.829 ms
Heap delta after 3 reset cycles: +424,396 bytes
Renderer geometries: 3 baseline / 3 settled
Renderer textures: 1 baseline / 1 settled
Unique scene geometries: 3 baseline / 3 settled
Unique scene materials: 3 baseline / 3 settled
Frame-budget verdict: NOT_COMPARABLE to target hardware
```

Scope / Publication Discipline:
- Final PR scope was seven authorized source/test files, 92 additions / 24 deletions.
- No dependency, lockfile, framework, canon, asset, build-config, or visual-design expansion was accepted.
- No generated artifacts, temporary trigger files, helper workflows, deletions, renames, or unrelated formatting churn remained in the PR.
- Temporary branch-only patch helpers self-deleted. A bot-authored repair initially produced an `action_required` PR run and stale PR metadata; a temporary user-authored trigger was created and deleted, then PR #4 was closed/reopened to synchronize GitHub to the true branch head. This changed no product content.
- Operational State revision 6 was schema-validated locally. Its first self-triggering publication helper did not execute; the exact validated blob was then published through GitHub's tree/commit API while deleting that helper in the same tree.

Decisions:
- Treat longitude as periodic and latitude as bounded everywhere the spherical renderer maps into the authoritative grid.
- Preserve the existing 128 x 64 pole-row model for this release. Correctly changing the pole representation would alter the simulation model and requires a separate, intentional design/migration decision.
- Treat the older 64-seed direct stress measurements as historical pre-periodic-generator evidence only; current-generator proof comes from the dependency-backed stress and full-pipeline fixtures in final run `32262340227`.
- Keep explicit targeting feedback immune to incidental hover, but clear/re-derive it when authoritative navigation or mode state changes.
- Keep SwiftShader frame-time data classified as lifecycle/smoke evidence only, never as target-hardware performance proof.
- Do not perform another speculative pre-look bug/polish cycle without new evidence from the user's actual test.

State After Completion:
- Product/source baseline on `main`: `b353be7d78bf8c1a3e6d41ec063cac2c46a7838e`.
- `docs/VALIDATION.md` contains current final-sweep evidence.
- Operational State revision 6 governs the current release.
- No unresolved confirmed causal-core, history, build, longitude-topology, state-hash, targeting-feedback, or primary-Chrome-journey defect remains from this sweep.
- Overall project remains PARTIAL / partially verified only because automated evidence cannot establish the user's subjective visual judgment, representative physical-device/coarse-pointer feel, target-GPU performance, sustained thermals, or long-session target-device behavior.

Next Step / Handoff:
- The user should now perform the actual first look using `docs/FIRST_LOOK.md`. Any next repair should be driven by visible/user-experience evidence from that test. If performance becomes a concern, run `docs/PERFORMANCE_BENCHMARK.md` on representative target hardware rather than inferring from SwiftShader CI.

### Entry 13 - Planet-first viewport and 12-dot control launcher
Summary:
- Recessed the laboratory dashboard behind a compact 12-dot launcher so the default view is a full-viewport planet and seeded world-space starfield.
- Left the simulation model, conservation, rewind/branching, and process set unchanged.

Reason / Intent:
- Make the planet the primary instrument and keep controls as overlay instrumentation rather than a permanent dashboard around the globe.

Files Changed:
- `src/render/Starfield.ts`
- `src/render/LaboratoryRenderer.ts`
- `src/ui/LaboratoryApp.ts`
- `src/styles.css`
- `src/browserDiagnostics.ts`
- `src/tests/starfield.test.ts`
- `tests/browser/helpers.ts`
- `tests/browser/planet-first.spec.ts`
- `tests/browser/first-look.spec.ts`
- `tests/browser/semantics.spec.ts`
- `tests/browser/stress.spec.ts`
- `tests/browser/performance.spec.ts`
- `docs/FIRST_LOOK.md`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Validation / Evidence:
```text
npm ci: PASS
typecheck: PASS
Vitest: 14 files / 49 tests PASS
Vite 7.3.5 production build: PASS
Local Chrome 151 Playwright: 12 / 12 PASS (--workers=1)
```

Decisions:
- Keep existing control IDs and targeting-ownership rules.
- Generate star geometry once per renderer/seed from project-local `SeededRandom`.
- Do not merge this branch to `main` in this phase.

State After Completion:
- Feature exists on `planet-first-space-system` only.
- Overall project remains PARTIAL / partially verified pending human first look and representative hardware performance.

### Entry 14 - Interactive celestial system and deep zoom
Summary:
- Expanded the Phase-1 planet-first viewport into a small seeded celestial environment: a visible system star, Primary Moon, and two sparse outer bodies, with tick-driven orbits and body picking.
- Raised camera max distance and far plane while keeping the default framing on the terraformable planet at the origin.

Reason / Intent:
- Let the user zoom out into a real system-scale view without turning the laboratory into a second astrophysical simulator or moving PlanetState off the origin.

Files Changed:
- `src/render/celestialSystem.ts`
- `src/render/CelestialEnvironment.ts`
- `src/render/LaboratoryRenderer.ts`
- `src/render/Starfield.ts`
- `src/ui/LaboratoryApp.ts`
- `src/styles.css`
- `src/browserDiagnostics.ts`
- `src/tests/celestialSystem.test.ts`
- `src/tests/starfield.test.ts`
- `tests/browser/helpers.ts`
- `tests/browser/celestial.spec.ts`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Validation / Evidence:
```text
typecheck: PASS
Vitest: 15 files / 54 tests PASS
Vite 7.3.5 production build: PASS
Local Chrome 151 Playwright: 15 / 15 PASS (--workers=1)
Regenerate unique geometry/material counts restored
```

Decisions:
- Celestial orbits use simulation tick only, never wall-clock time.
- Celestial clicks select; only the primary planet remains a Drakken deployment surface.
- Neutral names: Primary Moon, Outer Body 1, Outer Body 2.
- Do not merge this branch to `main` in this phase.

### Entry 15 - Final planet-first integration QA
Summary:
- Proved Phases 1 and 2 against planet-first, system-scale, interaction, 12-dot, and lifecycle oracles.
- One bounded repair: starfield writes depth so stars do not draw through the planet; celestial orbits skip unchanged ticks; pickables are cached; the system star and SYSTEM VIEW camera were adjusted so the star is on-screen in default and system frames.

Reason / Intent:
- Close the redesign on evidence rather than adding another feature phase.

Files Changed:
- `src/render/Starfield.ts`
- `src/render/CelestialEnvironment.ts`
- `src/render/LaboratoryRenderer.ts`
- `src/render/celestialSystem.ts`
- `src/tests/celestialSystem.test.ts`
- `tests/browser/final-qa.spec.ts`
- `tests/browser/celestial.spec.ts`
- `tests/browser/first-look.spec.ts`
- `tests/browser/helpers.ts`
- `docs/FIRST_LOOK.md`
- `docs/VALIDATION.md`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Validation / Evidence:
```text
npm ci: PASS
typecheck: PASS
Vitest: 15 files / 55 tests PASS
Vite 7.3.5 production build: PASS
Chrome Playwright: 16 tests PASS (--workers=1, split reruns)
QA screenshots: qa-01 .. qa-07
Regenerate unique geometries: 12 baseline / 12 settled
```

Decisions:
- Do not restyle beyond the bounded visibility/lifecycle repairs.
- Do not merge to `main`.

### Entry 16 - Correct planet-first interaction and QA evidence
Summary:
- Targeted correction on `planet-first-space-system`: overlay stacking so PLAY is ordinarily clickable, first-run guide moved into RUN, human-scale celestial pick proxies, differential starfield parallax, and one uninterrupted 18-test Chrome Playwright run.

Reason / Intent:
- Prior integration QA left overlay clickability, first-frame screenshot purity, celestial picking, and a single full browser-suite run unresolved. This pass repairs those interactions and records only the single-run evidence.

Files Changed:
- `src/ui/LaboratoryApp.ts`
- `src/styles.css`
- `src/render/CelestialEnvironment.ts`
- `src/render/LaboratoryRenderer.ts`
- `src/render/Starfield.ts`
- `src/browserDiagnostics.ts`
- `tests/browser/helpers.ts`
- `tests/browser/celestial.spec.ts`
- `tests/browser/final-qa.spec.ts`
- `tests/browser/first-look.spec.ts`
- `tests/browser/planet-first.spec.ts`
- `docs/FIRST_LOOK.md`
- `docs/VALIDATION.md`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Validation / Evidence:
```text
npm ci: PASS
typecheck: PASS
Vitest: 15 files / 55 tests PASS (`npx vitest run src/tests --testTimeout=20000`)
Vite 7.3.5 production build: PASS
npm run test:browser -- --workers=1: 18 / 18 PASS in 4.7 minutes
Local Chrome: 151.0.7922.138
QA screenshots: qa-01 .. qa-07 from that same run
Regenerate unique geometries/materials: 16 / 16
Heap delta after 3 regenerates: about +418 kB
```

Decisions:
- Keep PLAY on ordinary Playwright actionability; do not restore `force: true`.
- First-run guidance stays inside RUN so the default screenshot is the literal first frame.
- Invisible pick proxies use depth testing so occluded bodies cannot be selected through the planet.
- Do not merge this branch to `main`.

### Entry 17 - Keep starfield outside system and harden body picking
Summary:
- Moved the background starfield entirely outside the interactive celestial/camera envelope and added a 16/24 CSS-pixel screen-space celestial pick fallback so small bodies remain selectable at SYSTEM VIEW without deploying.

Reason / Intent:
- Near stars previously occupied the same radii as moons, outer bodies, and camera travel. Off-center clicks on Outer Body 1 missed because world-space proxies shrank in screen space with distance.

Files Changed:
- `src/render/celestialSystem.ts`
- `src/render/Starfield.ts`
- `src/render/celestialPick.ts`
- `src/render/LaboratoryRenderer.ts`
- `src/tests/starfield.test.ts`
- `src/tests/celestialPick.test.ts`
- `tests/browser/helpers.ts`
- `tests/browser/celestial.spec.ts`
- `tests/browser/planet-first.spec.ts`
- `docs/VALIDATION.md`
- `OPERATIONAL_STATE.md`
- `The_Drakken_Terraforming_Laboratory_Bible.md`

Validation / Evidence:
```text
npm ci: PASS
typecheck: PASS
Vitest: 16 files / 63 tests PASS (`npx vitest run src/tests --testTimeout=20000`)
Vite 7.3.5 production build: PASS
npm run test:browser -- --workers=1: 18 / 18 PASS in 2.1 minutes
STARFIELD_MIN_RADIUS 180.8825 outside envelope 132.8825
CAMERA_FAR 1600
Pick radii: 16 px fine / 24 px coarse
Off-center browser click: 14 CSS pixels
```

Decisions:
- Do not change orbital radii or system-star distance to accommodate the starfield.
- Occlusion is proven by the shared pick helper and a deterministic planet-first ray, not by searching live orbits.
- Do not merge this branch to `main`.


