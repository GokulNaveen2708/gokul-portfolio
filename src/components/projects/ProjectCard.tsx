"use client";

import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent px-6 py-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-accent/10 backdrop-blur-[22px]"
    >
      {/* 1. Glassy Glow Effect (Gradient Blob) */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-[50px] transition-all duration-500 group-hover:bg-accent/30" />
      
      {/* 2. Content Container (Relative to sit above the glow) */}
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        
        {/* Left Side: Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent sm:text-xl">
              {project.title}
            </h3>
            {/* Mobile Category Badge (Only shows on tiny screens) */}
            <span className="inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-fg-muted sm:hidden">
              {project.category}
            </span>
          </div>

          {project.subtitle && (
            <p className="text-xs font-medium uppercase tracking-widest text-fg-muted/70">
              {project.subtitle}
            </p>
          )}

          <p className="max-w-xl text-sm leading-relaxed text-fg-muted group-hover:text-white/80">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.slice(0, 7).map((tag) => (
              <Tag
                key={tag}
                className="bg-white/10 text-white/80 backdrop-blur-sm border border-white/20 group-hover:border-white/10"
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Right Side: Metadata & Action */}
        <div className="flex shrink-0 flex-col items-end justify-between gap-4 sm:h-full">
          {/* Desktop Category Badge */}
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-fg-muted backdrop-blur-md transition-colors group-hover:border-accent/30 group-hover:text-white sm:inline-block">
            {project.category}
          </span>

          {/* Animated Arrow Button */}
          <div className="flex items-center gap-2 text-sm font-medium text-fg-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
            <span>View Case Study</span>
            <span className="text-lg leading-none">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
