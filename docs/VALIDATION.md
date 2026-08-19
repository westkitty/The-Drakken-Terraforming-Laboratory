# Validation Record

This file records evidence, not aspirations. Source presence is not runtime proof, and an environment failure is not converted into an application pass.

## Required commands

The intended dependency-backed validation ladder is:

```text
npm ci
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

The current execution environment cannot complete the first command because the npm packages are not cached and outbound package-registry access is unavailable.

## Current evidence — 2026-08-18

### Repository and source

- GitHub repository identity and write permission: **PASS** through the connected GitHub integration.
- Branch: **PASS** — `main`.
- Additive publication path: **PASS** — commits were created and the branch ref was advanced without force.
- Exact local `origin`: **PASS** — `https://github.com/westkitty/The-Drakken-Terraforming-Laboratory.git`.
- `git diff --check`: **PASS** after the final local source edits.

### Authoritative simulation

A dependency-free validation build compiled `src/simulation/**/*.ts` with the locally installed TypeScript 5.8.3 compiler using `strict` and `noUncheckedIndexedAccess`, then executed direct Node assertions against the emitted authoritative simulation code.

Result: **PASS**.

Proven behaviors:

- seeded PRNG repeatability;
- same-seed initial-state equality;
- different-seed divergence;
- deterministic simulation for the same ordered action schedule;
- stable process order despite incidental process-map insertion order;
- Fault-Tongue fracture and deterministic neighbor stress propagation in source;
- Cloudmaw water conservation;
- Ringthroat starvation with zero refined feedstock;
- Gorevault source harvesting and processing inventory growth;
- Gorevault pipeline mass conservation;
- whole convertible-material conservation including environmental residue;
- Ringthroat downstream material transfer without duplication;
- exact rewind hash restoration;
- deterministic branch common history;
- post-fork deterministic divergence;
- numerical A/B comparison delta.

Latest measured values from the final local core smoke run:

```text
Cloudmaw water drift:            -0.000006111213679105276
Ringthroat starved orbital mass:  0
Gorevault harvested mass:         108.93816063337734
Gorevault refined feedstock:      25.200000000000216
Gorevault pipeline error:         0
Whole-system error pre-Ringthroat:-0.000007666974852327257
Ring/orbital material:            34.999999999999986
Band coverage:                    0.04999999999999925
Whole-system error post-Ringthroat:-0.000019605212855822174
Rewind restored hash:             5bf14fdd
Branch A hash:                    7ef40e53
Branch B hash:                    e85fc334
A/B crust-integrity delta:       -0.003926824543214025
```

The declared conservation tolerance is `1e-3` abstract units. All measured conservation errors are inside that tolerance.

### Static safeguards

Current source checks: **PASS**.

- no `Math.random()` in `src/`;
- no `fetch(`, `XMLHttpRequest`, `WebSocket`, or external HTTP runtime references in `src/`;
- no forbidden Blood Ring descriptive terminology in application source/current docs;
- `git diff --check` clean.

### Web authorship

The Web Authorship Gate scanner was run over the repository. Its only initial findings were required successor-handoff terminology inside the internal Project Bible. A scoped allowlist was applied only to `The_Drakken_Terraforming_Laboratory_Bible.md`, because that file is internal continuity infrastructure rather than user-facing application copy or production credit.

Scoped result: **PASS** — no unresolved findings.

### Three.js static inspection

`threejs-project-engineer/scripts/inspect_threejs_project.py` result:

- framework: `vanilla-threejs`;
- renderer: `WebGLRenderer` detected;
- React Three Fiber: absent;
- remote runtime URLs: 0;
- high findings: 0;
- medium findings: 0;
- low findings: 5.

All five low findings are direct `scene.add()` calls inside `LaboratoryRenderer`, the declared single scene/view owner. That same owner implements explicit geometry/material/control/renderer disposal. They are accepted ownership signals, not evidence of scattered scene mutation.

## Dependency-backed validation unavailable in this environment

The repository pins exact package versions, but `package-lock.json` cannot be honestly generated here because no npm dependency cache exists and external package acquisition is blocked.

A bounded offline lockfile attempt failed with:

```text
ENOTCACHED: request to https://registry.npmjs.org/@types%2fthree failed because no cached response is available
```

Therefore these mandatory checks remain **UNVERIFIED** in the current environment:

- full project `npm run typecheck` against the pinned Three.js/Vite/Vitest type surface;
- the Vitest suite under the pinned dependency set;
- production Vite build;
- clean `npm ci` reproducibility;
- `package-lock.json` coherence.

The repository contains `.github/workflows/validate.yml` to perform install/typecheck/test/build/static checks and export `dist/` plus the lockfile when a runner executes, but no workflow result has been observable through the available GitHub integration during this session. No CI success is claimed.

## Browser/runtime validation unavailable in this environment

Chromium is installed locally. A validation-only browser harness was prepared to exercise the real DOM and authoritative simulation while replacing the unavailable Three.js renderer dependency with a no-op renderer adapter.

Chromium was blocked by the organization policy **before the page loaded** for both:

- `http://127.0.0.1:<local-port>`;
- `file://...`.

The browser displayed: `Your organization doesn't allow you to view this site`.

Accordingly:

- browser user journeys A–G: **UNVERIFIED**;
- actual Three.js WebGL rendering: **UNVERIFIED**;
- renderer lifecycle/performance runtime profiling: **NOT RUN** because no runnable browser path exists.

This is an environment proof limit, not evidence that the browser journey passes or fails.

## Automated Vitest coverage present in source

The repository test suite contains focused tests for:

- planet determinism;
- process prerequisites;
- water and material conservation;
- snapshot restoration;
- branch common history and divergence;
- stable process ordering.

Equivalent authoritative-simulation assertions were executed directly and passed as described above. The Vitest runner itself remains unverified until the pinned packages can be installed.

## Current validation verdict

**PARTIAL.** The difficult causal simulation core is directly executed and verified. The user-facing implementation and Three.js renderer are present and statically inspected, but dependency-backed build proof, lockfile proof, and real-browser proof are unavailable in the current execution environment and must not be upgraded to PASS without new evidence.
