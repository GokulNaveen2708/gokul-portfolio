"use client";
import { motion } from "framer-motion";

export function LegoPostbox({ size = 1 }: { size?: number }) {
  const W = 44;
  const H = 70;
  const body  = "#AD7556";
  const dark  = "#7A4830";
  const light = "#C8956A";

  return (
    <div style={{ display: "inline-block", position: "relative", width: W * size, height: H * size }}>
      <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} overflow="visible">
        {/* Base slab */}
        <rect x={5} y={58} width={34} height={10} rx={2} fill={dark} />
        {/* Base top face */}
        <polygon points="5,58 39,58 43,54 1,54" fill={body} style={{ filter: "brightness(1.1)" }} />

        {/* Body right face */}
        <polygon points="35,14 43,18 43,58 35,58" fill={dark} />
        {/* Body front face */}
        <rect x={5} y={14} width={30} height={44} rx={0} fill={body} />

        {/* Dome right face */}
        <polygon points="35,8 43,12 43,18 35,14" fill={dark} />
        {/* Dome top face */}
        <ellipse cx={20} cy={8} rx={15} ry={6} fill={body} style={{ filter: "brightness(1.18)" }} />
        {/* Dome front */}
        <rect x={5} y={8} width={30} height={8} fill={body} style={{ filter: "brightness(1.08)" }} />

        {/* LEGO stud on dome */}
        <rect x={13} y={1} width={14} height={8} rx={2} fill={body} style={{ filter: "brightness(0.82)" }} />
        <ellipse cx={20} cy={1} rx={7} ry={2.8} fill={body} style={{ filter: "brightness(1.38)" }} />
        <ellipse cx={18} cy={0} rx={3} ry={1.3} fill="rgba(255,255,255,0.45)" />

        {/* Mail slot */}
        <rect x={10} y={28} width={20} height={3.5} rx={1.5} fill={dark} />
        <rect x={10} y={30} width={20} height={1} fill="rgba(0,0,0,0.35)" />

        {/* Circular emblem */}
        <circle cx={20} cy={44} r={6} fill={dark} />
        <circle cx={20} cy={44} r={4.5} fill={light} />
        <circle cx={20} cy={44} r={2} fill={dark} />

        {/* Front highlight */}
        <rect x={5} y={14} width={2.5} height={44} fill="rgba(255,255,255,0.10)" />
        {/* Right shadow */}
        <rect x={32} y={14} width={3} height={44} fill="rgba(0,0,0,0.12)" />

        {/* Bottom stud strip */}
        {[13, 21, 29].map(cx => (
          <g key={cx}>
            <rect x={cx - 4} y={54} width={8} height={4} rx={1} fill={body} style={{ filter: "brightness(0.82)" }} />
            <ellipse cx={cx} cy={54} rx={4} ry={1.6} fill={body} style={{ filter: "brightness(1.3)" }} />
          </g>
        ))}
      </svg>

      {/* Animated flag */}
      <motion.div
        animate={{ rotate: [0, -20, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        style={{
          position: "absolute",
          top: 12 * size,
          right: -10 * size,
          transformOrigin: "left bottom",
        }}
      >
        <svg width={18 * size} height={12 * size} viewBox="0 0 18 12">
          <rect x={0} y={0} width={2} height={12} rx={1} fill={dark} />
          <path d="M2 1 L16 4.5 L2 8 Z" fill="#DCCFB8" />
        </svg>
      </motion.div>
    </div>
  );
}
