"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { company, role, location, start, end, logo, website, impact, highlights } = experience;
  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      className="h-64 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform card-inner ${
          isFlipped ? "is-flipped" : ""
        }`}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-white/5 via-white/10 to-transparent border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden group hover:border-white/20 hover:bg-white/10 transition card-face front"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-[50px] transition duration-500 group-hover:bg-accent/30" />

          <div className="relative z-10 space-y-4">
            {/* Logo */}
            <div className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex-shrink-0">
              {logo ? (
                <div className="relative h-full w-full">
                  <Image
                    src={logo}
                    alt={`${company} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-fg-muted">
                  {initials}
                </span>
              )}
            </div>

            {/* Role & Company */}
            <div>
              <p className="text-xl font-semibold text-white">{role}</p>
              <p className="text-sm text-fg-muted">{company}</p>
            </div>

            {/* Location & Duration */}
            <div className="text-xs text-fg-muted/70 space-y-1">
              <p>{location}</p>
              <p>
                {start} – {end}
              </p>
            </div>
          </div>

          {/* Flip hint */}
          <div className="text-xs text-fg-muted/50 text-center mt-4">
            Hover to flip
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/30 rounded-2xl p-6 flex flex-col justify-between overflow-hidden card-face back"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="relative z-10 space-y-3">
            {/* Impact headline */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent/80 mb-2">
                Key Impact
              </p>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {impact}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-fg-muted/70 mb-2">
                Highlights
              </p>
              <ul className="space-y-1 text-xs text-fg-muted">
                {highlights?.map((highlight, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visit link */}
          {website && (
            <Link
              href={website}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-accent hover:text-accent/80 transition mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              Visit site →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
