"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { StudRow, Stud3D, BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoTrophy }    from "@/components/lego/LegoTrophy";
import { CatPawPrints } from "@/components/lego/CatPawPrints";

/* Category color mapping */
const catMap: Record<string, { color: string; label: string }> = {
  "All":                         { color: "#7A9CB3",  label: "All Sets" },
  "AI / Agentic Systems":        { color: "#AD7556",  label: "AI & Agents" },
  "Developer Tools":             { color: "#7A9CB3",  label: "Dev Tools" },
  "Cloud & Distributed Systems": { color: "#53443D",  label: "Cloud" },
  "LLM Governance":              { color: "#A090A0",  label: "LLM Gov" },
  "AI Security":                 { color: "#C07060",  label: "AI Security" },
  "Data Engineering":            { color: "#7A9CB3",  label: "Data Eng" },
  "Machine Learning":            { color: "#7A9CB3",  label: "ML" },
};

const categories = Object.keys(catMap);

function getCatColor(cat: string) {
  return catMap[cat]?.color ?? "#7A9CB3";
}

/* ── Skill chip ── */
function TagChip({ tag }: { tag: string }) {
  return (
    <span
      className="text-xs font-bold px-2.5 py-1 rounded-md"
      style={{
        backgroundColor: "rgba(122,156,179,0.15)",
        color: "#7A9CB3",
        border: "1px solid rgba(122,156,179,0.2)",
      }}
    >
      {tag}
    </span>
  );
}

/* ── Project card (no navigation — click opens modal) ── */
function ProjectCard({
  project,
  idx,
  onClick,
}: {
  project: (typeof projects)[0];
  idx: number;
  onClick: () => void;
}) {
  const color = getCatColor(project.category);
  const setNum = `SET #${2401 + idx}`;

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width  - 0.5;
    const dy = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ x: -dy * 10, y: dx * 10 });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (idx % 3) * 0.08, type: "spring", stiffness: 180, damping: 22 }}
      onClick={onClick}
      className="text-left w-full h-full"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="brick-card h-full flex flex-col group"
        style={{
          backgroundColor: "#FDFCFA",
          transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? "transform 0.4s ease" : "transform 0.08s ease",
          willChange: "transform",
        }}
      >
        {/* Stud header */}
        <div
          className="px-5 py-3 flex items-center gap-2.5"
          style={{ backgroundColor: color + "cc" }}
        >
          <BrickRow count={2} studs={1} color="rgba(241,239,230,0.7)" size={18} />
          <span className="ml-auto text-xs font-black uppercase tracking-widest" style={{ color: "rgba(241,239,230,0.65)" }}>
            {setNum}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Category badge */}
          <span
            className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded mb-3 inline-block"
            style={{ backgroundColor: color + "28", color: "#AD7556", border: `1px solid ${color}40` }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h3
            className="text-lg font-black uppercase leading-tight mb-3"
            style={{ color: "#53443D", fontFamily: "Fredoka One, sans-serif" }}
          >
            {project.title.split(":")[0]}
          </h3>

          {/* Summary */}
          <p className="text-sm font-semibold leading-relaxed flex-1 mb-4" style={{ color: "#7A9CB3" }}>
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((t) => <TagChip key={t} tag={t} />)}
          </div>

          {/* Footer row */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{ borderColor: "rgba(122,156,179,0.18)" }}
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider" style={{ color }}>
              <span>View Details</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m6 0l-3-3m3 3l-3 3" />
              </svg>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-colors"
                style={{ color, backgroundColor: color + "18", border: `1px solid ${color}40` }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .323.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Bottom studs */}
        <div className="px-5 py-2" style={{ backgroundColor: "#F5F3EC" }}>
          <BrickRow count={3} studs={1} color={color} size={16} className="opacity-25" />
        </div>
      </div>
    </motion.button>
  );
}

/* ── Section block inside modal ── */
function ModalBlock({ color, label, children }: { color: string; label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FDFCFA", border: `1px solid ${color}28` }}
    >
      {/* Block header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2.5"
        style={{ backgroundColor: color + "22", borderBottom: `1px solid ${color}28` }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color, display: "inline-block", flexShrink: 0, boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.3)" }} />
        <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "#AD7556" }}>{label}</span>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

/* ── Modal ── */
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}) {
  const color = project ? getCatColor(project.category) : "#7A9CB3";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop — click to close */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(8,14,24,0.9)", backdropFilter: "blur(8px)" }}
          />

          {/* Flex centering wrapper — keeps FM y-animation clean */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 48, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="w-full overflow-y-auto rounded-2xl pointer-events-auto"
              data-lenis-prevent
              style={{
                maxWidth: 700,
                maxHeight: "90vh",
                backgroundColor: "#F1EFE6",
                border: `1px solid ${color}50`,
                boxShadow: `0 0 0 1px ${color}18, 0 48px 120px rgba(0,0,0,0.75)`,
              }}
            >
              {/* Sticky header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
                style={{ backgroundColor: color + "e8", backdropFilter: "blur(10px)" }}
              >
                <BrickRow count={3} studs={2} color="rgba(241,239,230,0.65)" size={18} />
                <button
                  onClick={onClose}
                  id="project-modal-close"
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "#FDFCFA" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 pt-6 pb-8 space-y-5">

                {/* Title block */}
                <div>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <span
                      className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded"
                      style={{ backgroundColor: color + "28", color: "#AD7556", border: `1px solid ${color}40` }}
                    >
                      {project.category}
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#FDFCFA", color: "#AD7556", border: "1px solid rgba(83,68,61,0.2)" }}
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .323.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                  <h2
                    className="text-2xl font-black uppercase mt-3 leading-tight"
                    style={{ color: "#53443D", fontFamily: "Fredoka One, sans-serif" }}
                  >
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: "#7A9CB3" }}>
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Project image */}
                {project.image && (
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: `1px solid ${color}30`, backgroundColor: "#FDFCFA" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: 220 }}
                    />
                  </div>
                )}

                {/* Summary */}
                <p className="text-sm font-semibold leading-relaxed" style={{ color: "#7A9CB3" }}>
                  {project.summary}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => <TagChip key={t} tag={t} />)}
                </div>

                {/* Problem */}
                {project.problemStatement && (
                  <ModalBlock color={color} label="Problem">
                    <p className="text-sm font-semibold leading-relaxed" style={{ color: "#7A9CB3" }}>
                      {project.problemStatement}
                    </p>
                  </ModalBlock>
                )}

                {/* Technical approach */}
                {project.technicalApproach && (
                  <ModalBlock color={color} label="How It&apos;s Built">
                    <p className="text-sm font-semibold leading-relaxed" style={{ color: "#7A9CB3" }}>
                      {project.technicalApproach}
                    </p>
                  </ModalBlock>
                )}

                {/* Highlights */}
                <ModalBlock color={color} label="Key Highlights">
                  <ul className="space-y-2.5">
                    {project.highlightBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded text-xs font-black flex items-center justify-center mt-0.5"
                          style={{ backgroundColor: color + "28", color: "#AD7556" }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold leading-relaxed" style={{ color: "#7A9CB3" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </ModalBlock>


              </div>

              {/* Bottom stud rail */}
              <div className="px-6 py-3" style={{ backgroundColor: "#E0D8C8" }}>
                <BrickRow count={5} studs={2} color={color} size={14} className="opacity-20" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main section ── */
export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 overflow-hidden baseplate-bg">
      {/* Decorative large background bricks */}
      <BackgroundBricks section="projects" />
      <FloatingMinifigs section="projects" />
      <CatPawPrints />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <BrickRow count={2} studs={2} color="#7A9CB3" size={44} />
          <h2
            className="text-4xl sm:text-5xl font-black uppercase tracking-[0.06em]"
            style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
          >
            Project Showcase
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold mb-10 max-w-lg"
          style={{ color: "#7A9CB3" }}
        >
          Click any set to open the instruction booklet.
        </motion.p>

        {/* Category filter bricks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-12 items-end"
        >
          {categories.map((cat) => {
            const info = catMap[cat];
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className="flex flex-col items-center group"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                {/* 3D stud on top */}
                <Stud3D
                  color={active ? info.color : "#FDFCFA"}
                  size={12}
                />
                {/* Brick body — isometric 3D faces via position:relative + pseudo via inline wrapper */}
                <div
                  className="relative px-4 py-2 rounded text-xs font-black uppercase tracking-wider transition-all duration-200"
                  style={{
                    backgroundColor: active ? info.color : "#FDFCFA",
                    color: active ? "#53443D" : "#7A9CB3",
                    /* right face shadow */
                    boxShadow: active
                      ? `4px 0 0 rgba(0,0,0,0.3), 0 5px 0 rgba(0,0,0,0.4), 4px 5px 0 rgba(0,0,0,0.35)`
                      : `3px 0 0 rgba(0,0,0,0.25), 0 4px 0 rgba(0,0,0,0.35), 3px 4px 0 rgba(0,0,0,0.28)`,
                    transform: active ? "translateY(-3px) translateX(-2px)" : "none",
                    marginTop: -1,
                  }}
                >
                  {info.label}
                </div>
              </button>
            );
          })}
          {/* Trophy at the right end of categories */}
          <div style={{ marginLeft: "auto", alignSelf: "flex-end", opacity: 0.88 }}>
            <LegoTrophy size={0.55} />
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard
                  project={project}
                  idx={idx}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
