# First Look: Seven Checks

Use the default seed `19870615` for the first pass. The point is not to exhaust the laboratory; it is to verify that visible change, causal history, material flow, rewind, and branch divergence all feel like one coherent instrument.

## 1. Break the crust

Select **Fault-Tongue**, set intensity near `0.85` and radius near `24°`, then deploy it on a continental region. Press **PLAY** at `16x` or `64x` and switch between **NORMAL** and **CRUST**.

Look for: the world changes only after ticks advance; crust integrity/stress/fracture move together; the selected-cell inspector names Fault-Tongue as the causal source after affected cells change.

## 2. Move water instead of creating it

Deploy **Cloudmaw** over a different region and run forward. Open **HYDROLOGY** and watch **WATER MASS** / **WATER DRIFT** in the Material Ledger.

Look for: water redistributes spatially while total modeled water remains conserved within the displayed numerical tolerance.

## 3. Prove Ringthroat can starve

Before building feedstock, deploy **Ringthroat** and run a few ticks.

Look for: the deployed instance reports **STARVED** and orbital material does not appear from nowhere.

## 4. Feed the transformation chain

Deploy several **Gorevault** instances at high intensity/radius across inhabited or biologically rich regions. Run forward, watching **FEEDSTOCK**, **REFINED FEEDSTOCK**, and source biomass/population values. Then let Ringthroat continue operating.

Look for: source inventories fall first; harvested material appears in Gorevault processing; refined feedstock then moves into queued/rising/orbital/shaped material. The orbital structure grows only after that chain exists.

## 5. Rewind the actual world

Note a later tick and its hash. Scrub backward to an earlier tick.

Look for: the globe, inspector, ledgers, process state, and event strip all return to the earlier state. Future events should not remain visible while viewing the past.

## 6. Fork one past into two futures

At the restored tick, choose **FORK B @ CURRENT TICK**. Continue one branch with a different deployment or activation state, then switch between **VIEW A** and **VIEW B**.

Look for: both branches share the same pre-fork history, then diverge only after the fork. Switch to **COMPARISON** for the spatial delta and inspect the numerical A/B metrics beside it.

## 7. Ask why a cell looks that way

Switch to **INSPECTION MODE**, choose **PROVENANCE**, and select visibly transformed cells.

Look for: latest cause, change tick, changed field, delta, and material destination agree with the transformation you actually performed.

## First-look failure signals

Stop and record the tick/seed if any of these occur:

- visible terrain or orbital change without a corresponding state/ledger change;
- NaN, negative mass, or obviously impossible ledger values;
- Ringthroat creates orbital material while starved;
- rewind leaves future events or later world state visible;
- A and B differ before their fork;
- controls stop responding after reset, branch switch, or timeline scrub;
- the viewport reports a WebGL context loss and does not recover when the browser restores it.
