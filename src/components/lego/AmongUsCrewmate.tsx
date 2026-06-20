"use client";

import { motion } from "framer-motion";

export function AmongUsCrewmate({ size = 1, color = "#7A9CB3" }: { size?: number; color?: string }) {
  const W = 58, H = 72;

  return (
    <motion.div
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        width: W * size,
        height: H * size,
        transformOrigin: "bottom center",
      }}
    >
      <svg width={W * size} height={H * size} viewBox="0 0 58 72" style={{ display: "block", overflow: "visible" }}>
        {/* Main bean body — the iconic Among Us silhouette */}
        <path
          d={`
            M 29 4
            C 13 4 6 14 6 24
            L 6 50
            Q 6 57 13 58
            L 13 67
            Q 13 71 17 71
            L 23 71
            Q 27 71 27 67
            L 27 58
            L 31 58
            L 31 67
            Q 31 71 35 71
            L 41 71
            Q 45 71 45 67
            L 45 58
            Q 52 57 52 50
            L 52 24
            C 52 14 45 4 29 4 Z
          `}
          fill={color}
        />

        {/* Visor — the most distinctive feature, wide curved glass panel */}
        <path
          d={`
            M 11 19
            Q 11 8 29 8
            Q 47 8 47 19
            Q 47 30 29 30
            Q 11 30 11 19 Z
          `}
          fill="#DCCFB8"
        />
        {/* Visor inner darker tint to look like glass */}
        <path
          d={`
            M 13 19
            Q 13 10 29 10
            Q 45 10 45 19
            Q 45 28 29 28
            Q 13 28 13 19 Z
          `}
          fill="rgba(220,207,184,0.7)"
        />
        {/* Visor shine — top-left highlight */}
        <ellipse cx="18" cy="14" rx="6" ry="4" fill="rgba(255,255,255,0.6)" />

        {/* Backpack — right side protrusion */}
        <rect x="49" y="30" width="11" height="20" rx="5.5" fill={color} style={{ filter: "brightness(0.82)" }} />
        <rect x="50" y="33" width="9" height="7" rx="3" fill="rgba(255,255,255,0.12)" />

        {/* Leg shadow line to separate from body */}
        <line x1="29" y1="58" x2="29" y2="71" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}
