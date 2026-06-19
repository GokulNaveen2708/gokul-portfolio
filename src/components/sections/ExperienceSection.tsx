"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrickRow } from "@/components/lego/StudRow";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { CatPawPrints } from "@/components/lego/CatPawPrints";
import { experiences } from "@/lib/data/experience";

// ── Constants ──────────────────────────────────────────────────────────────────
const STATION_PCTS = [0.18, 0.50, 0.82];
const TRAIN_SCALE  = 0.52;
const TRAIN_W      = Math.round(460 * TRAIN_SCALE); // 239
const TRAIN_H      = Math.round(118 * TRAIN_SCALE); // 61
const TRAVEL_MS    = 950;
const TRACK_H      = 220;
const RAIL_Y       = 112; // y of top of rail within track container

// ── Inline TrainWheel ──────────────────────────────────────────────────────────
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

// ── Inline TrainStuds ──────────────────────────────────────────────────────────
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

// ── Inline TrainSVG ────────────────────────────────────────────────────────────
function TrainSVG({ bodyColor, accentColor }: { bodyColor: string; accentColor: string }) {
  const dark   = "rgba(0,0,0,0.30)";
  const ground = 100;
  const wheelR = 16;
  const wheelY = ground - wheelR;   // 84
  const bodyBot = wheelY + 4;       // 88
  const bodyTop = bodyBot - 52;     // 36

  return (
    <svg
      width={460 * TRAIN_SCALE}
      height={118 * TRAIN_SCALE}
      viewBox="0 0 460 118"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* ══ ENGINE (x: 0–180) ══ */}
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
      <rect x={119} y={bodyTop - 11} width={8}  height={5}  rx={1} fill="rgba(255,255,255,0.35)" />
      <rect x={144} y={bodyTop - 12} width={18} height={16} rx={2} fill="rgba(140,200,255,0.75)" />
      <rect x={145} y={bodyTop - 11} width={8}  height={5}  rx={1} fill="rgba(255,255,255,0.35)" />

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
      <rect x={17} y={bodyTop + 15} width={8}  height={5} rx={1.5} fill="rgba(255,255,255,0.55)" />

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

// ── Smoke puff offsets (static, no Math.random) ────────────────────────────────
const SMOKE_OFFSETS: { dx: number; delay: number; size: number }[] = [
  { dx:  0, delay: 0.0,  size: 14 },
  { dx:  7, delay: 0.3,  size: 11 },
  { dx: -6, delay: 0.6,  size: 16 },
  { dx:  4, delay: 0.9,  size: 10 },
  { dx: -4, delay: 1.2,  size: 13 },
  { dx:  2, delay: 1.5,  size: 9  },
];

// ── Speed line offsets (static, horizontal lines behind train) ─────────────────
const SPEED_LINES: { topOff: number; len: number; opacity: number }[] = [
  { topOff:  8, len: 55, opacity: 0.55 },
  { topOff: 16, len: 38, opacity: 0.40 },
  { topOff: 24, len: 65, opacity: 0.60 },
  { topOff: 32, len: 44, opacity: 0.35 },
  { topOff: 40, len: 50, opacity: 0.50 },
  { topOff: 48, len: 30, opacity: 0.28 },
];

// ── Company short labels ───────────────────────────────────────────────────────
const COMPANY_SHORT = ["Reliable", "Accenture", "RIT"];

// ── Main section ───────────────────────────────────────────────────────────────
export function ExperienceSection() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [isMoving, setIsMoving]     = useState(false);
  const [direction, setDirection]   = useState<"ltr" | "rtl">("ltr");
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW]         = useState(900);

  // Keep trackW in sync
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTrackW(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setTrackW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Station center x positions (in px)
  const stationXs = STATION_PCTS.map((p) => Math.round(p * trackW));

  const navigate = useCallback(
    (target: number) => {
      if (isMoving || target === activeIdx || target < 0 || target >= experiences.length) return;
      const dir: "ltr" | "rtl" = target > activeIdx ? "ltr" : "rtl";
      setDirection(dir);
      setActiveIdx(target);
      setIsMoving(true);
      setTimeout(() => {
        setDisplayIdx(target);
        setIsMoving(false);
      }, TRAVEL_MS);
    },
    [activeIdx, isMoving]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(activeIdx + 1);
      if (e.key === "ArrowLeft")  navigate(activeIdx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, navigate]);

  // Touch/swipe
  const touchStartX = useRef<number>(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx >  40) navigate(activeIdx + 1);
    if (dx < -40) navigate(activeIdx - 1);
  };

  // ── Auto-advance every 7 s when idle ──────────────────────────────────────
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any running timer while train is in motion
    if (isMoving) {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      return;
    }
    // Start fresh 7-second countdown once the train has settled
    idleTimer.current = setTimeout(() => {
      navigate((activeIdx + 1) % experiences.length);
    }, 15000);
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [activeIdx, isMoving, navigate]);

  // Smoke chimney x
  const chimneyX =
    direction === "ltr"
      ? stationXs[activeIdx] - TRAIN_W / 2 + TRAIN_W - Math.round(53 * TRAIN_SCALE)
      : stationXs[activeIdx] - TRAIN_W / 2 + Math.round(53 * TRAIN_SCALE);
  const chimneyY = RAIL_Y - TRAIN_H + 8; // 59

  const exp = experiences[displayIdx];
  const stepColors  = ["#7A9CB3", "#AD7556", "#53443D"];
  const studColors  = ["#AD7556", "#DCCFB8", "#7A9CB3"];

  return (
    <section id="experience" className="relative py-28 overflow-hidden baseplate-bg-dark">
      <BackgroundBricks section="experience" />
      <FloatingMinifigs section="experience" />
      <CatPawPrints />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <BrickRow count={2} studs={2} color="#AD7556" size={44} />
          <h2
            className="text-4xl sm:text-5xl font-black uppercase tracking-[0.06em]"
            style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
          >
            Professional Experience
          </h2>
        </motion.div>

        {/* ── Train track area ── */}
        <div
          ref={trackRef}
          style={{ position: "relative", height: TRACK_H, overflow: "visible", userSelect: "none" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Track SVG */}
          <svg
            style={{ position: "absolute", bottom: 10, left: 0, width: "100%", height: 55 }}
            viewBox="0 0 1200 55"
            preserveAspectRatio="none"
          >
            {/* Wooden ties */}
            {Array.from({ length: 55 }).map((_, i) => (
              <rect key={i} x={i * 22} y={8} width={12} height={22} rx={2} fill="#5C4A3E" />
            ))}
            {/* Rails */}
            <rect x={0} y={5}  width={1200} height={5} rx={2} fill="#888" />
            <rect x={0} y={22} width={1200} height={5} rx={2} fill="#888" />
            {/* Rail sheen */}
            <rect x={0} y={5} width={1200} height={2} rx={1} fill="rgba(255,255,255,0.12)" />
          </svg>

          {/* Station markers */}
          {stationXs.map((sx, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => navigate(i)}
                style={{
                  position: "absolute",
                  left: sx,
                  bottom: 8,
                  transform: "translateX(-50%)",
                  cursor: "pointer",
                  zIndex: 8,
                  background: "none",
                  border: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Company label above post */}
                <span
                  style={{
                    position: "absolute",
                    bottom: 62,
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? "#AD7556" : "#888",
                    whiteSpace: "nowrap",
                    fontFamily: "Fredoka One, sans-serif",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                  }}
                >
                  {COMPANY_SHORT[i]}
                </span>

                {/* SVG: circle + post + date */}
                <svg width={24} height={50} style={{ overflow: "visible" }}>
                  {/* Vertical post */}
                  <rect x={10} y={10} width={4} height={28} rx={2} fill={isActive ? "#AD7556" : "#555"} />
                  {/* Circle dot */}
                  <circle
                    cx={12} cy={10} r={10}
                    fill={isActive ? "#AD7556" : "none"}
                    stroke={isActive ? "#AD7556" : "#555"}
                    strokeWidth={2}
                  />
                  {isActive && <circle cx={12} cy={10} r={5} fill="rgba(255,255,255,0.4)" />}
                </svg>

                {/* Date label */}
                <span
                  style={{
                    fontSize: 11,
                    color: isActive ? "#AD7556" : "#777",
                    fontWeight: 700,
                    marginTop: 2,
                    whiteSpace: "nowrap",
                    letterSpacing: "0.03em",
                  }}
                >
                  {experiences[i].start}
                </span>
              </button>
            );
          })}

          {/* Train */}
          <motion.div
            style={{
              position: "absolute",
              top: RAIL_Y - TRAIN_H, // 51
              left: 0,
              zIndex: 10,
            }}
            animate={{ x: stationXs[activeIdx] - TRAIN_W / 2 }}
            transition={{ duration: TRAVEL_MS / 1000, ease: "easeInOut" }}
          >
            <div style={{ transform: direction === "ltr" ? "scaleX(-1)" : "none" }}>
              <TrainSVG bodyColor="#7A9CB3" accentColor="#AD7556" />
            </div>

            {/* Speed lines (only when moving, horizontal lines behind train) */}
            {isMoving &&
              SPEED_LINES.map((sl, i) => {
                // ltr: engine on right (scaleX-1), car on left; lines appear LEFT in screen = TRAIN_W+ in div coords
                // rtl: engine on left (no flip), car on right; lines appear RIGHT in screen = negative in div coords
                const lineLeft = direction === "ltr"
                  ? TRAIN_W + 8 + i * 7
                  : -(sl.len + 8 + i * 7);
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left:    lineLeft,
                      top:     sl.topOff,
                      width:   sl.len,
                      height:  2 + (i % 2),
                      borderRadius: 2,
                      background: `linear-gradient(${direction === "ltr" ? "to left" : "to right"}, rgba(122,156,179,0), rgba(122,156,179,${sl.opacity}))`,
                    }}
                  />
                );
              })}
          </motion.div>

          {/* Smoke particles — key includes direction so animation resets on flip */}
          {SMOKE_OFFSETS.map((s, i) => (
            <motion.div
              key={`smoke-${i}-${direction}`}
              style={{
                position:  "absolute",
                left:      chimneyX + s.dx,
                top:       chimneyY,
                width:     s.size,
                height:    s.size,
                borderRadius: "50%",
                backgroundColor: "rgba(215,215,215,0.9)",
                pointerEvents: "none",
                zIndex:    12,
              }}
              animate={
                isMoving
                  ? {
                      y:       [0, -55],
                      x:       direction === "ltr" ? [0, 22] : [0, -22],
                      opacity: [0, 0.95, 0.7, 0],
                      scale:   [0.4, 1.6, 2.2, 1.0],
                    }
                  : {
                      y:       [0, -38],
                      x:       [s.dx * 0.3, s.dx * 0.6],
                      opacity: [0, 0.85, 0.55, 0],
                      scale:   [0.3, 1.3, 1.8, 0.8],
                    }
              }
              transition={{
                duration:    isMoving ? 0.65 : 1.6,
                delay:       s.delay,
                repeat:      Infinity,
                repeatDelay: isMoving ? 0 : 0.1,
                ease:        "easeOut",
              }}
            />
          ))}
        </div>

        {/* ── Experience Card ── */}
        <div style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait">
            {!isMoving && (
              <motion.div
                key={displayIdx}
                initial={{ opacity: 0, x: direction === "ltr" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "ltr" ? -50 : 50 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  style={{
                    backgroundColor: "#FDFCFA",
                    border: `1px solid ${studColors[displayIdx]}35`,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: `5px 5px 0 ${studColors[displayIdx]}25, 0 20px 60px rgba(0,0,0,0.35)`,
                  }}
                >
                  {/* Header strip */}
                  <div
                    style={{
                      backgroundColor: stepColors[displayIdx] ?? "#53443D",
                      padding: "10px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <BrickRow count={3} studs={1} color={studColors[displayIdx]} size={18} />
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 16,
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        color: studColors[displayIdx],
                        opacity: 0.9,
                        fontFamily: "Fredoka One, sans-serif",
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "20px 24px" }}>
                    {/* Role + date + location */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "8px 16px",
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "1.3rem",
                          color: "#AD7556",
                        }}
                      >
                        {exp.role}
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          color: "#7A9CB3",
                          fontWeight: 600,
                        }}
                      >
                        {exp.location}
                      </span>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          padding: "3px 10px",
                          borderRadius: 4,
                          backgroundColor: `${studColors[displayIdx]}22`,
                          color: "#AD7556",
                          border: `1px solid ${studColors[displayIdx]}30`,
                        }}
                      >
                        {exp.start} — {exp.end}
                      </span>
                      {displayIdx === 0 && (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 900,
                            padding: "3px 10px",
                            borderRadius: 4,
                            backgroundColor: "rgba(122,156,179,0.15)",
                            color: "#7A9CB3",
                            border: "1px solid rgba(122,156,179,0.3)",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              backgroundColor: "#7A9CB3",
                            }}
                          />
                          Current Role
                        </span>
                      )}
                    </div>

                    {/* Impact badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 15,
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        padding: "7px 14px",
                        borderRadius: 8,
                        backgroundColor: `${studColors[displayIdx]}15`,
                        color: "#AD7556",
                        border: `1px solid ${studColors[displayIdx]}30`,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: studColors[displayIdx],
                          display: "inline-block",
                        }}
                      />
                      {exp.impact}
                    </div>

                    {/* Bullet points */}
                    <ul style={{ marginBottom: 16, listStyle: "none", padding: 0 }}>
                      {exp.highlights.slice(0, 3).map((r, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              flexShrink: 0,
                              marginTop: 6,
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: studColors[displayIdx],
                              display: "inline-block",
                              boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.3)",
                            }}
                          />
                          <span
                            style={{
                              fontSize: 17,
                              fontWeight: 600,
                              lineHeight: 1.55,
                              color: "#53443D",
                            }}
                          >
                            {r}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech pill tags from remaining highlights */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {exp.highlights.slice(3).map((h) => (
                        <span
                          key={h}
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 4,
                            backgroundColor: "rgba(122,156,179,0.12)",
                            color: "#7A9CB3",
                            border: "1px solid rgba(122,156,179,0.2)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom studs */}
                  <div style={{ padding: "10px 24px", backgroundColor: "#F5F3EC" }}>
                    <BrickRow count={4} studs={2} color={studColors[displayIdx]} size={14} className="opacity-25" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Navigation row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          {/* Prev button */}
          <button
            onClick={() => navigate(activeIdx - 1)}
            disabled={activeIdx === 0 || isMoving}
            style={{
              opacity: activeIdx === 0 ? 0.4 : 1,
              cursor: activeIdx === 0 || isMoving ? "not-allowed" : "pointer",
              background: "#2A2320",
              border: "none",
              borderRadius: 6,
              padding: "8px 16px",
              color: "#AD7556",
              fontWeight: 900,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontFamily: "Fredoka One, sans-serif",
              boxShadow: "3px 3px 0 #111",
              transition: "opacity 0.2s, transform 0.1s",
            }}
          >
            ← Prev Station
          </button>

          {/* Center: dots + text */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {experiences.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: i === activeIdx ? "#AD7556" : "#555",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#7A9CB3",
                fontFamily: "Fredoka One, sans-serif",
              }}
            >
              STOP {activeIdx + 1} OF {experiences.length}
            </span>
          </div>

          {/* Next button */}
          <button
            onClick={() => navigate(activeIdx + 1)}
            disabled={activeIdx === experiences.length - 1 || isMoving}
            style={{
              opacity: activeIdx === experiences.length - 1 ? 0.4 : 1,
              cursor: activeIdx === experiences.length - 1 || isMoving ? "not-allowed" : "pointer",
              background: "#2A2320",
              border: "none",
              borderRadius: 6,
              padding: "8px 16px",
              color: "#AD7556",
              fontWeight: 900,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontFamily: "Fredoka One, sans-serif",
              boxShadow: "3px 3px 0 #111",
              transition: "opacity 0.2s, transform 0.1s",
            }}
          >
            Next Station →
          </button>
        </div>
      </div>
    </section>
  );
}
