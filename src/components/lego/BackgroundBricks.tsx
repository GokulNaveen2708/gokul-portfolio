"use client";

import { motion } from "framer-motion";
import { LegoBrickSVG } from "./LegoBrickSVG";

interface BrickDef {
  studs: 1 | 2 | 4;
  isPlate?: boolean;
  color: string;
  x: string;
  y: string;
  rotate: number;
  scale: number;
  opacity: number;
  floatAmp?: number;
  floatDur?: number;
  delay?: number;
}

// Geometry derived from original LegoBrickSVG proportions:
//   w = studs*24 + 4  (1→28, 2→52, 4→100)
//   faceH = 26 (brick) | 12 (plate)
//   right-face: bottom-right y = faceH+12, bottom-left y = faceH+8
function DecoLegoBrick({
  studs,
  isPlate = false,
  color,
  x,
  y,
  rotate,
  scale,
  opacity,
  floatAmp = 8,
  floatDur = 5,
  delay = 0,
}: BrickDef) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        pointerEvents: "none",
        zIndex: 1,
        transformOrigin: "center center",
      }}
      initial={{ rotate }}
      animate={{
        y: [0, -floatAmp, 0],
        rotate: [rotate, rotate + 1.8, rotate],
      }}
      transition={{
        duration: floatDur,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <LegoBrickSVG studs={studs} color={color} isPlate={isPlate} scale={scale} />
    </motion.div>
  );
}

// ── Per-section decorative brick placement configs ──────────────────────────
const SECTION_BRICKS: Record<string, BrickDef[]> = {
  hero: [
    { studs: 4, isPlate: true,  color: "#DCCFB8", x: "-55px",             y: "-8px",              rotate: -22, scale: 2.8, opacity: 0.20, floatAmp: 10, floatDur: 6.5, delay: 0 },
    { studs: 2, isPlate: false, color: "#7A9CB3", x: "calc(100% - 90px)", y: "55px",               rotate: 18,  scale: 1.8, opacity: 0.18, floatAmp: 6,  floatDur: 4.8, delay: 1.2 },
    { studs: 1, isPlate: false, color: "#AD7556", x: "calc(100% - 35px)", y: "44%",                rotate: 30,  scale: 1.5, opacity: 0.22, floatAmp: 9,  floatDur: 5.2, delay: 2.1 },
    { studs: 4, isPlate: false, color: "#AD7556", x: "calc(100% - 90px)", y: "calc(100% - 55px)",  rotate: 15,  scale: 2.2, opacity: 0.16, floatAmp: 7,  floatDur: 5.8, delay: 0.6 },
    { studs: 2, isPlate: true,  color: "#53443D", x: "-30px",             y: "calc(100% - 45px)",  rotate: -10, scale: 1.6, opacity: 0.13, floatAmp: 5,  floatDur: 4.5, delay: 1.8 },
  ],
  about: [
    { studs: 4, isPlate: false, color: "#7A9CB3", x: "calc(100% - 60px)", y: "-20px",              rotate: 20,  scale: 2.5, opacity: 0.18, floatAmp: 9,  floatDur: 6.0, delay: 0 },
    { studs: 2, isPlate: true,  color: "#AD7556", x: "-35px",             y: "calc(100% - 40px)",  rotate: -14, scale: 2.0, opacity: 0.16, floatAmp: 7,  floatDur: 5.2, delay: 1.0 },
    { studs: 1, isPlate: false, color: "#DCCFB8", x: "calc(100% - 42px)", y: "48%",                rotate: 35,  scale: 1.4, opacity: 0.24, floatAmp: 6,  floatDur: 4.2, delay: 2.0 },
    { studs: 2, isPlate: false, color: "#53443D", x: "15px",              y: "20%",                rotate: -28, scale: 1.3, opacity: 0.11, floatAmp: 5,  floatDur: 5.5, delay: 0.8 },
  ],
  experience: [
    { studs: 2, isPlate: false, color: "#53443D", x: "-38px",             y: "100px",              rotate: -18, scale: 2.2, opacity: 0.15, floatAmp: 8,  floatDur: 5.8, delay: 0 },
    { studs: 4, isPlate: true,  color: "#7A9CB3", x: "calc(100% - 110px)",y: "calc(100% - 30px)",  rotate: 22,  scale: 2.0, opacity: 0.17, floatAmp: 10, floatDur: 6.2, delay: 1.4 },
    { studs: 1, isPlate: false, color: "#AD7556", x: "calc(100% - 38px)", y: "28%",                rotate: 32,  scale: 1.6, opacity: 0.20, floatAmp: 6,  floatDur: 4.5, delay: 2.2 },
    { studs: 2, isPlate: true,  color: "#DCCFB8", x: "12px",              y: "calc(100% - 50px)",  rotate: 8,   scale: 1.2, opacity: 0.18, floatAmp: 5,  floatDur: 5.0, delay: 0.5 },
  ],
  projects: [
    { studs: 4, isPlate: false, color: "#AD7556", x: "calc(100% - 85px)", y: "-28px",              rotate: 15,  scale: 2.5, opacity: 0.17, floatAmp: 10, floatDur: 6.5, delay: 0 },
    { studs: 2, isPlate: true,  color: "#DCCFB8", x: "-48px",             y: "calc(100% - 48px)",  rotate: -20, scale: 1.9, opacity: 0.19, floatAmp: 7,  floatDur: 5.0, delay: 1.1 },
    { studs: 1, isPlate: false, color: "#7A9CB3", x: "calc(100% - 48px)", y: "38%",                rotate: 28,  scale: 1.5, opacity: 0.20, floatAmp: 8,  floatDur: 4.8, delay: 2.0 },
    { studs: 2, isPlate: false, color: "#53443D", x: "10px",              y: "22%",                rotate: -35, scale: 1.2, opacity: 0.12, floatAmp: 5,  floatDur: 5.5, delay: 0.8 },
  ],
  skills: [
    { studs: 4, isPlate: true,  color: "#DCCFB8", x: "-68px",             y: "-15px",              rotate: -16, scale: 2.6, opacity: 0.20, floatAmp: 9,  floatDur: 6.0, delay: 0 },
    { studs: 2, isPlate: false, color: "#AD7556", x: "calc(100% - 65px)", y: "calc(100% - 68px)",  rotate: 20,  scale: 2.0, opacity: 0.17, floatAmp: 7,  floatDur: 5.2, delay: 1.5 },
    { studs: 1, isPlate: false, color: "#7A9CB3", x: "calc(100% - 40px)", y: "22%",                rotate: 38,  scale: 1.4, opacity: 0.22, floatAmp: 6,  floatDur: 4.3, delay: 2.4 },
    { studs: 2, isPlate: true,  color: "#53443D", x: "8px",               y: "60%",                rotate: -12, scale: 1.1, opacity: 0.12, floatAmp: 4,  floatDur: 5.8, delay: 0.6 },
  ],
  education: [
    { studs: 2, isPlate: false, color: "#7A9CB3", x: "-32px",             y: "-10px",              rotate: -20, scale: 2.2, opacity: 0.18, floatAmp: 8,  floatDur: 5.5, delay: 0 },
    { studs: 4, isPlate: true,  color: "#AD7556", x: "calc(100% - 95px)", y: "calc(100% - 35px)",  rotate: 14,  scale: 2.0, opacity: 0.16, floatAmp: 9,  floatDur: 6.2, delay: 1.3 },
    { studs: 1, isPlate: false, color: "#DCCFB8", x: "calc(100% - 40px)", y: "32%",                rotate: 30,  scale: 1.5, opacity: 0.22, floatAmp: 6,  floatDur: 4.6, delay: 2.2 },
  ],
  contact: [
    { studs: 2, isPlate: true,  color: "#7A9CB3", x: "calc(100% - 80px)", y: "-12px",              rotate: 18,  scale: 1.8, opacity: 0.18, floatAmp: 7,  floatDur: 5.2, delay: 0 },
    { studs: 4, isPlate: false, color: "#DCCFB8", x: "-55px",             y: "calc(100% - 55px)",  rotate: -22, scale: 2.0, opacity: 0.16, floatAmp: 8,  floatDur: 6.0, delay: 1.2 },
    { studs: 1, isPlate: false, color: "#AD7556", x: "calc(100% - 42px)", y: "45%",                rotate: 32,  scale: 1.4, opacity: 0.20, floatAmp: 5,  floatDur: 4.4, delay: 2.0 },
  ],
};

export function BackgroundBricks({ section }: { section: string }) {
  const bricks = SECTION_BRICKS[section] ?? [];
  if (!bricks.length) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {bricks.map((b, i) => (
        <DecoLegoBrick key={i} {...b} />
      ))}
    </div>
  );
}
