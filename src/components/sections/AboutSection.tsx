"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/layout/MotionSection";
import { TECH_STACKS } from "@/lib/data/techStacks";

export function AboutSection() {
  const [currentStack, setCurrentStack] = useState(0);
  const activeStack = TECH_STACKS[currentStack];

  // Auto-rotate carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStack((prev) => (prev + 1) % TECH_STACKS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const item = { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } };

  return (
    <MotionSection id="about" title="ABOUT" subtitle="Who I am & what I build">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT: intro + capabilities — match right side height */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <article className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/6 via-white/10 to-transparent p-6 backdrop-blur-[20px] shadow-2xl shadow-accent/8 flex-1 flex flex-col">
            <h3 className="text-3xl font-bold text-white">Hi, I&apos;m Gokul</h3>
            <p className="mt-2 italic text-fg-muted">I build resilient distributed systems and pragmatic ML infra.</p>

            <div className="mt-4 text-sm text-fg-muted flex-1">
              <p>
                I take ambiguous problems and design systems that stay reliable
                at scale — event-driven backends, observability-first services,
                and production-ready ML pipelines. I prioritize clear contracts,
                measurable SLOs, and simple, testable primitives.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={item}
                className="rounded-2xl border border-white/8 bg-white/5 p-4 hover:border-accent/50 transition group cursor-pointer"
              >
                <p className="text-sm font-semibold text-white group-hover:text-accent transition">Distributed Systems</p>
                <p className="mt-2 text-xs text-fg-muted group-hover:text-fg transition">Service boundaries, async contracts, gRPC, Kafka, and high-throughput APIs.</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={item}
                className="rounded-2xl border border-white/8 bg-white/5 p-4 hover:border-accent/50 transition group cursor-pointer"
              >
                <p className="text-sm font-semibold text-white group-hover:text-accent transition">Data & ML Infrastructure</p>
                <p className="mt-2 text-xs text-fg-muted group-hover:text-fg transition">ML pipelines, model deployment, monitoring, and secure data flows.</p>
              </motion.div>
            </div>

            {/* Social Links & Resume */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com/in/gokul-naveen/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-accent/50 hover:bg-accent/10 transition group"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="h-4 w-4 invert" />
                <span className="text-sm text-fg-muted group-hover:text-accent transition">LinkedIn</span>
              </a>

              <a
                href="https://github.com/GokulNaveen2708"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-accent/50 hover:bg-accent/10 transition group"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="h-4 w-4 invert" />
                <span className="text-sm text-fg-muted group-hover:text-accent transition">GitHub</span>
              </a>

              <a
                href="https://drive.google.com/file/d/1Vdu4-khWJya5zIyRFefEbLQeo5si-qhT/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-accent/50 hover:bg-accent/10 transition group"
              >
                <span className="text-sm font-semibold text-fg-muted group-hover:text-accent transition">Resume</span>
              </a>
            </div>
          </article>
        </div>

        {/* RIGHT: rotating tech stack carousel */}
        <aside className="lg:col-span-1 flex flex-col h-full">
          {/* Stack carousel with rotation effect */}
          <div className="flex-1 flex flex-col rounded-2xl border border-white/8 bg-gradient-to-br from-white/6 to-transparent p-6 backdrop-blur-sm shadow-lg shadow-white/5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg-muted group-hover:text-accent transition">{activeStack.title}</h4>
              <div className="flex gap-1">
                {TECH_STACKS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStack(idx)}
                    className={`h-2 w-2 rounded-full transition ${
                      idx === currentStack ? "bg-accent w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Stack ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Tech grid with consolidated animation - fixed 4 cols layout */}
            <motion.div
              key={currentStack}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex items-start"
            >
              <div className="w-full grid grid-cols-4 gap-3">
                {activeStack.items.map((tech) => (
                  <button
                    key={tech.name}
                    className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-3 backdrop-blur-sm hover:border-accent/50 transition-colors group aspect-square"
                    aria-label={tech.name}
                  >
                    <div className="h-10 w-10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <img src={tech.src} alt={tech.name} className="h-6 w-6 object-contain" />
                    </div>
                    <span className="mt-2 text-[9px] text-fg-muted group-hover:text-accent text-center line-clamp-2 transition-colors">{tech.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </aside>
      </div>
    </MotionSection>
  );
}
