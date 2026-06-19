"use client";

import React from "react";
import { LegoBrickSVG } from "./LegoBrickSVG";

interface StudRowProps {
  count?: number;
  color?: string;
  className?: string;
  size?: number;
}

// ── Row of small bricks — replaces tall cylinder StudRow in headers ───────────
export function BrickRow({
  count = 4,
  color = "#AD7556",
  studs = 2,
  size = 28,
  className = "",
}: {
  count?: number;
  color?: string;
  studs?: 1 | 2;
  size?: number;
  className?: string;
}) {
  // scale so the rendered width matches `size`
  const brickW = studs * 24 + 4 + 10; // totalW from LegoBrickSVG
  const sc = size / brickW;
  return (
    <div className={`flex gap-1 items-end ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <LegoBrickSVG key={i} color={color} studs={studs} scale={sc} />
      ))}
    </div>
  );
}

// Single 3D cylinder stud — matches the studs on the floating LegoBrickSVG
export function Stud3D({ color = "#AD7556", size = 13 }: { color?: string; size?: number }) {
  const h = Math.round(size * 1.55);
  return (
    <svg
      viewBox="0 0 16 22"
      width={size}
      height={h}
      style={{ overflow: "visible", display: "block", flexShrink: 0 }}
    >
      {/* Cylinder wall */}
      <rect x="0" y="10" width="16" height="12" rx="2.5" fill={color} style={{ filter: "brightness(0.84)" }} />
      {/* Cylinder top ellipse */}
      <ellipse cx="8" cy="10" rx="8" ry="4" fill={color} style={{ filter: "brightness(1.2)" }} />
      {/* Specular highlight */}
      <ellipse cx="5" cy="8.5" rx="3.2" ry="1.8" fill="rgba(255,255,255,0.40)" />
    </svg>
  );
}

export function StudRow({ count = 4, color = "#AD7556", className = "", size = 13 }: StudRowProps) {
  return (
    <div className={`flex gap-1.5 items-end ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Stud3D key={i} color={color} size={size} />
      ))}
    </div>
  );
}
