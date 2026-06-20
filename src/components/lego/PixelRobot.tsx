"use client";

import { motion } from "framer-motion";

export function PixelRobot({ size = 1 }: { size?: number }) {
  const W = 62, H = 92;

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block", width: W * size, height: H * size }}
    >
      <svg width={W * size} height={H * size} viewBox="0 0 62 92" style={{ display: "block", overflow: "visible" }}>
        {/* Antenna stem */}
        <rect x="28" y="2" width="6" height="11" rx="3" fill="#9B7D61" />
        {/* Antenna bulb — pulses */}
        <motion.circle
          cx="31" cy="2" r="5"
          fill="#AD7556"
          animate={{ r: [5, 6.5, 5], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="31" cy="2" r="2.5" fill="#FED8A6" opacity="0.7" />

        {/* Head */}
        <rect x="7" y="13" width="48" height="36" rx="8" fill="#7A9CB3" />
        {/* Head highlight */}
        <rect x="9" y="13" width="44" height="8" rx="5" fill="rgba(255,255,255,0.18)" />

        {/* Left eye panel */}
        <rect x="12" y="21" width="16" height="13" rx="4" fill="#2A1A0E" />
        <motion.rect
          x="14" y="23" width="12" height="9" rx="2.5"
          fill="#AD7556"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
        />
        {/* Left eye scan line */}
        <motion.rect
          x="14" y="23" width="12" height="2" rx="1"
          fill="#FED8A6"
          animate={{ y: [23, 30, 23] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Right eye panel */}
        <rect x="34" y="21" width="16" height="13" rx="4" fill="#2A1A0E" />
        <motion.rect
          x="36" y="23" width="12" height="9" rx="2.5"
          fill="#7A9CB3"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }}
        />

        {/* Mouth grille */}
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={11 + i * 10} y="38" width="7" height="5" rx="1.5" fill="#2A1A0E" opacity="0.65" />
        ))}

        {/* Neck joint */}
        <rect x="23" y="49" width="16" height="7" rx="4" fill="#9B7D61" />

        {/* Body */}
        <rect x="5" y="56" width="52" height="28" rx="8" fill="#7A9CB3" />
        {/* Body panel */}
        <rect x="13" y="62" width="36" height="16" rx="4" fill="rgba(42,26,14,0.22)" />
        {/* Chest button */}
        <circle cx="31" cy="70" r="6" fill="#AD7556" />
        <circle cx="31" cy="70" r="3.5" fill="#FED8A6" />

        {/* Left arm */}
        <rect x="0" y="58" width="7" height="22" rx="3.5" fill="#9B7D61" />
        <rect x="0" y="76" width="7" height="6" rx="3" fill="#7A9CB3" />
        {/* Left claw */}
        <rect x="0" y="82" width="3" height="8" rx="1.5" fill="#9B7D61" />
        <rect x="4" y="82" width="3" height="6" rx="1.5" fill="#9B7D61" />

        {/* Right arm */}
        <rect x="55" y="58" width="7" height="22" rx="3.5" fill="#9B7D61" />
        <rect x="55" y="76" width="7" height="6" rx="3" fill="#7A9CB3" />
        {/* Right claw */}
        <rect x="55" y="82" width="3" height="8" rx="1.5" fill="#9B7D61" />
        <rect x="59" y="82" width="3" height="6" rx="1.5" fill="#9B7D61" />

        {/* Left leg */}
        <rect x="11" y="82" width="14" height="10" rx="4" fill="#9B7D61" />
        {/* Right leg */}
        <rect x="37" y="82" width="14" height="10" rx="4" fill="#9B7D61" />
      </svg>
    </motion.div>
  );
}
