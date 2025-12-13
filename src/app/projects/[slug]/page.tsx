import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { ProjectPageActions, ProjectBackButton } from "@/components/projects/ProjectPageActions";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Optional: for static generation
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

async function waitForLoading(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  if (process.env.NODE_ENV === "development") {
    await waitForLoading(500);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-0 sm:py-16">
      <ProjectBackButton />
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-3">
          <Tag>{project!.category}</Tag>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {project!.title}
            </h1>

            {project!.subtitle && (
              <p className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                {project!.subtitle}
              </p>
            )}
          </div>
        </div>

        {project!.githubUrl && (
          <div className="hidden md:flex md:items-center md:ml-4">
            <Button asChild variant="link" size="sm">
              <a
                href={project!.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-accent/90"
                aria-label="View source on GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .323.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="w-full">
          {project!.image && (
            <div className="overflow-hidden rounded-xl mx-auto max-w-full flex justify-center md:pl-12">
              <Image
                src={project!.image}
                alt={project!.title}
                width={1200}
                height={700}
                className="object-contain w-full h-auto"
              />
            </div>
          )}

          <p className="mt-6 text-sm text-fg-muted sm:text-base">
            {project!.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project!.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-fg-muted">
              Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-fg-muted">
              {project!.highlightBullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">
                  • {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: show action buttons under the content */}
          <div className="mt-6 flex flex-wrap gap-3 md:hidden">
            {project!.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={project!.githubUrl} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </Button>
            )}

            
          </div>
        </div>

    

      </div>

      <ProjectPageActions />
    </div>
  );
}
