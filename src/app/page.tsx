"use client";

import Link from "next/link";
import {
  BookOpen,
  Brain,
  ClipboardCheck,
  Plane,
  ArrowRight,
  Target,
  Zap,
  GraduationCap,
  Scale,
  Radio,
  CloudSun,
  Gauge,
  Headphones,
  ClipboardList,
  BookText,
} from "lucide-react";

const features = [
  {
    href: "/flashcards",
    icon: BookOpen,
    title: "PPL Flashcards",
    description: "100 questions across 8 categories with flip cards and multiple choice.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    href: "/acronyms",
    icon: Brain,
    title: "Acronym Trainer",
    description: "Study and quiz on 20 essential aviation acronyms — ARROW, IMSAFE, and more.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    href: "/checkride",
    icon: ClipboardCheck,
    title: "Mock Checkride",
    description: "Timed oral exam simulation with scoring, category breakdown, and review.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    href: "/weight-balance",
    icon: Scale,
    title: "Weight & Balance",
    description: "Calculate CG with a visual envelope chart for DA40, DA20, and SportCruiser.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    href: "/phonetic",
    icon: Radio,
    title: "Phonetic Alphabet",
    description: "Reference chart plus spell-it and decode-it quiz modes for NATO phonetic.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    href: "/metar",
    icon: CloudSun,
    title: "METAR Decoder",
    description: "Paste a raw METAR and get plain-English decoding of every field.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    href: "/vspeeds",
    icon: Gauge,
    title: "V-Speed Reference",
    description: "Quick lookup of all V-speeds with airspeed indicator arc visualization.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    href: "/atc-comms",
    icon: Headphones,
    title: "ATC Communications",
    description: "14 radio scenarios from taxi to emergency with practice mode.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    href: "/regulations",
    icon: BookText,
    title: "FAR Regulations",
    description: "56 FARs with study flashcards and type-your-answer quiz. Filter by PPL, IFR, or CPL.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    href: "/checklists",
    icon: ClipboardList,
    title: "Checklists",
    description: "Interactive DA40, DA20, and SportCruiser checklists — preflight through emergency.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

const tips = [
  {
    icon: Target,
    title: "Focus on weak areas",
    text: "Use category filters to drill down on topics you struggle with.",
  },
  {
    icon: Zap,
    title: "Short, frequent sessions",
    text: "10-15 minutes of study beats an hour of cramming.",
  },
  {
    icon: GraduationCap,
    title: "Simulate the real thing",
    text: "Take a full mock checkride once a week to track your readiness.",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-accent/10 rounded-2xl">
            <Plane className="w-10 h-10 text-accent" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
          Pilot Toolbox
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Your PPL study companion. Flashcards, mock checkrides, weight &amp; balance,
          METAR decoding, ATC practice, and more — everything you need for flight school.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {features.map(({ href, icon: Icon, title, description, color, bg }) => (
          <Link
            key={href}
            href={href}
            className="group bg-card border border-border rounded-2xl p-5 hover:border-accent/30 transition-all hover:shadow-lg hover:shadow-accent/5"
          >
            <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <h2 className="text-base font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
              {title}
            </h2>
            <p className="text-sm text-muted mb-3">{description}</p>
            <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
              Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>

      {/* Study tips */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
          Study Tips
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {tips.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-medium text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-accent">100</p>
          <p className="text-xs text-muted">PPL Questions</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-warning">36</p>
          <p className="text-xs text-muted">Acronyms</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-indigo-400">56</p>
          <p className="text-xs text-muted">FARs</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">14</p>
          <p className="text-xs text-muted">ATC Scenarios</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-400">3</p>
          <p className="text-xs text-muted">Aircraft Profiles</p>
        </div>
      </div>
    </div>
  );
}
