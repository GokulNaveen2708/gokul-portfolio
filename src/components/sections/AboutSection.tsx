"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StudRow, BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoLaptop } from "@/components/lego/LegoLaptop";

const quickStats = [
  { label: "MS @ RIT",        color: "#7A9CB3" },
  { label: "2+ Yrs Exp",      color: "#53443D" },
  { label: "Seattle, WA",     color: "#AD7556" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden baseplate-bg-tan"
    >
      {/* Decorative large background bricks */}
      <BackgroundBricks section="about" />
      <FloatingMinifigs section="about" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end gap-4 mb-16"
        >
          <div className="flex items-center gap-3">
            <BrickRow count={2} studs={2} color="#AD7556" size={22} />
            <h2
              className="text-xs font-black uppercase tracking-[0.3em]"
              style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif", fontSize: "0.8rem" }}
            >
              About the Builder
            </h2>
          </div>
          <div style={{ marginBottom: -6, opacity: 0.88 }}>
            <LegoLaptop size={0.38} animated={false} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="lg:col-span-4 flex flex-col items-center gap-4"
          >
            {/* Tan brick photo frame */}
            <div
              className="relative w-full max-w-xs"
              style={{
                backgroundColor: "#AD7556",
                borderRadius: 12,
                padding: 4,
                boxShadow: "6px 6px 0 #AD7556, 12px 12px 0 #AD7556, 0 20px 50px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top studs */}
              <div className="flex gap-2 px-3 pt-2 pb-1">
                <BrickRow count={2} studs={2} color="#AD7556" size={22} />
              </div>

              {/* Photo */}
              <div
                className="relative w-full overflow-hidden"
                style={{ borderRadius: 8, aspectRatio: "4/5", backgroundColor: "#FDFCFA" }}
              >
                <Image
                  src="/DisplayPicture.jpg"
                  alt="Gokul Naveen"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 300px"
                />
              </div>

              {/* Bottom studs */}
              <div className="flex gap-2 px-3 pt-1 pb-2">
                <BrickRow count={2} studs={2} color="#AD7556" size={22} />
              </div>
            </div>

            {/* Name label */}
            <div
              className="text-center px-6 py-3 rounded-lg w-full max-w-xs"
              style={{
                backgroundColor: "#FDFCFA",
                border: "1px solid rgba(83,68,61,0.2)",
              }}
            >
              <p className="font-black text-lg" style={{ color: "#AD7556" }}>Gokul Naveen</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "#7A9CB3" }}>Software Engineer</p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              {quickStats.map((s) => (
                <span
                  key={s.label}
                  className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded"
                  style={{ backgroundColor: s.color, color: "#53443D" }}
                >
                  {s.label}
                </span>
              ))}
            </div>


          </motion.div>

          {/* ── RIGHT: Bio panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 120 }}
            className="lg:col-span-8"
          >
            {/* Slate gray brick panel */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#FDFCFA",
                border: "1px solid rgba(122,156,179,0.3)",
                boxShadow: "6px 6px 0 #E8E0D0, 0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              {/* Panel header */}
              <div
                className="px-8 py-4 flex items-center gap-3"
                style={{ backgroundColor: "#7A9CB3" }}
              >
                <BrickRow count={3} studs={1} color="#AD7556" size={18} />
                <span
                  className="ml-auto text-xs font-black uppercase tracking-[0.3em]"
                  style={{ color: "#53443D", fontFamily: "Fredoka One, sans-serif" }}
                >
                  The Builder&apos;s Blueprint
                </span>
              </div>

              <div className="px-8 py-8 space-y-8">
                {/* Bio */}
                <p
                  className="text-xl leading-relaxed font-semibold"
                  style={{ color: "#AD7556" }}
                >
                  I&apos;m a Software Engineer who takes ambiguous, large-scale problems
                  and builds systems that{" "}
                  <span style={{ color: "#53443D" }}>stay reliable under pressure.</span>
                </p>
                <p className="text-base leading-relaxed font-semibold" style={{ color: "#7A9CB3" }}>
                  With an MS in Computer Science from RIT and 2+ years across Accenture, RIT,
                  and Reliable Software, I specialize in{" "}
                  <span style={{ color: "#AD7556" }}>distributed systems, event-driven architectures,</span>{" "}
                  and{" "}
                  <span style={{ color: "#AD7556" }}>ML infrastructure</span>{" "}
                  — building production systems that process millions of jobs and transactions daily.
                </p>
                <p className="text-base leading-relaxed font-semibold" style={{ color: "#7A9CB3" }}>
                  Currently at <span style={{ color: "#53443D" }}>Reliable Software in Seattle, WA</span>,
                  where I own a distributed job-orchestration platform automating 1M+ jobs/month across 40+
                  engineering teams.
                </p>

                {/* Highlight bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "rgba(122,156,179,0.2)" }}>
                  {[
                    "Event-driven & distributed systems",
                    "ML pipelines & AI infrastructure",
                    "Cloud-native (AWS, GCP, Kubernetes)",
                    "Observability & production reliability",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className="stud flex-shrink-0"
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: "#AD7556",
                          boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)",
                        }}
                      />
                      <span className="text-sm font-bold" style={{ color: "#53443D" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom stud footer */}
              <div className="px-8 py-3" style={{ backgroundColor: "#F5F3EC" }}>
                <BrickRow count={5} studs={2} color="#7A9CB3" size={16} className="opacity-40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
