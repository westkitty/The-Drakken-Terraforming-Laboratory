# First Look: Planet-First Celestial Laboratory

Use the default seed `19870615` for the first pass. The point is not to exhaust the laboratory; it is to verify that the planet dominates the view, the celestial environment is real space around it, and Drakken causality still runs on the primary world.

## 0. Arrive in a collapsed planet view

On load, leave the 12-dot **Laboratory controls** closed. Dismiss the first-run card if it is in the way.

Look for: the Three.js scene fills the viewport; the terraformable planet is immediately dominant; there is no permanent dashboard wall; starfield depth is visible behind the planet; the distant system star is present in world space; the compact 12-dot launcher sits at the edge.

## 1. Inspect the planet close-up

Orbit and zoom the globe. Open **INSPECT** only when you need selected-cell telemetry.

Look for: rotation and zoom stay on the planet; cell coordinates change with picking; the scene does not shrink when the overlay opens; Escape returns the overlay to closed.

## 2. Pull the camera back into system view

Open **VIEW** and choose **SYSTEM VIEW**.

Look for: the camera recedes through space rather than scaling a flat picture; the major moon, sparse outer bodies, and distant star become spatially readable; starfield parallax increases with distance; orientation to the primary planet is not lost.

## 3. Inspect the moon

Click **Primary Moon** (not while intending a Drakken deploy). Open **INSPECT** for object type, id, orbital radius, phase, and distance. Choose **FOCUS SELECTED** if you want the camera to follow it.

Look for: the moon is selected, not deployed onto; a Drakken process is not created; FOCUS PLANET / HOME returns to the primary world.

## 4. Inspect another orbital body

Select **Outer Body 1** or **Outer Body 2** the same way.

Look for: the same inspect/focus contract; the body stays visually subordinate to the planet.

## 5. Return to the planet and deploy

Choose **FOCUS PLANET / HOME**. Arm a process in **DRAKKEN**, click the planet (not the moon), then **PLAY**.

Look for: only the primary planet accepts deployment; Fault-Tongue / Cloudmaw / Gorevault / Ringthroat still change authoritative state; the celestial environment remains a backdrop, not a second laboratory.

## 6. Break the crust

Select **Fault-Tongue**, set intensity near `0.85` and radius near `24°`, then deploy it on a continental region. Press **PLAY** at `16x` or `64x` and switch between **NORMAL** and **CRUST**.

Look for: the world changes only after ticks advance; crust integrity/stress/fracture move together; the selected-cell inspector names Fault-Tongue as the causal source after affected cells change.

## 7. Move water instead of creating it

Deploy **Cloudmaw** over a different region and run forward. Open **HYDROLOGY** and watch **WATER MASS** / **WATER DRIFT** in the Material Ledger.

Look for: water redistributes spatially while total modeled water remains conserved within the displayed numerical tolerance.

## 8. Prove Ringthroat can starve

Before building feedstock, deploy **Ringthroat** and run a few ticks.

Look for: the deployed instance reports **STARVED** and orbital material does not appear from nowhere.

## 9. Feed the transformation chain

Deploy several **Gorevault** instances at high intensity/radius across inhabited or biologically rich regions. Run forward, watching **FEEDSTOCK**, **REFINED FEEDSTOCK**, and source biomass/population values. Then let Ringthroat continue operating.

Look for: source inventories fall first; harvested material appears in Gorevault processing; refined feedstock then moves into queued/rising/orbital/shaped material. The orbital structure grows only after that chain exists.

## 10. Rewind the actual world, including the sky

Note a later tick, its hash, and the moon/outer-body positions. Scrub backward to an earlier tick.

Look for: the globe, inspector, ledgers, process state, event strip, and celestial body positions all return to the earlier state. Future events should not remain visible while viewing the past.

## 11. Fork one past into two futures

At the restored tick, choose **FORK B @ CURRENT TICK**. Continue one branch with a different deployment or activation state, then switch between **VIEW A** and **VIEW B**.

Look for: both branches share the same pre-fork history, then diverge only after the fork. Celestial positions at a shared tick remain identical. Switch to **COMPARISON** for the spatial delta and inspect the numerical A/B metrics beside it.

## 12. Ask why a cell looks that way

Switch to **INSPECTION MODE**, choose **PROVENANCE**, and select visibly transformed cells.

Look for: latest cause, change tick, changed field, delta, and material destination agree with the transformation you actually performed.

## First-look failure signals

Stop and record the tick/seed if any of these occur:

- visible terrain or orbital change without a corresponding state/ledger change;
- NaN, negative mass, or obviously impossible ledger values;
- Ringthroat creates orbital material while starved;
- rewind leaves future events, later world state, or later celestial positions visible;
- A and B differ before their fork;
- a moon or outer body receives a Drakken deployment;
- controls stop responding after reset, branch switch, or timeline scrub;
- the viewport reports a WebGL context loss and does not recover when the browser restores it;
- the default view is a dashboard rather than the planet.
