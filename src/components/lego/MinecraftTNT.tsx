"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MinecraftTNTProps {
  size?: number;
}

// Isometric cube dimensions
const BW = 44;   // front face width
const BH = 28;   // front face height
const IX = 14;   // right-face x projection
const IY = 10;   // top-face y projection
const SVG_W = BW + IX; // 58
const SVG_H = BH + IY; // 38

type Phase = "idle" | "shaking" | "exploded" | "assembling";

// Predefined debris fragments (no Math.random – deterministic)
const DEBRIS = [
  // red chunks
  { ex: -52, ey: -75, rot: 145,  size: 9,  color: "#CC1111" },
  { ex:  38, ey: -88, rot: -60,  size: 7,  color: "#CC1111" },
  { ex: -72, ey: -28, rot:  95,  size: 8,  color: "#CC1111" },
  { ex:  65, ey: -44, rot: -120, size: 6,  color: "#CC1111" },
  { ex: -28, ey:  58, rot:  55,  size: 9,  color: "#CC1111" },
  { ex:  72, ey:  38, rot: -40,  size: 7,  color: "#CC1111" },
  { ex:  10, ey: -95, rot: 170,  size: 6,  color: "#CC1111" },
  // dark red chunks
  { ex: -18, ey: -65, rot:  80,  size: 7,  color: "#991111" },
  { ex:  45, ey: -38, rot: -30,  size: 6,  color: "#991111" },
  { ex: -65, ey:  45, rot: 165,  size: 8,  color: "#991111" },
  { ex:  62, ey:  62, rot: -105, size: 5,  color: "#991111" },
  // black pixels (TNT lettering debris)
  { ex: -42, ey: -95, rot: 205,  size: 5,  color: "#222" },
  { ex:  55, ey: -92, rot: -165, size: 4,  color: "#222" },
  { ex: -85, ey:  12, rot: 115,  size: 5,  color: "#222" },
  { ex:  85, ey: -18, rot: -80,  size: 4,  color: "#222" },
  // fire pixels
  { ex:   0, ey: -108, rot: 0,   size: 6,  color: "#FF6600" },
  { ex: -92, ey:  -58, rot: 65,  size: 5,  color: "#FFD700" },
  { ex:  92, ey:  -38, rot: -65, size: 5,  color: "#FFD700" },
  { ex: -15, ey:   88, rot: 10,  size: 7,  color: "#FF6600" },
  { ex:  25, ey:   80, rot: -10, size: 5,  color: "#FFD700" },
];

function TNTBlock({ flash }: { flash: boolean }) {
  const red      = flash ? "#FF8888" : "#CC1111";
  const redDark  = flash ? "#DD4444" : "#991111";
  const topColor = flash ? "#BB2222" : "#881111";

  return (
    <svg
      width={SVG_W}
      height={SVG_H + 14}   // +14 for fuse above
      viewBox={`0 -14 ${SVG_W} ${SVG_H + 14}`}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* ── Fuse ── */}
      <path
        d={`M ${IX} 0 Q ${IX - 6} -6 ${IX - 10} -13`}
        stroke="#553300"
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
      />
      {/* Fuse spark */}
      <motion.circle
        cx={IX - 10} cy={-13} r={2.5}
        animate={{ opacity: [1, 0.3, 1], r: [2.5, 3.5, 2.5], fill: ["#FFD700","#FF4500","#FFD700"] }}
        transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Top face (checkerboard in dark red + black) ── */}
      <defs>
        <clipPath id="tntTopClip">
          <polygon points={`${IX},0 ${SVG_W},0 ${BW},${IY} 0,${IY}`} />
        </clipPath>
        <pattern id="tntTopPat" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill={topColor} />
          <rect x="0" y="0" width="3.5" height="3.5" fill="rgba(0,0,0,0.55)" />
          <rect x="3.5" y="3.5" width="3.5" height="3.5" fill="rgba(0,0,0,0.55)" />
        </pattern>
      </defs>
      <polygon
        points={`${IX},0 ${SVG_W},0 ${BW},${IY} 0,${IY}`}
        fill={`url(#tntTopPat)`}
        clipPath="url(#tntTopClip)"
        stroke="#550000"
        strokeWidth={0.6}
      />

      {/* ── Front face ── */}
      <rect x={0} y={IY} width={BW} height={BH} fill={red} />
      {/* top highlight */}
      <rect x={0} y={IY} width={BW} height={3} fill="rgba(255,255,255,0.14)" />
      {/* left highlight */}
      <rect x={0} y={IY} width={2} height={BH} fill="rgba(255,255,255,0.10)" />

      {/* TNT text — white with black shadow */}
      <text
        x={BW / 2 + 0.8}
        y={IY + BH * 0.65 + 0.8}
        textAnchor="middle"
        fontSize={12}
        fontWeight="900"
        fontFamily="monospace"
        fill="#330000"
      >
        TNT
      </text>
      <text
        x={BW / 2}
        y={IY + BH * 0.65}
        textAnchor="middle"
        fontSize={12}
        fontWeight="900"
        fontFamily="monospace"
        fill="#FFFFFF"
      >
        TNT
      </text>

      {/* Front face outline */}
      <rect x={0} y={IY} width={BW} height={BH} fill="none" stroke="#550000" strokeWidth={0.8} />

      {/* ── Right face ── */}
      <polygon
        points={`${BW},${IY} ${SVG_W},0 ${SVG_W},${BH} ${BW},${BH + IY}`}
        fill={redDark}
        stroke="#550000"
        strokeWidth={0.6}
      />
      {/* right face top highlight */}
      <line x1={BW} y1={IY} x2={SVG_W} y2={0} stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} />
    </svg>
  );
}

export function MinecraftTNT({ size = 1 }: MinecraftTNTProps) {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleClick = () => {
    if (phase !== "idle") return;

    setPhase("shaking");
    setTimeout(() => setPhase("exploded"),   380);
    setTimeout(() => setPhase("assembling"), 1900);
    setTimeout(() => setPhase("idle"),       2800);
  };

  const showBlock   = phase === "idle" || phase === "shaking";
  const showDebris  = phase === "exploded" || phase === "assembling";
  const flashEffect = phase === "shaking";

  return (
    <div
      onClick={handleClick}
      style={{ position: "relative", cursor: "pointer", display: "inline-block" }}
      title="Click me…"
    >
      {/* ── TNT block ── */}
      <AnimatePresence>
        {showBlock && (
          <motion.div
            key="tnt"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.18 }}
            animate={
              phase === "shaking"
                ? { x: [-4, 4, -4, 4, -2, 2, 0], rotate: [-3, 3, -3, 3, 0] }
                : {
                    // idle: gentle breathe
                    scale: [1, 1.03, 1],
                    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            style={{ transformOrigin: "center bottom" }}
          >
            <div style={{ transform: `scale(${size})`, transformOrigin: "top left" }}>
              <TNTBlock flash={flashEffect} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Explosion flash ring ── */}
      <AnimatePresence>
        {phase === "exploded" && (
          <motion.div
            key="flash"
            initial={{ scale: 0, opacity: 0.95 }}
            animate={{ scale: 5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: SVG_W * size,
              height: SVG_W * size,
              marginLeft: -(SVG_W * size) / 2,
              marginTop: -(SVG_W * size) / 2,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,220,0,0.9) 0%, rgba(255,80,0,0.7) 40%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 20,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Debris pixels ── */}
      <AnimatePresence>
        {showDebris &&
          DEBRIS.map((d, i) => (
            <motion.div
              key={`d-${i}`}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={
                phase === "exploded"
                  ? {
                      x: d.ex * size,
                      y: d.ey * size,
                      rotate: d.rot,
                      opacity: [1, 1, 0.7],
                      scale: [1, 0.8],
                    }
                  : {
                      // assembling: fly back to origin
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: [0.7, 1, 0],
                      scale: 1,
                    }
              }
              transition={{
                duration: phase === "exploded" ? 0.65 : 0.75,
                delay:
                  phase === "exploded" ? i * 0.018 : (DEBRIS.length - i) * 0.022,
                ease: phase === "exploded" ? "easeOut" : "easeIn",
              }}
              style={{
                position: "absolute",
                left: (SVG_W * size) / 2,
                top: (SVG_H * size) / 2,
                width: d.size * size,
                height: d.size * size,
                backgroundColor: d.color,
                borderRadius: 1,
                pointerEvents: "none",
                zIndex: 15,
              }}
            />
          ))}
      </AnimatePresence>

      {/* ── BOOM label ── */}
      <AnimatePresence>
        {phase === "exploded" && (
          <motion.div
            key="boom"
            initial={{ scale: 0.4, opacity: 0, y: 0 }}
            animate={{ scale: 1.1, opacity: 1, y: -30 * size }}
            exit={{ scale: 0.6, opacity: 0, y: -50 * size }}
            transition={{ duration: 0.3, ease: "backOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "0%",
              transform: "translateX(-50%)",
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: 13 * size,
              color: "#FFD700",
              textShadow: "1px 1px 0 #FF4500, -1px -1px 0 #FF4500, 1px -1px 0 #FF4500, -1px 1px 0 #FF4500",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 25,
              letterSpacing: "0.05em",
            }}
          >
            💥 BOOM!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
