"use client";

import { motion } from "framer-motion";

interface LegoSittingCatProps {
  size?: number;
  color?: string;
}

export function LegoSittingCat({ size = 1, color = "#F0A030" }: LegoSittingCatProps) {
  const W = 72;
  const H = 98;
  const belly  = "#FEE8B0";
  const dark   = "#B87018";
  const pink   = "#F9A0A0";
  const eyeCol = "#7A9CB3";

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} overflow="visible" style={{ display: "block" }}>

        {/* ── LEGO stud on head ── */}
        <rect  x={30} y={6}  width={12} height={8}  rx={2}   fill={color} style={{ filter: "brightness(0.70)" }} />
        <ellipse cx={36} cy={6} rx={6}  ry={2.6}             fill={color} style={{ filter: "brightness(1.35)" }} />
        <ellipse cx={34} cy={4.5} rx={2.5} ry={1.1}          fill="rgba(255,255,255,0.50)" />

        {/* ── Ears ── */}
        <polygon points="14,22 20,6  30,20"  fill={color} />
        <polygon points="16,22 21,10 28,20"  fill={pink}  opacity={0.75} />
        <polygon points="42,20 52,6  58,22"  fill={color} />
        <polygon points="44,20 51,10 56,22"  fill={pink}  opacity={0.75} />

        {/* ── Head ── */}
        <rect x={12} y={16} width={48} height={38} rx={20} fill={color} />
        {/* forehead highlight */}
        <ellipse cx={28} cy={22} rx={8} ry={4} fill="rgba(255,255,255,0.12)" />

        {/* ── Tabby forehead stripes ── */}
        <path d="M 30,17 Q 36,14 42,17" stroke={dark} strokeWidth={1.5} fill="none" opacity={0.35} />
        <path d="M 28,20 Q 36,16 44,20" stroke={dark} strokeWidth={1.2} fill="none" opacity={0.25} />
        <path d="M 29,23 Q 36,19 43,23" stroke={dark} strokeWidth={1.0} fill="none" opacity={0.20} />

        {/* ── Belly patch on face ── */}
        <ellipse cx={36} cy={40} rx={13} ry={8} fill={belly} opacity={0.55} />

        {/* ── Eyes ── */}
        <ellipse cx={24} cy={30} rx={5}   ry={5.5} fill={eyeCol} />
        <ellipse cx={48} cy={30} rx={5}   ry={5.5} fill={eyeCol} />
        {/* pupils */}
        <ellipse cx={24} cy={31} rx={2.5} ry={3.8} fill="#111" />
        <ellipse cx={48} cy={31} rx={2.5} ry={3.8} fill="#111" />
        {/* eye glare */}
        <ellipse cx={22} cy={28} rx={1.5} ry={1.2} fill="white" opacity={0.9} />
        <ellipse cx={46} cy={28} rx={1.5} ry={1.2} fill="white" opacity={0.9} />

        {/* ── Nose ── */}
        <polygon points="34,40 38,40 36,43" fill={pink} />
        {/* mouth */}
        <path d="M 33,43 Q 36,47 39,43" stroke={dark} strokeWidth={1.2} fill="none" strokeLinecap="round" />

        {/* ── Whiskers ── */}
        <line x1={4}  y1={37} x2={20} y2={39} stroke={dark} strokeWidth={1}   opacity={0.4} />
        <line x1={4}  y1={41} x2={20} y2={41} stroke={dark} strokeWidth={1}   opacity={0.4} />
        <line x1={4}  y1={45} x2={20} y2={43} stroke={dark} strokeWidth={1}   opacity={0.4} />
        <line x1={52} y1={39} x2={68} y2={37} stroke={dark} strokeWidth={1}   opacity={0.4} />
        <line x1={52} y1={41} x2={68} y2={41} stroke={dark} strokeWidth={1}   opacity={0.4} />
        <line x1={52} y1={43} x2={68} y2={45} stroke={dark} strokeWidth={1}   opacity={0.4} />

        {/* ── Body ── */}
        <ellipse cx={36} cy={76} rx={26} ry={20} fill={color} />
        {/* belly patch */}
        <ellipse cx={36} cy={78} rx={14} ry={12} fill={belly} opacity={0.50} />
        {/* tabby body stripes */}
        <path d="M 14,68 Q 20,63 27,68" stroke={dark} strokeWidth={1.8} fill="none" opacity={0.30} />
        <path d="M 45,68 Q 52,63 58,68" stroke={dark} strokeWidth={1.8} fill="none" opacity={0.30} />
        <path d="M 16,76 Q 22,71 28,75" stroke={dark} strokeWidth={1.2} fill="none" opacity={0.20} />
        <path d="M 44,75 Q 50,71 56,76" stroke={dark} strokeWidth={1.2} fill="none" opacity={0.20} />

        {/* ── Tail (curls around right side) ── */}
        <path
          d="M 60,80 Q 74,68 70,54 Q 66,42 58,46"
          stroke={color} strokeWidth={8} fill="none" strokeLinecap="round"
        />
        <path
          d="M 60,80 Q 74,68 70,54 Q 66,42 58,46"
          stroke={dark} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.20}
        />
        {/* tail tip */}
        <circle cx={58} cy={46} r={5} fill={belly} opacity={0.65} />

        {/* ── Front paws ── */}
        <rect x={18} y={88} width={14} height={8} rx={5} fill={color} />
        <rect x={40} y={88} width={14} height={8} rx={5} fill={color} />
        {/* toe lines */}
        <line x1={23} y1={89} x2={23} y2={95} stroke={dark} strokeWidth={0.8} opacity={0.35} />
        <line x1={27} y1={89} x2={27} y2={95} stroke={dark} strokeWidth={0.8} opacity={0.35} />
        <line x1={45} y1={89} x2={45} y2={95} stroke={dark} strokeWidth={0.8} opacity={0.35} />
        <line x1={49} y1={89} x2={49} y2={95} stroke={dark} strokeWidth={0.8} opacity={0.35} />

        {/* ── Ground shadow ── */}
        <ellipse cx={36} cy={98} rx={24} ry={3.5} fill="rgba(0,0,0,0.08)" />
      </svg>
    </motion.div>
  );
}
