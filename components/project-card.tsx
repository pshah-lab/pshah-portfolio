import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CardProject, Project } from "@/content/types";
import { FlowDiagram } from "./flow-diagram";
import { cn } from "@/lib/utils";

/** Large card for featured work: image (or architecture when there is no honest screenshot). */
export function FeaturedProject({ project, priority = false }: { project: Project; priority?: boolean }) {
  const href = `/projects/${project.slug}`;
  const flow = project.caseStudy?.architecture[0];
  const metric = project.metrics?.[0];
  return (
    <article className="panel grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
      <div className="relative border-b border-line bg-bg lg:border-b-0 lg:border-r">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority={priority}
            sizes="(min-width: 1200px) 620px, (min-width: 1024px) 52vw, 100vw"
            className="h-full w-full object-cover object-top"
          />
        ) : flow ? (
          <div className="p-4 sm:p-6">
            <FlowDiagram flow={flow} vertical bare />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="text-sm text-muted">
          {project.kind}
          {project.period ? `, ${project.period}` : ""}
        </p>
        <h3 className="mt-2 font-display text-[1.75rem] leading-tight">
          <Link href={href} className="hover:text-accent" data-track="project_click" data-track-label={project.slug}>
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-lg leading-snug text-ink">{project.summary}</p>
        <p className="mt-3 text-muted">{project.description}</p>
        {metric && (
          <p className="mt-5 border-l-2 border-accent pl-3 text-sm">
            <span className="font-semibold tabular-nums text-ink">{metric.value}</span> {metric.label}
            <span className="block text-xs text-muted">Source: {metric.source}</span>
          </p>
        )}
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.slice(0, 6).map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          <Link href={href} className="btn-primary" data-track="project_click" data-track-label={`${project.slug}:case-study`}>
            Read the case study
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

/** Compact card for the rest of the work. */
export function ProjectCard({ project }: { project: CardProject }) {
  const hasCase = project.hasCaseStudy;
  const primary = hasCase ? `/projects/${project.slug}` : project.links.live || project.links.repo;
  return (
    <article className="panel flex h-full flex-col p-5">
      <p className="text-xs text-muted">
        {project.kind}
        {project.period ? `, ${project.period}` : ""}
      </p>
      <h3 className="mt-1.5 text-lg">
        {primary &&
          (hasCase ? (
            <Link href={primary} className="hover:text-accent" data-track="project_click" data-track-label={project.slug}>
              {project.name}
            </Link>
          ) : (
            <a href={primary} target="_blank" rel="noopener noreferrer" className="hover:text-accent" data-track="project_click" data-track-label={project.slug}>
              {project.name}
            </a>
          ))}
      </h3>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.slice(0, 4).map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-sm">
        {hasCase && (
          <Link href={`/projects/${project.slug}`} className="link">
            Case study
          </Link>
        )}
        <ProjectLinks project={project} variant="text" />
      </div>
    </article>
  );
}

export function ProjectLinks({ project, variant = "button" }: { project: Pick<Project, "slug" | "links">; variant?: "button" | "text" }) {
  const items = [
    project.links.live && { href: project.links.live, label: project.links.live.includes("darkmode") ? "Website" : "Live site", event: "project_live_click" },
    project.links.store && { href: project.links.store, label: "Chrome Web Store", event: "project_live_click" },
    project.links.repo && { href: project.links.repo, label: "Source", event: "github_click" },
  ].filter(Boolean) as { href: string; label: string; event: string }[];

  return (
    <>
      {items.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          data-track={l.event}
          data-track-label={project.slug}
          className={cn(variant === "button" ? "btn-secondary" : "inline-flex items-center gap-1 text-muted hover:text-ink")}
        >
          {l.label}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </>
  );
}
