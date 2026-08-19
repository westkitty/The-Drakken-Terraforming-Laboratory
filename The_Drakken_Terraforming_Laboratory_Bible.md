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
