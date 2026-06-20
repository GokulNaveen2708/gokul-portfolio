"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// eye directions: 0=right, 1=center, 2=left
const EYE_STATES = [
  { lx: 19, ly: 24, rx: 37, ry: 24, sx: 20.5, sy: 22, srx: 38.5 }, // right
  { lx: 17, ly: 24, rx: 35, ry: 24, sx: 18.5, sy: 22, srx: 36.5 }, // center
  { lx: 15, ly: 24, rx: 33, ry: 24, sx: 16.5, sy: 22, srx: 34.5 }, // left
];

export function PacManGhost({ size = 1, color = "#AD7556" }: { size?: number; color?: string }) {
  const W = 52, H = 58;
  const [eyeIdx, setEyeIdx] = useState(0);
  const bodyControls = useAnimation();

  // Eye movement cycle: right → center → left → center → right…
  useEffect(() => {
    const seq = [0, 1, 2, 1];
    let i = 0;
    const iv = setInterval(() => {
      i = (i + 1) % seq.length;
      setEyeIdx(seq[i]);
    }, 900);
    return () => clearInterval(iv);
  }, []);

  // Entrance: slide in from the left, then start float
  useEffect(() => {
    async function run() {
      await bodyControls.start({
        x: 0, opacity: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      });
      bodyControls.start({
        y: [0, -14, 0],
        x: [0, 6, -4, 0],
        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
      });
    }
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eye = EYE_STATES[eyeIdx];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={bodyControls}
      style={{ display: "inline-block", width: W * size, height: H * size }}
    >
      <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
        {/* Ghost body — rounded top, wavy skirt bottom */}
        <path
          d="M 4 48 L 4 22 Q 4 4 26 4 Q 48 4 48 22 L 48 48 Q 41 41 34 48 Q 26 41 19 48 Q 11 41 4 48 Z"
          fill={color}
        />
        {/* Highlight on rounded top */}
        <ellipse cx="20" cy="14" rx="8" ry="5" fill="rgba(255,255,255,0.18)" />
        {/* White sclera */}
        <ellipse cx="17" cy="22" rx="7.5" ry="9" fill="white" />
        <ellipse cx="35" cy="22" rx="7.5" ry="9" fill="white" />
        {/* Pupils — animated position */}
        <motion.circle
          animate={{ cx: eye.lx, cy: eye.ly }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          r="4.5" fill="#2A1A0E"
        />
        <motion.circle
          animate={{ cx: eye.rx, cy: eye.ry }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          r="4.5" fill="#2A1A0E"
        />
        {/* Eye shine */}
        <motion.circle
          animate={{ cx: eye.sx, cy: eye.sy }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          r="1.8" fill="white"
        />
        <motion.circle
          animate={{ cx: eye.srx, cy: eye.sy }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          r="1.8" fill="white"
        />
      </svg>
    </motion.div>
  );
}
