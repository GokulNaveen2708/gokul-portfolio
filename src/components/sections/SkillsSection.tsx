"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { StudRow, BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoBrickStack }       from "@/components/lego/LegoBrickStack";
import { LegoGameController }   from "@/components/lego/LegoGameController";
import { CatPawPrints }         from "@/components/lego/CatPawPrints";

interface Skill {
  name: string;
  studs?: 1 | 2 | 3 | 4;
}

interface SkillCategory {
  label: string;
  brickColor: string;
  textColor: string;
  studs: number;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    label: "Languages",
    brickColor: "#AD7556",
    textColor: "#53443D",
    studs: 4,
    skills: [
      { name: "Python",     studs: 2 },
      { name: "TypeScript", studs: 2 },
      { name: "Go",         studs: 1 },
      { name: "Java",       studs: 1 },
      { name: "SQL",        studs: 1 },
      { name: "Bash",       studs: 1 },
    ],
  },
  {
    label: "Frameworks & Libraries",
    brickColor: "#AD7556",
    textColor: "#53443D",
    studs: 4,
    skills: [
      { name: "FastAPI",      studs: 2 },
      { name: "Spring Boot",  studs: 3 },
      { name: "Next.js",      studs: 2 },
      { name: "React",        studs: 1 },
      { name: "LangGraph",    studs: 2 },
      { name: "LangChain",    studs: 2 },
    ],
  },
  {
    label: "Cloud & DevOps",
    brickColor: "#7A9CB3",
    textColor: "#53443D",
    studs: 4,
    skills: [
      { name: "AWS",            studs: 1 },
      { name: "GCP",            studs: 1 },
      { name: "Docker",         studs: 2 },
      { name: "Kubernetes",     studs: 3 },
      { name: "Terraform",      studs: 2 },
      { name: "GitHub Actions", studs: 3 },
    ],
  },
  {
    label: "Data & Messaging",
    brickColor: "#AD7556",
    textColor: "#53443D",
    studs: 4,
    skills: [
      { name: "Kafka",       studs: 2 },
      { name: "Redis",       studs: 1 },
      { name: "PostgreSQL",  studs: 2 },
      { name: "DynamoDB",    studs: 2 },
      { name: "BigQuery",    studs: 2 },
    ],
  },
  {
    label: "AI / ML",
    brickColor: "#7A9CB3",
    textColor: "#53443D",
    studs: 4,
    skills: [
      { name: "PyTorch",    studs: 2 },
      { name: "BERT",       studs: 1 },
      { name: "Flower FL",  studs: 2 },
      { name: "OpenAI",     studs: 2 },
      { name: "RAG",        studs: 1 },
      { name: "MLflow",     studs: 2 },
    ],
  },
  {
    label: "AI Developer Tools",
    brickColor: "#AD7556",
    textColor: "#53443D",
    studs: 4,
    skills: [
      { name: "Claude Code",     studs: 3 },
      { name: "GitHub Copilot",  studs: 3 },
      { name: "Codex",           studs: 2 },
      { name: "Cursor",          studs: 2 },
      { name: "LLM APIs",        studs: 2 },
    ],
  },
];

const flyDirections = [
  { x: -80, y: -60, rotate: -12 },
  { x:  80, y: -60, rotate:  12 },
  { x:   0, y: -80, rotate:  -6 },
  { x: -60, y: -40, rotate:   8 },
  { x:  60, y: -40, rotate:  -8 },
  { x:   0, y:  60, rotate:   5 },
];

/* ── A single LEGO skill brick with proper 3D studs ── */
function SkillBrick3D({
  skill,
  color,
  textColor,
  index,
  inView,
}: {
  skill: Skill;
  color: string;
  textColor: string;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const dir = flyDirections[index % flyDirections.length];
  const studs = skill.studs ?? 2;

  /* Stud positions — one row on top */
  const studPositions = Array.from({ length: studs }).map((_, i) => ({
    key: i,
    x: studs === 1 ? 50 : (100 / (studs + 1)) * (i + 1),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined}
      transition={{
        delay: index * 0.07,
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}
    >
      {/* ── ISOMETRIC STUDS ON TOP — matches LegoBrickSVG style ── */}
      <svg
        width={studs * 20 + 8}
        height={16}
        viewBox={`0 0 ${studs * 20 + 8} 16`}
        overflow="visible"
        style={{
          display: "block",
          margin: "0 auto -1px",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          transition: "transform 0.15s ease",
          zIndex: 2,
        }}
      >
        {Array.from({ length: studs }).map((_, i) => {
          const cx = i * 20 + 12;
          return (
            <g key={i}>
              <rect x={cx - 7} y={5} width="14" height="9" rx="2" fill={color} style={{ filter: "brightness(0.86)" }} />
              <ellipse cx={cx} cy={5} rx="7" ry="3" fill={color} style={{ filter: "brightness(1.28)" }} />
              <ellipse cx={cx - 2} cy={3.5} rx="3" ry="1.3" fill="rgba(255,255,255,0.40)" />
            </g>
          );
        })}
      </svg>

      {/* ── BRICK BODY ── */}
      <motion.div
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "relative",
          padding: "10px 16px",
          background: `linear-gradient(180deg, ${color}f0 0%, ${color} 100%)`,
          borderRadius: "3px 3px 4px 4px",
          fontFamily: "Nunito, sans-serif",
          fontWeight: 900,
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: textColor,
          whiteSpace: "nowrap",
          boxShadow: hovered
            ? `
              /* Right side face */
              5px 0 0 0 rgba(0,0,0,0.32),
              /* Bottom shadow */
              0 6px 0 0 rgba(0,0,0,0.38),
              /* Corner */
              5px 6px 0 0 rgba(0,0,0,0.45),
              /* Ambient */
              0 12px 24px rgba(0,0,0,0.4)
            `
            : `
              4px 0 0 0 rgba(0,0,0,0.28),
              0 5px 0 0 rgba(0,0,0,0.35),
              4px 5px 0 0 rgba(0,0,0,0.4),
              0 8px 16px rgba(0,0,0,0.3)
            `,
          transition: "box-shadow 0.15s ease",
          overflow: "hidden",
        }}
      >
        {/* Inner top highlight edge (LEGO has a subtle inner lip) */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: "rgba(255,255,255,0.12)",
            borderRadius: "3px 3px 0 0",
          }}
        />
        {/* Inner left highlight */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0,
            width: 3,
            background: "rgba(255,255,255,0.08)",
          }}
        />
        {skill.name}
      </motion.div>
    </motion.div>
  );
}

/* ── One category row — instruction manual step style ── */
function SkillRow({ cat, rowIdx }: { cat: SkillCategory; rowIdx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stepNum = String(rowIdx + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: rowIdx * 0.05 }}
      style={{
        display: "flex",
        gap: 16,
        padding: "16px 20px",
        borderRadius: 10,
        backgroundColor: "rgba(253,252,250,0.55)",
        border: `1px solid ${cat.brickColor}28`,
        boxShadow: `3px 3px 0 ${cat.brickColor}18`,
      }}
    >
      {/* Step number column */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 6,
            backgroundColor: cat.brickColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `2px 2px 0 rgba(0,0,0,0.22)`,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>STEP</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#FDFCFA", lineHeight: 1, fontFamily: "Fredoka One, sans-serif" }}>{stepNum}</span>
        </div>
        {/* Connector line */}
        {rowIdx < categories.length - 1 && (
          <div style={{ width: 2, flex: 1, minHeight: 12, backgroundColor: cat.brickColor, opacity: 0.2, borderRadius: 1 }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-black uppercase tracking-[0.2em]"
            style={{ color: cat.brickColor }}
          >
            {cat.label}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          {cat.skills.map((skill, i) => (
            <SkillBrick3D
              key={skill.name}
              skill={skill}
              color={cat.brickColor}
              textColor={cat.textColor}
              index={i + rowIdx * 4}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Bowling Ball SVG ── */
function BowlingBall({ size = 1 }: { size?: number }) {
  const D = 48;
  return (
    <svg width={D * size} height={D * size} viewBox={`0 0 ${D} ${D}`} style={{ display: "block" }}>
      {/* Ball body */}
      <circle cx={24} cy={24} r={22} fill="#1A1A2E" />
      {/* Shading — lighter arc on top-left */}
      <radialGradient id="ball-shine" cx="36%" cy="32%" r="55%">
        <stop offset="0%"  stopColor="rgba(255,255,255,0.28)" />
        <stop offset="60%" stopColor="rgba(255,255,255,0.04)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
      </radialGradient>
      <circle cx={24} cy={24} r={22} fill="url(#ball-shine)" />
      {/* Finger holes */}
      <circle cx={21} cy={18} r={2.5} fill="rgba(0,0,0,0.55)" />
      <circle cx={28} cy={16} r={2.5} fill="rgba(0,0,0,0.55)" />
      <circle cx={25} cy={24} r={2.5} fill="rgba(0,0,0,0.55)" />
      {/* Ground shadow */}
      <ellipse cx={24} cy={46} rx={18} ry={3.5} fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [pinActive, setPinActive] = useState(false);
  const [knocked, setKnocked] = useState(false);
  const [pinDone, setPinDone] = useState(false);

  useEffect(() => {
    if (sectionInView && !pinDone) {
      const t = setTimeout(() => setPinActive(true), 600);
      return () => clearTimeout(t);
    }
  }, [sectionInView, pinDone]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 overflow-hidden baseplate-bg-tan"
    >
      {/* Decorative large background bricks */}
      <BackgroundBricks section="skills" />
      <FloatingMinifigs section="skills" />
      <CatPawPrints />
      {/* Game controller — bottom right, clear of content */}
      <div style={{ position: "absolute", bottom: "4%", right: "2%", zIndex: 4, opacity: 0.78, pointerEvents: "none" }}>
        <LegoGameController size={0.88} color="#53443D" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end gap-6 mb-4"
        >
          <div className="flex items-center gap-3">
            <BrickRow count={2} studs={2} color="#AD7556" size={44} />
            <h2
              style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
              className="text-4xl sm:text-5xl font-black uppercase tracking-[0.06em]"
            >
              The Skill Stack
            </h2>
          </div>

          {/* Brick stack + bowling ball */}
          <div style={{ marginBottom: -8, position: "relative", overflow: "visible", minWidth: 60 }}>
            <LegoBrickStack forceScatter={knocked} />

            {/* Ball rolls in from right along the ground, hits stack base, once only */}
            <AnimatePresence>
              {pinActive && !pinDone && (
                <motion.div
                  key="ball"
                  initial={{ x: 380, rotate: 0 }}
                  animate={{ x: -10, rotate: -1080 }}
                  transition={{ duration: 1.1, ease: [0.4, 0, 0.8, 1] }}
                  onAnimationComplete={() => {
                    setKnocked(true);
                    setTimeout(() => {
                      setKnocked(false);
                      setPinDone(true);
                      setPinActive(false);
                    }, 900);
                  }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 20,
                  }}
                >
                  <BowlingBall size={0.9} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold mb-14 max-w-xl"
          style={{ color: "#7A9CB3" }}
        >
          Each brick snaps in from a different direction — hover to feel the satisfying click.
        </motion.p>

        {/* Instruction booklet panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#FDFCFA",
            border: "1px solid rgba(173,117,86,0.2)",
            boxShadow: "6px 6px 0 #DCCFB8, 0 24px 60px rgba(0,0,0,0.18)",
          }}
        >
          {/* Booklet header */}
          <div
            className="px-8 py-4 flex items-center justify-between"
            style={{ backgroundColor: "#AD7556" }}
          >
            <div className="flex items-center gap-3">
              <BrickRow count={3} studs={1} color="#DCCFB8" size={18} className="opacity-70" />
              <span className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: "#FDFCFA" }}>
                Building Instructions
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "rgba(253,252,250,0.6)" }}>
              {categories.length} Steps
            </span>
          </div>

          {/* Steps */}
          <div className="p-6 space-y-4">
            {categories.map((cat, i) => (
              <SkillRow key={cat.label} cat={cat} rowIdx={i} />
            ))}
          </div>

          {/* Booklet footer */}
          <div className="px-8 py-3 flex items-center justify-between" style={{ backgroundColor: "#F5F3EC", borderTop: "1px solid rgba(173,117,86,0.12)" }}>
            <BrickRow count={6} studs={2} color="#AD7556" size={13} className="opacity-20" />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#AD7556", opacity: 0.5 }}>
              Stack Complete ✓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
