"use client";

import { motion } from "framer-motion";

/* Shared wheel — same style as LegoCar */
function TrainWheel({ cx, cy, r = 16 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r}     fill="#1a1a1a" />
      <circle cx={cx} cy={cy} r={r - 4} fill="#2a2a2a" />
      <circle cx={cx} cy={cy} r={r - 8} fill="#c8c8c8" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const a = (deg * Math.PI) / 180;
        const round = (n: number) => Math.round(n * 1e4) / 1e4;
        return (
          <line
            key={deg}
            x1={round(cx + Math.cos(a) * (r - 12))} y1={round(cy + Math.sin(a) * (r - 12))}
            x2={round(cx + Math.cos(a) * (r - 8))}  y2={round(cy + Math.sin(a) * (r - 8))}
            stroke="#888" strokeWidth={2.5} strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={3} fill="#777" />
    </g>
  );
}

/* Stud row helper */
function TrainStuds({ count, x, y, color }: { count: number; x: number; y: number; color: string }) {
  const step = 20;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const cx = x + i * step + 10;
        return (
          <g key={i}>
            <rect x={cx - 6} y={y - 5} width={12} height={7} rx={2} fill={color} style={{ filter: "brightness(0.82)" }} />
            <ellipse cx={cx} cy={y - 5} rx={6} ry={2.5} fill={color} style={{ filter: "brightness(1.28)" }} />
            <ellipse cx={cx - 1.5} cy={y - 6.5} rx={2.5} ry={1.1} fill="rgba(255,255,255,0.36)" />
          </g>
        );
      })}
    </>
  );
}

function TrainSVG({ bodyColor, accentColor }: { bodyColor: string; accentColor: string }) {
  const dark = "rgba(0,0,0,0.30)";
  const ground = 100;   // y coordinate of ground / bottom of wheels
  const wheelR = 16;
  const wheelY = ground - wheelR;       // wheel center y = 84
  const bodyBot = wheelY + 4;           // body bottom sits at axle level = 88
  const bodyTop = bodyBot - 52;         // engine body top = 36

  return (
    <svg width={460} height={118} viewBox="0 0 460 118" overflow="visible" style={{ display: "block" }}>

      {/* ══ ENGINE (x: 0–180) ══ */}

      {/* Axle bar */}
      <rect x={20} y={wheelY + 4} width={155} height={5} rx={2} fill="#444" />

      {/* Boiler body — right face */}
      <polygon points={`165,${bodyTop} 178,${bodyTop + 8} 178,${bodyBot} 165,${bodyBot}`} fill={dark} />
      {/* Boiler body — top face */}
      <polygon points={`20,${bodyTop} 165,${bodyTop} 178,${bodyTop + 8} 33,${bodyTop + 8}`} fill={bodyColor} style={{ filter: "brightness(1.12)" }} />
      {/* Boiler body — front face */}
      <rect x={20} y={bodyTop} width={145} height={bodyBot - bodyTop} rx={3} fill={bodyColor} />
      <rect x={22} y={bodyTop + 1} width={80} height={2} rx={1} fill="rgba(255,255,255,0.15)" />

      {/* Cab — right face */}
      <polygon points={`178,${bodyTop - 18} 192,${bodyTop - 10} 192,${bodyBot} 178,${bodyBot}`} fill={dark} />
      {/* Cab — top face */}
      <polygon points={`110,${bodyTop - 18} 178,${bodyTop - 18} 192,${bodyTop - 10} 124,${bodyTop - 10}`} fill={accentColor} style={{ filter: "brightness(1.15)" }} />
      {/* Cab — front face */}
      <rect x={110} y={bodyTop - 18} width={68} height={bodyBot - (bodyTop - 18)} rx={2} fill={accentColor} />
      {/* Cab windows */}
      <rect x={118} y={bodyTop - 12} width={18} height={16} rx={2} fill="rgba(140,200,255,0.75)" />
      <rect x={119} y={bodyTop - 11} width={8} height={5} rx={1} fill="rgba(255,255,255,0.35)" />
      <rect x={144} y={bodyTop - 12} width={18} height={16} rx={2} fill="rgba(140,200,255,0.75)" />
      <rect x={145} y={bodyTop - 11} width={8} height={5} rx={1} fill="rgba(255,255,255,0.35)" />

      {/* Smokestacks */}
      {[38, 68].map((sx) => (
        <g key={sx}>
          <rect x={sx} y={bodyTop - 20} width={14} height={22} rx={3} fill={bodyColor} style={{ filter: "brightness(0.88)" }} />
          <rect x={sx - 2} y={bodyTop - 24} width={18} height={7} rx={2} fill={bodyColor} style={{ filter: "brightness(0.82)" }} />
          <ellipse cx={sx + 7} cy={bodyTop - 24} rx={9} ry={3} fill={bodyColor} style={{ filter: "brightness(1.1)" }} />
        </g>
      ))}

      {/* Cowcatcher */}
      <polygon points={`0,${ground} 20,${bodyTop + 20} 20,${ground}`} fill={bodyColor} style={{ filter: "brightness(0.75)" }} />
      <polygon points={`2,${ground} 20,${bodyTop + 22} 20,${ground}`} fill="rgba(255,255,255,0.08)" />

      {/* Headlight */}
      <rect x={16} y={bodyTop + 14} width={10} height={7} rx={2} fill="#ffe87c" />
      <rect x={17} y={bodyTop + 15} width={8} height={5} rx={1.5} fill="rgba(255,255,255,0.55)" />

      {/* Stripe detail */}
      <rect x={20} y={bodyTop + 28} width={90} height={4} rx={2} fill={accentColor} style={{ filter: "brightness(0.9)" }} />

      {/* Engine studs on cab roof */}
      <TrainStuds count={3} x={110} y={bodyTop - 18} color={accentColor} />

      {/* Engine wheels */}
      <TrainWheel cx={45}  cy={wheelY} r={wheelR} />
      <TrainWheel cx={95}  cy={wheelY} r={wheelR} />
      <TrainWheel cx={148} cy={wheelY} r={wheelR} />

      {/* ══ COUPLER ══ */}
      <rect x={192} y={62} width={22} height={8} rx={3} fill="#666" />
      <rect x={198} y={64} width={10} height={4} rx={2} fill="#888" />

      {/* ══ PASSENGER CAR (x: 214–440) ══ */}

      {/* Axle bar */}
      <rect x={224} y={wheelY + 4} width={206} height={5} rx={2} fill="#444" />

      {/* Car body — right face */}
      <polygon points={`430,${bodyTop + 6} 444,${bodyTop + 14} 444,${bodyBot} 430,${bodyBot}`} fill={dark} />
      {/* Car body — top face */}
      <polygon points={`214,${bodyTop + 6} 430,${bodyTop + 6} 444,${bodyTop + 14} 228,${bodyTop + 14}`} fill={bodyColor} style={{ filter: "brightness(1.1)" }} />
      {/* Car body — front face */}
      <rect x={214} y={bodyTop + 6} width={216} height={bodyBot - (bodyTop + 6)} rx={3} fill={bodyColor} />
      <rect x={216} y={bodyTop + 7} width={100} height={2} rx={1} fill="rgba(255,255,255,0.13)" />

      {/* Car windows (4) */}
      {[228, 274, 320, 366].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={bodyTop + 14} width={30} height={20} rx={3} fill="rgba(140,200,255,0.72)" />
          <rect x={wx + 2} y={bodyTop + 16} width={12} height={6} rx={1.5} fill="rgba(255,255,255,0.32)" />
        </g>
      ))}

      {/* Stripe detail */}
      <rect x={214} y={bodyTop + 38} width={216} height={4} rx={2} fill={accentColor} style={{ filter: "brightness(0.9)" }} />

      {/* Car roof studs */}
      <TrainStuds count={8} x={214} y={bodyTop + 6} color={bodyColor} />

      {/* Car wheels */}
      <TrainWheel cx={248} cy={wheelY} r={wheelR} />
      <TrainWheel cx={418} cy={wheelY} r={wheelR} />

      {/* ══ GROUND SHADOW ══ */}
      <ellipse cx={220} cy={106} rx={210} ry={5} fill="rgba(0,0,0,0.10)" />
    </svg>
  );
}

interface LegoTrainProps {
  direction?: "ltr" | "rtl";
  duration?: number;
  delay?: number;
  bodyColor?: string;
  accentColor?: string;
}

export function LegoTrain({
  direction = "rtl",
  duration = 28,
  delay = 0,
  bodyColor = "#7A9CB3",
  accentColor = "#AD7556",
}: LegoTrainProps) {
  const animName = direction === "ltr" ? "lego-train-ltr" : "lego-train-rtl";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 120,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          animation: `${animName} ${duration}s linear ${delay}s infinite`,
          willChange: "transform",
        }}
      >
        {/* Mirror engine for RTL so it faces the direction of travel */}
        <div style={{ transform: direction === "ltr" ? "scaleX(-1)" : "none" }}>
          <TrainSVG bodyColor={bodyColor} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
