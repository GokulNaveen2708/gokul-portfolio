"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BrickRow } from "@/components/lego/StudRow";
import { BrickButton } from "@/components/lego/BrickButton";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { TetrisFallingBlocks } from "@/components/lego/TetrisFallingBlocks";
import { HeroBuilderMinifig } from "@/components/lego/LegoMinifig";
import { PacManGhost } from "@/components/lego/PacManGhost";
import { PixelRobot } from "@/components/lego/PixelRobot";
import { AmongUsCrewmate } from "@/components/lego/AmongUsCrewmate";
import { ChromeDinoGame } from "@/components/lego/ChromeDino";
import { MinecraftCreeper } from "@/components/lego/MinecraftCreeper";

/* ── Animated stat counter ── */
function StatCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = end / 40;
        const timer = setInterval(() => {
          start = Math.min(start + step, end);
          setCount(Math.floor(start));
          if (start >= end) clearInterval(timer);
        }, 40);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Typewriter tagline ── */
const TW_P1 = "Building intelligent distributed systems at scale — ";
const TW_P2 = "one brick at a time.";
const TW_FULL = TW_P1 + TW_P2;

function TypewriterTagline() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= TW_FULL.length) clearInterval(iv);
      }, 30);
      return () => clearInterval(iv);
    }, 900);
    return () => clearTimeout(start);
  }, []);

  const p1 = TW_FULL.slice(0, Math.min(count, TW_P1.length));
  const p2 = count > TW_P1.length ? TW_FULL.slice(TW_P1.length, count) : "";
  const done = count >= TW_FULL.length;

  return (
    <span>
      <span style={{ color: "#7A9CB3" }}>{p1}</span>
      <span style={{ color: "#AD7556" }}>{p2}</span>
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "0.9em",
            backgroundColor: "#7A9CB3",
            marginLeft: 2,
            verticalAlign: "text-bottom",
            animation: "tw-blink 0.7s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

/* ── Letter-by-letter stagger ── */
function BrickLetters({ text, color }: { text: string; color: string }) {
  return (
    <span aria-label={text} style={{ color }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -40, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 240, damping: 18 }}
          style={{ display: "inline-block", width: ch === " " ? "0.35em" : "auto" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

const stats = [
  { value: 10, suffix: "M+", label: "Daily Transactions", sub: "Processed"   },
  { value: 65, suffix: "%",  label: "P99 Latency",        sub: "Reduced"     },
  { value: 1,  suffix: "M+", label: "Jobs / Month",       sub: "Scheduled"   },
  { value: 3,  suffix: "+",  label: "Years Experience",   sub: "Engineering" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden baseplate-bg"
    >
      {/* ── Background layers ── */}
      <BackgroundBricks section="hero" />
      <TetrisFallingBlocks />

      {/* ── Top label ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-center gap-4 pt-24 pb-2"
      >
        <BrickRow count={3} studs={1} color="#AD7556" size={16} className="opacity-70" />
        <span
          className="text-xs font-black uppercase tracking-[0.3em]"
          style={{ color: "#AD7556", opacity: 0.8 }}
        >
          Builder · Engineer · Creator
        </span>
        <BrickRow count={3} studs={1} color="#AD7556" size={16} className="opacity-70" />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center pb-4">

        {/* Name + minifig + ghost row */}
        <div className="relative flex items-end justify-center">

          {/* Pac-Man ghost — floats to the LEFT of the name */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              right: "100%",
              top: "15%",
              marginRight: 20,
              pointerEvents: "none",
            }}
          >
            <PacManGhost size={1.0} color="#AD7556" />
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "Fredoka One, sans-serif",
              fontSize: "clamp(3.6rem, 9.5vw, 10rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            <span className="block">
              <BrickLetters text="GOKUL" color="#53443D" />
            </span>
            <span className="block">
              <BrickLetters text="NAVEEN" color="#AD7556" />
            </span>
          </h1>

          {/* Builder minifig — walks in from right, sits beside the name */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              left: "100%",
              bottom: 0,
              marginLeft: 4,
              pointerEvents: "auto",
            }}
          >
            <HeroBuilderMinifig scale={1.55} />
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.3 }}
          className="mt-5 text-lg md:text-xl font-semibold max-w-lg"
        >
          <TypewriterTagline />
        </motion.p>

        {/* CTAs + pixel robot inline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-4 justify-center items-center"
        >
          <BrickButton
            variant="primary"
            href="https://drive.google.com/file/d/1h7hNSM6NLBxgMkwX84H0bmHAyO6L59V7/view?usp=sharing"
            id="hero-resume-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Resume
          </BrickButton>
          <BrickButton
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            id="hero-contact-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get in Contact
          </BrickButton>
          {/* Pixel robot — right of contact button */}
          <div className="hidden sm:block" style={{ pointerEvents: "none" }}>
            <PixelRobot size={0.62} />
          </div>
        </motion.div>

        {/* Open to work */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          className="mt-4 flex items-center gap-2"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#7A9CB3" }}>
            Open to opportunities
          </span>
        </motion.div>

        {/* Stats panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 w-full max-w-2xl mx-auto rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#DCCFB8",
            boxShadow: "5px 5px 0 #AD7556, 10px 10px 0 rgba(83,68,61,0.2)",
            border: "1px solid rgba(83,68,61,0.18)",
          }}
        >
          <div className="px-5 py-2 flex items-center gap-2" style={{ backgroundColor: "#AD7556" }}>
            <BrickRow count={4} studs={2} color="#DCCFB8" size={20} />
            <span className="ml-auto text-xs font-black uppercase tracking-widest" style={{ color: "#FDFCFA", opacity: 0.88 }}>
              STATS PANEL
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
                className="p-3 md:p-4 text-center"
                style={{
                  backgroundColor: "rgba(83,68,61,0.06)",
                  borderRight: (i % 2 === 0) ? "1px solid rgba(83,68,61,0.1)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(83,68,61,0.1)" : "none",
                }}
              >
                <div
                  className="text-xl md:text-3xl font-black"
                  style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
                >
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold mt-0.5 leading-tight" style={{ color: "#53443D" }}>
                  {stat.label}
                </div>
                <div className="text-xs font-semibold" style={{ color: "#7A9CB3" }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="px-5 py-2" style={{ backgroundColor: "#AD7556" }}>
            <BrickRow count={4} studs={2} color="#DCCFB8" size={20} />
          </div>
        </motion.div>
      </div>

      {/* ══════════ FLOOR STRIP ══════════ */}
      <div className="relative w-full flex-shrink-0" style={{ height: 130, zIndex: 10 }}>

        {/* Stud strip — top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 26,
            backgroundColor: "#AD7556",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BrickRow count={200} studs={2} color="#FED8A6" size={26} />
        </div>

        {/* Floor body */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#53443D",
          }}
        />

        {/* Minecraft Creeper — left, peeking above the stud strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 130 }}
          style={{ position: "absolute", bottom: 0, left: "5%", zIndex: 3 }}
        >
          <MinecraftCreeper size={0.95} />
        </motion.div>

        {/* Among Us crewmates — hidden on mobile, visible md+ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, type: "spring", stiffness: 130 }}
          className="hidden md:block"
          style={{ position: "absolute", bottom: 0, left: "16%", zIndex: 3 }}
        >
          <AmongUsCrewmate size={0.88} color="#7A9CB3" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 130 }}
          className="hidden md:block"
          style={{ position: "absolute", bottom: 0, left: "24%", zIndex: 3 }}
        >
          <AmongUsCrewmate size={0.72} color="#AD7556" />
        </motion.div>

        {/* Chrome Dino mini-game — auto-jumps over the cactus */}
        <ChromeDinoGame />
      </div>
    </section>
  );
}
