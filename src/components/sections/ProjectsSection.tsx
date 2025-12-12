"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/layout/MotionSection";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function ProjectsSection() {
  return (
    <MotionSection
      id="projects"
      title="Featured Projects"
      subtitle="Systems that ship, scale, and survive real-world constraints."
    >
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
      >
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.15 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </MotionSection>
  );
}
