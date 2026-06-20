"use client";

import { motion } from "framer-motion";
import { BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoGradCap } from "@/components/lego/LegoGradCap";
import { LegoGradMinifig } from "@/components/lego/LegoGradMinifig";

interface School {
  name: string;
  degree: string;
  years: string;
  tag: string;
  headerColor: string;
  accentColor: string;
  shadowColor: string;
  stars: number;
  coursework: string[];
  projects: string[];
  note: string;
}

const schools: School[] = [
  {
    name: "Rochester Institute of Technology",
    degree: "MS · Computer Science",
    years: "2023 — 2025",
    tag: "Graduate",
    headerColor: "#53443D",
    accentColor: "#AD7556",
    shadowColor: "#3D302B",
    stars: 5,
    coursework: [
      "Distributed Systems",
      "Machine Learning Systems",
      "Scalable Software Design",
      "Big Data Analytics",
      "Natural Language Processing",
      "AI Engineering & MLOps",
    ],
    projects: [
      "Trust-Aware Federated Learning Framework",
      "Distributed ML Pipeline with KaggleScope",
      "TextMark: LLM Watermarking System",
      "Text Classification with UDA + BERT",
    ],
    note: "Distributed ML infrastructure, scalable system design, and AI-powered software engineering",
  },
  {
    name: "SASTRA University",
    degree: "B.Tech · Computer Science",
    years: "2017 — 2021",
    tag: "Undergraduate",
    headerColor: "#7A9CB3",
    accentColor: "#7A9CB3",
    shadowColor: "#4E7A8F",
    stars: 3.5,
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Database Management",
      "Theory of Computation",
    ],
    projects: [],
    note: "Built the engineering fundamentals powering production systems across 3 companies",
  },
];

/* ── Star rating — supports half stars ── */
function StarRating({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = value - i;
        const isHalf = fill > 0 && fill < 1;
        const isFull = fill >= 1;
        const id = `star-half-${color.replace("#", "")}-${i}`;
        return (
          <svg key={i} width={13} height={13} viewBox="0 0 24 24" style={{ display: "block" }}>
            {isHalf && (
              <defs>
                <clipPath id={id}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
            )}
            {/* Empty outline */}
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeLinejoin="round"
              opacity={0.4}
            />
            {/* Filled portion */}
            {(isFull || isHalf) && (
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill={color}
                clipPath={isHalf ? `url(#${id})` : undefined}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function DegreeCard({ school, index }: { school: School; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 140, damping: 20 }}
      whileHover={{ y: -8, transition: { duration: 0.18 } }}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#FDFCFA",
        border: `1px solid ${school.accentColor}30`,
        boxShadow: `5px 6px 0 ${school.shadowColor}, 0 20px 50px rgba(0,0,0,0.28)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header strip ── */}
      <div style={{ backgroundColor: school.headerColor, padding: "14px 20px 10px" }}>
        <BrickRow count={4} studs={2} color="rgba(253,252,250,0.25)" size={16} />
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(253,252,250,0.6)" }}>
            {school.tag}
          </span>
          <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(253,252,250,0.45)" }}>
            {school.years}
          </span>
        </div>
      </div>

      {/* ── School identity block ── */}
      <div style={{
        padding: "16px 20px",
        backgroundColor: school.accentColor + "12",
        borderBottom: `1px solid ${school.accentColor}20`,
      }}>
        <h3 style={{
          fontFamily: "Fredoka One, sans-serif",
          color: "#53443D",
          fontSize: "1.1rem",
          lineHeight: 1.2,
          margin: 0,
        }}>
          {school.name}
        </h3>
        <div style={{ marginTop: 5 }}>
          <span style={{ fontSize: 13, fontWeight: 900, color: school.accentColor }}>
            {school.degree}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Coursework */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: school.accentColor, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)" }} />
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.22em", color: school.accentColor }}>
              Coursework
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {school.coursework.map((c) => (
              <span key={c} style={{
                fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 5,
                backgroundColor: school.accentColor + "18", color: "#53443D",
                border: `1px solid ${school.accentColor}30`,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        {school.projects.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: school.accentColor, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)" }} />
              <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.22em", color: school.accentColor }}>
                Build Projects
              </span>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
              {school.projects.map((p) => (
                <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                  <span style={{ color: school.accentColor, fontSize: 11, lineHeight: 1.6, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#7A9CB3", lineHeight: 1.45 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Note */}
        <div style={{
          marginTop: "auto", padding: "8px 11px", borderRadius: 7,
          backgroundColor: school.accentColor + "0E", border: `1px solid ${school.accentColor}22`,
          fontSize: 11, fontStyle: "italic", fontWeight: 600, color: "#7A9CB3", lineHeight: 1.5,
        }}>
          {school.note}
        </div>
      </div>

      {/* ── Footer stats bar ── */}
      <div style={{
        backgroundColor: "#F1EFE6", borderTop: `1px solid ${school.accentColor}22`,
        padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: "#53443D" }}>
          {school.coursework.length} Courses
          {school.projects.length > 0 && ` · ${school.projects.length} Projects`}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7A9CB3" }}>
            Level
          </span>
          <StarRating value={school.stars} color={school.accentColor} />
        </div>
      </div>
    </motion.div>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="relative py-28 overflow-hidden baseplate-bg-dark">
      <BackgroundBricks section="education" />
      <FloatingMinifigs section="education" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label — grad cap sits beside the heading */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end gap-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <BrickRow count={2} studs={2} color="#AD7556" size={44} />
            <h2
              style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
              className="text-4xl sm:text-5xl font-black uppercase tracking-[0.06em]"
            >
              Academic Builds
            </h2>
          </div>
          {/* Grad cap — beside heading, drops in from above */}
          <div style={{ marginBottom: -8, flexShrink: 0 }}>
            <LegoGradCap size={1.1} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold mb-14 max-w-lg"
          style={{ color: "#7A9CB3" }}
        >
          Two degrees. Zero shortcuts. Built brick by brick.
        </motion.p>

        {/* Grid wrapper — relative so the grad minifig can float above it */}
        <div className="relative">
          {/* Grad minifig hovers at top-right of the card grid */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: -90,
              left: -60,
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <LegoGradMinifig size={0.8} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {schools.map((school, i) => (
              <DegreeCard key={school.name} school={school} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
