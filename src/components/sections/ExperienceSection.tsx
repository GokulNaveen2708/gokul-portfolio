"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/layout/MotionSection";
import { experiences } from "@/lib/data/experience";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function ExperienceSection() {
  return (
    <MotionSection
      id="experience"
      title="Experience"
      subtitle="Bringing distributed systems, AI, and cloud engineering into production."
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {experiences.map((exp) => (
          <motion.div key={exp.company} variants={itemVariants}>
            <ExperienceCard experience={exp} />
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}
