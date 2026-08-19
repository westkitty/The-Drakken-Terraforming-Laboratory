import { CELL_COUNT, type GorevaultInventory, type OrbitalInventory, type PlanetStateData } from './types';

const f32 = () => new Float32Array(CELL_COUNT);
const f64 = () => new Float64Array(CELL_COUNT);

export class PlanetState implements PlanetStateData {
  seed: number;
  branchId = 'A';
  tick = 0;
  simulationTime = 0;
  elevation = f32();
  crustIntegrity = f32();
  crustStress = f32();
  fractureIntensity = f32();
  exposedMineralMass = f32();
  surfaceWaterMass = f64();
  atmosphericWaterMass = f64();
  humidity = f32();
  aerosolDensity = f32();
  temperature = f32();
  vegetationMass = f32();
  microbialMass = f32();
  animalMass = f32();
  organicSoilMass = f32();
  populationMass = f32();
  infrastructureDensity = f32();
  drakkenInfluence = f32();
  latestCause = new Uint8Array(CELL_COUNT);
  latestChangeTick = new Uint32Array(CELL_COUNT);
  latestField = new Uint8Array(CELL_COUNT);
  latestDelta = f32();
  materialDestination = new Uint8Array(CELL_COUNT);
  gorevault: GorevaultInventory = emptyGorevault();
  orbital: OrbitalInventory = emptyOrbital();
  totalWater = 0;
  initialWaterMass = 0;
  initialConvertibleMass = 0;
  environmentalResidueMass = 0;

  constructor(seed: number) { this.seed = seed >>> 0; }

  clone(): PlanetState {
    const copy = new PlanetState(this.seed);
    copy.branchId = this.branchId;
    copy.tick = this.tick;
    copy.simulationTime = this.simulationTime;
    for (const key of FLOAT_KEYS) copy[key].set(this[key]);
    copy.latestCause.set(this.latestCause);
    copy.latestChangeTick.set(this.latestChangeTick);
    copy.latestField.set(this.latestField);
    copy.materialDestination.set(this.materialDestination);
    copy.gorevault = { ...this.gorevault };
    copy.orbital = { ...this.orbital };
    copy.totalWater = this.totalWater;
    copy.initialWaterMass = this.initialWaterMass;
    copy.initialConvertibleMass = this.initialConvertibleMass;
    copy.environmentalResidueMass = this.environmentalResidueMass;
    return copy;
  }
}

type NumericArray = Float32Array | Float64Array;
type ArrayKey = Exclude<{ [K in keyof PlanetState]: PlanetState[K] extends NumericArray ? K : never }[keyof PlanetState], undefined>;
const FLOAT_KEYS: ArrayKey[] = [
  'elevation', 'crustIntegrity', 'crustStress', 'fractureIntensity', 'exposedMineralMass',
  'surfaceWaterMass', 'atmosphericWaterMass', 'humidity', 'aerosolDensity', 'temperature',
  'vegetationMass', 'microbialMass', 'animalMass', 'organicSoilMass', 'populationMass',
  'infrastructureDensity', 'drakkenInfluence', 'latestDelta'
];

export function emptyGorevault(): GorevaultInventory {
  return { collectedOrganics: 0, oils: 0, ash: 0, mineralResidue: 0, organicSlurry: 0, stabilizedMaterial: 0, refinedFeedstock: 0, totalHarvested: 0 };
}
export function emptyOrbital(): OrbitalInventory {
  return { queuedForLift: 0, risingMaterial: 0, orbitalLooseMaterial: 0, shapedBandMaterial: 0, totalAccepted: 0, bandCoverage: 0, bandIntegrity: 0, continuity: 0, closed: false };
}
export function totalConvertibleMass(state: PlanetState): number {
  let total = 0;
  for (let i = 0; i < CELL_COUNT; i++) total += state.vegetationMass[i]! + state.microbialMass[i]! + state.animalMass[i]! + state.organicSoilMass[i]! + state.populationMass[i]!;
  return total;
}
export function totalModeledWater(state: PlanetState): number {
  let total = 0;
  for (let i = 0; i < CELL_COUNT; i++) total += state.surfaceWaterMass[i]! + state.atmosphericWaterMass[i]!;
  return total;
}
