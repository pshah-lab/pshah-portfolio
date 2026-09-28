"use client";

import { useMemo, useState } from "react";
import type { CardProject, ProjectCategory } from "@/content/types";
import { categoryLabels } from "@/content/categories";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

/**
 * Filters are plain toggle buttons (aria-pressed). Every project is also in the
 * server-rendered HTML, so crawlers and no-JS visitors see the full list.
 */
export function ProjectExplorer({ projects }: { projects: CardProject[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const counts = useMemo(() => {
    const c = new Map<Filter, number>([["all", projects.length]]);
    for (const p of projects) for (const cat of p.categories) c.set(cat, (c.get(cat) ?? 0) + 1);
    return c;
  }, [projects]);

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const filters: Filter[] = ["all", ...(Object.keys(categoryLabels) as ProjectCategory[])];

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "min-h-10 flex-none rounded-control border px-3 text-sm transition-colors",
              filter === f ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink hover:border-ink/40",
            )}
          >
            {f === "all" ? "All" : categoryLabels[f]} <span className={filter === f ? "text-bg/70" : "text-muted"}>{counts.get(f) ?? 0}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
