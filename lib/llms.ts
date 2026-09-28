import { now, openTo, profile, site } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { achievements, certifications, capabilities } from "@/content/credentials";
import { notes } from "@/content/notes";

/** Markdown profile for LLMs and answer engines (llms.txt convention), generated from content/. */
export function buildLlmsTxt(full: boolean): string {
  const u = (p: string) => `${site.url}${p}`;
  const lines: string[] = [];

  lines.push(`# ${profile.name}`, "", `> ${profile.role}, based in ${profile.location}. ${profile.tagline}`, "");
  lines.push(profile.lead, "");
  lines.push(
    "## Links",
    `- Website: ${site.url}`,
    `- Resume: ${u("/resume")} (PDF: ${u(profile.links.resume)})`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- Email: ${profile.email}`,
    `- Machine-readable profile: ${u("/api/profile")}`,
    "",
  );
  lines.push(`## Open to`, openTo.map((r) => `- ${r}`).join("\n"), "");
  lines.push(`## Now (${now.updated})`, ...now.items.map((i) => `- ${i.label}: ${i.text}`), "");

  lines.push("## Education and certifications");
  lines.push(`- ${profile.education.degree}, ${profile.education.school}, ${profile.education.location} (${profile.education.period}, ${profile.education.status.toLowerCase()})`);
  for (const c of certifications) lines.push(`- ${c.issuer} ${c.name}: ${c.status}`);
  for (const a of achievements.filter((a) => a.category === "Hackathon")) lines.push(`- ${a.title} (${a.year})`);
  lines.push("");

  lines.push("## Experience");
  for (const e of experience) {
    lines.push(`### ${e.role}, ${e.company} (${e.period})`, e.summary);
    if (full) lines.push(...e.highlights.map((h) => `- ${h}`), `- Stack: ${e.stack.join(", ")}`);
    lines.push(`- Details: ${u(`/experience#${e.slug}`)}`, "");
  }

  lines.push("## Projects");
  for (const p of projects.filter((p) => full || p.tier !== "archive")) {
    const link = p.caseStudy ? u(`/projects/${p.slug}`) : p.links.live || p.links.repo || "";
    lines.push(`### ${p.name}`, `${p.summary} ${full ? p.description : ""}`.trim());
    lines.push(`- Stack: ${p.stack.join(", ")}`);
    for (const m of p.metrics ?? []) lines.push(`- ${m.value} ${m.label} (source: ${m.source})`);
    if (full && p.caseStudy) lines.push(...p.caseStudy.decisions.map((d) => `- Decision: ${d.title}. ${d.body}`));
    if (full) for (const n of p.notes ?? []) lines.push(`- Note: ${n}`);
    if (link) lines.push(`- ${p.caseStudy ? "Case study" : "Link"}: ${link}`);
    if (p.links.repo && p.caseStudy) lines.push(`- Source: ${p.links.repo}`);
    lines.push("");
  }

  lines.push("## Capabilities");
  for (const c of capabilities) lines.push(`- ${c.name}: ${c.statement} Tools: ${c.tools.join(", ")}.`);
  lines.push("");

  lines.push("## Engineering notes", ...notes.map((n) => `- [${n.title}](${u(`/notes/${n.slug}`)}): ${n.summary}`), "");
  if (!full) lines.push(`Full version: ${u("/llms-full.txt")}`);
  return lines.join("\n");
}
