"use client";

import { motion } from "framer-motion";

function SteamWisp({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.path
      d={`M ${x},38 Q ${x - 5},28 ${x},18 Q ${x + 5},8 ${x},0`}
      stroke="rgba(160,160,160,0.55)"
      strokeWidth={2.5}
      strokeLinecap="round"
      fill="none"
      animate={{ opacity: [0, 0.65, 0], y: [0, -6] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

function Stud({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 6} y={cy - 5} width={12} height={7} rx={2} fill="var(--stud-color)" style={{ filter: "brightness(0.82)" }} />
      <ellipse cx={cx} cy={cy - 5} rx={6} ry={2.5} fill="var(--stud-color)" style={{ filter: "brightness(1.28)" }} />
      <ellipse cx={cx - 1.5} cy={cy - 6.5} rx={2.5} ry={1.1} fill="rgba(255,255,255,0.38)" />
    </g>
  );
}

interface LegoCoffeeMugProps {
  color?: string;
  size?: number;
  animated?: boolean;
}

export function LegoCoffeeMug({ color = "#AD7556", size = 1, animated = true }: LegoCoffeeMugProps) {
  const dark = "rgba(0,0,0,0.28)";

  const content = (
    <svg
      width={105 * size}
      height={132 * size}
      viewBox="0 0 105 132"
      overflow="visible"
      style={{ display: "block", ["--stud-color" as string]: color }}
    >
      {/* Steam */}
      <SteamWisp x={22} delay={0} />
      <SteamWisp x={38} delay={0.7} />
      <SteamWisp x={54} delay={1.4} />

      {/* Coffee surface inside */}
      <ellipse cx={38} cy={46} rx={28} ry={5} fill="#3a1a06" />
      <ellipse cx={32} cy={44} rx={8} ry={2} fill="rgba(255,255,255,0.06)" />

      {/* Rim — top face (isometric) */}
      <polygon points="8,46 68,46 76,52 0,52" fill={color} style={{ filter: "brightness(1.18)" }} />

      {/* Rim — front face */}
      <rect x={0} y={52} width={68} height={9} rx={2} fill={color} style={{ filter: "brightness(1.06)" }} />

      {/* Mug right-side face (depth) */}
      <polygon points="68,52 76,46 76,114 68,120" fill={dark} />

      {/* Mug front face */}
      <rect x={0} y={61} width={68} height={59} rx={3} fill={color} />

      {/* Front face highlight */}
      <rect x={2} y={62} width={40} height={2} rx={1} fill="rgba(255,255,255,0.16)" />

      {/* Handle — outer arc */}
      <path
        d="M 68,72 Q 92,72 92,90 Q 92,108 68,108 L 68,100 Q 84,100 84,90 Q 84,80 68,80 Z"
        fill={color}
        style={{ filter: "brightness(0.78)" }}
      />
      <path
        d="M 70,75 Q 88,75 88,90 Q 88,105 70,105"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={2}
        fill="none"
      />

      {/* Studs on front face */}
      <Stud cx={18} cy={69} />
      <Stud cx={52} cy={69} />

      {/* Bottom plate — top face */}
      <polygon points="0,120 68,120 76,114 8,114" fill={color} style={{ filter: "brightness(1.1)" }} />
      {/* Bottom plate — front face */}
      <rect x={0} y={120} width={68} height={12} rx={2} fill={color} style={{ filter: "brightness(0.88)" }} />
      {/* Bottom plate — right face */}
      <polygon points="68,120 76,114 76,126 68,132" fill={dark} />
    </svg>
  );

  if (!animated) return content;
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {content}
    </motion.div>
  );
}
