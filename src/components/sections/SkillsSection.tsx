"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { StudRow, BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoBrickStack } from "@/components/lego/LegoBrickStack";

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

/* ── One category row ── */
function SkillRow({ cat, rowIdx }: { cat: SkillCategory; rowIdx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Row label */}
      <div className="flex items-center gap-3 mb-4">
        <BrickRow count={2} studs={1} color={cat.brickColor} size={16} />
        <span
          className="text-xs font-black uppercase tracking-[0.22em]"
          style={{ color: "#AD7556", opacity: 0.75 }}
        >
          {cat.label}
        </span>
      </div>

      {/* Bricks */}
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
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-28 overflow-hidden baseplate-bg-tan"
    >
      {/* Decorative large background bricks */}
      <BackgroundBricks section="skills" />
      {/* Floating minifigs */}
      <FloatingMinifigs section="skills" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end gap-6 mb-4"
        >
          <div className="flex items-center gap-3">
            <BrickRow count={2} studs={2} color="#AD7556" size={22} />
            <h2
              style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif", fontSize: "0.8rem" }}
              className="text-xs font-black uppercase tracking-[0.3em]"
            >
              The Build Stack
            </h2>
          </div>
          <div style={{ marginBottom: -8 }}>
            <LegoBrickStack />
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

        {/* Wall panel */}
        <div
          className="p-8 rounded-2xl space-y-10"
          style={{
            backgroundColor: "#E0D8C8",
            border: "1px solid rgba(122,156,179,0.2)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Wall top stud rail */}
          <div
            className="flex gap-2.5 pb-6 border-b"
            style={{ borderColor: "rgba(122,156,179,0.12)" }}
          >
            <BrickRow count={10} studs={2} color="#FDFCFA" size={15} className="opacity-50" />
          </div>

          {categories.map((cat, i) => (
            <SkillRow key={cat.label} cat={cat} rowIdx={i} />
          ))}

          {/* Wall bottom stud rail */}
          <div
            className="flex gap-2.5 pt-6 border-t"
            style={{ borderColor: "rgba(122,156,179,0.12)" }}
          >
            <BrickRow count={10} studs={2} color="#FDFCFA" size={15} className="opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
