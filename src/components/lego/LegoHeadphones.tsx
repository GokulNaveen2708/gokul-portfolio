"use client";

import { motion } from "framer-motion";

interface LegoHeadphonesProps {
  size?: number;
  color?: string;
}

export function LegoHeadphones({ size = 1, color = "#7A9CB3" }: LegoHeadphonesProps) {
  const W = 80;
  const H = 90;
  const cushion = "#FDFCFA";
  const band    = color;

  return (
    <motion.div
      animate={{ rotate: [-3, 3, -3], y: [0, -3, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block", transformOrigin: "center top" }}
    >
      <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} overflow="visible" style={{ display: "block" }}>

        {/* ── Headband arc ── */}
        <path
          d="M 12,62 Q 10,8 40,4 Q 70,8 68,62"
          stroke={band} strokeWidth={8} fill="none" strokeLinecap="round"
        />
        {/* Band highlight */}
        <path
          d="M 12,62 Q 10,8 40,4 Q 70,8 68,62"
          stroke="rgba(255,255,255,0.18)" strokeWidth={2.5} fill="none" strokeLinecap="round"
        />
        {/* Band depth shadow */}
        <path
          d="M 16,62 Q 14,10 40,6 Q 66,10 64,62"
          stroke="rgba(0,0,0,0.15)" strokeWidth={2} fill="none" strokeLinecap="round"
        />

        {/* ── Left ear cup ── */}
        {/* Isometric top face */}
        <polygon points="2,52 24,52 30,56 8,56" fill={band} style={{ filter: "brightness(1.28)" }} />
        {/* Isometric right face */}
        <polygon points="24,52 30,56 30,78 24,74" fill={band} style={{ filter: "brightness(0.52)" }} />
        {/* Cup body */}
        <rect x={2} y={52} width={22} height={26} rx={9} fill={band} />
        {/* Inner highlight */}
        <rect x={4} y={54} width={8} height={16} rx={4} fill="rgba(255,255,255,0.07)" />
        {/* Cushion oval */}
        <ellipse cx={13} cy={65} rx={8} ry={10} fill={cushion} opacity={0.88} />
        <ellipse cx={11.5} cy={62} rx={3.5} ry={4.5} fill="rgba(255,255,255,0.22)" />
        {/* Driver detail */}
        <circle cx={13} cy={65} r={4.5} fill={band} style={{ filter: "brightness(0.72)" }} />
        <circle cx={13} cy={65} r={2.5} fill={band} style={{ filter: "brightness(1.10)" }} />

        {/* ── Right ear cup ── */}
        {/* Isometric top face */}
        <polygon points="56,52 78,52 84,56 62,56" fill={band} style={{ filter: "brightness(1.28)" }} />
        {/* Isometric right face */}
        <polygon points="78,52 84,56 84,78 78,74" fill={band} style={{ filter: "brightness(0.52)" }} />
        {/* Cup body */}
        <rect x={56} y={52} width={22} height={26} rx={9} fill={band} />
        {/* Inner highlight */}
        <rect x={58} y={54} width={8} height={16} rx={4} fill="rgba(255,255,255,0.07)" />
        {/* Cushion oval */}
        <ellipse cx={67} cy={65} rx={8} ry={10} fill={cushion} opacity={0.88} />
        <ellipse cx={65.5} cy={62} rx={3.5} ry={4.5} fill="rgba(255,255,255,0.22)" />
        {/* Driver detail */}
        <circle cx={67} cy={65} r={4.5} fill={band} style={{ filter: "brightness(0.72)" }} />
        <circle cx={67} cy={65} r={2.5} fill={band} style={{ filter: "brightness(1.10)" }} />

        {/* ── LEGO studs on ear cups ── */}
        <rect    x={7}   y={46} width={12} height={8}   rx={2}   fill={band} style={{ filter: "brightness(0.68)" }} />
        <ellipse cx={13} cy={46} rx={6}    ry={2.5}              fill={band} style={{ filter: "brightness(1.35)" }} />
        <ellipse cx={11.5} cy={44.5} rx={2.5} ry={1.1}           fill="rgba(255,255,255,0.50)" />

        <rect    x={61}  y={46} width={12} height={8}   rx={2}   fill={band} style={{ filter: "brightness(0.68)" }} />
        <ellipse cx={67} cy={46} rx={6}    ry={2.5}              fill={band} style={{ filter: "brightness(1.35)" }} />
        <ellipse cx={65.5} cy={44.5} rx={2.5} ry={1.1}           fill="rgba(255,255,255,0.50)" />

        {/* ── Cable dangling from left cup ── */}
        <path
          d="M 13,78 Q 8,88 12,96 Q 16,104 10,112"
          stroke={band} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.65}
        />
        {/* 3.5mm jack */}
        <rect x={7} y={110} width={7} height={12} rx={3.5} fill="#888" opacity={0.75} />
        <rect x={9} y={110} width={3} height={3}  rx={1}   fill="#aaa" opacity={0.5} />
      </svg>
    </motion.div>
  );
}
