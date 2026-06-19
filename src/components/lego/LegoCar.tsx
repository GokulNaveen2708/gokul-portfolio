"use client";

import { motion } from "framer-motion";

const r = (n: number) => Math.round(n * 100) / 100;

/* ── 5-spoke alloy wheel ── */
function Wheel({ cx, cy, radius = 27 }: { cx: number; cy: number; radius?: number }) {
  return (
    <g>
      {/* Tyre outer */}
      <circle cx={cx} cy={cy} r={radius}     fill="#111111" />
      {/* Tyre sidewall */}
      <circle cx={cx} cy={cy} r={radius - 4} fill="#1e1e1e" />
      {/* Rim */}
      <circle cx={cx} cy={cy} r={radius - 8} fill="#d0d0d0" />
      {/* 5-spoke shadow base */}
      {[18, 90, 162, 234, 306].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={r(cx + Math.cos(a) * 4)}   y1={r(cy + Math.sin(a) * 4)}
            x2={r(cx + Math.cos(a) * (radius - 9))} y2={r(cy + Math.sin(a) * (radius - 9))}
            stroke="#888" strokeWidth={5.5} strokeLinecap="round"
          />
        );
      })}
      {/* 5-spoke highlight */}
      {[18, 90, 162, 234, 306].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={r(cx + Math.cos(a) * 4)}   y1={r(cy + Math.sin(a) * 4)}
            x2={r(cx + Math.cos(a) * (radius - 9))} y2={r(cy + Math.sin(a) * (radius - 9))}
            stroke="#c8c8c8" strokeWidth={3} strokeLinecap="round"
          />
        );
      })}
      {/* Rim inner ring */}
      <circle cx={cx} cy={cy} r={radius - 8}  fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
      {/* Centre cap */}
      <circle cx={cx} cy={cy} r={6}   fill="#aaa" />
      <circle cx={cx} cy={cy} r={3.5} fill="#888" />
      {/* Tread texture */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <circle key={deg}
          cx={r(cx + Math.cos(a) * (radius - 2))}
          cy={r(cy + Math.sin(a) * (radius - 2))}
          r={1.6} fill="#2a2a2a" />;
      })}
    </g>
  );
}

/* ── Roof stud ── */
function Stud({ cx, y, color }: { cx: number; y: number; color: string }) {
  return (
    <g>
      <rect  x={cx - 5} y={y - 7} width={10} height={7} rx={2}
        fill={color} style={{ filter: "brightness(0.65)" }} />
      <ellipse cx={cx} cy={y - 7} rx={5} ry={2.2}
        fill={color} style={{ filter: "brightness(1.4)" }} />
      <ellipse cx={cx - 1.5} cy={y - 8.5} rx={2.2} ry={1}
        fill="rgba(255,255,255,0.55)" />
    </g>
  );
}

interface LegoCarProps {
  bodyColor?: string;
  accentColor?: string;
  size?: number;
  animated?: boolean;
}

/*
 * Modern supercar — McLaren / Lamborghini inspired LEGO Speed Champions style.
 * Car faces RIGHT. Front (headlights) = right side, Rear = left side.
 *
 * Canvas 300×120. Ground y=114.
 * Rear wheel  cx=80,  cy=90, r=27
 * Front wheel cx=224, cy=90, r=27
 */
export function LegoCar({
  bodyColor   = "#AD7556",
  accentColor = "#7A9CB3",
  size        = 1,
  animated    = true,
}: LegoCarProps) {
  const W = 300;
  const H = 120;

  // ── colour helpers ──
  const body     = bodyColor;
  const bodyDark = "brightness(0.72)";
  const bodyMid  = "brightness(0.88)";
  const bodyTop  = "brightness(1.28)";
  const glass    = "rgba(40,70,110,0.88)";
  const glassGlare = "rgba(255,255,255,0.22)";
  const carbon   = "#1a1a1a";
  const chromeTrim = "#c0c0c0";

  const car = (
    <svg
      width={W * size}
      height={H * size}
      viewBox={`0 0 ${W} ${H}`}
      overflow="visible"
      style={{ display: "block" }}
    >
      {/* ═══ GROUND SHADOW ═══ */}
      <ellipse cx={152} cy={112} rx={110} ry={5} fill="rgba(0,0,0,0.15)" />

      {/* ═══ UNDERBODY / FLOOR ═══ */}
      <rect x={54} y={84} width={196} height={6} rx={2} fill={carbon} />
      {/* Front diffuser fins */}
      {[230, 238, 246].map(x => (
        <rect key={x} x={x} y={84} width={3} height={6} rx={0.5} fill="#333" />
      ))}
      {/* Rear diffuser fins */}
      {[58, 66, 74].map(x => (
        <rect key={x} x={x} y={84} width={3} height={6} rx={0.5} fill="#333" />
      ))}

      {/* ═══ WHEEL ARCH BACKING ═══ */}
      {/* Rear arch */}
      <circle cx={80}  cy={90} r={31} fill="#0d0d0d" />
      {/* Front arch */}
      <circle cx={224} cy={90} r={31} fill="#0d0d0d" />

      {/* ═══ MAIN LOWER BODY ═══ */}
      {/*
       * The body is a single polygon covering the sill zone.
       * Key proportions:
       *   – very low nose (front comes down to near-ground)
       *   – nearly flat top sill line
       *   – squared-off rear for supercar "cut-off" tail
       */}
      <polygon
        points="
          48,88   48,70
          54,66   108,64
          108,64  196,64
          196,64  246,66
          256,68  268,72
          274,80  270,88
        "
        fill={body}
        style={{ filter: bodyMid }}
      />

      {/* ═══ CABIN / GREENHOUSE ═══
       *  – steep A-pillar for supercar look
       *  – short, flat roof (mid-engine proportions)
       *  – near-vertical C-pillar
       *  – cabin sits well back (rear-biased)
       */}
      {/* Cabin body */}
      <polygon
        points="
          92,64   100,40
          116,32  196,30
          212,34  228,52
          228,64
        "
        fill={body}
        style={{ filter: bodyMid }}
      />
      {/* Cabin top face (isometric) */}
      <polygon
        points="100,40 116,32 102,26 86,34"
        fill={body}
        style={{ filter: bodyTop }}
      />
      <polygon
        points="116,32 196,30 182,24 102,26"
        fill={body}
        style={{ filter: bodyTop }}
      />

      {/* ═══ GLASS ═══ */}
      {/* Windshield — steep rake */}
      <polygon
        points="212,34 228,52 220,54 206,38"
        fill={glass}
      />
      {/* Windshield glare */}
      <polygon
        points="213,35 221,44 217,46 209,37"
        fill={glassGlare}
      />
      {/* Side windows (one big piece) */}
      <polygon
        points="104,38 196,36 210,40 222,54 100,56"
        fill={glass}
        style={{ filter: "brightness(0.88)" }}
      />
      {/* Side glass glare streak */}
      <polygon
        points="108,40 160,38 158,44 106,46"
        fill={glassGlare}
      />
      {/* Rear quarter glass */}
      <polygon
        points="94,60 100,40 104,38 100,56"
        fill={glass}
        style={{ filter: "brightness(0.80)" }}
      />

      {/* ═══ HOOD ═══
       *  Long, low hood — key supercar feature
       *  Hood runs from cowl (x≈228) to nose (x≈270)
       */}
      {/* Hood top face */}
      <polygon
        points="228,52 228,64 246,66 258,68 268,72 262,58 244,52"
        fill={body}
        style={{ filter: "brightness(0.95)" }}
      />
      {/* Hood upper isometric plane */}
      <polygon
        points="228,52 244,52 230,46 214,46"
        fill={body}
        style={{ filter: bodyTop }}
      />
      {/* Hood centre crease line */}
      <line x1={235} y1={52} x2={265} y2={68}
        stroke="rgba(0,0,0,0.20)" strokeWidth={1.5} />
      {/* Hood vent slot */}
      <rect x={244} y={56} width={16} height={4} rx={1.5}
        fill="rgba(0,0,0,0.55)" />
      <rect x={245} y={57} width={14} height={2} rx={1}
        fill="rgba(0,0,0,0.70)" />

      {/* ═══ REAR DECK & TAIL ═══ */}
      {/* Tail panel (vertical rear face) */}
      <polygon
        points="48,70 34,74 34,88 48,88"
        fill={body}
        style={{ filter: bodyDark }}
      />
      {/* Rear deck */}
      <polygon
        points="48,70 92,64 78,58 34,64"
        fill={body}
        style={{ filter: bodyTop }}
      />

      {/* ═══ REAR SPOILER ═══ */}
      {/* Mounts */}
      <rect x={60} y={50} width={3} height={12} rx={1} fill={body} style={{ filter: bodyDark }} />
      <rect x={82} y={50} width={3} height={12} rx={1} fill={body} style={{ filter: bodyDark }} />
      {/* Wing */}
      <rect x={48} y={46} width={46} height={6} rx={2}
        fill={body} style={{ filter: "brightness(1.05)" }} />
      {/* Wing top face */}
      <polygon points="48,46 94,46 88,42 42,42"
        fill={body} style={{ filter: bodyTop }} />
      {/* Wing endplate */}
      <rect x={44} y={42} width={6} height={10} rx={1}
        fill={body} style={{ filter: bodyDark }} />

      {/* ═══ TAILLIGHTS ═══ */}
      {/* Full-width LED bar */}
      <rect x={34} y={72} width={6} height={14} rx={1.5}
        fill="#cc0000" style={{ filter: "brightness(1.4)" }} />
      <rect x={35} y={73} width={4} height={6} rx={1}
        fill="rgba(255,150,150,0.6)" />
      <rect x={35} y={81} width={4} height={4} rx={1}
        fill="#ff4444" opacity={0.9} />
      {/* LED strip */}
      <line x1={34} y1={74} x2={34} y2={86}
        stroke="#ff2222" strokeWidth={1.5} opacity={0.7} />

      {/* ═══ HEADLIGHTS ═══ */}
      {/* Angular LED headlight */}
      <polygon points="262,60 272,64 274,74 264,72"
        fill="#ffe87c" style={{ filter: "brightness(1.4)" }} />
      <polygon points="262,60 272,64 274,74 264,72"
        fill="rgba(255,255,200,0.35)" />
      {/* DRL strip */}
      <line x1={262} y1={60} x2={272} y2={62}
        stroke="white" strokeWidth={2} strokeLinecap="round" opacity={0.9} />
      <line x1={263} y1={63} x2={272} y2={65}
        stroke="white" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />

      {/* ═══ FRONT GRILLE / SPLITTER ═══ */}
      {/* Splitter plate */}
      <rect x={265} y={82} width={14} height={4} rx={1}
        fill={carbon} />
      {/* Grille mesh */}
      <rect x={260} y={74} width={12} height={8} rx={1.5}
        fill="#111" />
      {[0, 2.5, 5].map(i => (
        <line key={i} x1={260} y1={76 + i * 2.5} x2={272} y2={76 + i * 2.5}
          stroke="#333" strokeWidth={0.8} />
      ))}
      {[262, 265, 268, 271].map(x => (
        <line key={x} x1={x} y1={74} x2={x} y2={82}
          stroke="#333" strokeWidth={0.8} />
      ))}

      {/* ═══ SIDE INTAKE VENT (Lambo signature) ═══ */}
      <rect x={96} y={68} width={18} height={10} rx={2}
        fill="#0a0a0a" />
      <rect x={97} y={69} width={16} height={8} rx={1.5}
        fill="#111" />
      {[69, 72, 75].map(y => (
        <line key={y} x1={97} y1={y} x2={113} y2={y}
          stroke="#222" strokeWidth={0.8} />
      ))}

      {/* ═══ BODY CREASE LINES ═══ */}
      {/* Character line running full length */}
      <line x1={54} y1={76} x2={258} y2={74}
        stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} strokeLinecap="round" />
      {/* Lower accent trim */}
      <line x1={54} y1={82} x2={256} y2={82}
        stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

      {/* ═══ ROOF STUDS ═══ */}
      <Stud cx={130} y={32} color={accentColor} />
      <Stud cx={155} y={31} color={accentColor} />
      <Stud cx={180} y={31} color={accentColor} />

      {/* ═══ CHROME TRIM ═══ */}
      {/* Window surround */}
      <polygon
        points="92,64 100,40 116,32 196,30 212,34 228,52 228,64"
        fill="none" stroke={chromeTrim} strokeWidth={1.2} opacity={0.4}
      />

      {/* ═══ WHEELS ═══ */}
      <Wheel cx={80}  cy={90} radius={27} />
      <Wheel cx={224} cy={90} radius={27} />
    </svg>
  );

  if (!animated) return <div style={{ display: "inline-block" }}>{car}</div>;

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {car}
    </motion.div>
  );
}
