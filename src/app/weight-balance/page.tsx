"use client";

import { useState, useMemo } from "react";
import { aircraftProfiles } from "@/data/aircraft";
import {
  Scale,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { POHDisclaimer } from "@/components/POHDisclaimer";

interface StationEntry {
  name: string;
  weight: number;
  arm: number;
}

export default function WeightBalancePage() {
  const [selectedAircraft, setSelectedAircraft] = useState("DA40");
  const profile = aircraftProfiles[selectedAircraft];

  const [fuelGallons, setFuelGallons] = useState(profile.fuelCapacity);
  const [stationWeights, setStationWeights] = useState<number[]>(
    profile.stations.map((s) => s.defaultWeight)
  );

  const handleAircraftChange = (key: string) => {
    setSelectedAircraft(key);
    const p = aircraftProfiles[key];
    setFuelGallons(p.fuelCapacity);
    setStationWeights(p.stations.map((s) => s.defaultWeight));
  };

  const handleStationChange = (idx: number, value: number) => {
    setStationWeights((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const handleReset = () => {
    setFuelGallons(profile.fuelCapacity);
    setStationWeights(profile.stations.map((s) => s.defaultWeight));
  };

  const calculations = useMemo(() => {
    const items: { name: string; weight: number; arm: number; moment: number }[] = [];

    // Empty weight
    items.push({
      name: "Empty Aircraft",
      weight: profile.emptyWeight,
      arm: profile.emptyArm,
      moment: profile.emptyMoment,
    });

    // Fuel
    const fuelWeight = fuelGallons * profile.fuelWeight;
    items.push({
      name: `Fuel (${fuelGallons} gal)`,
      weight: fuelWeight,
      arm: profile.fuelArm,
      moment: fuelWeight * profile.fuelArm,
    });

    // Stations
    profile.stations.forEach((station, idx) => {
      const w = stationWeights[idx] || 0;
      items.push({
        name: station.name,
        weight: w,
        arm: station.arm,
        moment: w * station.arm,
      });
    });

    const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
    const totalMoment = items.reduce((sum, i) => sum + i.moment, 0);
    const cg = totalWeight > 0 ? totalMoment / totalWeight : 0;

    // Check if within envelope
    const env = profile.cgEnvelope;
    let withinEnvelope = false;
    // Point-in-polygon test (ray casting)
    for (let i = 0, j = env.length - 1; i < env.length; j = i++) {
      const xi = env[i].arm, yi = env[i].weight;
      const xj = env[j].arm, yj = env[j].weight;
      const intersect =
        yi > totalWeight !== yj > totalWeight &&
        cg < ((xj - xi) * (totalWeight - yi)) / (yj - yi) + xi;
      if (intersect) withinEnvelope = !withinEnvelope;
    }

    const overweight = totalWeight > profile.maxGrossWeight;

    return { items, totalWeight, totalMoment, cg, withinEnvelope, overweight };
  }, [profile, fuelGallons, stationWeights]);

  const isGood = calculations.withinEnvelope && !calculations.overweight;

  // CG Envelope SVG
  const envPoints = profile.cgEnvelope;
  const allArms = envPoints.map((p) => p.arm);
  const allWeights = envPoints.map((p) => p.weight);
  const minArm = Math.min(...allArms) - 2;
  const maxArm = Math.max(...allArms) + 2;
  const minWeight = Math.min(...allWeights) - 100;
  const maxWeight = Math.max(...allWeights) + 100;

  const svgW = 400;
  const svgH = 300;
  const padL = 55;
  const padR = 20;
  const padT = 20;
  const padB = 35;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (arm: number) => padL + ((arm - minArm) / (maxArm - minArm)) * plotW;
  const toY = (w: number) => padT + plotH - ((w - minWeight) / (maxWeight - minWeight)) * plotH;

  const envelopePath = envPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.arm)} ${toY(p.weight)}`)
    .join(" ") + " Z";

  const cgX = toX(calculations.cg);
  const cgY = toY(calculations.totalWeight);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Weight & Balance</h1>
          <p className="text-muted text-sm mt-1">
            Calculate CG and verify you&apos;re within the envelope
          </p>
        </div>
        <div className="flex gap-2">
          {Object.entries(aircraftProfiles).map(([key, p]) => (
            <button
              key={key}
              onClick={() => handleAircraftChange(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedAircraft === key
                  ? "bg-accent text-background"
                  : "bg-card text-muted hover:text-foreground border border-border"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted mb-4">{profile.name}</p>

      <POHDisclaimer />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input side */}
        <div className="space-y-4">
          {/* Fuel */}
          <div className="bg-card border border-border rounded-xl p-5">
            <label className="text-sm font-medium text-foreground block mb-3">
              Fuel: {fuelGallons} gallons ({fuelGallons * profile.fuelWeight} lbs)
            </label>
            <input
              type="range"
              min={0}
              max={profile.fuelCapacity}
              value={fuelGallons}
              onChange={(e) => setFuelGallons(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>0 gal</span>
              <span>{profile.fuelCapacity} gal (full)</span>
            </div>
          </div>

          {/* Stations */}
          {profile.stations.map((station, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-5">
              <label className="text-sm font-medium text-foreground block mb-2">
                {station.name}: {stationWeights[idx]} lbs
                <span className="text-xs text-muted ml-2">(arm: {station.arm}&quot;, max: {station.maxWeight} lbs)</span>
              </label>
              <input
                type="range"
                min={0}
                max={station.maxWeight}
                value={stationWeights[idx]}
                onChange={(e) => handleStationChange(idx, Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>0 lbs</span>
                <span>{station.maxWeight} lbs</span>
              </div>
            </div>
          ))}

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Results side */}
        <div className="space-y-4">
          {/* Status */}
          <div className={`rounded-xl p-5 border ${isGood ? "bg-success/10 border-success/30" : "bg-danger/10 border-danger/30"}`}>
            <div className="flex items-center gap-3 mb-3">
              {isGood ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-danger" />
              )}
              <span className={`font-semibold text-lg ${isGood ? "text-success" : "text-danger"}`}>
                {isGood ? "Within Limits" : "OUT OF LIMITS"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted">Total Weight</p>
                <p className={`font-bold ${calculations.overweight ? "text-danger" : "text-foreground"}`}>
                  {calculations.totalWeight.toFixed(1)} lbs
                </p>
                <p className="text-xs text-muted">Max: {profile.maxGrossWeight}</p>
              </div>
              <div>
                <p className="text-muted">CG Location</p>
                <p className={`font-bold ${calculations.withinEnvelope ? "text-foreground" : "text-danger"}`}>
                  {calculations.cg.toFixed(2)}&quot;
                </p>
              </div>
              <div>
                <p className="text-muted">Total Moment</p>
                <p className="font-bold text-foreground">
                  {calculations.totalMoment.toFixed(0)}
                </p>
              </div>
            </div>
          </div>

          {/* CG Envelope Chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-medium text-foreground mb-3">CG Envelope</h3>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
              {/* Grid lines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const w = minWeight + ((maxWeight - minWeight) * i) / 4;
                return (
                  <g key={`wg-${i}`}>
                    <line x1={padL} y1={toY(w)} x2={svgW - padR} y2={toY(w)} stroke="#334155" strokeWidth={0.5} />
                    <text x={padL - 5} y={toY(w) + 4} textAnchor="end" fill="#64748b" fontSize={10}>
                      {Math.round(w)}
                    </text>
                  </g>
                );
              })}
              {Array.from({ length: 5 }).map((_, i) => {
                const a = minArm + ((maxArm - minArm) * i) / 4;
                return (
                  <g key={`ag-${i}`}>
                    <line x1={toX(a)} y1={padT} x2={toX(a)} y2={svgH - padB} stroke="#334155" strokeWidth={0.5} />
                    <text x={toX(a)} y={svgH - padB + 14} textAnchor="middle" fill="#64748b" fontSize={10}>
                      {a.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Envelope polygon */}
              <path d={envelopePath} fill="#38bdf820" stroke="#38bdf8" strokeWidth={2} />

              {/* CG point */}
              <circle
                cx={cgX}
                cy={cgY}
                r={6}
                fill={isGood ? "#4ade80" : "#f87171"}
                stroke={isGood ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
              />
              <circle
                cx={cgX}
                cy={cgY}
                r={10}
                fill="none"
                stroke={isGood ? "#4ade80" : "#f87171"}
                strokeWidth={1}
                opacity={0.5}
              />

              {/* Axis labels */}
              <text x={svgW / 2} y={svgH - 2} textAnchor="middle" fill="#64748b" fontSize={11}>
                CG (inches aft of datum)
              </text>
              <text
                x={12}
                y={svgH / 2}
                textAnchor="middle"
                fill="#64748b"
                fontSize={11}
                transform={`rotate(-90, 12, ${svgH / 2})`}
              >
                Weight (lbs)
              </text>
            </svg>
          </div>

          {/* Breakdown table */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-medium text-foreground mb-3">Breakdown</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted text-left">
                  <th className="pb-2">Item</th>
                  <th className="pb-2 text-right">Weight</th>
                  <th className="pb-2 text-right">Arm</th>
                  <th className="pb-2 text-right">Moment</th>
                </tr>
              </thead>
              <tbody>
                {calculations.items.map((item, idx) => (
                  <tr key={idx} className="border-t border-border">
                    <td className="py-1.5 text-foreground">{item.name}</td>
                    <td className="py-1.5 text-right text-foreground">{item.weight.toFixed(1)}</td>
                    <td className="py-1.5 text-right text-muted">{item.arm.toFixed(1)}</td>
                    <td className="py-1.5 text-right text-muted">{item.moment.toFixed(0)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-accent font-bold">
                  <td className="py-2 text-accent">TOTAL</td>
                  <td className="py-2 text-right text-accent">{calculations.totalWeight.toFixed(1)}</td>
                  <td className="py-2 text-right text-accent">{calculations.cg.toFixed(2)}</td>
                  <td className="py-2 text-right text-accent">{calculations.totalMoment.toFixed(0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
