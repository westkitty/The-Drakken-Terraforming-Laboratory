# Validation Record

This file records evidence, not aspirations. A source file containing a feature is not proof that the user journey works.

## Required commands

```text
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

Clean-install reproducibility should additionally use:

```text
npm ci
npm run typecheck
npm test
npm run build
```

## Automated coverage

The Vitest suite covers:

- seeded PRNG repeatability;
- same-seed initial determinism;
- different-seed divergence;
- deterministic simulation for identical actions/ticks;
- Ringthroat starvation with zero refined feedstock;
- stable process results despite incidental `Map` insertion order;
- Cloudmaw modeled-water conservation;
- Gorevault pipeline mass conservation;
- full convertible-material closure through harvestable pools, environmental residue, Gorevault inventory, and Ringthroat/orbital inventory;
- Ringthroat downstream material conservation;
- exact hash restoration after rewind;
- deterministic replay from an earlier snapshot;
- branch equality at fork;
- branch divergence after different post-fork actions;
- numerical comparison delta after divergence.

## Static safeguards

CI rejects:

- `Math.random()` in `src/`;
- `fetch(`, `XMLHttpRequest`, `WebSocket`, or `http(s)://` runtime references in `src/`;
- forbidden Blood Ring descriptive terminology in current source/docs;
- whitespace errors found by `git diff --check`.

## Environment note — 2026-08-18

The local build container can execute Node/npm/Git but cannot resolve external hosts, so it cannot install the pinned npm dependencies directly. The GitHub connector has verified write access to the repository. A validation workflow is present in `.github/workflows/validate.yml`, but no workflow status has been observable through the available connector for the published commits yet. Dependency-backed claims therefore remain unverified until a runner result exists.

## Current evidence

- Repository identity and connector-backed source publication: **PASS**.
- Authoritative simulation strict compile: **PASS** using the locally available TypeScript 5.8.3 compiler with `strict` and `noUncheckedIndexedAccess`; renderer/UI modules remain outside this dependency-free compile.
- Executable simulation smoke suite: **PASS** for seeded determinism, simulation determinism, Ringthroat starvation, stable process ordering, Cloudmaw water conservation, Gorevault pipeline conservation, full convertible-material conservation, Ringthroat downstream flow, exact snapshot restore, deterministic replay, branch equality, branch divergence, and numerical comparison.
- Measured Cloudmaw water drift after 120 ticks: `0.00004740798135571822`, below the declared `1e-3` tolerance.
- Measured Gorevault pipeline error: approximately `6.04e-14`.
- Measured whole convertible-material system error with Gorevault + Cloudmaw: approximately `-3.98e-7`.
- Measured whole system error after Gorevault + Ringthroat transfer: approximately `1.52e-6`.
- Local static safeguards for authoritative randomness, runtime networking, and forbidden Blood Ring wording: **PASS**.
- Full project typecheck with pinned dependencies: **UNVERIFIED** — dependencies cannot be installed in the current local runtime and no GitHub runner result is exposed yet.
- Vitest suite under the pinned dependency set: **UNVERIFIED** for the same reason; equivalent direct Node assertions over the compiled authoritative simulation are PASS.
- Production Vite build: **UNVERIFIED**.
- Browser journey A–G: **UNVERIFIED**; Chromium exists locally, but no dependency-backed bundle is available in the current runtime.
- `package-lock.json`: **PENDING**; it cannot be generated without dependency installation.
