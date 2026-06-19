"use client";

import { motion } from "framer-motion";

interface LegoGameControllerProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

export function LegoGameController({ size = 1, color = "#53443D", animated = true }: LegoGameControllerProps) {
  const W = 100;
  const H = 72;
  const dark = color;

  const ctrl = (
    <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} overflow="visible" style={{ display: "block" }}>

      {/* ── Main body ── */}
      <rect x={12} y={10} width={76} height={42} rx={8} fill={dark} />
      {/* Top inner highlight */}
      <rect x={14} y={11} width={72} height={3} rx={1.5} fill="rgba(255,255,255,0.12)" />
      {/* Left inner highlight */}
      <rect x={13} y={12} width={3} height={38} rx={1.5} fill="rgba(255,255,255,0.06)" />

      {/* ── Left grip ── */}
      <rect x={12} y={40} width={26} height={28} rx={12} fill={dark} style={{ filter: "brightness(0.88)" }} />
      {/* Left grip highlight */}
      <rect x={14} y={42} width={10} height={20} rx={5} fill="rgba(255,255,255,0.06)" />

      {/* ── Right grip ── */}
      <rect x={62} y={40} width={26} height={28} rx={12} fill={dark} style={{ filter: "brightness(0.88)" }} />
      {/* Right grip highlight */}
      <rect x={64} y={42} width={10} height={20} rx={5} fill="rgba(255,255,255,0.06)" />

      {/* ── Body bottom connector (between grips) ── */}
      <rect x={36} y={46} width={28} height={10} rx={4} fill={dark} style={{ filter: "brightness(0.95)" }} />

      {/* ── D-Pad (left side) — proper cross shape ── */}
      {/* Horizontal bar */}
      <rect x={18} y={22} width={22} height={8} rx={2} fill={dark} style={{ filter: "brightness(0.55)" }} />
      {/* Vertical bar */}
      <rect x={25} y={15} width={8}  height={22} rx={2} fill={dark} style={{ filter: "brightness(0.55)" }} />
      {/* D-pad center (cross center piece) */}
      <rect x={25} y={22} width={8} height={8} rx={1} fill={dark} style={{ filter: "brightness(0.62)" }} />
      {/* D-pad surface highlight */}
      <rect x={19} y={23} width={20} height={3} rx={1} fill="rgba(255,255,255,0.07)" />
      <rect x={26} y={16} width={3}  height={20} rx={1} fill="rgba(255,255,255,0.05)" />

      {/* ── Left analog stick (LEGO stud style) ── */}
      <rect    x={34}  y={24} width={14} height={9}   rx={2.5} fill={dark} style={{ filter: "brightness(0.65)" }} />
      <ellipse cx={41} cy={24} rx={7}   ry={2.8}               fill={dark} style={{ filter: "brightness(1.35)" }} />
      <ellipse cx={39.5} cy={22.5} rx={3} ry={1.3}             fill="rgba(255,255,255,0.48)" />

      {/* ── Right analog stick (LEGO stud style) ── */}
      <rect    x={54}  y={32} width={14} height={9}   rx={2.5} fill={dark} style={{ filter: "brightness(0.65)" }} />
      <ellipse cx={61} cy={32} rx={7}   ry={2.8}               fill={dark} style={{ filter: "brightness(1.35)" }} />
      <ellipse cx={59.5} cy={30.5} rx={3} ry={1.3}             fill="rgba(255,255,255,0.48)" />

      {/* ── ABXY face buttons (right side) ── */}
      {/* Y - top */}
      <circle cx={72} cy={18} r={5.5} fill="#F0B429" />
      <circle cx={72} cy={18} r={3}   fill="#D9A020" />
      <text x={72} y={21.5} fontSize="5" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontWeight="bold">Y</text>
      {/* B - right */}
      <circle cx={82} cy={26} r={5.5} fill="#E05520" />
      <circle cx={82} cy={26} r={3}   fill="#C63E0F" />
      <text x={82} y={29.5} fontSize="5" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontWeight="bold">B</text>
      {/* A - bottom */}
      <circle cx={72} cy={34} r={5.5} fill="#4CAF50" />
      <circle cx={72} cy={34} r={3}   fill="#388E3C" />
      <text x={72} y={37.5} fontSize="5" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontWeight="bold">A</text>
      {/* X - left */}
      <circle cx={62} cy={26} r={5.5} fill="#7A9CB3" />
      <circle cx={62} cy={26} r={3}   fill="#5A7C93" />
      <text x={62} y={29.5} fontSize="5" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontWeight="bold">X</text>

      {/* ── Center / menu buttons ── */}
      <rect x={41} y={18} width={7} height={5} rx={2} fill={dark} style={{ filter: "brightness(0.58)" }} />
      <rect x={52} y={18} width={7} height={5} rx={2} fill={dark} style={{ filter: "brightness(0.58)" }} />
      {/* Home button */}
      <circle cx={50} cy={30} r={5.5} fill={dark} style={{ filter: "brightness(0.72)" }} />
      <circle cx={50} cy={30} r={3.5} fill={dark} style={{ filter: "brightness(1.18)" }} />
      <circle cx={50} cy={30} r={2}   fill={dark} style={{ filter: "brightness(0.85)" }} />

      {/* ── Shoulder bumpers (LB / RB) ── */}
      <rect x={12} y={6}  width={28} height={7} rx={3.5} fill={dark} style={{ filter: "brightness(0.82)" }} />
      <rect x={60} y={6}  width={28} height={7} rx={3.5} fill={dark} style={{ filter: "brightness(0.82)" }} />
      {/* Shoulder highlight */}
      <rect x={14} y={7}  width={24} height={2.5} rx={1.2} fill="rgba(255,255,255,0.10)" />
      <rect x={62} y={7}  width={24} height={2.5} rx={1.2} fill="rgba(255,255,255,0.10)" />

      {/* ── Ground shadow ── */}
      <ellipse cx={50} cy={68} rx={38} ry={3.5} fill="rgba(0,0,0,0.08)" />
    </svg>
  );

  if (!animated) return <div style={{ display: "inline-block" }}>{ctrl}</div>;

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {ctrl}
    </motion.div>
  );
}
