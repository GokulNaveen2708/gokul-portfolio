"use client";

import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block w-full overflow-hidden glass-card px-6 py-6 fade-up is-visible"
    >
      <div className="glow-dot -right-4 -top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: Thumbnail + Content */}
        <div className="flex gap-4 flex-1">
          {/* Project thumbnail */}
          {project.image && (
            <div className="hidden sm:block flex-shrink-0 h-20 w-28 rounded-lg overflow-hidden border border-white/[0.06] bg-white/[0.02]">
              <Image
                src={project.image}
                alt={project.title}
                width={112}
                height={80}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-3">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent sm:text-xl leading-snug">
                {project.title}
              </h3>
              <span className="hidden sm:inline-block flex-shrink-0 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 text-[10px] font-medium text-fg-muted">
                {project.category}
              </span>
            </div>

            {project.subtitle && (
              <p className="text-[11px] font-medium uppercase tracking-widest text-fg-muted/60">
                {project.subtitle}
              </p>
            )}

            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-fg-muted group-hover:text-white/70 transition-colors line-clamp-2">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.slice(0, 5).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {project.tags.length > 5 && (
                <span className="text-[10px] text-fg-muted/50 self-center">
                  +{project.tags.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Arrow */}
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-fg-muted transition-all group-hover:translate-x-1 group-hover:text-accent flex-shrink-0 self-center">
          <span>View</span>
          <span className="text-lg leading-none">→</span>
        </div>
      </div>
    </Link>
  );
}
