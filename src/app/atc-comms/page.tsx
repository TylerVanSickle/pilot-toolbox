"use client";

import { useState } from "react";
import { commScenarios, commCategories } from "@/data/atc-comms";
import {
  Radio,
  ChevronDown,
  ChevronUp,
  Filter,
  Mic,
  Headphones,
  Lightbulb,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ATCCommsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hiddenCalls, setHiddenCalls] = useState<Set<number>>(new Set());
  const [practiceMode, setPracticeMode] = useState(false);

  const filtered =
    selectedCategory === "All"
      ? commScenarios
      : commScenarios.filter((s) => s.category === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleHideCall = (id: number) => {
    setHiddenCalls((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePracticeMode = () => {
    setPracticeMode(!practiceMode);
    if (!practiceMode) {
      // Hide all calls in practice mode
      setHiddenCalls(new Set(filtered.map((s) => s.id)));
    } else {
      setHiddenCalls(new Set());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ATC Communications</h1>
          <p className="text-muted text-sm mt-1">
            Practice radio calls for common flight scenarios
          </p>
        </div>
        <button
          onClick={togglePracticeMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            practiceMode
              ? "bg-accent text-background"
              : "bg-card border border-border text-muted hover:text-foreground"
          }`}
        >
          {practiceMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {practiceMode ? "Show All" : "Practice Mode"}
        </button>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-muted shrink-0" />
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "All"
              ? "bg-accent text-background"
              : "bg-card text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {commCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-accent text-background"
                : "bg-card text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {practiceMode && (
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6 text-sm text-foreground">
          <strong>Practice Mode:</strong> Read the situation, then try to formulate the correct radio call before revealing it. Click the eye icon to check your answer.
        </div>
      )}

      {/* Scenarios */}
      <div className="space-y-4">
        {filtered.map((scenario) => {
          const isExpanded = expandedId === scenario.id;
          const isHidden = hiddenCalls.has(scenario.id);

          return (
            <div
              key={scenario.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggleExpand(scenario.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-accent shrink-0" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{scenario.title}</p>
                    <p className="text-xs text-muted">{scenario.category}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted" />
                )}
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 animate-slide-up">
                  {/* Situation */}
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-xs font-medium text-muted mb-1">SITUATION</p>
                    <p className="text-sm text-foreground">{scenario.situation}</p>
                  </div>

                  {/* Your call */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-accent flex items-center gap-1">
                        <Mic className="w-3 h-3" /> YOUR RADIO CALL
                      </p>
                      {practiceMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleHideCall(scenario.id);
                          }}
                          className="text-muted hover:text-foreground transition-colors"
                        >
                          {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                    {isHidden ? (
                      <p className="text-sm text-muted italic">
                        Try to say the call out loud first, then click the eye to reveal...
                      </p>
                    ) : (
                      <p className="text-sm text-foreground font-mono leading-relaxed">
                        &quot;{scenario.yourCall}&quot;
                      </p>
                    )}
                  </div>

                  {/* Expected response */}
                  <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                    <p className="text-xs font-medium text-success flex items-center gap-1 mb-1">
                      <Headphones className="w-3 h-3" /> ATC RESPONSE
                    </p>
                    <p className="text-sm text-foreground font-mono leading-relaxed">
                      &quot;{scenario.expectedResponse}&quot;
                    </p>
                  </div>

                  {/* Tips */}
                  {scenario.tips.length > 0 && (
                    <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                      <p className="text-xs font-medium text-warning flex items-center gap-1 mb-2">
                        <Lightbulb className="w-3 h-3" /> TIPS
                      </p>
                      <ul className="space-y-1">
                        {scenario.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-warning mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* General radio tips */}
      <div className="bg-card border border-border rounded-2xl p-6 mt-8">
        <h3 className="text-sm font-medium text-foreground mb-3">General Radio Communication Tips</h3>
        <div className="space-y-2 text-sm text-muted">
          <p><strong className="text-foreground">Format:</strong> Who you&apos;re calling → Who you are → Where you are → What you want</p>
          <p><strong className="text-foreground">Be concise:</strong> Think about what you&apos;re going to say BEFORE keying the mic</p>
          <p><strong className="text-foreground">Read back:</strong> Always read back: runway assignments, hold-short instructions, altimeter settings, and transponder codes</p>
          <p><strong className="text-foreground">Unsure?</strong> &quot;Say again&quot; is always acceptable. Never guess what ATC said.</p>
          <p><strong className="text-foreground">Emergency freqs:</strong> 121.5 MHz (VHF emergency/guard), 7700 (transponder emergency), 7600 (comm failure), 7500 (hijack)</p>
        </div>
      </div>
    </div>
  );
}
