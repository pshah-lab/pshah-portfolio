import { aiUseCases, now, openTo, profile, setup, workingPrinciples } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { achievements, capabilities, certifications, faqs } from "@/content/credentials";
import { notes } from "@/content/notes";

export type Chunk = { id: string; title: string; href: string; text: string };

/**
 * The assistant's entire knowledge: chunks generated from the same content model the
 * pages render. It cannot know anything the site does not say.
 */
export function buildKnowledge(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    title: "About Pratham",
    href: "/about",
    text: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.tagline} ${profile.lead} Education: ${profile.education.degree}, ${profile.education.school} (${profile.education.period}).`,
  });

  chunks.push({
    id: "contact",
    title: "Contact",
    href: "/#contact",
    text: `Contact Pratham by email at ${profile.email}. LinkedIn: ${profile.links.linkedin}. GitHub: ${profile.links.github}. Resume: /resume. He is open to ${openTo.join(", ")} roles.`,
  });

  chunks.push({
    id: "now",
    title: "Now",
    href: "/#now",
    text: `As of ${now.updated}: ${now.items.map((i) => `${i.label}: ${i.text}`).join(" ")}`,
  });

  for (const e of experience) {
    chunks.push({
      id: `exp-${e.slug}`,
      title: `${e.role}, ${e.company}`,
      href: `/experience#${e.slug}`,
      text: `${e.role} at ${e.company} (${e.type}, ${e.location}, ${e.period}). ${e.summary} ${e.highlights.join(" ")} Technologies: ${e.stack.join(", ")}.`,
    });
  }

  for (const p of projects) {
    const cs = p.caseStudy;
    const caseText = cs
      ? ` Problem: ${cs.problem} Role: ${cs.role} Key decisions: ${cs.decisions.map((d) => `${d.title}. ${d.body}`).join(" ")} Results: ${cs.results.join(" ")}`
      : "";
    const metrics = p.metrics?.map((m) => `${m.value} ${m.label} (${m.context}; source: ${m.source}).`).join(" ") ?? "";
    chunks.push({
      id: `proj-${p.slug}`,
      title: p.name,
      href: cs ? `/projects/${p.slug}` : "/projects",
      text: `${p.name}: ${p.summary} ${p.description} Type: ${p.kind}. ${p.period ? `Period: ${p.period}.` : ""} Stack: ${p.stack.join(", ")}. ${metrics}${caseText} ${(p.notes ?? []).join(" ")}`,
    });
  }

  const categoryTitles: Record<string, string> = {
    cloud: "Cloud and AWS projects",
    ai: "AI and machine learning projects",
    "full-stack": "Full-stack and web projects",
    research: "Research projects",
    "open-source": "Open-source projects",
  };
  for (const [cat, title] of Object.entries(categoryTitles)) {
    const list = projects.filter((p) => p.categories.includes(cat as (typeof p.categories)[number]));
    chunks.push({
      id: `cat-${cat}`,
      title,
      href: "/projects",
      text: `${title}: ${list.map((p) => p.name).join(", ")}. ${list.map((p) => `${p.name} uses ${p.stack.join(", ")}.`).join(" ")}`,
    });
  }

  chunks.push({
    id: "credentials",
    title: "Certifications and achievements",
    href: "/#credentials",
    text: `Certifications: ${certifications.map((c) => `${c.issuer} ${c.name} (${c.status})`).join("; ")}. Achievements: ${achievements
      .map((a) => `${a.title}${a.year ? ` (${a.year})` : ""}: ${a.context}`)
      .join(" ")}`,
  });

  for (const c of capabilities) {
    chunks.push({
      id: `cap-${c.id}`,
      title: c.name,
      href: "/#capabilities",
      text: `${c.name}: ${c.statement} ${c.abilities.map((a) => `${a.name} (evidence: ${a.evidence}).`).join(" ")} Tools: ${c.tools.join(", ")}.`,
    });
  }

  chunks.push({
    id: "ai-workflow",
    title: "How Pratham uses AI",
    href: "/about#ai",
    text: `${workingPrinciples.map((w) => `${w.title}. ${w.body}`).join(" ")} Use cases: ${aiUseCases.map((u) => `${u.name}: ${u.body}`).join(" ")}`,
  });

  chunks.push({
    id: "setup",
    title: "Setup",
    href: "/about#setup",
    text: `Tools and setup: ${setup.map((g) => `${g.group}: ${g.items.map((i) => i.name + (i.note ? ` (${i.note})` : "")).join(", ")}`).join(". ")}.`,
  });

  for (const n of notes) {
    chunks.push({ id: `note-${n.slug}`, title: n.title, href: `/notes/${n.slug}`, text: `Engineering note: ${n.title}. ${n.summary}` });
  }

  for (const [i, f] of faqs.entries()) {
    chunks.push({ id: `faq-${i}`, title: f.question, href: "/about#faq", text: f.answer });
  }

  return chunks;
}
