"use client";

import { useState, useEffect, useCallback } from "react";
import { questions, categories, type Question } from "@/data/questions";
import {
  ClipboardCheck,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  AlertTriangle,
  ChevronRight,
  Play,
} from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type ExamState = "setup" | "active" | "review";

interface AnswerRecord {
  questionId: number;
  selectedIndex: number | null;
  correct: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CheckridePage() {
  const [examState, setExamState] = useState<ExamState>("setup");
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(categories)
  );
  const [timeLimit, setTimeLimit] = useState(30); // minutes
  const [deck, setDeck] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Timer
  useEffect(() => {
    if (examState !== "active" || timeRemaining <= 0) return;
    const interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          setExamState("review");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examState, timeRemaining]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const startExam = () => {
    const pool = questions.filter((q) => selectedCategories.has(q.category));
    const shuffled = shuffleArray(pool).slice(0, questionCount);
    setDeck(shuffled);
    setAnswers([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setTimeRemaining(timeLimit * 60);
    setExamState("active");
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    const current = deck[currentIndex];
    setAnswers((prev) => [
      ...prev,
      {
        questionId: current.id,
        selectedIndex: optionIndex,
        correct: optionIndex === current.correctIndex,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex >= deck.length - 1) {
      setExamState("review");
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleSkip = () => {
    const current = deck[currentIndex];
    setAnswers((prev) => [
      ...prev,
      { questionId: current.id, selectedIndex: null, correct: false },
    ]);
    handleNext();
  };

  const correctCount = answers.filter((a) => a.correct).length;
  const totalAnswered = answers.length;
  const percentage = totalAnswered > 0 ? Math.round((correctCount / deck.length) * 100) : 0;

  // === SETUP ===
  if (examState === "setup") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <ClipboardCheck className="w-12 h-12 text-accent mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-foreground">Mock Checkride</h1>
          <p className="text-muted text-sm mt-1">
            Simulate a PPL oral exam — timed, scored, and randomized
          </p>
        </div>

        <div className="space-y-6">
          {/* Question count */}
          <div className="bg-card border border-border rounded-xl p-5">
            <label className="text-sm font-medium text-foreground block mb-3">
              Number of Questions
            </label>
            <div className="flex gap-2">
              {[10, 20, 30, 52].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    questionCount === n
                      ? "bg-accent text-background"
                      : "bg-card-hover text-muted hover:text-foreground"
                  }`}
                >
                  {n === 52 ? "All" : n}
                </button>
              ))}
            </div>
          </div>

          {/* Time limit */}
          <div className="bg-card border border-border rounded-xl p-5">
            <label className="text-sm font-medium text-foreground block mb-3">
              Time Limit (minutes)
            </label>
            <div className="flex gap-2">
              {[15, 30, 45, 60].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeLimit(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeLimit === t
                      ? "bg-accent text-background"
                      : "bg-card-hover text-muted hover:text-foreground"
                  }`}
                >
                  {t} min
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-card border border-border rounded-xl p-5">
            <label className="text-sm font-medium text-foreground block mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategories.has(cat)
                      ? "bg-accent text-background"
                      : "bg-card-hover text-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-background font-semibold rounded-xl hover:bg-accent-dim transition-colors text-lg"
          >
            <Play className="w-5 h-5" />
            Start Mock Checkride
          </button>
        </div>
      </div>
    );
  }

  // === REVIEW ===
  if (examState === "review") {
    const passed = percentage >= 70;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    deck.forEach((q, idx) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total++;
      if (answers[idx]?.correct) {
        categoryBreakdown[q.category].correct++;
      }
    });

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {passed ? (
            <Trophy className="w-16 h-16 text-success mx-auto mb-3" />
          ) : (
            <AlertTriangle className="w-16 h-16 text-danger mx-auto mb-3" />
          )}
          <h1 className="text-3xl font-bold text-foreground mb-1">
            {passed ? "Checkride Passed!" : "Keep Studying"}
          </h1>
          <p className="text-muted">
            {passed
              ? "Great job — you're on your way!"
              : "You need 70% to pass. Review the areas below and try again."}
          </p>
        </div>

        {/* Score card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-6 text-center mb-6">
            <div>
              <p className="text-3xl font-bold text-accent">{percentage}%</p>
              <p className="text-sm text-muted">Score</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success">{correctCount}</p>
              <p className="text-sm text-muted">Correct</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-danger">{deck.length - correctCount}</p>
              <p className="text-sm text-muted">Missed</p>
            </div>
          </div>

          <div className="w-full h-3 bg-background rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 progress-animate ${
                passed ? "bg-success" : "bg-danger"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([cat, { correct, total }]) => {
              const pct = Math.round((correct / total) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground">{cat}</span>
                    <span className={pct >= 70 ? "text-success" : "text-danger"}>
                      {correct}/{total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 70 ? "bg-success" : "bg-danger"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Missed questions */}
        {answers.some((a) => !a.correct) && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="font-semibold text-foreground mb-4">Review Missed Questions</h2>
            <div className="space-y-4">
              {deck.map((q, idx) => {
                const answer = answers[idx];
                if (!answer || answer.correct) return null;
                return (
                  <div key={q.id} className="border-b border-border pb-4 last:border-0">
                    <p className="text-sm text-foreground font-medium mb-2">{q.question}</p>
                    {answer.selectedIndex !== null && (
                      <p className="text-xs text-danger mb-1">
                        Your answer: {q.options[answer.selectedIndex]}
                      </p>
                    )}
                    <p className="text-xs text-success mb-1">
                      Correct: {q.options[q.correctIndex]}
                    </p>
                    <p className="text-xs text-muted">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setExamState("setup")}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-background font-semibold rounded-xl hover:bg-accent-dim transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    );
  }

  // === ACTIVE EXAM ===
  const current = deck[currentIndex];
  const timeWarning = timeRemaining < 60;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted">
          Question {currentIndex + 1} of {deck.length}
        </div>
        <div
          className={`flex items-center gap-1.5 text-sm font-mono ${
            timeWarning ? "text-danger animate-pulse" : "text-muted"
          }`}
        >
          <Clock className="w-4 h-4" />
          {formatTime(timeRemaining)}
        </div>
        <div className="text-sm">
          <span className="text-success">{correctCount}</span>
          <span className="text-muted mx-1">/</span>
          <span className="text-danger">{totalAnswered - correctCount}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-card rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-6">
        <span className="text-xs font-medium text-accent bg-accent/10 rounded-full px-3 py-1 mb-4 inline-block">
          {current.category}
        </span>
        <p className="text-lg font-medium text-foreground">{current.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {current.options.map((option, idx) => {
          let style = "bg-card border-border hover:border-accent/50 text-foreground cursor-pointer";
          if (showExplanation) {
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
              onClick={() => handleAnswer(idx)}
              disabled={selectedOption !== null}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${style}`}
            >
              <span className="font-mono text-sm mr-3 opacity-60">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mb-6 animate-slide-up">
          <p className="text-sm text-foreground">{current.explanation}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        {!showExplanation ? (
          <button
            onClick={handleSkip}
            className="px-4 py-2.5 rounded-lg text-sm text-muted hover:text-foreground transition-colors"
          >
            Skip
          </button>
        ) : (
          <div />
        )}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
          >
            {currentIndex >= deck.length - 1 ? "See Results" : "Next Question"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
