# Simulation Model

## Model status

This prototype is a causal laboratory, not an astrophysical or geophysical forecast. Unless explicitly stated otherwise, quantities are normalized or abstract laboratory-model units. Numerical coefficients are **LAB MODEL** parameters, not Starsilk canon.

## Grid

- width: 128 longitude cells;
- height: 64 latitude cells;
- total: 8,192 authoritative cells;
- longitude wraps conceptually around the sphere;
- latitude is bounded at the poles;
- renderer UV coordinates map directly into this lattice.

## Initial planet

`PlanetGenerator` produces a fictional Earthlike world from an explicit integer seed using local deterministic interpolated fields. It derives continental elevation, broad terrain detail, water distribution, latitude/elevation-influenced temperature, humidity, vegetation, microbial mass, animal biomass, organic soil, population mass, and infrastructure density. No external noise package or remote data is used.

## Per-cell state

### Lithosphere

- `elevation`: normalized displacement around reference radius;
- `crustIntegrity`: 0–1 structural integrity;
- `crustStress`: 0–1 accumulated stress;
- `fractureIntensity`: 0–1 fracture state;
- `exposedMineralMass`: abstract exposed mineral inventory.

### Hydrosphere

- `surfaceWaterMass`: abstract surface-water inventory.

### Atmosphere

- `atmosphericWaterMass`: atmospheric water inventory;
- `humidity`: normalized derived humidity signal;
- `aerosolDensity`: normalized disturbance aerosol signal;
- `temperature`: normalized laboratory temperature state.

### Biosphere

- `vegetationMass`;
- `microbialMass`;
- `animalMass`;
- `organicSoilMass`.

### Civilization abstraction

- `populationMass`;
- `infrastructureDensity`.

### Drakken/provenance

- `drakkenInfluence`: 0–1 recent process influence;
- `latestCause`: latest major direct process or environmental consequence;
- `latestChangeTick`: tick of that major change;
- `latestField`: major field category changed;
- `latestDelta`: magnitude associated with that change;
- `materialDestination`: none, Gorevault processing, or Ringthroat/orbital construction.

## Fault-Tongue — LAB MODEL

For each cached influenced cell, process weight is the deployment intensity multiplied by a smooth spherical influence kernel. Each fixed tick:

- crust stress increases;
- above a stress threshold, fracture intensity rises;
- fracture reduces crust integrity;
- a seeded cell/tick orientation term causes deterministic local uplift/subsidence;
- fracture exposes mineral mass and adds aerosols;
- a bounded fraction of fracture stress propagates to orthogonal neighboring cells, with longitude wrap and pole clamping;
- provenance identifies crust as the directly affected field.

The seeded orientation is derived from integer hashing. No per-frame random vertex perturbation exists.

## Cloudmaw — LAB MODEL

Cloudmaw calculates a bounded desired transfer for its receiving kernel. Donor cells are any cells with surface water above the donor floor. Water is removed from donors and distributed into receivers by cached spatial weight.

The modeled hydrological conservation equation is:

```text
SUM(surfaceWaterMass + atmosphericWaterMass) before
≈
SUM(surfaceWaterMass + atmosphericWaterMass) after
```

The declared automated-test tolerance is `1e-3` abstract water units, accommodating Float32 accumulation error across 8,192 cells.

Cloudmaw does not create water. `initialWaterMass` records the generated baseline; the runtime reports `WATER DRIFT = current modeled water - initialWaterMass` as a conservation diagnostic. Environmental evaporation transfers surface water into atmospheric storage; condensation performs the inverse transfer.

## Environmental response — LAB MODEL

Each fixed tick:

- warm wet cells evaporate a bounded amount from surface to atmosphere;
- cooler atmospheric storage condenses a bounded amount back to surface;
- humidity is derived from atmospheric-water state;
- flood depth, fracture, and aerosol load contribute to a bounded habitat-damage factor;
- vegetation, animal mass, population mass, and infrastructure may decline as consequences;
- aerosol density slowly settles.

Environmental degradation removes mass from the currently harvestable biological/population pools, but it does **not** delete that mass from the model. The exact removed amount is transferred into the global `environmentalResidueMass` sink: degraded, non-harvestable planetary matter. That sink is authoritative state and participates in the full convertible-material conservation equation.

## Gorevault — LAB MODEL

Harvestable source pools are traversed in this v1 order:

1. population mass;
2. animal mass;
3. vegetation mass;
4. microbial mass;
5. organic soil mass.

A process instance removes no more than both its bounded throughput and the matter actually present in influenced cells. Removed mass enters `collectedOrganics` and increments `totalHarvested`.

Processing transfers existing inventory through:

```text
collected organics
 -> organic slurry + oils + ash + mineral residue
organic slurry -> stabilized material
stabilized material -> refined feedstock
```

The rendering fractions are 0.55 slurry, 0.18 oils, 0.12 ash, and 0.15 mineral residue; they sum to 1.0. Stabilization and refinement are 1:1 transfers. These fractions and throughputs are LAB MODEL values.

The machine-checkable pipeline equation is:

```text
Gorevault.totalHarvested
≈
Gorevault current inventories
+ Ringthroat/orbital current inventories
```

The UI exposes `PIPELINE ERROR` for this equation. Expected error is within floating-point tolerance.

The stronger whole-system equation is:

```text
initialConvertibleMass
≈ current harvestable convertible mass
+ environmentalResidueMass
+ Gorevault current inventories
+ Ringthroat/orbital current inventories
```

The UI exposes `SYSTEM ERROR` for this equation as well. `environmentalResidueMass` is a modeled non-harvestable sink, not vanished matter and not Gorevault feedstock.

## Ringthroat — LAB MODEL

Ringthroat consumes only existing `refinedFeedstock` and advances it through:

```text
refinedFeedstock
 -> queuedForLift
 -> risingMaterial
 -> orbitalLooseMaterial
 -> shapedBandMaterial
```

Every stage decrements the previous stage by the same quantity it increments the next stage. `totalAccepted` records cumulative material accepted from Gorevault; it is provenance, not an additional inventory and is therefore not added to the conservation sum.

`bandCoverage = shapedBandMaterial / requiredBandMass`, capped at 1. The v1 required-band parameter is 280 abstract material units. Continuity and integrity are separate state quantities. Closed state requires approximately full coverage and continuity plus the integrity threshold. Elapsed time alone cannot close the band.

With zero refined feedstock, Ringthroat can move no new material into orbit. If upstream supply stops, any partial shaped band remains partial.

## Fixed-step timing

One simulation tick is one abstract laboratory time unit. The interface consumes ticks at selectable rates 0.25x, 1x, 4x, 16x, and 64x. The same initial state and same ordered action schedule produce the same result regardless of display-frame cadence. Catch-up is capped at 24 simulation steps per rendered frame.

## State hashing

The state hash is a stable non-cryptographic FNV-style integer hash over:

- seed, tick, simulation time, aggregate source quantities, and environmental residue mass;
- every element of every authoritative Float32 field;
- all provenance arrays;
- all Gorevault inventory values;
- all orbital construction values.

Renderer objects and branch labels are excluded. Equal pre-fork worlds therefore hash equally even when inspected through different branch identities.

## Snapshot storage

A snapshot is recorded every 25 ticks and the retained list is capped at 64 snapshots per branch. This bounds memory. Restore uses the nearest available branch snapshot at or before the target and replays deterministic actions/ticks forward from that boundary.
