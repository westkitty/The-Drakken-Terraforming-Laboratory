# Canon Boundaries

## Authority order

For this prototype, authority is resolved in this order:

1. The current build contract supplied by the project owner.
2. Current project-local canon locks recorded here.
3. Active Starsilk canon references when they do not conflict with the current build contract.
4. Older summaries and generated notes.

The application must not promote implementation conveniences into lore.

## CANON RULE — Drakken scope

- Drakken are elemental planetary terraforming entities.
- The Drakken Terraforming Compendium contains 37 entries: 1 Egg, 35 strains across 5 archetypes with 7 strains each, and 1 Mother.
- The Notebook Program creates Drakken.
- Older Drakken may use macros to alter or configure later generations.
- This v1 implements exactly four representative processes: **Fault-Tongue**, **Cloudmaw**, **Gorevault**, and **Ringthroat**.
- Unimplemented entries have no simulated behavior in v1.

## CANON RULE — Fault-Tongue

Fault-Tongue is associated with catastrophic structural splitting and geological fracture. The laboratory may represent that function through deterministic crust stress, integrity loss, fault propagation, elevation change, exposed mineral material, and secondary geological effects.

## LAB MODEL — Fault-Tongue

Thresholds, propagation weights, rates, radii, stress transfer, elevation deltas, and mineral exposure coefficients are simulation parameters chosen for legibility and deterministic experimentation. They are not new canon.

## CANON RULE — Cloudmaw

Cloudmaw can radically manipulate planetary hydrology, including raising oceans over inhabited regions. The laboratory models that function as redistribution of existing planetary water.

## LAB MODEL — Cloudmaw

Donor selection, transfer rate, atmospheric exchange coefficients, flood thresholds, damage rates, and numerical water units are simulation parameters. Total modeled water remains conserved within floating-point tolerance.

## CANON RULE — Gorevault

Gorevault performs collection, gathering, rendering, separation, refinement, storage, and conversion of conquered planetary matter into usable Drakken feedstock. It is a logistical transformation process, not a combat spectacle.

## LAB MODEL — Gorevault

The v1 source pools are population mass, animal biomass, vegetation, microbial biomass, and organic soil matter. The modeled stages are collected organics, oils, ash, mineral residue, organic slurry, stabilized material, and refined feedstock. Stage fractions and throughput rates are simulation parameters. Mass bookkeeping is mandatory.

## CANON RULE — Ringthroat

Ringthroat acts downstream of prepared matter. The required functional sequence is:

`planetary matter -> Gorevault collection/rendering/refinement -> prepared feedstock -> Ringthroat -> sky/orbital construction`

Ringthroat performs lift, extrusion, pressure, orbital transport, stream alignment, orbital shaping, and early Blood Ring construction.

## LAB MODEL — Ringthroat

The v1 pipeline is:

1. refined feedstock available;
2. queued for lift;
3. rising material;
4. orbital loose material;
5. shaped band material;
6. band coverage;
7. band integrity and continuity;
8. closed Blood Ring state only after sufficient material and structural continuity.

Transfer rates, required mass, continuity thresholds, angular segmentation, and integrity growth are simulation parameters. If feedstock stops, construction remains incomplete.

## CANON RULE — Blood Ring visual identity

A Blood Ring is represented as a crystalline ring-like solid band of processed biological and planetary material. The visual language must communicate irregular thickness, translucent crimson material, dark inclusions, partial construction, segmented progress, extrusion scars, and imperfect continuity before closure.

It must not be treated as a clean Saturn-like ring, jewelry-like object, or uniform magical ornament. Visible completion is derived from orbital simulation state.

## Product-language lock

User-facing process cards and documentation distinguish **CANON FUNCTION** from **LAB MODEL**. Instrument labels describe measurable simulation state rather than melodramatic narrative judgment.

## Forbidden canon drift

The prototype must not:

- invent behavior for the remaining Drakken entries;
- imply laboratory coefficients are canonical quantities;
- make material appear without a modeled source;
- allow Ringthroat construction without prepared feedstock;
- imply Blood Ring completion from elapsed time alone;
- replace Drakken terraforming with conventional combat or game progression.
