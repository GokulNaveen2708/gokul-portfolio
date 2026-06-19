"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BrickRow } from "@/components/lego/StudRow";
import { BrickButton } from "@/components/lego/BrickButton";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoSittingCat }   from "@/components/lego/LegoSittingCat";
import { LegoPizzaSlice }   from "@/components/lego/LegoPizzaSlice";
import { LegoVinylRecord }  from "@/components/lego/LegoVinylRecord";
import { CatPawPrints }      from "@/components/lego/CatPawPrints";
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
      <FloatingMinifigs section="hero" zIndex={12} />

      {/* ── Cat paw prints ── */}
      <CatPawPrints />

      {/* ── Pizza slice — upper right, tip pointing diagonally toward name ── */}
      <div style={{
        position: "absolute", top: "18%", right: "3%", zIndex: 4, opacity: 0.84,
        transform: "rotate(205deg)", transformOrigin: "center center",
      }}>
        <LegoPizzaSlice size={0.92} />
      </div>

      {/* ── Vinyl gramophone — left side, between CTA and stats panel ── */}
      <div style={{ position: "absolute", bottom: "14%", left: "10%", zIndex: 6, opacity: 0.86 }}>
        <LegoVinylRecord size={1.25} />
      </div>

      {/* ── Minecraft Creeper — top-left ── */}
      <div style={{ position: "absolute", left: "4%", bottom: "65%", zIndex: 6, opacity: 0.90 }}>
        <MinecraftCreeper size={1.3} />
      </div>


      {/* ── Top bar: issue label (like a magazine masthead) ── */}
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

      {/* ── Giant name — the focal point ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1
          style={{
            fontFamily: "Fredoka One, sans-serif",
            fontSize: "clamp(4.8rem, 13vw, 14.5rem)",
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

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.3 }}
          className="mt-5 text-lg md:text-xl font-semibold max-w-lg"
        >
          <TypewriterTagline />
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-4 justify-center items-end"
        >
          <BrickButton variant="primary" href="https://drive.google.com/file/d/1h7hNSM6NLBxgMkwX84H0bmHAyO6L59V7/view?usp=sharing" id="hero-resume-btn">
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
        </motion.div>

        {/* Open to work badge */}
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
      </div>

      {/* ── Stats strip — compact horizontal bar at bottom ── */}
      <div className="relative z-10 mx-4 sm:mx-8 lg:mx-auto lg:max-w-4xl mb-10">

        {/* Cat peeking from the right side — body hidden behind panel, head visible above */}
        <div style={{
          position: "absolute",
          top: -44,
          right: "6%",
          zIndex: 1,
          pointerEvents: "none",
        }}>
          <LegoSittingCat size={0.75} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            zIndex: 2,
            backgroundColor: "#DCCFB8",
            boxShadow: "5px 5px 0 #AD7556, 10px 10px 0 rgba(83,68,61,0.2)",
            border: "1px solid rgba(83,68,61,0.18)",
          }}
        >
          {/* Header strip */}
          <div
            className="px-5 py-2 flex items-center gap-2"
            style={{ backgroundColor: "#AD7556" }}
          >
            <BrickRow count={4} studs={2} color="#DCCFB8" size={20} />
            <span
              className="ml-auto text-xs font-black uppercase tracking-widest"
              style={{ color: "#FDFCFA", opacity: 0.88 }}
            >
              STATS PANEL
            </span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
                className="p-4 text-center"
                style={{
                  backgroundColor: "rgba(83,68,61,0.06)",
                  borderRight: i < 3 ? "1px solid rgba(83,68,61,0.1)" : "none",
                }}
              >
                <div
                  className="text-2xl md:text-3xl font-black"
                  style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
                >
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold mt-0.5" style={{ color: "#53443D" }}>
                  {stat.label}
                </div>
                <div className="text-xs font-semibold" style={{ color: "#7A9CB3" }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer strip */}
          <div className="px-5 py-2" style={{ backgroundColor: "#AD7556" }}>
            <BrickRow count={4} studs={2} color="#DCCFB8" size={20} />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#AD7556", opacity: 0.55 }}>
          keep scrolling
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#AD7556", opacity: 0.55, fontSize: "1.1rem" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
