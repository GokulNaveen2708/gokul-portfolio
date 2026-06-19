"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MinecraftCreeperProps {
  size?: number;
}

const P = 5;          // SVG units per Minecraft pixel
const W = 8  * P;     // 40
const H = 22 * P;     // 110

const G  = "#5AAF00"; // green
const GS = "#3E7A00"; // shadow green
const D  = "#090909"; // dark

// ── Pixel face with SMILE ──────────────────────────────────────────────────────
// Eyes: rows 2-3, cols 1-2 and 5-6
// Smile: U-shape → corners at (6, col 1) and (6, col 6), bottom bar row 7 cols 2-5
const HEAD = [
  [G, G,  G,  G,  GS, GS, GS, GS],  // 0
  [G, G,  G,  G,  GS, GS, GS, GS],  // 1
  [G, D,  D,  G,  GS, D,  D,  GS],  // 2  eyes
  [G, D,  D,  G,  GS, D,  D,  GS],  // 3  eyes
  [G, G,  G,  G,  GS, GS, GS, GS],  // 4
  [G, G,  G,  G,  GS, GS, GS, GS],  // 5
  [G, D,  G,  G,  GS, GS, D,  GS],  // 6  smile corners (↑ high)
  [G, G,  D,  D,  D,  D,  G,  G ],  // 7  smile bottom bar → ∪ shape
];

// Body (4×8, placed at col 2)
const BODY = [
  [G,G,GS,GS],[G,G,GS,GS],[G,G,GS,GS],[G,G,GS,GS],
  [G,G,GS,GS],[G,G,GS,GS],[G,G,GS,GS],[G,G,GS,GS],
];

// Left leg pair (4×6, placed at col 0)
const LEG_L = [
  [G,G,G,GS],[G,G,G,GS],[G,G,G,GS],
  [G,G,G,GS],[G,G,G,GS],[G,G,G,GS],
];

// Right leg pair (4×6, placed at col 4)
const LEG_R = [
  [G,G,GS,GS],[G,G,GS,GS],[G,G,GS,GS],
  [G,G,GS,GS],[G,G,GS,GS],[G,G,GS,GS],
];

// ── Render ─────────────────────────────────────────────────────────────────────
function Grid({ grid, ox, oy, prefix, flash }: {
  grid: string[][];
  ox: number; oy: number;
  prefix: string;
  flash?: boolean;
}) {
  return (
    <>
      {grid.flatMap((row, r) =>
        row.map((fill, c) => (
          <rect
            key={`${prefix}-${r}-${c}`}
            x={(ox + c) * P}
            y={(oy + r) * P}
            width={P}
            height={P}
            fill={flash ? "#DFFFB0" : fill}
          />
        ))
      )}
    </>
  );
}

const WALK = 0.55; // seconds per walk cycle

const SPARK_POS = [
  { x: -7, y: -6 }, { x: 42, y: -9 }, { x: -5, y: 22 },
  { x: 43, y: 20 }, { x: 18, y: -13 }, { x: 22, y: 52 },
];

const BOOM_PARTICLES = [
  { dx: -60, dy: -70, color: "#FFD700" }, { dx:  60, dy: -70, color: "#5AAF00" },
  { dx: -80, dy: -20, color: "#FF6B35" }, { dx:  80, dy: -20, color: "#FFD700" },
  { dx: -50, dy:  50, color: "#5AAF00" }, { dx:  50, dy:  50, color: "#FF6B35" },
  { dx:   0, dy: -90, color: "#FFFFFF" }, { dx:   0, dy:  70, color: "#FFD700" },
];

export function MinecraftCreeper({ size = 1 }: MinecraftCreeperProps) {
  const [hovered,  setHovered]  = useState(false);
  const [flash,    setFlash]    = useState(false);
  const [exploded, setExploded] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    let n = 0;
    const tick = () => {
      setFlash(f => !f);
      if (++n < 5) setTimeout(tick, 110);
      else setFlash(false);
    };
    setTimeout(tick, 180);
  };

  const handleClick = () => {
    if (exploded) return;
    setExploded(true);
    let n = 0;
    const tick = () => {
      setFlash(f => !f);
      if (++n < 8) setTimeout(tick, 80);
      else { setFlash(false); setTimeout(() => setExploded(false), 1200); }
    };
    tick();
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={() => { setHovered(false); setFlash(false); }}
      onClick={handleClick}
      style={{ display: "inline-block", cursor: "pointer", position: "relative" }}
    >
      {/* Boom particles on click */}
      <AnimatePresence>
        {exploded && BOOM_PARTICLES.map((p, i) => (
          <motion.div
            key={`boom-${i}`}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: p.dx * size, y: p.dy * size, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.03 }}
            style={{
              position: "absolute", left: W * size * 0.5, top: H * size * 0.4,
              width: 10 * size, height: 10 * size,
              backgroundColor: p.color, borderRadius: 2,
              pointerEvents: "none", zIndex: 30,
            }}
          />
        ))}
      </AnimatePresence>

      {/* BOOM text */}
      <AnimatePresence>
        {exploded && (
          <motion.div
            key="boom-text"
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -40 * size }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
            style={{
              position: "absolute", left: "50%", top: 0,
              transform: "translateX(-50%)",
              color: "#FFD700", fontFamily: "monospace", fontWeight: 900,
              fontSize: 14 * size, whiteSpace: "nowrap",
              pointerEvents: "none", zIndex: 35,
              textShadow: "0 0 8px rgba(255,215,0,0.8)",
            }}
          >
            💥 BOOM!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && !exploded && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "108%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1A3A00",
              color: "#6FCC14",
              fontSize: Math.round(10 * size),
              fontWeight: 900,
              fontFamily: "monospace",
              padding: `${3 * size}px ${7 * size}px`,
              borderRadius: 3,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 30,
              border: "1px solid #5AAF00",
              boxShadow: "0 0 8px rgba(90,175,0,0.5)",
            }}
          >
            ssSSSSss :]
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparks */}
      <AnimatePresence>
        {hovered && !exploded && SPARK_POS.map((sp, i) => (
          <motion.div
            key={`spark-${i}`}
            initial={{ opacity: 0, scale: 0, x: sp.x * size, y: sp.y * size }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], x: sp.x * size, y: sp.y * size - 10 * size }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07, repeat: Infinity, repeatDelay: 0.4 }}
            style={{
              position: "absolute", left: 0, top: 0,
              width: 4 * size, height: 4 * size,
              backgroundColor: "#FFD700",
              borderRadius: 1, pointerEvents: "none",
              zIndex: 25,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Inner motion.div: waddle animation only — no hover logic here */}
      <motion.div
        animate={{ x: [0, 2, 0, -2, 0], y: [0, -2, 0, -2, 0] }}
        transition={{ duration: WALK, repeat: Infinity, ease: "linear" }}
        style={{ display: "inline-block" }}
      >
        <svg
          width={W * size}
          height={H * size}
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: "block", imageRendering: "pixelated", overflow: "visible" }}
        >
          {/* Head */}
          <Grid grid={HEAD} ox={0} oy={0} prefix="hd" flash={flash} />
          <rect x={0} y={0} width={W} height={P} fill="rgba(255,255,255,0.09)" />

          {/* Body */}
          <motion.g
            animate={{ y: [0, -1, 0, -1, 0] }}
            transition={{ duration: WALK, repeat: Infinity, ease: "linear" }}
          >
            <Grid grid={BODY} ox={2} oy={8} prefix="bd" flash={flash} />
          </motion.g>

          {/* Left legs — UP when right is DOWN */}
          <motion.g
            animate={{ y: [0, -3, 0, 3, 0] }}
            transition={{ duration: WALK, repeat: Infinity, ease: "linear" }}
          >
            <Grid grid={LEG_L} ox={0} oy={16} prefix="ll" flash={flash} />
          </motion.g>

          {/* Right legs — opposite phase */}
          <motion.g
            animate={{ y: [0, 3, 0, -3, 0] }}
            transition={{ duration: WALK, repeat: Infinity, ease: "linear" }}
          >
            <Grid grid={LEG_R} ox={4} oy={16} prefix="rl" flash={flash} />
          </motion.g>

          {/* Ground shadow pulses with step */}
          <motion.ellipse
            cx={W / 2} cy={H - 1} ry={3}
            animate={{ rx: [17, 19, 17, 19, 17] }}
            transition={{ duration: WALK, repeat: Infinity, ease: "linear" }}
            fill="rgba(0,0,0,0.22)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
