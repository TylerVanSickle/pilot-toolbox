"use client";

import { useState, useEffect } from "react";
import { acronyms, acronymCategories, type Acronym } from "@/data/acronyms";
import {
  loadCustomAcronyms,
  saveCustomAcronyms,
  loadFlaggedAcronyms,
  saveFlaggedAcronyms,
  loadAcronymOverrides,
  saveAcronymOverrides,
  type CustomAcronym,
  type AcronymOverride,
} from "@/data/storage";
import {
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Shuffle,
  Filter,
  Flag,
  SkipForward,
  Plus,
  X,
  Trash2,
  Pencil,
  Undo2,
} from "lucide-react";

type Mode = "study" | "quiz";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// === STUDY CARD ===

function AcronymStudyCard({
  acronym,
  isFlagged,
  onToggleFlag,
  isCustom,
  isOverridden,
  onDelete,
  onEdit,
  onRevert,
}: {
  acronym: Acronym;
  isFlagged: boolean;
  onToggleFlag: () => void;
  isCustom: boolean;
  isOverridden: boolean;
  onDelete?: () => void;
  onEdit: () => void;
  onRevert?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-card border rounded-xl overflow-hidden ${isOverridden ? "border-accent/30" : "border-border"}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-card-hover transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-accent font-mono">
            {acronym.acronym}
          </span>
          <span className="text-xs text-muted bg-card-hover rounded-full px-2.5 py-0.5">
            {acronym.category}
          </span>
          {isCustom && (
            <span className="text-xs text-accent bg-accent/10 rounded-full px-2 py-0.5">Custom</span>
          )}
          {isOverridden && !isCustom && (
            <span className="text-xs text-accent bg-accent/10 rounded-full px-2 py-0.5">Edited</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="text-muted/30 hover:text-accent transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFlag(); }}
            className={`transition-colors ${isFlagged ? "text-warning" : "text-muted/30 hover:text-warning"}`}
          >
            <Flag className="w-4 h-4" fill={isFlagged ? "currentColor" : "none"} />
          </button>
          {isCustom && onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-muted/30 hover:text-danger transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          {isOverridden && !isCustom && onRevert && (
            <button
              onClick={(e) => { e.stopPropagation(); onRevert(); }}
              className="text-muted/30 hover:text-warning transition-colors"
              title="Revert to original"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
          )}
          {expanded ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
        </div>
      </div>
      {expanded && (
        <div className="px-5 pb-5 animate-slide-up">
          <p className="text-sm text-muted mb-3">{acronym.description}</p>
          <div className="space-y-1.5">
            {acronym.letters.map((letter, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-bold text-accent font-mono w-6 text-center shrink-0">
                  {letter}
                </span>
                <span className="text-sm text-foreground">
                  — {acronym.meanings[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// === ADD ACRONYM MODAL ===

function AcronymModal({
  onClose,
  onSave,
  editing,
}: {
  onClose: () => void;
  onSave: (a: CustomAcronym) => void;
  editing?: Acronym | null;
}) {
  const [name, setName] = useState(editing?.acronym || "");
  const [category, setCategory] = useState(editing?.category || "Custom");
  const [description, setDescription] = useState(editing?.description || "");
  const [entries, setEntries] = useState<{ letter: string; meaning: string }[]>(
    editing
      ? editing.letters.map((l, i) => ({ letter: l, meaning: editing.meanings[i] || "" }))
      : [
          { letter: "", meaning: "" },
          { letter: "", meaning: "" },
          { letter: "", meaning: "" },
        ]
  );

  const handleSubmit = () => {
    const valid = entries.filter((e) => e.letter.trim() && e.meaning.trim());
    if (!name.trim() || valid.length < 2) return;
    onSave({
      id: editing?.id || Date.now(),
      acronym: name.trim().toUpperCase(),
      category: category.trim() || "Custom",
      letters: valid.map((e) => e.letter.trim().toUpperCase()),
      meanings: valid.map((e) => e.meaning.trim()),
      description: description.trim() || `Custom acronym: ${name.trim().toUpperCase()}`,
      isCustom: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{editing ? "Edit Acronym" : "Add Custom Acronym"}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Acronym</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent font-mono uppercase"
                placeholder="e.g., GUMPS"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                placeholder="e.g., Custom"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              placeholder="What is this acronym for?"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Letters & Meanings</label>
            {entries.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={entry.letter}
                  onChange={(e) => {
                    const next = [...entries];
                    next[idx] = { ...entry, letter: e.target.value.slice(0, 2) };
                    setEntries(next);
                  }}
                  className="w-12 bg-background border border-border rounded-lg px-2 py-2 text-sm text-accent font-mono text-center uppercase outline-none focus:border-accent"
                  placeholder="A"
                />
                <input
                  type="text"
                  value={entry.meaning}
                  onChange={(e) => {
                    const next = [...entries];
                    next[idx] = { ...entry, meaning: e.target.value };
                    setEntries(next);
                  }}
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  placeholder="What this letter stands for"
                />
                {entries.length > 2 && (
                  <button
                    onClick={() => setEntries(entries.filter((_, i) => i !== idx))}
                    className="text-muted hover:text-danger shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setEntries([...entries, { letter: "", meaning: "" }])}
              className="text-xs text-accent hover:underline"
            >
              + Add letter
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!name.trim() || entries.filter((e) => e.letter.trim() && e.meaning.trim()).length < 2}
            className="w-full py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors disabled:opacity-30"
          >
            {editing ? "Save Changes" : "Add Acronym"}
          </button>
        </div>
      </div>
    </div>
  );
}

// === QUIZ ===

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

function doesGuessMatch(guess: string, meaningIndex: number, acronym: Acronym): boolean {
  const input = normalize(guess);
  if (!input) return false;

  const alts = acronym.altAnswers?.[meaningIndex];
  if (alts) {
    for (const alt of alts) {
      const normAlt = normalize(alt);
      if (input === normAlt || input.includes(normAlt) || normAlt.includes(input)) {
        if (input.length >= Math.min(normAlt.length, 3)) return true;
      }
    }
  }

  const meaning = normalize(acronym.meanings[meaningIndex]);
  const keywords = meaning.split(" ").filter((w) => w.length >= 3);
  if (keywords.length === 0) return input === meaning;
  const matchCount = keywords.filter((kw) => input.includes(kw)).length;
  return matchCount >= Math.max(1, Math.ceil(keywords.length * 0.4));
}

function findMatchIndex(guess: string, acronym: Acronym, alreadySolved: Set<number>): number {
  for (let i = 0; i < acronym.meanings.length; i++) {
    if (alreadySolved.has(i)) continue;
    if (doesGuessMatch(guess, i, acronym)) return i;
  }
  return -1;
}

function AcronymQuiz({
  allAcronyms,
  allCategories,
  flaggedIds,
  onToggleFlag,
}: {
  allAcronyms: Acronym[];
  allCategories: string[];
  flaggedIds: Set<number>;
  onToggleFlag: (id: number) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewFilter, setViewFilter] = useState<"all" | "flagged">("all");
  const [deck, setDeck] = useState<Acronym[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedIndices, setSolvedIndices] = useState<Set<number>>(new Set());
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [skippedAcronyms, setSkippedAcronyms] = useState<Set<number>>(new Set());
  const [guessInput, setGuessInput] = useState("");
  const [lastResult, setLastResult] = useState<{ type: "correct" | "wrong"; text: string } | null>(null);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Build deck from filters
  useEffect(() => {
    let pool = selectedCategory === "All"
      ? allAcronyms
      : allAcronyms.filter((a) => a.category === selectedCategory);

    if (viewFilter === "flagged") {
      pool = pool.filter((a) => flaggedIds.has(a.id));
    }

    setDeck(shuffleArray(pool));
    setCurrentIndex(0);
    setStarted(false);
    setSolvedIndices(new Set());
    setRevealedIndices(new Set());
    setGuessInput("");
    setLastResult(null);
    setWrongGuesses(0);
  }, [selectedCategory, viewFilter, allAcronyms.length, flaggedIds.size]);

  const current = deck[currentIndex];
  if (!current) {
    return (
      <div className="text-center py-16">
        <p className="text-muted mb-4">No acronyms match your current filters.</p>
        <button
          onClick={() => { setViewFilter("all"); setSelectedCategory("All"); }}
          className="px-4 py-2 bg-accent text-background rounded-xl text-sm font-medium hover:bg-accent-dim transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  const totalSlots = current.meanings.length;
  const solvedCount = solvedIndices.size;
  const revealedCount = revealedIndices.size;
  const allDone = solvedCount + revealedCount >= totalSlots;
  const isFlagged = flaggedIds.has(current.id);

  const handleStart = () => {
    setSolvedIndices(new Set());
    setRevealedIndices(new Set());
    setGuessInput("");
    setLastResult(null);
    setWrongGuesses(0);
    setStarted(true);
  };

  const handleGuess = () => {
    const guess = guessInput.trim();
    if (!guess) return;
    const matchIdx = findMatchIndex(guess, current, new Set([...solvedIndices, ...revealedIndices]));
    if (matchIdx >= 0) {
      setSolvedIndices((prev) => new Set(prev).add(matchIdx));
      setLastResult({ type: "correct", text: `"${guess}" matched → ${current.letters[matchIdx]} — ${current.meanings[matchIdx]}` });
      setScore((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setWrongGuesses((w) => w + 1);
      setLastResult({ type: "wrong", text: `"${guess}" didn't match any remaining item. Try again!` });
      setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    }
    setGuessInput("");
  };

  const handleRevealOne = (idx: number) => {
    setRevealedIndices((prev) => new Set(prev).add(idx));
  };

  const handleGiveUp = () => {
    const remaining = new Set(revealedIndices);
    for (let i = 0; i < totalSlots; i++) {
      if (!solvedIndices.has(i)) remaining.add(i);
    }
    setRevealedIndices(remaining);
  };

  const handleSkip = () => {
    setSkippedAcronyms((prev) => new Set(prev).add(current.id));
    goToNextAcronym();
  };

  const goToNextAcronym = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSolvedIndices(new Set());
      setRevealedIndices(new Set());
      setGuessInput("");
      setLastResult(null);
      setWrongGuesses(0);
      setStarted(true);
    }
  };

  const handleRestart = () => {
    setDeck(shuffleArray(allAcronyms.filter((a) => selectedCategory === "All" || a.category === selectedCategory)));
    setCurrentIndex(0);
    setSolvedIndices(new Set());
    setRevealedIndices(new Set());
    setSkippedAcronyms(new Set());
    setGuessInput("");
    setLastResult(null);
    setWrongGuesses(0);
    setStarted(false);
    setScore({ correct: 0, total: 0 });
  };

  return (
    <div>
      {/* Category filter for quiz */}
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

      {/* View filter */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setViewFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            viewFilter === "all" ? "bg-warning/20 text-warning" : "bg-card text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setViewFilter("flagged")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            viewFilter === "flagged" ? "bg-warning/20 text-warning" : "bg-card text-muted hover:text-foreground"
          }`}
        >
          <Flag className="w-3 h-3" /> Flagged ({flaggedIds.size})
        </button>
        {skippedAcronyms.size > 0 && (
          <span className="text-xs text-muted ml-2">
            {skippedAcronyms.size} skipped
          </span>
        )}
      </div>

      {!started ? (
        <div className="max-w-2xl mx-auto text-center py-12">
          <Brain className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Acronym Quiz</h2>
          <p className="text-muted mb-2">
            <span className="font-mono text-accent text-2xl tracking-widest">{current.acronym}</span>
          </p>
          <p className="text-sm text-muted mb-6">{current.description}</p>
          <p className="text-muted mb-2 text-sm">
            Type what each letter stands for — your answer will automatically slot into the right position.
          </p>
          <p className="text-muted mb-6 text-xs">
            Partial answers and abbreviations work!
          </p>
          <button onClick={handleStart} className="px-6 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors">
            Start
          </button>
          <div className="mt-4 text-sm text-muted">
            {currentIndex + 1} / {deck.length} acronyms
            {score.correct > 0 && <span className="ml-3">Score: {score.correct}/{score.total}</span>}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">
                  <span className="text-accent font-mono tracking-widest">{current.acronym}</span>
                </h2>
                <button
                  onClick={() => onToggleFlag(current.id)}
                  className={`transition-colors ${isFlagged ? "text-warning" : "text-muted/30 hover:text-warning"}`}
                >
                  <Flag className="w-4 h-4" fill={isFlagged ? "currentColor" : "none"} />
                </button>
              </div>
              <p className="text-xs text-muted mt-1">{current.description}</p>
            </div>
            <div className="text-right text-sm">
              <span className="text-muted">{currentIndex + 1}/{deck.length}</span>
              <div className="text-xs text-muted mt-0.5">
                <span className="text-success">{solvedCount}</span>/{totalSlots} found
                {wrongGuesses > 0 && <span className="text-danger ml-2">{wrongGuesses} miss{wrongGuesses !== 1 ? "es" : ""}</span>}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-card rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((solvedCount + revealedCount) / totalSlots) * 100}%` }}
            />
          </div>

          {/* Slots */}
          <div className="space-y-2 mb-5">
            {current.letters.map((letter, idx) => {
              const isSolved = solvedIndices.has(idx);
              const isRevealed = revealedIndices.has(idx);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 rounded-xl p-3.5 transition-all ${
                    isSolved ? "bg-success/10 border border-success/30"
                    : isRevealed ? "bg-warning/10 border border-warning/30"
                    : "bg-card border border-border"
                  }`}
                >
                  <span className="font-bold text-accent font-mono text-lg w-8 text-center shrink-0">{letter}</span>
                  <div className="flex-1 min-h-6">
                    {isSolved ? (
                      <span className="text-sm text-success animate-slide-up block">{current.meanings[idx]}</span>
                    ) : isRevealed ? (
                      <span className="text-sm text-warning">{current.meanings[idx]}</span>
                    ) : (
                      <span className="text-sm text-muted/40 font-mono tracking-widest">
                        {"_ ".repeat(Math.min(current.meanings[idx].split(/[^a-zA-Z]/).filter(Boolean)[0]?.length || 4, 8)).trim()}
                      </span>
                    )}
                  </div>
                  {!isSolved && !isRevealed && (
                    <button onClick={() => handleRevealOne(idx)} className="text-muted hover:text-warning transition-colors shrink-0" title="Reveal">
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  {isSolved && <CheckCircle className="w-4 h-4 text-success shrink-0" />}
                  {isRevealed && <Eye className="w-4 h-4 text-warning shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {lastResult && (
            <div className={`rounded-xl px-4 py-3 mb-4 text-sm animate-slide-up ${
              lastResult.type === "correct" ? "bg-success/10 border border-success/30 text-success" : "bg-danger/10 border border-danger/30 text-danger"
            }`}>
              <span className="flex items-center gap-2">
                {lastResult.type === "correct" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                {lastResult.text}
              </span>
            </div>
          )}

          {/* Input */}
          {!allDone ? (
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                placeholder="Type your guess and press Enter..."
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 outline-none focus:border-accent transition-colors text-sm"
                autoFocus
              />
              <button onClick={handleGuess} className="px-5 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors shrink-0">
                Guess
              </button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-5 mb-4 text-center">
              <p className="text-foreground font-medium mb-1">
                {solvedCount === totalSlots ? "You got them all!" : `${solvedCount} out of ${totalSlots} solved`}
              </p>
              <p className="text-xs text-muted">
                {wrongGuesses} wrong guess{wrongGuesses !== 1 ? "es" : ""} · {revealedCount} revealed
              </p>
            </div>
          )}

          {!allDone && (
            <p className="text-xs text-muted mb-4 text-center">
              Type any item this acronym stands for — it&apos;ll snap into the right slot.
            </p>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {!allDone ? (
                <>
                  <button onClick={handleSkip} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted hover:text-foreground bg-card border border-border transition-colors">
                    <SkipForward className="w-4 h-4" /> Skip
                  </button>
                  <button onClick={handleGiveUp} className="px-4 py-2.5 rounded-lg text-sm text-muted hover:text-foreground bg-card border border-border transition-colors">
                    Show All
                  </button>
                </>
              ) : (
                <button
                  onClick={goToNextAcronym}
                  disabled={currentIndex >= deck.length - 1}
                  className="px-5 py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors disabled:opacity-30"
                >
                  Next Acronym
                </button>
              )}
            </div>
            <button onClick={handleRestart} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground hover:bg-card-hover transition-colors text-sm">
              <Shuffle className="w-4 h-4" /> Restart
            </button>
          </div>

          {score.total > 0 && (
            <div className="mt-4 text-center text-sm text-muted">
              Running score: {score.correct}/{score.total} guesses correct
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// === MAIN PAGE ===

export default function AcronymsPage() {
  const [mode, setMode] = useState<Mode>("study");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewFilter, setViewFilter] = useState<"all" | "flagged">("all");
  const [customAcronyms, setCustomAcronyms] = useState<CustomAcronym[]>([]);
  const [overrides, setOverrides] = useState<Record<number, AcronymOverride>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingAcronym, setEditingAcronym] = useState<Acronym | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCustomAcronyms(loadCustomAcronyms());
    setOverrides(loadAcronymOverrides());
    setFlaggedIds(loadFlaggedAcronyms());
    setMounted(true);
  }, []);

  // Merge overrides into built-in acronyms
  const mergedBuiltins: Acronym[] = acronyms.map((a) => {
    const ov = overrides[a.id];
    if (!ov) return a;
    return { ...a, acronym: ov.acronym, category: ov.category, letters: ov.letters, meanings: ov.meanings, description: ov.description, altAnswers: undefined };
  });

  const allAcronyms: Acronym[] = [...mergedBuiltins, ...customAcronyms as unknown as Acronym[]];
  const allCategories = [...new Set([...acronymCategories, ...customAcronyms.map((a) => a.category)])];

  const toggleFlag = (id: number) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveFlaggedAcronyms(next);
      return next;
    });
  };

  const handleSaveAcronym = (a: CustomAcronym) => {
    // Check if editing a built-in
    const builtIn = acronyms.find((b) => b.id === a.id);
    if (builtIn) {
      // Save as override
      const updated = { ...overrides, [builtIn.id]: { originalId: builtIn.id, acronym: a.acronym, category: a.category, letters: a.letters, meanings: a.meanings, description: a.description } };
      setOverrides(updated);
      saveAcronymOverrides(updated);
    } else if (customAcronyms.find((c) => c.id === a.id)) {
      // Editing existing custom
      const updated = customAcronyms.map((c) => c.id === a.id ? a : c);
      setCustomAcronyms(updated);
      saveCustomAcronyms(updated);
    } else {
      // New custom
      const updated = [...customAcronyms, a];
      setCustomAcronyms(updated);
      saveCustomAcronyms(updated);
    }
    setEditingAcronym(null);
  };

  const handleDeleteAcronym = (id: number) => {
    const updated = customAcronyms.filter((a) => a.id !== id);
    setCustomAcronyms(updated);
    saveCustomAcronyms(updated);
  };

  const handleRevertOverride = (id: number) => {
    const updated = { ...overrides };
    delete updated[id];
    setOverrides(updated);
    saveAcronymOverrides(updated);
  };

  const handleEditAcronym = (acr: Acronym) => {
    setEditingAcronym(acr);
    setShowModal(true);
  };

  let filtered = selectedCategory === "All"
    ? allAcronyms
    : allAcronyms.filter((a) => a.category === selectedCategory);

  if (viewFilter === "flagged") {
    filtered = filtered.filter((a) => flaggedIds.has(a.id));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Acronym Trainer</h1>
          <p className="text-muted text-sm mt-1">
            Master all the aviation acronyms you need for your checkride
          </p>
        </div>
        <div className="flex bg-card border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setMode("study")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === "study" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1.5" />
            Study
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === "quiz" ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            <Brain className="w-4 h-4 inline mr-1.5" />
            Quiz
          </button>
        </div>
      </div>

      {mode === "study" && (
        <>
          {/* Category filter */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted shrink-0" />
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "All" ? "bg-accent text-background" : "bg-card text-muted hover:text-foreground"
              }`}
            >
              All ({allAcronyms.length})
            </button>
            {allCategories.map((cat) => {
              const count = allAcronyms.filter((a) => a.category === cat).length;
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

          {/* View filter */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setViewFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                viewFilter === "all" ? "bg-warning/20 text-warning" : "bg-card text-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setViewFilter("flagged")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                viewFilter === "flagged" ? "bg-warning/20 text-warning" : "bg-card text-muted hover:text-foreground"
              }`}
            >
              <Flag className="w-3 h-3" /> Flagged ({flaggedIds.size})
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted mb-4">No acronyms match your current filters.</p>
              <button
                onClick={() => { setViewFilter("all"); setSelectedCategory("All"); }}
                className="px-4 py-2 bg-accent text-background rounded-xl text-sm font-medium hover:bg-accent-dim transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3" suppressHydrationWarning>
              {filtered.map((acr) => {
                const isCustom = mounted ? !!(acr as unknown as CustomAcronym).isCustom : false;
                const isOverridden = mounted ? !!overrides[acr.id] : false;
                return (
                  <AcronymStudyCard
                    key={acr.id}
                    acronym={acr}
                    isFlagged={mounted ? flaggedIds.has(acr.id) : false}
                    onToggleFlag={() => toggleFlag(acr.id)}
                    isCustom={isCustom}
                    isOverridden={isOverridden}
                    onDelete={isCustom ? () => handleDeleteAcronym(acr.id) : undefined}
                    onEdit={() => handleEditAcronym(acr)}
                    onRevert={isOverridden && !isCustom ? () => handleRevertOverride(acr.id) : undefined}
                  />
                );
              })}
            </div>
          )}
        </>
      )}

      {mode === "quiz" && (
        <AcronymQuiz
          allAcronyms={allAcronyms}
          allCategories={allCategories as string[]}
          flaggedIds={flaggedIds}
          onToggleFlag={toggleFlag}
        />
      )}

      {/* Add acronym FAB */}
      <button
        onClick={() => { setEditingAcronym(null); setShowModal(true); }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-background rounded-full shadow-lg hover:bg-accent-dim transition-colors flex items-center justify-center z-40"
        title="Add custom acronym"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showModal && (
        <AcronymModal
          onClose={() => { setShowModal(false); setEditingAcronym(null); }}
          onSave={handleSaveAcronym}
          editing={editingAcronym}
        />
      )}
    </div>
  );
}
