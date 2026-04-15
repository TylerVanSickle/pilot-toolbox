"use client";

import { useState } from "react";
import { CloudSun, ArrowRight, RotateCcw, Copy, Check } from "lucide-react";

interface DecodedField {
  raw: string;
  label: string;
  decoded: string;
}

function decodeMetar(raw: string): DecodedField[] {
  const fields: DecodedField[] = [];
  const parts = raw.trim().split(/\s+/);
  let idx = 0;

  // Check for METAR/SPECI prefix
  if (parts[idx] === "METAR" || parts[idx] === "SPECI") {
    fields.push({
      raw: parts[idx],
      label: "Report Type",
      decoded: parts[idx] === "METAR" ? "Routine weather report" : "Special weather report (significant change)",
    });
    idx++;
  }

  // Station ID
  if (idx < parts.length && /^[A-Z]{4}$/.test(parts[idx])) {
    fields.push({
      raw: parts[idx],
      label: "Station",
      decoded: `Airport identifier: ${parts[idx]}`,
    });
    idx++;
  }

  // Date/Time
  if (idx < parts.length && /^\d{6}Z$/.test(parts[idx])) {
    const day = parts[idx].slice(0, 2);
    const hour = parts[idx].slice(2, 4);
    const min = parts[idx].slice(4, 6);
    fields.push({
      raw: parts[idx],
      label: "Date/Time",
      decoded: `Day ${day} at ${hour}:${min} Zulu (UTC)`,
    });
    idx++;
  }

  // Auto
  if (idx < parts.length && parts[idx] === "AUTO") {
    fields.push({
      raw: "AUTO",
      label: "Observation Type",
      decoded: "Automated observation (no human augmentation)",
    });
    idx++;
  }

  // Wind
  if (idx < parts.length && /^\d{3}\d{2}(G\d{2,3})?(KT|MPS)$/.test(parts[idx])) {
    const wind = parts[idx];
    const dir = wind.slice(0, 3);
    const speedMatch = wind.match(/(\d{3})(\d{2})(G(\d{2,3}))?(KT|MPS)/);
    if (speedMatch) {
      const direction = dir === "000" ? "calm" : `${dir}°`;
      const speed = speedMatch[2];
      const gust = speedMatch[4];
      const unit = speedMatch[5] === "KT" ? "knots" : "meters per second";
      let decoded = `Wind from ${direction} at ${speed} ${unit}`;
      if (gust) decoded += `, gusting to ${gust} ${unit}`;
      fields.push({ raw: parts[idx], label: "Wind", decoded });
    }
    idx++;
  } else if (idx < parts.length && parts[idx] === "00000KT") {
    fields.push({ raw: parts[idx], label: "Wind", decoded: "Calm winds" });
    idx++;
  } else if (idx < parts.length && /^VRB\d{2}KT$/.test(parts[idx])) {
    const speed = parts[idx].slice(3, 5);
    fields.push({ raw: parts[idx], label: "Wind", decoded: `Variable direction at ${speed} knots` });
    idx++;
  }

  // Variable wind direction
  if (idx < parts.length && /^\d{3}V\d{3}$/.test(parts[idx])) {
    const from = parts[idx].slice(0, 3);
    const to = parts[idx].slice(4, 7);
    fields.push({
      raw: parts[idx],
      label: "Variable Wind",
      decoded: `Wind direction varying between ${from}° and ${to}°`,
    });
    idx++;
  }

  // Visibility
  if (idx < parts.length) {
    const visMatch = parts[idx].match(/^(\d+)(SM)?$/);
    const visFracMatch = parts[idx].match(/^(\d+)\/(\d+)SM$/);
    const visMixMatch = idx + 1 < parts.length && /^\d+$/.test(parts[idx]) && /^\d+\/\d+SM$/.test(parts[idx + 1]);

    if (parts[idx] === "P6SM") {
      fields.push({ raw: parts[idx], label: "Visibility", decoded: "Greater than 6 statute miles" });
      idx++;
    } else if (parts[idx] === "M1/4SM") {
      fields.push({ raw: parts[idx], label: "Visibility", decoded: "Less than 1/4 statute mile" });
      idx++;
    } else if (visMixMatch) {
      fields.push({
        raw: `${parts[idx]} ${parts[idx + 1]}`,
        label: "Visibility",
        decoded: `${parts[idx]} ${parts[idx + 1].replace("SM", "")} statute miles`,
      });
      idx += 2;
    } else if (visFracMatch) {
      fields.push({
        raw: parts[idx],
        label: "Visibility",
        decoded: `${visFracMatch[1]}/${visFracMatch[2]} statute miles`,
      });
      idx++;
    } else if (visMatch && visMatch[2]) {
      fields.push({
        raw: parts[idx],
        label: "Visibility",
        decoded: `${visMatch[1]} statute miles`,
      });
      idx++;
    }
  }

  // Weather phenomena
  const wxCodes: Record<string, string> = {
    RA: "Rain", SN: "Snow", DZ: "Drizzle", FG: "Fog", BR: "Mist",
    HZ: "Haze", TS: "Thunderstorm", SH: "Showers", GR: "Hail",
    GS: "Small hail", FZ: "Freezing", PL: "Ice pellets", IC: "Ice crystals",
    UP: "Unknown precip", SQ: "Squall", FC: "Funnel cloud/tornado",
    SS: "Sandstorm", DS: "Duststorm", SA: "Sand", DU: "Dust",
    VA: "Volcanic ash", PO: "Dust/sand whirls", FU: "Smoke",
    PE: "Ice pellets", BL: "Blowing", MI: "Shallow", BC: "Patches",
    PR: "Partial", DR: "Drifting",
  };
  const intensities: Record<string, string> = {
    "+": "Heavy", "-": "Light", VC: "Vicinity",
  };

  while (idx < parts.length) {
    const wx = parts[idx];
    if (/^(-|\+|VC)?[A-Z]{2,}$/.test(wx) && !wx.startsWith("A0") && !/^(SKC|CLR|FEW|SCT|BKN|OVC|VV)/.test(wx)) {
      let decoded = "";
      let remaining = wx;

      // Check intensity
      if (remaining.startsWith("+") || remaining.startsWith("-")) {
        decoded += (intensities[remaining[0]] || "") + " ";
        remaining = remaining.slice(1);
      } else if (remaining.startsWith("VC")) {
        decoded += "In the vicinity: ";
        remaining = remaining.slice(2);
      }

      // Decode pairs
      const wxParts: string[] = [];
      while (remaining.length >= 2) {
        const code = remaining.slice(0, 2);
        if (wxCodes[code]) {
          wxParts.push(wxCodes[code]);
          remaining = remaining.slice(2);
        } else {
          break;
        }
      }

      if (wxParts.length > 0) {
        decoded += wxParts.join(" ");
        fields.push({ raw: wx, label: "Weather", decoded: decoded.trim() });
        idx++;
        continue;
      }
    }
    break;
  }

  // Sky condition
  while (idx < parts.length) {
    const sky = parts[idx];
    const skyMatch = sky.match(/^(SKC|CLR|FEW|SCT|BKN|OVC|VV)(\d{3})?(CB|TCU)?$/);
    if (skyMatch) {
      const coverTypes: Record<string, string> = {
        SKC: "Sky clear",
        CLR: "Clear below 12,000",
        FEW: "Few clouds",
        SCT: "Scattered clouds",
        BKN: "Broken clouds",
        OVC: "Overcast",
        VV: "Vertical visibility (indefinite ceiling)",
      };
      let decoded = coverTypes[skyMatch[1]] || skyMatch[1];
      if (skyMatch[2]) {
        const alt = parseInt(skyMatch[2]) * 100;
        decoded += ` at ${alt.toLocaleString()} feet AGL`;
      }
      if (skyMatch[3] === "CB") decoded += " (cumulonimbus — thunderstorm clouds)";
      if (skyMatch[3] === "TCU") decoded += " (towering cumulus)";
      fields.push({ raw: sky, label: "Sky", decoded });
      idx++;
    } else {
      break;
    }
  }

  // Temperature/Dewpoint
  if (idx < parts.length && /^M?\d{2}\/M?\d{2}$/.test(parts[idx])) {
    const [temp, dew] = parts[idx].split("/");
    const parseTemp = (t: string) => {
      const neg = t.startsWith("M");
      const val = parseInt(t.replace("M", ""));
      return neg ? -val : val;
    };
    const tempC = parseTemp(temp);
    const dewC = parseTemp(dew);
    const tempF = Math.round(tempC * 9 / 5 + 32);
    const dewF = Math.round(dewC * 9 / 5 + 32);
    const spread = tempC - dewC;
    fields.push({
      raw: parts[idx],
      label: "Temp / Dewpoint",
      decoded: `Temperature: ${tempC}°C (${tempF}°F) | Dewpoint: ${dewC}°C (${dewF}°F) | Spread: ${spread}°C${spread <= 3 ? " ⚠ Fog/mist likely" : ""}`,
    });
    idx++;
  }

  // Altimeter
  if (idx < parts.length && /^A\d{4}$/.test(parts[idx])) {
    const raw = parts[idx];
    const value = raw.slice(1);
    const inhg = `${value.slice(0, 2)}.${value.slice(2)}`;
    fields.push({
      raw,
      label: "Altimeter",
      decoded: `Altimeter setting: ${inhg} inches of mercury`,
    });
    idx++;
  }

  // Remarks
  const remaining = parts.slice(idx).join(" ");
  if (remaining.length > 0) {
    let remarkDecoded = remaining;
    if (remaining.startsWith("RMK")) {
      remarkDecoded = remaining.slice(4);
    }
    const remarksExplained: string[] = [];
    if (remarkDecoded.includes("AO2")) remarksExplained.push("Automated station with precipitation sensor");
    if (remarkDecoded.includes("AO1")) remarksExplained.push("Automated station without precipitation sensor");
    if (remarkDecoded.includes("SLP")) {
      const slpMatch = remarkDecoded.match(/SLP(\d{3})/);
      if (slpMatch) {
        const slp = parseInt(slpMatch[1]);
        const mb = slp >= 500 ? (slp / 10 + 900).toFixed(1) : (slp / 10 + 1000).toFixed(1);
        remarksExplained.push(`Sea level pressure: ${mb} mb`);
      }
    }
    if (remarkDecoded.includes("$")) remarksExplained.push("Station requires maintenance");

    fields.push({
      raw: remaining,
      label: "Remarks",
      decoded: remarksExplained.length > 0 ? remarksExplained.join(". ") : remarkDecoded,
    });
  }

  return fields;
}

const sampleMetars = [
  "METAR KJFK 141853Z 27008KT 10SM FEW250 22/14 A3012 RMK AO2 SLP203",
  "METAR KORD 141751Z 18015G25KT 6SM -RA BR BKN015 OVC025 18/16 A2978 RMK AO2",
  "SPECI KLAX 141830Z 25010KT 3SM HZ SCT007 BKN015 19/17 A2992 RMK AO2",
  "METAR KDEN 141753Z 35012KT 10SM SCT080 BKN120 15/M02 A3024 RMK AO2 SLP178",
  "METAR KATL 141852Z 00000KT P6SM SKC 28/18 A3008 RMK AO2",
];

export default function MetarPage() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<DecodedField[]>([]);
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    if (input.trim()) {
      setDecoded(decodeMetar(input.trim().toUpperCase()));
    }
  };

  const handleSample = (metar: string) => {
    setInput(metar);
    setDecoded(decodeMetar(metar));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">METAR Decoder</h1>
        <p className="text-muted text-sm mt-1">
          Paste a raw METAR and get a plain-English breakdown of every field
        </p>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <label className="text-sm font-medium text-foreground block mb-2">
          Paste METAR
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., METAR KJFK 141853Z 27008KT 10SM FEW250 22/14 A3012"
            className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-foreground font-mono text-sm placeholder:text-muted/50 outline-none focus:border-accent transition-colors"
            onKeyDown={(e) => e.key === "Enter" && handleDecode()}
          />
          <button
            onClick={handleDecode}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-medium rounded-lg hover:bg-accent-dim transition-colors"
          >
            Decode <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sample METARs */}
      <div className="mb-6">
        <p className="text-xs text-muted mb-2">Try a sample:</p>
        <div className="flex flex-wrap gap-2">
          {sampleMetars.map((m, i) => {
            const station = m.split(" ")[1] || m.split(" ")[0];
            return (
              <button
                key={i}
                onClick={() => handleSample(m)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-card border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors"
              >
                {station}
              </button>
            );
          })}
        </div>
      </div>

      {/* Decoded output */}
      {decoded.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          {decoded.map((field, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-3"
            >
              <div className="shrink-0">
                <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-2.5 py-1">
                  {field.label}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-mono text-sm text-warning mb-1">{field.raw}</p>
                <p className="text-sm text-foreground">{field.decoded}</p>
              </div>
            </div>
          ))}

          {/* Flight category hint */}
          {(() => {
            const visField = decoded.find((f) => f.label === "Visibility");
            const ceilField = decoded.find(
              (f) => f.label === "Sky" && (f.raw.startsWith("BKN") || f.raw.startsWith("OVC") || f.raw.startsWith("VV"))
            );
            let vis = 99;
            if (visField) {
              if (visField.raw === "P6SM") vis = 7;
              else if (visField.raw === "M1/4SM") vis = 0.2;
              else {
                const m = visField.raw.match(/(\d+)SM/);
                if (m) vis = parseInt(m[1]);
              }
            }
            let ceil = 99999;
            if (ceilField) {
              const m = ceilField.raw.match(/\d{3}/);
              if (m) ceil = parseInt(m[0]) * 100;
            }

            let category = "VFR";
            let color = "text-success";
            if (vis < 1 || ceil < 500) { category = "LIFR"; color = "text-fuchsia-400"; }
            else if (vis < 3 || ceil < 1000) { category = "IFR"; color = "text-danger"; }
            else if (vis <= 5 || ceil <= 3000) { category = "MVFR"; color = "text-accent"; }

            return (
              <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <CloudSun className={`w-5 h-5 ${color}`} />
                <span className="text-sm text-foreground">
                  Flight Category: <strong className={color}>{category}</strong>
                  {category === "LIFR" && " — Low Instrument Flight Rules (very poor conditions)"}
                  {category === "IFR" && " — Instrument Flight Rules (not suitable for VFR)"}
                  {category === "MVFR" && " — Marginal VFR (use caution)"}
                  {category === "VFR" && " — Visual Flight Rules (good conditions)"}
                </span>
              </div>
            );
          })()}
        </div>
      )}

      {/* Quick reference */}
      {decoded.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-6 mt-8">
          <h3 className="text-sm font-medium text-foreground mb-4">METAR Format Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["Station ID", "4-letter ICAO code (e.g., KJFK)"],
              ["Date/Time", "DDHHMMz (day, hour, minute in Zulu)"],
              ["Wind", "DDDSSKT or DDDSSGggKT (direction, speed, gust)"],
              ["Visibility", "SM = statute miles (P6SM = more than 6)"],
              ["Weather", "- light, + heavy, RA rain, SN snow, BR mist, FG fog"],
              ["Sky", "FEW <2/8, SCT 3-4/8, BKN 5-7/8, OVC 8/8"],
              ["Temp/Dew", "TT/DD in Celsius (M = minus)"],
              ["Altimeter", "AXXXX (inches Hg, e.g., A3012 = 30.12)"],
            ].map(([term, desc]) => (
              <div key={term} className="flex gap-2">
                <span className="font-mono text-accent shrink-0">{term}</span>
                <span className="text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
