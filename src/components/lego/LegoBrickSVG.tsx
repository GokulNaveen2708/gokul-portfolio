"use client";

import React from "react";

/**
 * Shared LEGO brick SVG renderer used by BrickRow, BackgroundBricks,
 * LegoBrickStack, and the floating bricks in LegoMinifig.
 *
 * Coordinate system (viewBox origin = top-left of SVG):
 *   y  0–12  → stud cylinder zone
 *   y 12–16  → isometric top face (slanted)
 *   y 16–…   → front face
 *
 * The right-side face is drawn as a parallelogram extending 10px to the right.
 */

interface LegoBrickSVGProps {
  studs?: number;        // 1–6
  color?: string;
  isPlate?: boolean;     // thinner plate (faceH 12 vs 26)
  showStuds?: boolean;   // false hides stud cylinders
  scale?: number;        // multiplies rendered width/height
}

export function LegoBrickSVG({
  studs = 2,
  color = "#AD7556",
  isPlate = false,
  showStuds = true,
  scale = 1,
}: LegoBrickSVGProps) {
  const STUD_GAP  = 24;          // px between stud centres
  const STUD_R    = 7.5;         // stud top-cap ellipse x-radius
  const STUD_RY   = 3.2;         // stud top-cap ellipse y-radius
  const STUD_H    = 11;          // cylinder wall height
  const TOP_SLANT = 6;           // isometric top-face left offset
  const TOP_H     = 5;           // isometric top-face height (y extent)
  const SIDE_W    = 10;          // isometric right-face width
  const faceH     = isPlate ? 12 : 26;

  // Front face starts at y=16 (stud zone 12 + top slant 4)
  const FACE_Y    = 16;
  const w         = studs * STUD_GAP + 4;
  const totalH    = FACE_Y + faceH;
  const totalW    = w + SIDE_W;

  // Stud centres
  const studXs    = Array.from({ length: studs }, (_, i) => 14 + i * STUD_GAP);

  // Computed colour variants (done via inline filters for portability)
  const TOP_BRIGHT   = "brightness(1.44)";
  const SIDE_DARK    = "brightness(0.48)";
  const STUD_TOP_BR  = "brightness(1.38)";
  const STUD_WALL_DK = "brightness(0.65)";
  const STUD_LIT_BR  = "brightness(0.88)";  // lit left half of cylinder

  return (
    <svg
      width={(totalW) * scale}
      height={(totalH) * scale}
      viewBox={`0 0 ${totalW} ${totalH}`}
      overflow="visible"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* ── Right side face (deepest shadow) ── */}
      <polygon
        points={`
          ${w},${FACE_Y - TOP_H + 1}
          ${w + SIDE_W},${FACE_Y - TOP_H + 5}
          ${w + SIDE_W},${FACE_Y + faceH + 4}
          ${w},${FACE_Y + faceH}
        `}
        fill={color}
        style={{ filter: SIDE_DARK }}
      />

      {/* ── Isometric top face (lightest) ── */}
      <polygon
        points={`
          0,${FACE_Y}
          ${TOP_SLANT},${FACE_Y - TOP_H}
          ${w + TOP_SLANT},${FACE_Y - TOP_H}
          ${w},${FACE_Y}
        `}
        fill={color}
        style={{ filter: TOP_BRIGHT }}
      />

      {/* ── Front face ── */}
      <rect x={0} y={FACE_Y} width={w} height={faceH} rx={2.5} fill={color} />

      {/* Inner top lip — catches light just below the top face edge */}
      <rect
        x={3} y={FACE_Y + 1}
        width={w - 8} height={2}
        rx={1}
        fill="rgba(255,255,255,0.18)"
      />

      {/* Left-edge plastic sheen */}
      <rect
        x={0} y={FACE_Y}
        width={4} height={faceH}
        rx={2}
        fill="rgba(255,255,255,0.10)"
      />

      {/* Bottom shadow strip on front face */}
      <rect
        x={3} y={FACE_Y + faceH - 3}
        width={w - 8} height={2.5}
        rx={1}
        fill="rgba(0,0,0,0.10)"
      />

      {/* ── Stud cylinders ── */}
      {showStuds && studXs.map((cx, i) => (
        <g key={i}>
          {/* Cylinder wall — dark (shadow side dominates) */}
          <rect
            x={cx - STUD_R} y={4}
            width={STUD_R * 2} height={STUD_H}
            rx={2.5}
            fill={color}
            style={{ filter: STUD_WALL_DK }}
          />
          {/* Lit left half of cylinder */}
          <rect
            x={cx - STUD_R} y={4}
            width={STUD_R} height={STUD_H}
            rx={2.5}
            fill={color}
            style={{ filter: STUD_LIT_BR }}
          />
          {/* Top cap ellipse (brightest) */}
          <ellipse
            cx={cx} cy={4}
            rx={STUD_R} ry={STUD_RY}
            fill={color}
            style={{ filter: STUD_TOP_BR }}
          />
          {/* Specular glare — top-left of cap */}
          <ellipse
            cx={cx - 2.8} cy={2.4}
            rx={3.4} ry={1.5}
            fill="rgba(255,255,255,0.54)"
          />
          {/* Right-edge shadow on top cap */}
          <ellipse
            cx={cx + 3.5} cy={4.5}
            rx={3} ry={2}
            fill="rgba(0,0,0,0.12)"
          />
        </g>
      ))}
    </svg>
  );
}
