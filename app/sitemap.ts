import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { caseStudies } from "@/content/projects";
import { notes } from "@/content/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(site.updated);
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/experience", priority: 0.9 },
    { path: "/research", priority: 0.8 },
    { path: "/resume", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/journey", priority: 0.6 },
    { path: "/notes", priority: 0.6 },
  ];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: updated, priority: p.priority })),
    ...caseStudies.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: updated, priority: 0.8 })),
    ...notes.map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: new Date(n.date), priority: 0.5 })),
  ];
}
