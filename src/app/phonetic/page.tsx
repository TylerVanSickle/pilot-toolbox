"use client";

import { useState, useCallback } from "react";
import {
  phoneticAlphabet,
  sampleTailNumbers,
  sampleCallsigns,
  sampleWords,
} from "@/data/phonetic";
import {
  Radio,
  Shuffle,
  CheckCircle,
  XCircle,
  Eye,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

type Mode = "reference" | "spell" | "decode";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ReferenceTable() {
  const letters = Object.entries(phoneticAlphabet);
  const alpha = letters.filter(([k]) => /[A-Z]/.test(k));
  const nums = letters.filter(([k]) => /[0-9]/.test(k));

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-medium text-foreground mb-3">Letters</h3>
        <div className="grid grid-cols-2 gap-1">
          {alpha.map(([letter, word]) => (
            <div key={letter} className="flex items-center gap-2 py-1">
              <span className="font-mono font-bold text-accent w-6 text-center">{letter}</span>
              <span className="text-sm text-foreground">{word}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-medium text-foreground mb-3">Numbers</h3>
        <div className="space-y-1">
          {nums.map(([num, word]) => (
            <div key={num} className="flex items-center gap-2 py-1">
              <span className="font-mono font-bold text-accent w-6 text-center">{num}</span>
              <span className="text-sm text-foreground">{word}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-accent/5 rounded-lg">
          <p className="text-xs text-muted">
            <strong className="text-foreground">Pro tip:</strong> In aviation, 9 is pronounced
            &quot;Niner&quot; to avoid confusion with &quot;Nein&quot; (German for &quot;no&quot;).
          </p>
        </div>
      </div>
    </div>
  );
}

function SpellMode() {
  const allPrompts = [...sampleTailNumbers, ...sampleCallsigns, ...sampleWords];
  const [deck, setDeck] = useState(() => shuffleArray(allPrompts));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [started, setStarted] = useState(false);

  const current = deck[currentIndex];
  const chars = current.replace(/\s+/g, "").toUpperCase().split("");

  const handleStart = () => {
    setUserInputs(new Array(chars.length).fill(""));
    setSubmitted(false);
    setStarted(true);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correct = 0;
    chars.forEach((ch, idx) => {
      const expected = phoneticAlphabet[ch]?.toLowerCase() || "";
      const input = userInputs[idx]?.trim().toLowerCase() || "";
      if (input === expected || (input.length > 2 && expected.startsWith(input))) {
        correct++;
      }
    });
    setScore((prev) => ({
      correct: prev.correct + correct,
      total: prev.total + chars.length,
    }));
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((i) => i + 1);
      setStarted(false);
      setSubmitted(false);
      setUserInputs([]);
    }
  };

  const handleShuffle = () => {
    setDeck(shuffleArray(allPrompts));
    setCurrentIndex(0);
    setStarted(false);
    setSubmitted(false);
    setUserInputs([]);
    setScore({ correct: 0, total: 0 });
  };

  if (!started) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <p className="text-muted mb-2 text-sm">{currentIndex + 1} / {deck.length}</p>
        <p className="text-3xl font-mono font-bold text-accent mb-6 tracking-widest">{current}</p>
        <p className="text-muted mb-6">Spell this out using the NATO phonetic alphabet</p>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
        >
          Start
        </button>
        {score.total > 0 && (
          <p className="text-sm text-muted mt-4">
            Score: {score.correct}/{score.total} characters
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-mono font-bold text-accent tracking-widest">{current}</p>
        <p className="text-sm text-muted">{currentIndex + 1}/{deck.length}</p>
      </div>

      <div className="space-y-2 mb-6">
        {chars.map((ch, idx) => {
          const expected = phoneticAlphabet[ch] || ch;
          const input = userInputs[idx]?.trim().toLowerCase() || "";
          const isCorrect = input === expected.toLowerCase() || (input.length > 2 && expected.toLowerCase().startsWith(input));
          let borderColor = "border-border";
          if (submitted) {
            borderColor = isCorrect ? "border-success" : "border-danger";
          }

          return (
            <div key={idx} className={`flex items-center gap-3 bg-card border ${borderColor} rounded-xl p-3 transition-colors`}>
              <span className="font-mono font-bold text-accent text-lg w-8 text-center">{ch}</span>
              {submitted ? (
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    {!isCorrect && (
                      <p className="text-xs text-danger">{userInputs[idx] || "(blank)"}</p>
                    )}
                    <p className={`text-sm ${isCorrect ? "text-success" : "text-success"}`}>
                      {expected}
                    </p>
                  </div>
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-danger" />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={userInputs[idx] || ""}
                  onChange={(e) => {
                    setUserInputs((prev) => {
                      const next = [...prev];
                      next[idx] = e.target.value;
                      return next;
                    });
                  }}
                  placeholder={`Phonetic for ${ch}?`}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted/50 outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // Focus next input
                      const next = e.currentTarget.closest(".space-y-2")?.querySelectorAll("input")[idx + 1];
                      if (next) (next as HTMLInputElement).focus();
                      else handleSubmit();
                    }
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
          >
            Check
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex >= deck.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors disabled:opacity-30"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-muted hover:text-foreground transition-colors text-sm"
        >
          <Shuffle className="w-4 h-4" /> Restart
        </button>
      </div>
    </div>
  );
}

function DecodeMode() {
  const [currentPhonetic, setCurrentPhonetic] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateNew = useCallback(() => {
    const allPrompts = [...sampleTailNumbers, ...sampleWords];
    const word = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    const chars = word.toUpperCase().split("");
    const phonetic = chars.map((ch) => phoneticAlphabet[ch] || ch);
    setCurrentPhonetic(phonetic);
    setAnswer(word);
    setUserGuess("");
    setSubmitted(false);
  }, []);

  if (currentPhonetic.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <p className="text-muted mb-6">
          Hear the phonetic spelling and decode it back to the original text
        </p>
        <button
          onClick={generateNew}
          className="px-6 py-3 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
        >
          Start Decoding
        </button>
      </div>
    );
  }

  const isCorrect = userGuess.toUpperCase().replace(/\s/g, "") === answer.toUpperCase().replace(/\s/g, "");

  return (
    <div className="max-w-lg mx-auto text-center py-4">
      <p className="text-sm text-muted mb-4">Decode the following phonetic spelling:</p>
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <p className="text-lg text-accent font-medium leading-relaxed">
          {currentPhonetic.join(" · ")}
        </p>
      </div>

      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Type the decoded text..."
        className="w-full bg-card border border-border rounded-xl px-5 py-3 text-foreground placeholder:text-muted/50 outline-none focus:border-accent transition-colors text-center font-mono text-lg tracking-wider mb-4"
        disabled={submitted}
        onKeyDown={(e) => e.key === "Enter" && !submitted && setSubmitted(true)}
      />

      {submitted && (
        <div className={`rounded-xl p-4 mb-4 ${isCorrect ? "bg-success/10 border border-success/30" : "bg-danger/10 border border-danger/30"} animate-slide-up`}>
          {isCorrect ? (
            <p className="text-success font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Correct!
            </p>
          ) : (
            <div>
              <p className="text-danger font-medium flex items-center justify-center gap-2 mb-1">
                <XCircle className="w-5 h-5" /> Not quite
              </p>
              <p className="text-sm text-foreground">
                Answer: <span className="font-mono text-accent">{answer}</span>
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="px-5 py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
          >
            Check
          </button>
        ) : (
          <button
            onClick={generateNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-background font-medium rounded-xl hover:bg-accent-dim transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function PhoneticPage() {
  const [mode, setMode] = useState<Mode>("reference");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Phonetic Alphabet</h1>
          <p className="text-muted text-sm mt-1">
            Learn and practice the NATO phonetic alphabet
          </p>
        </div>
        <div className="flex bg-card border border-border rounded-xl overflow-hidden">
          {(
            [
              { key: "reference", label: "Reference" },
              { key: "spell", label: "Spell It" },
              { key: "decode", label: "Decode It" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mode === key
                  ? "bg-accent text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "reference" && <ReferenceTable />}
      {mode === "spell" && <SpellMode />}
      {mode === "decode" && <DecodeMode />}
    </div>
  );
}
