import { NextResponse } from "next/server";
import { openTo, profile, site } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { certifications, capabilities } from "@/content/credentials";

export const dynamic = "force-static";

/** Machine-readable profile, generated from the same content as the pages. */
export function GET() {
  const data = {
    name: profile.name,
    role: profile.role,
    location: profile.location,
    email: profile.email,
    website: site.url,
    resume: `${site.url}/resume`,
    links: { github: profile.links.github, linkedin: profile.links.linkedin, x: profile.links.x },
    openTo,
    education: profile.education,
    certifications,
    experience: experience.map(({ role, company, period, location, summary, highlights, stack }) => ({
      role,
      company,
      period,
      location,
      summary,
      highlights,
      stack,
    })),
    projects: projects.map((p) => ({
      name: p.name,
      summary: p.summary,
      stack: p.stack,
      period: p.period,
      caseStudy: p.caseStudy ? `${site.url}/projects/${p.slug}` : undefined,
      ...p.links,
      metrics: p.metrics,
    })),
    capabilities: capabilities.map((c) => ({ name: c.name, tools: c.tools })),
    updated: site.updated,
  };

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
