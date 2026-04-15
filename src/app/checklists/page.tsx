"use client";

import { useState, useEffect } from "react";
import { defaultChecklists, type Checklist } from "@/data/checklists";
import {
  ClipboardList,
  Check,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Square,
  CheckSquare,
  AlertTriangle,
} from "lucide-react";
import { POHDisclaimer } from "@/components/POHDisclaimer";

interface ChecklistState {
  [checklistId: string]: Set<number>;
}

export default function ChecklistsPage() {
  const [checkedItems, setCheckedItems] = useState<ChecklistState>({});
  const [expandedId, setExpandedId] = useState<string | null>(
    defaultChecklists[0]?.id || null
  );
  const [selectedAircraft, setSelectedAircraft] = useState("DA40");

  const filteredChecklists = defaultChecklists.filter(
    (cl) => cl.aircraft === selectedAircraft
  );

  const toggleItem = (checklistId: string, itemIndex: number) => {
    setCheckedItems((prev) => {
      const current = prev[checklistId] || new Set<number>();
      const next = new Set(current);
      if (next.has(itemIndex)) {
        next.delete(itemIndex);
      } else {
        next.add(itemIndex);
      }
      return { ...prev, [checklistId]: next };
    });
  };

  const resetChecklist = (checklistId: string) => {
    setCheckedItems((prev) => ({ ...prev, [checklistId]: new Set<number>() }));
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const aircraftTypes = [...new Set(defaultChecklists.map((cl) => cl.aircraft))];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Checklists</h1>
          <p className="text-muted text-sm mt-1">
            Interactive checklists for each phase of flight
          </p>
        </div>
        <div className="flex gap-2">
          {aircraftTypes.map((ac) => (
            <button
              key={ac}
              onClick={() => {
                setSelectedAircraft(ac);
                setExpandedId(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedAircraft === ac
                  ? "bg-accent text-background"
                  : "bg-card text-muted hover:text-foreground border border-border"
              }`}
            >
              {ac}
            </button>
          ))}
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-card text-muted hover:text-foreground border border-border transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All
          </button>
        </div>
      </div>

      <POHDisclaimer />

      {/* Checklist cards */}
      <div className="space-y-3">
        {filteredChecklists.map((checklist) => {
          const isExpanded = expandedId === checklist.id;
          const checked = checkedItems[checklist.id] || new Set<number>();
          const completedCount = checked.size;
          const totalCount = checklist.items.length;
          const isComplete = completedCount === totalCount;
          const isEmergency = checklist.name.toLowerCase().includes("emergency") || checklist.name.toLowerCase().includes("failure");

          return (
            <div
              key={checklist.id}
              className={`border rounded-xl overflow-hidden ${
                isEmergency
                  ? "bg-danger/5 border-danger/30"
                  : isComplete
                  ? "bg-success/5 border-success/30"
                  : "bg-card border-border"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => toggleExpand(checklist.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-card-hover/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isEmergency ? (
                    <AlertTriangle className="w-5 h-5 text-danger shrink-0" />
                  ) : isComplete ? (
                    <Check className="w-5 h-5 text-success shrink-0" />
                  ) : (
                    <ClipboardList className="w-5 h-5 text-accent shrink-0" />
                  )}
                  <div className="text-left">
                    <p className={`font-medium ${isEmergency ? "text-danger" : "text-foreground"}`}>
                      {checklist.name}
                    </p>
                    <p className="text-xs text-muted">
                      {completedCount}/{totalCount} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Mini progress */}
                  <div className="w-20 h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isComplete ? "bg-success" : "bg-accent"
                      }`}
                      style={{
                        width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted" />
                  )}
                </div>
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="px-5 pb-5 animate-slide-up">
                  <div className="space-y-1">
                    {checklist.items.map((item, idx) => {
                      const isChecked = checked.has(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleItem(checklist.id, idx)}
                          className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                            isChecked
                              ? "bg-success/5 text-success/70"
                              : "hover:bg-card-hover"
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <span
                              className={`text-sm font-medium ${
                                isChecked ? "line-through text-muted" : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </span>
                            <span
                              className={`text-sm ${
                                isChecked ? "line-through text-muted" : "text-accent"
                              }`}
                            >
                              {item.action}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex justify-end">
                    <button
                      onClick={() => resetChecklist(checklist.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset checklist
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
