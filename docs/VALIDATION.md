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
- source-removal attribution against an environmental control world;
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

The local build container can execute Node/npm/Git but cannot resolve external hosts, so it cannot install the pinned npm dependencies directly. The GitHub connector has verified write access to the repository. Validation is therefore run in GitHub Actions after publication of the source checkpoint. The workflow exports `dist/` and `package-lock.json` as evidence artifacts. Those results must be recorded below after the workflow runs.

## Current evidence

- Repository identity: verified through GitHub connector.
- Local source presence: verified.
- Typecheck: pending remote CI.
- Tests: pending remote CI.
- Production build: pending remote CI.
- Browser journey A–G: pending runnable-browser evidence.
- Publication of application source: pending.
