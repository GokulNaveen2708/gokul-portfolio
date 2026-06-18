"use client";

import Link from "next/link";
import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { StudRow, BrickRow } from "@/components/lego/StudRow";

const navItems = [
  { href: "#about",      id: "about",      label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#projects",   id: "projects",   label: "Projects" },
  { href: "#skills",     id: "skills",     label: "Skills" },
  { href: "#education",  id: "education",  label: "Education" },
  { href: "#contact",    id: "contact",    label: "Contact" },
];

export function SiteHeader() {
  const active = useActiveSection(["about", "experience", "projects", "skills", "education", "contact"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-white/5"
        style={{ backgroundColor: "rgba(241, 239, 230, 0.95)", backdropFilter: "blur(12px)" }}
      >
        {/* Brick rail across very top */}
        <div
          className="w-full px-4 py-1.5 flex gap-1 overflow-hidden"
          style={{ backgroundColor: "#FDFCFA" }}
        >
          <BrickRow count={22} studs={2} color="#7A9CB3" size={22} className="opacity-50" />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo — GOKUL in brick letters */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Gokul Naveen"
          >
            <span
              className="text-lg font-black tracking-widest uppercase"
              style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif", letterSpacing: "0.12em" }}
            >
              GOKUL
            </span>
            <span
              className="text-xs font-black uppercase tracking-wider"
              style={{
                backgroundColor: "#AD7556",
                color: "#FDFCFA",
                padding: "3px 8px",
                borderRadius: "3px",
                letterSpacing: "0.1em",
                boxShadow: "3px 0 0 rgba(0,0,0,0.28), 0 4px 0 rgba(0,0,0,0.38), 3px 4px 0 rgba(0,0,0,0.32)",
                display: "inline-block",
                position: "relative",
              }}
            >
              .dev
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-1 sm:flex items-center">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-3 py-2 text-sm font-bold uppercase tracking-wider rounded transition-all duration-200 group"
                  style={{
                    color: isActive ? "#AD7556" : "#7A9CB3",
                    backgroundColor: isActive ? "rgba(83,68,61,0.08)" : "transparent",
                  }}
                >
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 pointer-events-none">
                      <svg width="18" height="14" viewBox="0 0 24 18" overflow="visible">
                        {/* Mini 1-stud brick — isometric */}
                        <path d="M 0 10 L 8 6 L 24 6 L 16 10 Z" fill="#AD7556" style={{ filter: "brightness(1.45)" }} />
                        <rect x="0" y="10" width="16" height="8" rx="2" fill="#AD7556" />
                        <path d="M 16 10 L 24 6 L 24 14 L 16 18 Z" fill="#AD7556" style={{ filter: "brightness(0.6)" }} />
                        {/* Stud */}
                        <rect x="3" y="3" width="10" height="6" rx="1.5" fill="#AD7556" style={{ filter: "brightness(0.88)" }} />
                        <ellipse cx="8" cy="3" rx="5" ry="2.2" fill="#AD7556" style={{ filter: "brightness(1.25)" }} />
                        <ellipse cx="6" cy="2" rx="2.2" ry="1" fill="rgba(255,255,255,0.42)" />
                      </svg>
                    </span>
                  )}
                  {item.label}
                </button>
              );
            })}

            {/* Resume CTA */}
            <a
              href="https://drive.google.com/file/d/1h7hNSM6NLBxgMkwX84H0bmHAyO6L59V7/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 brick-btn brick-btn-primary text-xs py-2 px-4"
            >
              Resume
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              style={{ backgroundColor: "#AD7556" }}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              style={{ backgroundColor: "#AD7556" }}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              style={{ backgroundColor: "#AD7556" }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <div className="mb-4">
            <BrickRow count={3} studs={2} color="#AD7556" size={22} />
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-2xl font-black uppercase tracking-widest transition-colors"
              style={{ color: active === item.id ? "#AD7556" : "#7A9CB3", fontFamily: "Fredoka One, sans-serif" }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1h7hNSM6NLBxgMkwX84H0bmHAyO6L59V7/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 brick-btn brick-btn-primary"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
