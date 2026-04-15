"use client";

import { useState } from "react";
import { aircraftProfiles } from "@/data/aircraft";
import { Gauge, Info } from "lucide-react";
import { POHDisclaimer } from "@/components/POHDisclaimer";

const speedColors: Record<string, { bg: string; text: string; arc: string }> = {
  Vs0: { bg: "bg-white/10", text: "text-white", arc: "White arc (bottom)" },
  Vs1: { bg: "bg-green-500/10", text: "text-green-400", arc: "Green arc (bottom)" },
  Vr: { bg: "bg-green-500/10", text: "text-green-400", arc: "—" },
  Vx: { bg: "bg-green-500/10", text: "text-green-400", arc: "—" },
  Vy: { bg: "bg-green-500/10", text: "text-green-400", arc: "—" },
  Vfe: { bg: "bg-white/10", text: "text-white", arc: "White arc (top)" },
  Va: { bg: "bg-yellow-500/10", text: "text-yellow-400", arc: "—" },
  Vno: { bg: "bg-yellow-500/10", text: "text-yellow-400", arc: "Green/Yellow boundary" },
  Vne: { bg: "bg-red-500/10", text: "text-red-400", arc: "Red line" },
  Vg: { bg: "bg-blue-500/10", text: "text-blue-400", arc: "—" },
};

export default function VSpeedsPage() {
  const [selectedAircraft, setSelectedAircraft] = useState("DA40");
  const profile = aircraftProfiles[selectedAircraft];
  const speeds = Object.entries(profile.vSpeeds);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">V-Speed Reference</h1>
          <p className="text-muted text-sm mt-1">
            Quick reference for important airspeeds by aircraft
          </p>
        </div>
        <div className="flex gap-2">
          {Object.entries(aircraftProfiles).map(([key]) => (
            <button
              key={key}
              onClick={() => setSelectedAircraft(key)}
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

      {/* Airspeed indicator visualization */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-accent" />
          Airspeed Indicator Arcs
        </h3>
        <div className="relative h-8 rounded-full overflow-hidden bg-background mb-4">
          {/* White arc - Vs0 to Vfe */}
          <div
            className="absolute h-full bg-white/30"
            style={{
              left: `${(profile.vSpeeds.Vs0.speed / profile.vSpeeds.Vne.speed) * 100}%`,
              width: `${((profile.vSpeeds.Vfe.speed - profile.vSpeeds.Vs0.speed) / profile.vSpeeds.Vne.speed) * 100}%`,
            }}
          />
          {/* Green arc - Vs1 to Vno */}
          <div
            className="absolute h-full bg-green-500/40"
            style={{
              left: `${(profile.vSpeeds.Vs1.speed / profile.vSpeeds.Vne.speed) * 100}%`,
              width: `${((profile.vSpeeds.Vno.speed - profile.vSpeeds.Vs1.speed) / profile.vSpeeds.Vne.speed) * 100}%`,
            }}
          />
          {/* Yellow arc - Vno to Vne */}
          <div
            className="absolute h-full bg-yellow-500/40"
            style={{
              left: `${(profile.vSpeeds.Vno.speed / profile.vSpeeds.Vne.speed) * 100}%`,
              width: `${((profile.vSpeeds.Vne.speed - profile.vSpeeds.Vno.speed) / profile.vSpeeds.Vne.speed) * 100}%`,
            }}
          />
          {/* Red line */}
          <div
            className="absolute h-full w-1 bg-red-500"
            style={{
              left: `${(profile.vSpeeds.Vne.speed / profile.vSpeeds.Vne.speed) * 100 - 1}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted">
          <span>0</span>
          <span className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-white/30 inline-block" /> White (flap range)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-green-500/40 inline-block" /> Green (normal)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-yellow-500/40 inline-block" /> Yellow (caution)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-1 bg-red-500 inline-block" /> Red (never exceed)
            </span>
          </span>
          <span>{profile.vSpeeds.Vne.speed}</span>
        </div>
      </div>

      {/* Speed cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {speeds.map(([name, data]) => {
          const colors = speedColors[name] || { bg: "bg-card", text: "text-foreground", arc: "—" };
          return (
            <div
              key={name}
              className={`${colors.bg} border border-border rounded-xl p-4 flex items-start gap-4`}
            >
              <div className="text-center shrink-0">
                <p className={`text-2xl font-bold font-mono ${colors.text}`}>
                  {data.speed}
                </p>
                <p className="text-xs text-muted">{data.unit}</p>
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${colors.text}`}>{name}</p>
                <p className="text-sm text-foreground">{data.description}</p>
                {colors.arc !== "—" && (
                  <p className="text-xs text-muted mt-1">ASI: {colors.arc}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick memory aid */}
      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-accent" />
          Memory Aids
        </h3>
        <div className="space-y-2 text-sm text-muted">
          <p><strong className="text-foreground">Vx vs Vy:</strong> V<strong>x</strong> = best angle (obstacle clearance, &quot;<strong>x</strong> marks the spot&quot;). V<strong>y</strong> = best rate (fastest altitude gain, &quot;climb to the sk<strong>y</strong>&quot;).</p>
          <p><strong className="text-foreground">Va changes with weight:</strong> Maneuvering speed decreases as weight decreases. The listed value is at max gross weight.</p>
          <p><strong className="text-foreground">Yellow arc:</strong> Smooth air only! No full or abrupt control inputs in the yellow arc. Only fly here in calm conditions.</p>
          <p><strong className="text-foreground">Vg:</strong> Best glide speed gives you the maximum distance in a power-off glide. Critical number for engine-out emergencies.</p>
        </div>
      </div>
    </div>
  );
}
