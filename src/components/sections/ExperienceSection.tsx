"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data/experience";
import { StudRow, BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoTrain } from "@/components/lego/LegoTrain";

const studColors = ["#7A9CB3", "#AD7556", "#DCCFB8", "#53443D"];
const stepColors = ["#53443D", "#AD7556", "#FDFCFA", "#E8E0D0"];
const stepLabels = ["STEP 01 · CURRENT", "STEP 02", "STEP 03", "STEP 04"];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 overflow-hidden baseplate-bg-dark">
      <BackgroundBricks section="experience" />
      <FloatingMinifigs section="experience" />
      <LegoTrain direction="ltr" duration={30} bodyColor="#7A9CB3" accentColor="#AD7556" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <BrickRow count={2} studs={2} color="#AD7556" size={22} />
          <h2
            className="text-xs font-black uppercase tracking-[0.3em]"
            style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif", fontSize: "0.8rem" }}
          >
            Professional Experience
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold mb-20 max-w-lg"
          style={{ color: "#7A9CB3" }}
        >
          {experiences.length} companies · {experiences.reduce((a, e) => a + (e.responsibilities?.length ?? 0), 0)}+ key contributions
        </motion.p>

        <div className="relative">
          {/* Vertical brick pillar */}
          <div
            className="absolute left-6 top-0 bottom-0 w-2.5 rounded-full hidden lg:block"
            style={{
              background: "linear-gradient(to bottom, #7A9CB3, #AD7556, #DCCFB8)",
              boxShadow: "2px 0 8px rgba(83,68,61,0.3)",
            }}
          />

          <div className="space-y-10 lg:pl-24">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -60, rotate: -1.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 150,
                  damping: 22,
                }}
                className="relative"
              >
                {/* Pillar connector */}
                <div
                  className="absolute -left-[4.3rem] top-7 w-5 h-5 rounded-full hidden lg:block"
                  style={{
                    backgroundColor: studColors[idx],
                    boxShadow: `0 0 0 3px #F1EFE6, 0 0 0 5px ${studColors[idx]}55, inset 0 -2px 0 rgba(0,0,0,0.25)`,
                  }}
                />

                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: "#FDFCFA",
                    border: `1px solid ${studColors[idx]}35`,
                    boxShadow: `5px 5px 0 ${studColors[idx]}25, 0 20px 60px rgba(0,0,0,0.35)`,
                  }}
                >
                  {/* Header strip */}
                  <div
                    className="px-6 py-3.5 flex items-center gap-3"
                    style={{ backgroundColor: stepColors[idx] ?? "#F5F3EC" }}
                  >
                    <BrickRow count={3} studs={2} color={studColors[idx]} size={18} />
                    <span
                      className="ml-auto text-xs font-black uppercase tracking-[0.25em]"
                      style={{ color: studColors[idx], opacity: 0.8 }}
                    >
                      {stepLabels[idx]}
                    </span>
                  </div>

                  <div className="px-6 py-6">
                    {/* Company + role */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        <h3
                          className="text-2xl font-black uppercase tracking-tight"
                          style={{ color: "#53443D", fontFamily: "Fredoka One, sans-serif" }}
                        >
                          {exp.company}
                        </h3>
                        <p className="font-bold mt-1" style={{ color: "#AD7556", fontSize: "1rem" }}>
                          {exp.role}
                        </p>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: "#7A9CB3" }}>
                          📍 {exp.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        <span
                          className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded"
                          style={{ backgroundColor: studColors[idx] + "22", color: "#AD7556" }}
                        >
                          {exp.start} — {exp.end}
                        </span>
                        {idx === 0 && (
                          <span
                            className="text-xs font-black px-2 py-1 rounded flex items-center gap-1.5"
                            style={{ backgroundColor: "#7A9CB322", color: "#7A9CB3", border: "1px solid #7A9CB340" }}
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#7A9CB3" }} />
                              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#7A9CB3" }} />
                            </span>
                            Current Role
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Impact strip */}
                    <div
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-lg mb-6"
                      style={{
                        backgroundColor: studColors[idx] + "15",
                        color: "#AD7556",
                        border: `1px solid ${studColors[idx]}30`,
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: studColors[idx], display: "inline-block" }} />
                      {exp.impact}
                    </div>

                    {/* Detailed responsibilities */}
                    <div className="mb-5">
                      <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#7A9CB3" }}>
                        What I built & delivered:
                      </div>
                      <ul className="space-y-3">
                        {(exp.responsibilities ?? []).map((r, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="flex-shrink-0 mt-1.5 rounded-full"
                              style={{
                                width: 8,
                                height: 8,
                                backgroundColor: studColors[idx],
                                boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.3)",
                                display: "inline-block",
                              }}
                            />
                            <span className="text-sm font-semibold leading-relaxed" style={{ color: "#7A9CB3" }}>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech highlights */}
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs font-bold px-2.5 py-1.5 rounded"
                          style={{
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
                  <div className="px-6 py-3" style={{ backgroundColor: "#F5F3EC" }}>
                    <BrickRow count={4} studs={2} color={studColors[idx]} size={14} className="opacity-25" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
