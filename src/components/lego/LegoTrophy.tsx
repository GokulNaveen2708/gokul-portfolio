"use client";

import { motion } from "framer-motion";

interface LegoTrophyProps {
  color?: string;
  size?: number;
  animated?: boolean;
}

export function LegoTrophy({ color = "#FFD700", size = 1, animated = true }: LegoTrophyProps) {
  const dark = "rgba(0,0,0,0.28)";
  const bright = { filter: "brightness(1.2)" } as React.CSSProperties;
  const dim   = { filter: "brightness(0.78)" } as React.CSSProperties;

  const content = (
    <svg width={130 * size} height={168 * size} viewBox="0 0 130 168" overflow="visible" style={{ display: "block" }}>
      {/* Star topper */}
      <motion.text
        x={65} y={16}
        textAnchor="middle"
        fontSize={22}
        fill="#FFE55C"
        animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "65px 10px" }}
      >
        ★
      </motion.text>

      {/* Handles */}
      <path d="M 30,30 Q 8,30 8,50 Q 8,70 30,70" stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" style={dim} />
      <path d="M 30,30 Q 10,30 10,50 Q 10,70 30,70" stroke="rgba(255,255,255,0.12)" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M 100,30 Q 122,30 122,50 Q 122,70 100,70" stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" style={dim} />

      {/* Cup body — right side face */}
      <polygon points="96,18 106,24 92,82 82,76" fill={dark} />

      {/* Cup body — front face (trapezoid) */}
      <polygon points="30,18 96,18 82,76 44,76" fill={color} />

      {/* Cup body — top face */}
      <polygon points="24,15 102,15 96,18 30,18" fill={color} style={bright} />

      {/* Rim lip */}
      <rect x={24} y={12} width={78} height={7} rx={2} fill={color} style={bright} />
      <rect x={26} y={12} width={76} height={2} rx={1} fill="rgba(255,255,255,0.28)" />

      {/* Inside cup */}
      <polygon points="32,22 92,22 84,28 40,28" fill="rgba(0,0,0,0.22)" />

      {/* Stem — front */}
      <rect x={51} y={76} width={18} height={36} fill={color} style={dim} />
      {/* Stem — right face */}
      <polygon points="69,76 77,80 77,116 69,112" fill={dark} />
      {/* Stem — top face */}
      <polygon points="51,76 69,76 77,80 59,80" fill={color} style={bright} />

      {/* Base plate — top face */}
      <polygon points="14,116 106,116 114,122 22,122" fill={color} style={bright} />
      {/* Base plate — front face */}
      <rect x={14} y={122} width={92} height={22} rx={2} fill={color} />
      {/* Base plate — right face */}
      <polygon points="106,122 114,116 114,138 106,144" fill={dark} />
      {/* Base plate — bottom */}
      <polygon points="14,144 106,144 114,138 22,138" fill={dark} style={dim} />

      {/* Studs on base */}
      {[35, 65, 95].map((cx) => (
        <g key={cx}>
          <rect x={cx - 7} y={114} width={14} height={9} rx={2} fill={color} style={dim} />
          <ellipse cx={cx} cy={114} rx={7} ry={3} fill={color} style={bright} />
          <ellipse cx={cx - 2} cy={112.5} rx={3} ry={1.3} fill="rgba(255,255,255,0.38)" />
        </g>
      ))}

      {/* Bottom highlight */}
      <rect x={16} y={123} width={50} height={2} rx={1} fill="rgba(255,255,255,0.14)" />
    </svg>
  );

  if (!animated) return content;
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {content}
    </motion.div>
  );
}
