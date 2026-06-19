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

        {/* Right: GitHub + Arrow */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0 self-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-semibold text-fg-muted hover:text-accent transition-colors px-2.5 py-1.5 rounded-md border border-white/[0.06] hover:border-accent/30 bg-white/[0.02] hover:bg-accent/5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .323.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          <div className="flex items-center gap-2 text-sm font-medium text-fg-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
            <span>View</span>
            <span className="text-lg leading-none">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
