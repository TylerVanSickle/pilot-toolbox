import type { Question } from "./questions";
import type { Acronym } from "./acronyms";

// === Custom Flashcards ===

export interface CustomQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  isCustom: true;
}

export function loadCustomQuestions(): CustomQuestion[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("pilot-custom-questions") || "[]");
  } catch { return []; }
}

export function saveCustomQuestions(questions: CustomQuestion[]) {
  try { localStorage.setItem("pilot-custom-questions", JSON.stringify(questions)); } catch {}
}

// === Custom Acronyms ===

export interface CustomAcronym {
  id: number;
  acronym: string;
  category: string;
  letters: string[];
  meanings: string[];
  altAnswers?: string[][];
  description: string;
  isCustom: true;
}

export function loadCustomAcronyms(): CustomAcronym[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("pilot-custom-acronyms") || "[]");
  } catch { return []; }
}

export function saveCustomAcronyms(acronyms: CustomAcronym[]) {
  try { localStorage.setItem("pilot-custom-acronyms", JSON.stringify(acronyms)); } catch {}
}

// === Flagged Items ===

export function loadFlaggedQuestions(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem("pilot-flagged-questions") || "[]"));
  } catch { return new Set(); }
}

export function saveFlaggedQuestions(ids: Set<number>) {
  try { localStorage.setItem("pilot-flagged-questions", JSON.stringify([...ids])); } catch {}
}

export function loadFlaggedAcronyms(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem("pilot-flagged-acronyms") || "[]"));
  } catch { return new Set(); }
}

export function saveFlaggedAcronyms(ids: Set<number>) {
  try { localStorage.setItem("pilot-flagged-acronyms", JSON.stringify([...ids])); } catch {}
}
