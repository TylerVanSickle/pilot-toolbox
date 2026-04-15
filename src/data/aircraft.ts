export interface AircraftProfile {
  name: string;
  maxGrossWeight: number;
  emptyWeight: number;
  emptyArm: number;
  emptyMoment: number;
  fuelCapacity: number; // gallons
  fuelArm: number;
  fuelWeight: number; // lbs per gallon (avgas = 6)
  stations: StationConfig[];
  cgEnvelope: { weight: number; arm: number }[]; // polygon points
  vSpeeds: Record<string, { speed: number; unit: string; description: string }>;
}

export interface StationConfig {
  name: string;
  arm: number;
  maxWeight: number;
  defaultWeight: number;
}

export const aircraftProfiles: Record<string, AircraftProfile> = {
  "DA40": {
    name: "Diamond DA40 Diamond Star",
    maxGrossWeight: 2535,
    emptyWeight: 1676,
    emptyArm: 95.28,
    emptyMoment: 159694,
    fuelCapacity: 40, // usable gallons
    fuelArm: 96.0,
    fuelWeight: 6,
    stations: [
      { name: "Front Seats", arm: 93.0, maxWeight: 440, defaultWeight: 170 },
      { name: "Rear Seats", arm: 123.0, maxWeight: 352, defaultWeight: 0 },
      { name: "Baggage", arm: 142.0, maxWeight: 66, defaultWeight: 0 },
      { name: "De-Ice / Hat Shelf", arm: 155.0, maxWeight: 22, defaultWeight: 0 },
    ],
    cgEnvelope: [
      { weight: 1676, arm: 90.0 },
      { weight: 1676, arm: 99.6 },
      { weight: 2535, arm: 99.6 },
      { weight: 2535, arm: 93.9 },
      { weight: 1900, arm: 90.0 },
    ],
    vSpeeds: {
      Vs0: { speed: 49, unit: "KIAS", description: "Stall speed (landing config, flaps LDG)" },
      Vs1: { speed: 57, unit: "KIAS", description: "Stall speed (clean config, flaps UP)" },
      Vr: { speed: 59, unit: "KIAS", description: "Rotation speed" },
      Vx: { speed: 66, unit: "KIAS", description: "Best angle of climb" },
      Vy: { speed: 73, unit: "KIAS", description: "Best rate of climb" },
      Vfe: { speed: 108, unit: "KIAS", description: "Max flap extended speed (LDG)" },
      Va: { speed: 108, unit: "KIAS", description: "Maneuvering speed (at max gross)" },
      Vno: { speed: 129, unit: "KIAS", description: "Max structural cruising speed" },
      Vne: { speed: 178, unit: "KIAS", description: "Never exceed speed" },
      Vg: { speed: 73, unit: "KIAS", description: "Best glide speed" },
    },
  },
  "DA20": {
    name: "Diamond DA20-C1 Eclipse",
    maxGrossWeight: 1764,
    emptyWeight: 1174,
    emptyArm: 93.7,
    emptyMoment: 110004,
    fuelCapacity: 24, // usable gallons
    fuelArm: 94.0,
    fuelWeight: 6,
    stations: [
      { name: "Occupants", arm: 90.6, maxWeight: 430, defaultWeight: 170 },
      { name: "Baggage", arm: 122.8, maxWeight: 44, defaultWeight: 0 },
    ],
    cgEnvelope: [
      { weight: 1174, arm: 87.0 },
      { weight: 1174, arm: 96.3 },
      { weight: 1764, arm: 96.3 },
      { weight: 1764, arm: 90.5 },
      { weight: 1400, arm: 87.0 },
    ],
    vSpeeds: {
      Vs0: { speed: 44, unit: "KIAS", description: "Stall speed (landing config, flaps LDG)" },
      Vs1: { speed: 51, unit: "KIAS", description: "Stall speed (clean config, flaps UP)" },
      Vr: { speed: 56, unit: "KIAS", description: "Rotation speed" },
      Vx: { speed: 63, unit: "KIAS", description: "Best angle of climb" },
      Vy: { speed: 73, unit: "KIAS", description: "Best rate of climb" },
      Vfe: { speed: 91, unit: "KIAS", description: "Max flap extended speed (LDG)" },
      Va: { speed: 99, unit: "KIAS", description: "Maneuvering speed (at max gross)" },
      Vno: { speed: 126, unit: "KIAS", description: "Max structural cruising speed" },
      Vne: { speed: 163, unit: "KIAS", description: "Never exceed speed" },
      Vg: { speed: 71, unit: "KIAS", description: "Best glide speed" },
    },
  },
  "SportCruiser": {
    name: "CSA SportCruiser (PS-28 Cruiser)",
    maxGrossWeight: 1320,
    emptyWeight: 838,
    emptyArm: 75.4,
    emptyMoment: 63185,
    fuelCapacity: 28, // usable gallons (two 14-gal wing tanks)
    fuelArm: 78.0,
    fuelWeight: 6,
    stations: [
      { name: "Occupants (side-by-side)", arm: 80.0, maxWeight: 430, defaultWeight: 170 },
      { name: "Baggage", arm: 108.0, maxWeight: 44, defaultWeight: 0 },
    ],
    cgEnvelope: [
      { weight: 838, arm: 70.0 },
      { weight: 838, arm: 83.0 },
      { weight: 1320, arm: 83.0 },
      { weight: 1320, arm: 74.0 },
      { weight: 1050, arm: 70.0 },
    ],
    vSpeeds: {
      Vs0: { speed: 37, unit: "KIAS", description: "Stall speed (landing config, flaps full)" },
      Vs1: { speed: 44, unit: "KIAS", description: "Stall speed (clean config, flaps UP)" },
      Vr: { speed: 50, unit: "KIAS", description: "Rotation speed" },
      Vx: { speed: 57, unit: "KIAS", description: "Best angle of climb" },
      Vy: { speed: 65, unit: "KIAS", description: "Best rate of climb" },
      Vfe: { speed: 80, unit: "KIAS", description: "Max flap extended speed" },
      Va: { speed: 88, unit: "KIAS", description: "Maneuvering speed (at max gross)" },
      Vno: { speed: 117, unit: "KIAS", description: "Max structural cruising speed" },
      Vne: { speed: 146, unit: "KIAS", description: "Never exceed speed" },
      Vg: { speed: 65, unit: "KIAS", description: "Best glide speed" },
    },
  },
};
