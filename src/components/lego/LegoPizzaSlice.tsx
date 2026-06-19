"use client";

import { motion } from "framer-motion";

interface LegoPizzaSliceProps {
  size?: number;
  animated?: boolean;
}

export function LegoPizzaSlice({ size = 1, animated = true }: LegoPizzaSliceProps) {
  const W = 88;
  const H = 82;

  const sauce  = "#e05520";
  const cheese = "#f5c842";
  const crust  = "#DCCFB8";
  const pep    = "#c0392b";
  const dark   = "rgba(0,0,0,0.28)";

  const slice = (
    <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} overflow="visible" style={{ display: "block" }}>

      {/* ── Isometric depth — underside ── */}
      <polygon points="6,10 6,72 0,76 0,14" fill={crust} style={{ filter: "brightness(0.60)" }} />

      {/* ── Crust (left edge) ── */}
      <rect x={4} y={6} width={10} height={70} rx={4} fill={crust} />
      {/* crust top face */}
      <polygon points="4,6 14,6 8,2 0,2" fill={crust} style={{ filter: "brightness(1.25)" }} />
      {/* crust highlight */}
      <rect x={5} y={7} width={8} height={3} rx={1.5} fill="rgba(255,255,255,0.22)" />
      {/* crust burn spots */}
      <ellipse cx={8}  cy={18} rx={2.5} ry={1.8} fill={crust} style={{ filter: "brightness(0.72)" }} opacity={0.6} />
      <ellipse cx={9}  cy={42} rx={2}   ry={1.5} fill={crust} style={{ filter: "brightness(0.72)" }} opacity={0.6} />
      <ellipse cx={8}  cy={62} rx={2.5} ry={1.8} fill={crust} style={{ filter: "brightness(0.72)" }} opacity={0.6} />

      {/* ── Crust studs ── */}
      {[20, 41, 62].map(y => (
        <g key={y}>
          <rect   x={5}  y={y - 6} width={8} height={6}   rx={1.5} fill={crust} style={{ filter: "brightness(0.72)" }} />
          <ellipse cx={9} cy={y - 6} rx={4}  ry={1.8}              fill={crust} style={{ filter: "brightness(1.30)" }} />
          <ellipse cx={8} cy={y - 7.5} rx={1.8} ry={0.8}           fill="rgba(255,255,255,0.45)" />
        </g>
      ))}

      {/* ── Sauce face (main triangle) ── */}
      <polygon points="80,40 14,8 14,72" fill={sauce} />
      {/* sauce depth — thin bottom edge */}
      <polygon points="80,40 80,44 14,76 14,72" fill={sauce} style={{ filter: "brightness(0.60)" }} />

      {/* ── Cheese layer ── */}
      <polygon points="80,40 16,10 16,70" fill={cheese} opacity={0.82} />
      {/* cheese edge drips */}
      <ellipse cx={28} cy={14} rx={5}   ry={3.5} fill={cheese} opacity={0.75} />
      <ellipse cx={22} cy={62} rx={4.5} ry={3}   fill={cheese} opacity={0.75} />
      <ellipse cx={55} cy={28} rx={4}   ry={3}   fill={cheese} opacity={0.65} />

      {/* ── Pepperoni ── */}
      <circle cx={32} cy={30} r={7}   fill={pep} />
      <circle cx={31} cy={29} r={4}   fill={pep} style={{ filter: "brightness(0.80)" }} />
      <circle cx={30} cy={28} r={1.5} fill="rgba(255,255,255,0.12)" />

      <circle cx={28} cy={55} r={7}   fill={pep} />
      <circle cx={27} cy={54} r={4}   fill={pep} style={{ filter: "brightness(0.80)" }} />
      <circle cx={26} cy={53} r={1.5} fill="rgba(255,255,255,0.12)" />

      <circle cx={54} cy={38} r={6.5} fill={pep} />
      <circle cx={53} cy={37} r={3.5} fill={pep} style={{ filter: "brightness(0.80)" }} />
      <circle cx={52} cy={36} r={1.5} fill="rgba(255,255,255,0.12)" />

      {/* ── Herb dots (basil/oregano) ── */}
      <circle cx={44} cy={24} r={2} fill="#5a8a3a" opacity={0.7} />
      <circle cx={40} cy={56} r={2} fill="#5a8a3a" opacity={0.7} />
      <circle cx={62} cy={42} r={1.5} fill="#5a8a3a" opacity={0.6} />

      {/* ── Cheese bubble highlights ── */}
      <ellipse cx={38} cy={44} rx={3.5} ry={2.5} fill="rgba(255,255,255,0.22)" />
      <ellipse cx={50} cy={52} rx={3}   ry={2}   fill="rgba(255,255,255,0.18)" />

      {/* ── Tip shadow ── */}
      <ellipse cx={82} cy={42} rx={4} ry={3} fill={dark} opacity={0.4} />

      {/* ── Ground shadow ── */}
      <ellipse cx={44} cy={80} rx={30} ry={3} fill="rgba(0,0,0,0.10)" />
    </svg>
  );

  if (!animated) return <div style={{ display: "inline-block" }}>{slice}</div>;

  return (
    <motion.div
      animate={{ y: [0, -5, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {slice}
    </motion.div>
  );
}
