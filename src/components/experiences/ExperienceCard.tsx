"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const {
    company,
    role,
    location,
    start,
    end,
    logo,
    website,
    impact,
    highlights,
    responsibilities,
  } = experience;

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-8 sm:-left-12 top-1 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-accent/60 border-2 border-bg ring-4 ring-accent/10" />
      </div>

      {/* Card */}
      <div className="glass-card p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="h-14 w-14 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex-shrink-0">
            {logo ? (
              <div className="relative h-full w-full">
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-fg-muted">
                {company.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
            )}
          </div>

          {/* Header info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-lg font-semibold text-white">{role}</p>
                <p className="text-sm text-fg-muted">{company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-fg-muted/70">{location}</p>
                <p className="text-xs text-fg-muted/70">
                  {start} – {end}
                </p>
              </div>
            </div>

            {/* Impact headline */}
            <div className="mt-3 px-3 py-2 rounded-lg bg-accent/[0.06] border border-accent/10">
              <p className="text-xs text-accent font-medium">{impact}</p>
            </div>

            {/* Highlights (always visible) */}
            <ul className="mt-3 space-y-1">
              {highlights.map((h, idx) => (
                <li
                  key={idx}
                  className="text-xs text-fg-muted flex items-start gap-2"
                >
                  <span className="text-accent/60 mt-0.5">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Expanded responsibilities */}
            {responsibilities && responsibilities.length > 0 && (
              <>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expanded ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-fg-muted/60 mb-2">
                    Detailed Responsibilities
                  </p>
                  <ul className="space-y-2">
                    {responsibilities.map((r, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-fg-muted leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-accent/40 mt-0.5 flex-shrink-0">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="mt-3 text-[10px] uppercase tracking-[0.15em] text-accent/70 hover:text-accent transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                >
                  {expanded ? "Show less ↑" : "Show more ↓"}
                </button>
              </>
            )}

            {/* Visit link */}
            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-xs font-semibold text-accent/70 hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Visit site →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
