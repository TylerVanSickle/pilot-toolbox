"use client";

import { useState, useCallback, useEffect } from "react";
import { regulations, regCategories, type Regulation } from "@/data/regulations";
import {
  BookText,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Filter,
  Search,
  Star,
  Shuffle,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";

type Mode = "reference" | "study" | "quiz";
type ImportanceFilter = "all" | "critical" | "important";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const importanceColors = {
  critical: "text-danger bg-danger/10",
  important: "text-warning bg-warning/10",
  "good-to-know": "text-muted bg-card-hover",
};

// === REFERENCE CARD ===

function RegCard({ reg }: { reg: Regulation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-card-hover transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="font-mono font-bold text-accent text-sm shrink-0 bg-accent/10 rounded-lg px-2.5 py-1">
            {reg.far}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{reg.title}</p>
            <p className="text-xs text-muted truncate">{reg.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${importanceColors[reg.importance]}`}>
            {reg.importance}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 animate-slide-up">
          <p className="text-sm text-foreground mb-3">{reg.summary}</p>
          <ul className="space-y-1.5">
            {reg.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-0.5">•</span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <span className="text-xs text-muted bg-card-hover rounded-full px-2.5 py-0.5">{reg.category}</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full ${importanceColors[reg.importance]}`}>{reg.importance}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// === QUIZ MODE ===

// === STUDY FLASHCARDS ===

function RegStudy({ pool }: { pool: Regulation[] }) {
  const [deck, setDeck] = useState<Regulation[]>(pool);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knewIt, setKnewIt] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setDeck(pool);
    setCurrentIndex(0);
    setFlipped(false);
  }, [pool.length]);

  const current = deck[currentIndex];
  const total = deck.length;
  const knewCount = Object.values(knewIt).filter(Boolean).length;
  const missedCount = Object.values(knewIt).filter((v) => v === false).length;

  if (!current) {
    return <div className="text-center py-12 text-muted">No regulations match your filters.</div>;
  }

  const resetCard = () => setFlipped(false);

  const handleNext = () => {
    if (currentIndex < total - 1) { setCurrentIndex((i) => i + 1); resetCard(); }
  };
  const handlePrev = () => {
    if (currentIndex > 0) { setCurrentIndex((i) => i - 1); resetCard(); }
  };
  const handleShuffle = () => {
    setDeck(shuffleArray(pool));
    setCurrentIndex(0);
    resetCard();
    setKnewIt({});
  };
  const handleReset = () => {
    setDeck(pool);
    setCurrentIndex(0);
    resetCard();
    setKnewIt({});
  };
  const markKnew = () => {
    setKnewIt((p) => ({ ...p, [current.id]: true }));
    handleNext();
  };
  const markMissed = () => {
    setKnewIt((p) => ({ ...p, [current.id]: false }));
    handleNext();
  };

  // If reviewed all cards, show summary
  const reviewedAll = Object.keys(knewIt).length >= total && currentIndex >= total - 1;

  if (reviewedAll) {
    const missedRegs = deck.filter((r) => knewIt[r.id] === false);
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-4xl font-bold text-accent mb-2">
            {knewCount}/{total}
          </p>
          <p className="text-muted">
            {knewCount === total ? "You nailed every one!" : `${missedCount} to review again`}
          </p>
        </div>

        {missedRegs.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Review These</h3>
            <div className="space-y-3">
              {missedRegs.map((reg) => (
                <div key={reg.id} className="flex items-start gap-3">
                  <span className="font-mono font-bold text-accent text-sm bg-accent/10 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">{reg.far}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reg.title}</p>
                    <p className="text-xs text-muted">{reg.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {missedRegs.length > 0 && (
            <button
              onClick={() => {
                setDeck(shuffleArray(missedRegs));
                setCurrentIndex(0);
                setKnewIt({});
                resetCard();
              }}
              className="flex-1 px-4 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
            >
              Study Missed Only ({missedRegs.length})
            </button>
          )}
          <button
            onClick={handleShuffle}
            className="flex-1 px-4 py-3 bg-card border border-border text-foreground font-medium rounded-xl hover:bg-card-hover transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">{currentIndex + 1} / {total}</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-success">
            <CheckCircle className="w-3.5 h-3.5" /> {knewCount}
          </span>
          <span className="flex items-center gap-1 text-danger">
            <XCircle className="w-3.5 h-3.5" /> {missedCount}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-card rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
      </div>

      {/* Flashcard */}
      <div
        className="flip-card w-full min-h-[360px] cursor-pointer mb-6"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flip-card-inner relative w-full min-h-[360px] ${flipped ? "flipped" : ""}`}>
          {/* Front — FAR number */}
          <div className="flip-card-front absolute inset-0 bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full mb-4 ${importanceColors[current.importance]}`}>
              {current.importance} · {current.category}
            </span>
            <p className="text-5xl font-mono font-bold text-accent mb-4">{current.far}</p>
            <p className="text-sm text-muted">What does this FAR cover?</p>
            <p className="text-xs text-muted/50 mt-6">Tap to flip</p>
          </div>
          {/* Back — full info */}
          <div className="flip-card-back absolute inset-0 bg-card border border-accent/30 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono font-bold text-accent bg-accent/10 rounded-lg px-3 py-1 text-lg">{current.far}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${importanceColors[current.importance]}`}>{current.importance}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{current.title}</h3>
            <p className="text-sm text-muted mb-4">{current.summary}</p>
            <ul className="space-y-1.5 flex-1">
              {current.keyPoints.map((p, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span> {p}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted/50 mt-4 text-center">Tap to flip back</p>
          </div>
        </div>
      </div>

      {/* Know / Don't Know buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={(e) => { e.stopPropagation(); markMissed(); }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-danger/10 border border-danger/30 text-danger font-medium rounded-xl hover:bg-danger/20 transition-colors"
        >
          <XCircle className="w-4 h-4" /> Still Learning
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); markKnew(); }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-success/10 border border-success/30 text-success font-medium rounded-xl hover:bg-success/20 transition-colors"
        >
          <CheckCircle className="w-4 h-4" /> Got It
        </button>
      </div>

      {/* Nav controls */}
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
    </div>
  );
}

/** Normalize a FAR number for comparison: strip dots, spaces, parens */
function normalizeFar(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Check if a typed guess matches a regulation's title/summary using keywords */
function doesTitleGuessMatch(guess: string, reg: Regulation): boolean {
  const input = guess.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  if (!input) return false;

  // Check title keywords
  const titleWords = reg.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter((w) => w.length >= 3);
  const matchCount = titleWords.filter((kw) => input.includes(kw)).length;
  if (titleWords.length > 0 && matchCount >= Math.max(1, Math.ceil(titleWords.length * 0.4))) return true;

  // Check summary keywords
  const summaryWords = reg.summary.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter((w) => w.length >= 4);
  const summaryMatches = summaryWords.filter((kw) => input.includes(kw)).length;
  if (summaryWords.length > 0 && summaryMatches >= Math.ceil(summaryWords.length * 0.3)) return true;

  return false;
}

function RegQuiz({ pool }: { pool: Regulation[] }) {
  const [deck, setDeck] = useState<Regulation[]>(() => shuffleArray(pool));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<"number-to-title" | "title-to-number">("number-to-title");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDeck(shuffleArray(pool));
    setCurrentIndex(0);
    setGuess("");
    setResult(null);
    setStarted(false);
    setScore({ correct: 0, total: 0 });
  }, [pool.length]);

  const current = deck[currentIndex];
  if (!current) {
    return (
      <div className="text-center py-12 text-muted">
        No regulations match your filters.
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <BookText className="w-16 h-16 text-accent mx-auto mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-4">FAR Number Quiz</h2>
        <p className="text-muted mb-6 text-sm">
          Type your answer to test yourself — match FAR numbers to rules or rules to FAR numbers.
        </p>

        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setMode("number-to-title")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === "number-to-title" ? "bg-accent text-background" : "bg-card border border-border text-muted hover:text-foreground"
            }`}
          >
            See Number → Type Rule
          </button>
          <button
            onClick={() => setMode("title-to-number")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === "title-to-number" ? "bg-accent text-background" : "bg-card border border-border text-muted hover:text-foreground"
            }`}
          >
            See Rule → Type Number
          </button>
        </div>

        <button
          onClick={() => { setDeck(shuffleArray(pool)); setCurrentIndex(0); setStarted(true); setGuess(""); setResult(null); }}
          className="px-6 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
        >
          Start Quiz ({pool.length} regulations)
        </button>

        {score.total > 0 && (
          <p className="text-sm text-muted mt-4">
            Last round: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
          </p>
        )}
      </div>
    );
  }

  const handleSubmit = () => {
    if (!guess.trim()) return;
    let isCorrect = false;

    if (mode === "title-to-number") {
      // User types a FAR number like "91.113" or "61.57"
      const normalizedGuess = normalizeFar(guess);
      const normalizedAnswer = normalizeFar(current.far);
      isCorrect = normalizedGuess === normalizedAnswer;
      // Also accept without the section prefix for Part 61/91 (e.g., "113" for "61.113")
      if (!isCorrect) {
        const parts = current.far.split(".");
        if (parts.length === 2 && normalizeFar(guess) === normalizeFar(parts[1])) {
          // Close but not quite — they got the section number right but not the part
          // Don't count as correct, they need the full number
        }
        // Accept variations like "91-113", "91 113", "FAR 91.113"
        const cleaned = guess.replace(/^(far|cfr|14 cfr)\s*/i, "").trim();
        if (normalizeFar(cleaned) === normalizedAnswer) isCorrect = true;
      }
    } else {
      // User types a description of the rule
      isCorrect = doesTitleGuessMatch(guess, current);
    }

    setResult(isCorrect ? "correct" : "wrong");
    setScore((p) => ({
      correct: p.correct + (isCorrect ? 1 : 0),
      total: p.total + 1,
    }));
  };

  const advance = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((i) => i + 1);
      setGuess("");
      setResult(null);
    } else {
      setStarted(false);
    }
  };

  const handleSkipReveal = () => {
    setResult("wrong");
    setScore((p) => ({ ...p, total: p.total + 1 }));
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted">{currentIndex + 1} / {deck.length}</span>
        <span className="text-sm">
          <span className="text-success">{score.correct}</span>
          <span className="text-muted"> / </span>
          <span className="text-foreground">{score.total}</span>
          {score.total > 0 && (
            <span className="text-muted ml-2">({Math.round((score.correct / score.total) * 100)}%)</span>
          )}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-card rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }} />
      </div>

      {/* Prompt card */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-6 text-center">
        {mode === "number-to-title" ? (
          <>
            <p className="text-xs text-muted mb-2">What does this FAR cover?</p>
            <p className="text-3xl font-mono font-bold text-accent mb-2">{current.far}</p>
            <p className="text-xs text-muted">Type the rule name or what it covers</p>
          </>
        ) : (
          <>
            <p className="text-xs text-muted mb-2">What FAR number is this?</p>
            <p className="text-xl font-semibold text-foreground">{current.title}</p>
            <p className="text-sm text-muted mt-2">{current.summary}</p>
            <p className="text-xs text-muted mt-3">Type the FAR number (e.g., 91.113 or 61.57)</p>
          </>
        )}
      </div>

      {/* Input / Result */}
      {result === null ? (
        <>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={mode === "title-to-number" ? "e.g., 91.113" : "e.g., right of way rules"}
              className={`flex-1 bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 outline-none focus:border-accent transition-colors ${
                mode === "title-to-number" ? "text-center font-mono text-lg" : "text-sm"
              }`}
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!guess.trim()}
              className="px-5 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors shrink-0 disabled:opacity-30"
            >
              Check
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSkipReveal}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Don&apos;t know — show me
            </button>
          </div>
        </>
      ) : (
        <div className="animate-slide-up">
          {/* Result feedback */}
          <div className={`rounded-xl px-4 py-3 mb-4 flex items-center gap-2 text-sm ${
            result === "correct"
              ? "bg-success/10 border border-success/30 text-success"
              : "bg-danger/10 border border-danger/30 text-danger"
          }`}>
            {result === "correct" ? (
              <><CheckCircle className="w-4 h-4 shrink-0" /> Correct!</>
            ) : (
              <><XCircle className="w-4 h-4 shrink-0" /> {guess.trim() ? `"${guess}" is not quite right` : "No guess entered"}</>
            )}
          </div>

          {/* Full answer */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4 mb-3">
              <span className="font-mono font-bold text-accent text-xl bg-accent/10 rounded-lg px-3 py-1 shrink-0">
                {current.far}
              </span>
              <div>
                <p className="text-lg font-semibold text-foreground">{current.title}</p>
                <p className="text-sm text-muted mt-1">{current.summary}</p>
              </div>
            </div>
            <ul className="space-y-1 ml-1">
              {current.keyPoints.map((p, i) => (
                <li key={i} className="text-xs text-muted flex items-start gap-1.5">
                  <span className="text-accent">•</span> {p}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={advance}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
          >
            {currentIndex < deck.length - 1 ? "Next Regulation" : "See Results"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// === MAIN PAGE ===

export default function RegulationsPage() {
  const [mode, setMode] = useState<Mode>("reference");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [importanceFilter, setImportanceFilter] = useState<ImportanceFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  let filtered = selectedCategory === "All"
    ? regulations
    : regulations.filter((r) => r.category === selectedCategory);

  if (importanceFilter !== "all") {
    filtered = filtered.filter((r) => r.importance === importanceFilter);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.far.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q)
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">FAR Regulations</h1>
          <p className="text-muted text-sm mt-1">
            Study and memorize key Federal Aviation Regulations by number
          </p>
        </div>
        <div className="flex bg-card border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setMode("reference")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              mode === "reference" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            <BookText className="w-4 h-4 inline mr-1" />
            Reference
          </button>
          <button
            onClick={() => setMode("study")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              mode === "study" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            Study
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              mode === "quiz" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            <Shuffle className="w-4 h-4 inline mr-1" />
            Quiz
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-muted shrink-0" />
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === "All" ? "bg-accent text-background" : "bg-card text-muted hover:text-foreground"
          }`}
        >
          All ({regulations.length})
        </button>
        {regCategories.map((cat) => {
          const count = regulations.filter((r) => r.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat ? "bg-accent text-background" : "bg-card text-muted hover:text-foreground"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Importance filter */}
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4 text-muted shrink-0" />
        {(["all", "critical", "important"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setImportanceFilter(level)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              importanceFilter === level
                ? level === "critical" ? "bg-danger/20 text-danger" : level === "important" ? "bg-warning/20 text-warning" : "bg-accent/20 text-accent"
                : "bg-card text-muted hover:text-foreground"
            }`}
          >
            {level === "all" ? "All priorities" : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {mode === "reference" && (
        <>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by FAR number, title, or keyword..."
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-accent transition-colors"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted">No regulations match your search.</div>
          ) : (
            <div className="space-y-3">
              {filtered.map((reg) => (
                <RegCard key={reg.id} reg={reg} />
              ))}
            </div>
          )}
        </>
      )}

      {mode === "study" && <RegStudy pool={filtered} />}

      {mode === "quiz" && <RegQuiz pool={filtered} />}
    </div>
  );
}
