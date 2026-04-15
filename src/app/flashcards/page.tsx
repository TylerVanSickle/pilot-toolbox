"use client";

import { useState, useCallback, useEffect } from "react";
import { questions, categories, type Question } from "@/data/questions";
import {
  loadCustomQuestions,
  saveCustomQuestions,
  loadFlaggedQuestions,
  saveFlaggedQuestions,
  type CustomQuestion,
} from "@/data/storage";
import {
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  CheckCircle,
  XCircle,
  Filter,
  Eye,
  TrendingUp,
  Flag,
  SkipForward,
  Plus,
  X,
  Trash2,
} from "lucide-react";

type CardStatus = "unseen" | "correct" | "incorrect";
type ViewFilter = "all" | "flagged" | "skipped" | "incorrect";

interface StudyStats {
  totalAnswered: number;
  totalCorrect: number;
  lastStudied: string;
  categoryStats: Record<string, { correct: number; total: number }>;
}

function loadStats(): StudyStats {
  if (typeof window === "undefined") return { totalAnswered: 0, totalCorrect: 0, lastStudied: "", categoryStats: {} };
  try {
    const saved = localStorage.getItem("pilot-toolbox-stats");
    if (saved) return JSON.parse(saved);
  } catch {}
  return { totalAnswered: 0, totalCorrect: 0, lastStudied: "", categoryStats: {} };
}

function saveStats(stats: StudyStats) {
  try { localStorage.setItem("pilot-toolbox-stats", JSON.stringify(stats)); } catch {}
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Add Card Modal
function AddCardModal({ onClose, onSave }: { onClose: () => void; onSave: (q: CustomQuestion) => void }) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Custom");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");

  const handleSubmit = () => {
    if (!question.trim() || options.filter((o) => o.trim()).length < 2) return;
    onSave({
      id: Date.now(),
      category,
      question: question.trim(),
      options: options.filter((o) => o.trim()),
      correctIndex,
      explanation: explanation.trim() || "No explanation provided.",
      isCustom: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Add Custom Flashcard</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              placeholder="e.g., Custom, Weather, Regulations..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent min-h-[60px]"
              placeholder="Enter your question..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Answer Options</label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setCorrectIndex(idx)}
                  className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    correctIndex === idx ? "border-success bg-success text-background" : "border-border"
                  }`}
                >
                  {correctIndex === idx && <CheckCircle className="w-4 h-4" />}
                </button>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const next = [...options];
                    next[idx] = e.target.value;
                    setOptions(next);
                  }}
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                />
              </div>
            ))}
            {options.length < 5 && (
              <button
                onClick={() => setOptions([...options, ""])}
                className="text-xs text-accent hover:underline"
              >
                + Add option
              </button>
            )}
            <p className="text-xs text-muted mt-1">Click the circle to mark the correct answer</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Explanation (optional)</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent min-h-[50px]"
              placeholder="Why is this the correct answer?"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!question.trim() || options.filter((o) => o.trim()).length < 2}
            className="w-full py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors disabled:opacity-30"
          >
            Add Flashcard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("all");
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());
  const [skippedIds, setSkippedIds] = useState<Set<number>>(new Set());
  const [deck, setDeck] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState<StudyStats>({ totalAnswered: 0, totalCorrect: 0, lastStudied: "", categoryStats: {} });
  const [flipped, setFlipped] = useState(false);
  const [statuses, setStatuses] = useState<Record<number, CardStatus>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load custom data on mount
  useEffect(() => {
    setCustomQuestions(loadCustomQuestions());
    setFlaggedIds(loadFlaggedQuestions());
    setStats(loadStats());
    setMounted(true);
  }, []);

  // All questions combined
  const allQuestions: Question[] = [...questions, ...customQuestions as unknown as Question[]];
  const allCategories = [...new Set([...categories, ...customQuestions.map((q) => q.category)])];

  // Build deck based on filters
  useEffect(() => {
    let pool = selectedCategory === "All"
      ? allQuestions
      : allQuestions.filter((q) => q.category === selectedCategory);

    if (viewFilter === "flagged") {
      pool = pool.filter((q) => flaggedIds.has(q.id));
    } else if (viewFilter === "skipped") {
      pool = pool.filter((q) => skippedIds.has(q.id));
    } else if (viewFilter === "incorrect") {
      pool = pool.filter((q) => statuses[q.id] === "incorrect");
    }

    setDeck(pool);
    setCurrentIndex(0);
    setFlipped(false);
    setShowAnswer(false);
    setSelectedOption(null);
  }, [selectedCategory, viewFilter, flaggedIds.size, skippedIds.size, customQuestions.length]);

  const current = deck[currentIndex];
  const total = deck.length;
  const correctCount = Object.values(statuses).filter((s) => s === "correct").length;
  const incorrectCount = Object.values(statuses).filter((s) => s === "incorrect").length;

  const resetCard = () => {
    setFlipped(false);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  const handleShuffle = useCallback(() => {
    setDeck((prev) => shuffleArray(prev));
    setCurrentIndex(0);
    resetCard();
  }, []);

  const handleReset = useCallback(() => {
    setStatuses({});
    setSkippedIds(new Set());
    setCurrentIndex(0);
    resetCard();
  }, []);

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      resetCard();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      resetCard();
    }
  };

  const handleSkip = () => {
    if (!current) return;
    setSkippedIds((prev) => {
      const next = new Set(prev);
      next.add(current.id);
      return next;
    });
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
    resetCard();
  };

  const handleFlag = () => {
    if (!current) return;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(current.id)) next.delete(current.id);
      else next.add(current.id);
      saveFlaggedQuestions(next);
      return next;
    });
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || !current) return;
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    const isCorrect = optionIndex === current.correctIndex;
    setStatuses((prev) => ({
      ...prev,
      [current.id]: isCorrect ? "correct" : "incorrect",
    }));

    // Remove from skipped if answered
    if (skippedIds.has(current.id)) {
      setSkippedIds((prev) => {
        const next = new Set(prev);
        next.delete(current.id);
        return next;
      });
    }

    setStats((prev) => {
      const catStats = { ...prev.categoryStats };
      if (!catStats[current.category]) catStats[current.category] = { correct: 0, total: 0 };
      catStats[current.category] = {
        correct: catStats[current.category].correct + (isCorrect ? 1 : 0),
        total: catStats[current.category].total + 1,
      };
      const updated = {
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        lastStudied: new Date().toISOString(),
        categoryStats: catStats,
      };
      saveStats(updated);
      return updated;
    });
  };

  const handleFlip = () => {
    if (selectedOption === null) setFlipped(!flipped);
  };

  const handleReveal = () => {
    if (!current) return;
    setShowAnswer(true);
    setSelectedOption(current.correctIndex);
  };

  const handleAddCard = (q: CustomQuestion) => {
    const updated = [...customQuestions, q];
    setCustomQuestions(updated);
    saveCustomQuestions(updated);
  };

  const handleDeleteCustom = (id: number) => {
    const updated = customQuestions.filter((q) => q.id !== id);
    setCustomQuestions(updated);
    saveCustomQuestions(updated);
  };

  const isFlagged = mounted && current ? flaggedIds.has(current.id) : false;
  const isCustom = mounted && current ? !!(current as unknown as CustomQuestion).isCustom : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">PPL Flashcards</h1>
          <p className="text-muted text-sm mt-1">
            Study private pilot knowledge — tap a card to flip, or answer the question
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-success">
            <CheckCircle className="w-4 h-4" /> {correctCount}
          </span>
          <span className="flex items-center gap-1 text-danger">
            <XCircle className="w-4 h-4" /> {incorrectCount}
          </span>
          {total > 0 && (
            <span className="text-muted">
              {currentIndex + 1} / {total}
            </span>
          )}
        </div>
      </div>

      {/* Lifetime stats */}
      {mounted && stats.totalAnswered > 0 && (
        <div className="bg-card border border-border rounded-xl px-4 py-3 mb-6 flex items-center gap-4 text-xs text-muted">
          <TrendingUp className="w-4 h-4 text-accent shrink-0" />
          <span>All-time: <strong className="text-foreground">{stats.totalCorrect}/{stats.totalAnswered}</strong> ({Math.round((stats.totalCorrect / stats.totalAnswered) * 100)}%)</span>
          {stats.lastStudied && (
            <span className="hidden sm:inline">Last studied: {new Date(stats.lastStudied).toLocaleDateString()}</span>
          )}
        </div>
      )}

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-muted shrink-0" />
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "All" ? "bg-accent text-background" : "bg-card text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat ? "bg-accent text-background" : "bg-card text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* View filter (flagged / skipped / incorrect) */}
      <div className="flex items-center gap-2 mb-6">
        {(
          [
            { key: "all", label: "All Cards", icon: null },
            { key: "flagged", label: `Flagged (${flaggedIds.size})`, icon: Flag },
            { key: "skipped", label: `Skipped (${skippedIds.size})`, icon: SkipForward },
            { key: "incorrect", label: `Missed (${incorrectCount})`, icon: XCircle },
          ] as const
        ).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setViewFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              viewFilter === key ? "bg-warning/20 text-warning" : "bg-card text-muted hover:text-foreground"
            }`}
          >
            {Icon && <Icon className="w-3 h-3" />}
            {label}
          </button>
        ))}
      </div>

      {total === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted mb-4">No cards match your current filters.</p>
          <button
            onClick={() => { setViewFilter("all"); setSelectedCategory("All"); }}
            className="px-4 py-2 bg-accent text-background rounded-xl text-sm font-medium hover:bg-accent-dim transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : current ? (
        <>
          {/* Progress bar */}
          <div className="w-full h-2 bg-card rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>

          {/* Flashcard */}
          <div
            className="flip-card w-full min-h-[340px] cursor-pointer mb-6"
            onClick={handleFlip}
          >
            <div className={`flip-card-inner relative w-full min-h-[340px] ${flipped ? "flipped" : ""}`}>
              <div className="flip-card-front absolute inset-0 bg-card border border-border rounded-2xl p-8 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1">
                    {current.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {isCustom && <span className="text-xs text-muted bg-card-hover rounded-full px-2 py-0.5">Custom</span>}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFlag(); }}
                      className={`transition-colors ${isFlagged ? "text-warning" : "text-muted/30 hover:text-warning"}`}
                      title={isFlagged ? "Remove flag" : "Flag for review"}
                    >
                      <Flag className="w-4 h-4" fill={isFlagged ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
                <p className="text-lg font-medium text-foreground flex-1 flex items-center">
                  {current.question}
                </p>
                <p className="text-xs text-muted mt-4 text-center">Click to flip for explanation</p>
              </div>
              <div className="flip-card-back absolute inset-0 bg-card border border-accent/30 rounded-2xl p-8 flex flex-col justify-center">
                <p className="text-accent font-semibold mb-3">Explanation</p>
                <p className="text-foreground leading-relaxed">{current.explanation}</p>
              </div>
            </div>
          </div>

          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {current.options.map((option, idx) => {
              let style = "bg-card border-border hover:border-accent/50 text-foreground";
              if (showAnswer) {
                if (idx === current.correctIndex) {
                  style = "bg-success/10 border-success text-success";
                } else if (idx === selectedOption && idx !== current.correctIndex) {
                  style = "bg-danger/10 border-danger text-danger";
                } else {
                  style = "bg-card border-border text-muted opacity-60";
                }
              }
              return (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); handleOptionSelect(idx); }}
                  disabled={selectedOption !== null}
                  className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all ${style}`}
                >
                  <span className="font-mono text-sm mr-3 opacity-60">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-2.5 rounded-lg bg-card border border-border text-foreground hover:bg-card-hover disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === total - 1}
                className="p-2.5 rounded-lg bg-card border border-border text-foreground hover:bg-card-hover disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              {selectedOption === null && (
                <>
                  <button
                    onClick={handleSkip}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover transition-colors text-sm"
                    title="Skip and come back later"
                  >
                    <SkipForward className="w-4 h-4" /> Skip
                  </button>
                  <button
                    onClick={handleReveal}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" /> Reveal
                  </button>
                </>
              )}
              {isCustom && (
                <button
                  onClick={() => handleDeleteCustom(current.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 transition-colors text-sm"
                  title="Delete custom card"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleShuffle}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover transition-colors text-sm"
              >
                <Shuffle className="w-4 h-4" /> Shuffle
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </>
      ) : null}

      {/* Add card FAB */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-background rounded-full shadow-lg hover:bg-accent-dim transition-colors flex items-center justify-center z-40"
        title="Add custom flashcard"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showAddModal && <AddCardModal onClose={() => setShowAddModal(false)} onSave={handleAddCard} />}
    </div>
  );
}
