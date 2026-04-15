"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plane,
  BookOpen,
  Brain,
  ClipboardCheck,
  Scale,
  Radio as RadioIcon,
  CloudSun,
  Gauge,
  Headphones,
  ClipboardList,
  BookText,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home", icon: Plane },
  { href: "/flashcards", label: "Flashcards", icon: BookOpen },
  { href: "/acronyms", label: "Acronyms", icon: Brain },
  { href: "/checkride", label: "Checkride", icon: ClipboardCheck },
  { href: "/weight-balance", label: "W&B", icon: Scale },
  { href: "/phonetic", label: "Phonetic", icon: RadioIcon },
  { href: "/metar", label: "METAR", icon: CloudSun },
  { href: "/vspeeds", label: "V-Speeds", icon: Gauge },
  { href: "/atc-comms", label: "ATC", icon: Headphones },
  { href: "/regulations", label: "FARs", icon: BookText },
  { href: "/checklists", label: "Checklists", icon: ClipboardList },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-accent font-bold text-lg shrink-0"
          >
            <Plane className="w-5 h-5" />
            <span className="hidden sm:inline">Pilot Toolbox</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.slice(1).map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? "bg-accent/20 text-accent"
                      : "text-muted hover:text-foreground hover:bg-card-hover"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-muted hover:text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-3 grid grid-cols-3 gap-1 animate-slide-up">
            {links.slice(1).map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? "bg-accent/20 text-accent"
                      : "text-muted hover:text-foreground hover:bg-card-hover"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
