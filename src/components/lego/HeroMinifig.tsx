"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "walking" | "waving" | "idle";

export function HeroMinifig({ size = 1 }: { size?: number }) {
  const [phase, setPhase] = useState<Phase>("walking");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("waving"), 1600);
    const t2 = setTimeout(() => setPhase("idle"), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const W = 88, H = 138;

  const legTransition = { duration: 0.38, repeat: Infinity, ease: "linear" as const };
  const armTransition = { duration: 0.38, repeat: Infinity, ease: "linear" as const };

  return (
    <div style={{ position: "relative", display: "inline-block", width: W * size, height: H * size }}>

      {/* Speech bubble */}
      <AnimatePresence>
        {phase === "waving" && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: -52 * size,
              left: 50 * size,
              backgroundColor: "#FAF4E8",
              border: `2px solid #AD7556`,
              borderRadius: 8,
              padding: `${5 * size}px ${10 * size}px`,
              fontSize: 13 * size,
              fontWeight: 900,
              color: "#53443D",
              fontFamily: "Fredoka One, sans-serif",
              whiteSpace: "nowrap",
              boxShadow: `3px 3px 0 #AD7556`,
              zIndex: 20,
            }}
          >
            Hey there! 👋
            {/* Tail */}
            <div style={{
              position: "absolute",
              bottom: -10,
              left: 12,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #AD7556",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Walk-in x translation */}
      <motion.div
        initial={{ x: -320 * size }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Body bob during walk, float during idle */}
        <motion.div
          animate={
            phase === "walking" ? { y: [0, -5 * size, 0] } :
            phase === "idle"    ? { y: [0, -10 * size, 0] } :
            { y: 0 }
          }
          transition={
            phase === "walking" ? { duration: 0.38, repeat: Infinity, ease: "easeInOut" } :
            phase === "idle"    ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } :
            { duration: 0.3 }
          }
          style={{ position: "absolute", inset: 0 }}
        >
          <svg
            width={W * size}
            height={H * size}
            viewBox={`0 0 ${W} ${H}`}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* ── HEAD ── */}
            {/* Neck stud */}
            <rect x="34" y="2" width="20" height="8" rx="3.5" fill="#C49A00" />
            <ellipse cx="44" cy="2" rx="10" ry="3" fill="#FFD700" />
            {/* Head block */}
            <rect x="18" y="10" width="52" height="42" rx="10" fill="#FFD700" />
            {/* Face highlight */}
            <ellipse cx="32" cy="16" rx="10" ry="6" fill="rgba(255,255,255,0.22)" />
            {/* Eyes */}
            <circle cx="33" cy="26" r="5.5" fill="#2A1A0E" />
            <circle cx="55" cy="26" r="5.5" fill="#2A1A0E" />
            <circle cx="31.5" cy="24" r="2" fill="rgba(255,255,255,0.85)" />
            <circle cx="53.5" cy="24" r="2" fill="rgba(255,255,255,0.85)" />
            {/* Big friendly smile */}
            <path d="M 28 38 Q 44 50 60 38" fill="none" stroke="#2A1A0E" strokeWidth="3" strokeLinecap="round" />
            {/* Cheek blush */}
            <ellipse cx="24" cy="34" rx="5" ry="3.5" fill="rgba(255,130,60,0.2)" />
            <ellipse cx="64" cy="34" rx="5" ry="3.5" fill="rgba(255,130,60,0.2)" />

            {/* ── TORSO ── */}
            <rect x="18" y="52" width="52" height="38" rx="7" fill="#AD7556" />
            {/* Torso vest detail */}
            <rect x="22" y="57" width="16" height="24" rx="4" fill="rgba(83,68,61,0.25)" />
            <rect x="50" y="57" width="12" height="14" rx="3" fill="rgba(83,68,61,0.2)" />
            {/* Tool belt buckle */}
            <rect x="30" y="84" width="28" height="6" rx="3" fill="#9B7D61" />
            <rect x="41" y="83" width="6" height="8" rx="2" fill="#FED8A6" />

            {/* ── LEFT ARM ── */}
            <motion.g
              style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
              animate={phase === "walking" ? { rotate: [14, -14, 14] } : { rotate: 0 }}
              transition={armTransition}
            >
              <rect x="2" y="55" width="17" height="34" rx="7" fill="#AD7556" />
              <rect x="2" y="83" width="17" height="6" rx="3" fill="#9B7D61" />
              <rect x="3" y="88" width="15" height="12" rx="6" fill="#FFD700" />
            </motion.g>

            {/* ── RIGHT ARM ── wave during greeting */}
            <motion.g
              style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
              animate={
                phase === "walking" ? { rotate: [-14, 14, -14] } :
                phase === "waving"  ? { rotate: [-90, -50, -90, -50, -90, 0] } :
                { rotate: 0 }
              }
              transition={
                phase === "walking" ? armTransition :
                phase === "waving"  ? { duration: 1.7, ease: "easeInOut" } :
                { duration: 0.4 }
              }
            >
              <rect x="69" y="55" width="17" height="34" rx="7" fill="#AD7556" />
              <rect x="69" y="83" width="17" height="6" rx="3" fill="#9B7D61" />
              <rect x="70" y="88" width="15" height="12" rx="6" fill="#FFD700" />
            </motion.g>

            {/* ── LEFT LEG ── */}
            <motion.g
              style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
              animate={phase === "walking" ? { rotate: [-16, 16, -16] } : { rotate: 0 }}
              transition={legTransition}
            >
              <rect x="20" y="90" width="20" height="36" rx="7" fill="#53443D" />
              <rect x="18" y="120" width="24" height="14" rx="6" fill="#3D2E28" />
              <rect x="20" y="120" width="10" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
            </motion.g>

            {/* ── RIGHT LEG ── */}
            <motion.g
              style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
              animate={phase === "walking" ? { rotate: [16, -16, 16] } : { rotate: 0 }}
              transition={legTransition}
            >
              <rect x="48" y="90" width="20" height="36" rx="7" fill="#53443D" />
              <rect x="46" y="120" width="24" height="14" rx="6" fill="#3D2E28" />
              <rect x="48" y="120" width="10" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
