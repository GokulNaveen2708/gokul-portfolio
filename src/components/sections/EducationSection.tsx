"use client";

import { motion } from "framer-motion";
import { StudRow, BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";

interface School {
  name: string;
  degree: string;
  years: string;
  studColor: string;
  coursework: string[];
  projects: string[];
  note?: string;
}

const schools: School[] = [
  {
    name: "Rochester Institute of Technology",
    degree: "MS · Computer Science",
    years: "2023 — 2025",
    studColor: "#AD7556",
    coursework: [
      "Distributed Systems",
      "Machine Learning",
      "Big Data Analytics",
      "Advanced Database Systems",
      "Natural Language Processing",
      "Computer Vision",
    ],
    projects: [
      "Trust-Aware Federated Learning Framework",
      "Meta-Kaggle Large-Scale Data Analytics",
      "TextMark: LLM Watermarking System",
      "Text Classification with UDA + BERT",
    ],
    note: "Graduate focus on distributed ML and scalable system design",
  },
  {
    name: "SASTRA University",
    degree: "B.Tech · Computer Science",
    years: "2017 — 2021",
    studColor: "#53443D",
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

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-28 overflow-hidden baseplate-bg-dark"
    >
      {/* Decorative large background bricks */}
      <BackgroundBricks section="education" />
      {/* Floating minifigs */}
      <FloatingMinifigs section="education" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <BrickRow count={2} studs={2} color="#53443D" size={22} />
          <h2
            style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif", fontSize: "0.8rem" }}
            className="text-xs font-black uppercase tracking-[0.3em]"
          >
            Instruction Manuals
          </h2>
        </motion.div>

        {/* Two booklet cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schools.map((school, idx) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, rotateY: -15, x: idx === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: idx * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 140,
                damping: 20,
              }}
              className="h-full"
            >
              <div
                className="h-full rounded-xl overflow-hidden flex flex-col"
                style={{
                  backgroundColor: "#FDFCFA",
                  border: `1px solid ${school.studColor}30`,
                  boxShadow: `5px 5px 0 ${school.studColor}30, 0 20px 60px rgba(0,0,0,0.35)`,
                }}
              >
                {/* Booklet top stripe */}
                <div
                  className="px-6 py-4"
                  style={{ backgroundColor: school.studColor + "cc" }}
                >
                  <BrickRow count={3} studs={2} color="rgba(241,239,230,0.6)" size={18} />
                  <div className="mt-3 flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="rgba(241,239,230,0.8)" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span
                      className="text-xs font-black uppercase tracking-[0.25em]"
                      style={{ color: "rgba(241,239,230,0.85)" }}
                    >
                      Instruction Manual #{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-6 flex flex-col flex-1">
                  {/* School name & degree */}
                  <h3
                    className="text-xl font-black uppercase leading-tight"
                    style={{ color: "#53443D", fontFamily: "Fredoka One, sans-serif" }}
                  >
                    {school.name}
                  </h3>
                  <p className="text-sm font-bold mt-1" style={{ color: "#AD7556" }}>
                    {school.degree}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1 mb-6" style={{ color: "#7A9CB3" }}>
                    {school.years}
                  </p>

                  {/* Divider */}
                  <div className="border-t mb-5" style={{ borderColor: "rgba(122,156,179,0.2)" }} />

                  {/* Coursework */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="stud flex-shrink-0"
                        style={{ width: 10, height: 10, backgroundColor: school.studColor, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)" }}
                      />
                      <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: school.studColor === "#AD7556" ? "#AD7556" : school.studColor }}>
                        Coursework Focus
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {school.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-xs font-bold px-2.5 py-1.5 rounded"
                          style={{
                            backgroundColor: school.studColor + "22",
                            color: "#7A9CB3",
                            border: `1px solid ${school.studColor}30`,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  {school.projects.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="stud flex-shrink-0"
                          style={{ width: 10, height: 10, backgroundColor: school.studColor, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)" }}
                        />
                        <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: school.studColor === "#AD7556" ? "#AD7556" : school.studColor }}>
                          Capstone Projects
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {school.projects.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <span className="text-xs mt-0.5" style={{ color: school.studColor }}>▸</span>
                            <span className="text-sm font-semibold" style={{ color: "#7A9CB3" }}>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Note */}
                  {school.note && (
                    <div
                      className="mt-auto pt-4 border-t text-xs font-bold italic"
                      style={{ color: "#7A9CB3", borderColor: "rgba(122,156,179,0.15)" }}
                    >
                      {school.note}
                    </div>
                  )}
                </div>

                {/* Bottom stud row */}
                <div className="px-6 py-3" style={{ backgroundColor: "#F5F3EC" }}>
                  <BrickRow count={4} studs={2} color={school.studColor} size={14} className="opacity-30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
