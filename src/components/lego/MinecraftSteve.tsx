"use client";

import { motion } from "framer-motion";

interface MinecraftSteveProps {
  size?: number;
}

// Each Minecraft "pixel" = 5 SVG units
// Character grid: 16 wide × 32 tall → SVG canvas 80×160
const P = 5;
const W = 16 * P; // 80
const H = 32 * P; // 160

// Color palette
const C = {
  H: "#5C3A1E",   // hair brown
  S: "#C68642",   // skin
  E: "#1A0D00",   // eye dark
  EW:"#D4C09A",   // eye light (glare side)
  MO:"#9B6030",   // mouth darker skin
  SH:"#1E73BE",   // shirt blue
  SL:"#1860A0",   // shirt shadow
  BE:"#6B4226",   // belt brown
  PA:"#2A3E6E",   // pants blue
  BO:"#231208",   // boots dark
  BH:"#3D2918",   // boots highlight
} as const;
type ColorKey = keyof typeof C;

// ── Pixel grids ──────────────────────────────────────────────────────────
// Layout: head at col 4-11, arms at col 0-3 and 12-15, legs at col 4-11
// Rows:   0-7 head, 8-19 body/arms, 20-31 legs

// Head face (8 × 8, placed at grid offset x=4, y=0)
const FACE: ColorKey[][] = [
  ["H","H","H","H","H","H","H","H"],
  ["H","H","H","H","H","H","H","H"],
  ["S","S","H","H","H","H","S","S"],
  ["S","EW","E","S","S","EW","E","S"],
  ["S","EW","E","S","S","EW","E","S"],
  ["S","S","S","S","S","S","S","S"],
  ["S","MO","MO","S","S","MO","MO","S"],
  ["S","S","S","S","S","S","S","S"],
];

// Body front (8 × 12, placed at x=4, y=8)
const BODY: ColorKey[][] = [
  ["SH","SH","SH","SH","SH","SH","SH","SH"],
  ["SH","SH","SH","SH","SH","SH","SH","SH"],
  ["SH","SH","SH","SH","SH","SH","SH","SH"],
  ["SH","SH","SH","SH","SH","SH","SH","SH"],
  ["SH","SH","SH","SH","SH","SH","SH","SH"],
  ["BE","BE","BE","BE","BE","BE","BE","BE"],
  ["PA","PA","PA","PA","PA","PA","PA","PA"],
  ["PA","PA","PA","PA","PA","PA","PA","PA"],
  ["PA","PA","PA","PA","PA","PA","PA","PA"],
  ["PA","PA","PA","PA","PA","PA","PA","PA"],
  ["PA","PA","PA","PA","PA","PA","PA","PA"],
  ["PA","PA","PA","PA","PA","PA","PA","PA"],
];

// Arm (4 × 12) — same grid for left and right
const ARM: ColorKey[][] = [
  ["SH","SH","SH","SH"],
  ["SH","SH","SH","SH"],
  ["SH","SH","SH","SH"],
  ["SH","SH","SH","SH"],
  ["SH","SH","SH","SH"],
  ["SH","SH","SH","SH"],
  ["S","S","S","S"],
  ["S","S","S","S"],
  ["S","S","S","S"],
  ["S","S","S","S"],
  ["S","S","S","S"],
  ["S","S","S","S"],
];

// Leg (4 × 12)
const LEG: ColorKey[][] = [
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["PA","PA","PA","PA"],
  ["BO","BH","BH","BO"],
  ["BO","BO","BO","BO"],
];

// ── Render helpers ────────────────────────────────────────────────────────
function renderGrid(grid: ColorKey[][], ox: number, oy: number, prefix: string) {
  return grid.flatMap((row, r) =>
    row.map((key, c) => (
      <rect
        key={`${prefix}-${r}-${c}`}
        x={(ox + c) * P}
        y={(oy + r) * P}
        width={P}
        height={P}
        fill={C[key]}
      />
    ))
  );
}

// Subtle dark border on each "block face" to give depth
function renderGridWithBorder(grid: ColorKey[][], ox: number, oy: number, prefix: string) {
  return grid.flatMap((row, r) =>
    row.map((key, c) => (
      <g key={`${prefix}-${r}-${c}`}>
        <rect
          x={(ox + c) * P}
          y={(oy + r) * P}
          width={P}
          height={P}
          fill={C[key]}
        />
        {/* top-left glare */}
        <rect
          x={(ox + c) * P}
          y={(oy + r) * P}
          width={P - 1}
          height={1}
          fill="rgba(255,255,255,0.12)"
        />
        <rect
          x={(ox + c) * P}
          y={(oy + r) * P}
          width={1}
          height={P - 1}
          fill="rgba(255,255,255,0.08)"
        />
      </g>
    ))
  );
}

export function MinecraftSteve({ size = 1 }: MinecraftSteveProps) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      <svg
        width={W * size}
        height={H * size}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", imageRendering: "pixelated" }}
      >
        {/* Head (offset: col 4, row 0) */}
        {renderGridWithBorder(FACE, 4, 0, "face")}

        {/* Body (offset: col 4, row 8) */}
        {renderGrid(BODY, 4, 8, "body")}

        {/* Left arm (offset: col 0, row 8) */}
        {renderGrid(ARM, 0, 8, "larm")}

        {/* Right arm (offset: col 12, row 8) */}
        {renderGrid(ARM, 12, 8, "rarm")}

        {/* Left leg (offset: col 4, row 20) */}
        {renderGrid(LEG, 4, 20, "lleg")}

        {/* Right leg (offset: col 8, row 20) */}
        {renderGrid(LEG, 8, 20, "rleg")}

        {/* Ground shadow */}
        <ellipse
          cx={W / 2}
          cy={H - 1}
          rx={24}
          ry={4}
          fill="rgba(0,0,0,0.18)"
        />
      </svg>
    </motion.div>
  );
}
