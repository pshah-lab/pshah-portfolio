import { experience } from "@/content/experience";
import { notes } from "@/content/notes";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

/**
 * Everything the ⌘K palette can jump to, built from content/*.ts on the server so the
 * palette stays current without the full content model shipping to the browser.
 */

export type CommandGroup = "Pages" | "Projects" | "Experience" | "Notes" | "Actions";

export type CommandAction = "copy-email" | "toggle-theme" | "ask";

export type Command = {
  id: string;
  group: CommandGroup;
  label: string;
  hint?: string;
  /** Extra words that match but aren't shown, e.g. stack and categories. */
  keywords?: string;
  href?: string;
  external?: boolean;
  /** Files like the resume PDFs: open directly instead of client navigation. */
  download?: boolean;
  action?: CommandAction;
};

const pages: Command[] = [
  { id: "page-home", group: "Pages", label: "Home", href: "/" },
  { id: "page-work", group: "Pages", label: "Work", hint: "All projects", keywords: "projects portfolio", href: "/projects" },
  { id: "page-experience", group: "Pages", label: "Experience", keywords: "internships jobs work history", href: "/experience" },
  { id: "page-research", group: "Pages", label: "Research", keywords: "publication paper", href: "/research" },
  { id: "page-notes", group: "Pages", label: "Notes", keywords: "blog writing articles", href: "/notes" },
  { id: "page-about", group: "Pages", label: "About", keywords: "bio education setup", href: "/about" },
  { id: "page-resume", group: "Pages", label: "Resume", keywords: "cv", href: "/resume" },
];

const actions: Command[] = [
  { id: "action-ask", group: "Actions", label: "Ask about my work", hint: "Assistant", keywords: "ai chat question", action: "ask" },
  { id: "action-email", group: "Actions", label: "Copy email address", hint: profile.email, keywords: "contact mail", action: "copy-email" },
  { id: "action-resume-sde", group: "Actions", label: "Download SDE resume", hint: "PDF", keywords: "cv software engineer developer", href: "/Pratham_Shah_Resume_SDE.pdf", download: true },
  { id: "action-resume-cloud", group: "Actions", label: "Download Cloud resume", hint: "PDF", keywords: "cv cloud engineer devops sre", href: "/Pratham_Shah_Resume_Cloud.pdf", download: true },
  { id: "action-theme", group: "Actions", label: "Toggle dark mode", keywords: "theme light dark", action: "toggle-theme" },
  { id: "action-github", group: "Actions", label: "GitHub", hint: "pshah-lab", keywords: "code repositories", href: profile.links.github, external: true },
  { id: "action-linkedin", group: "Actions", label: "LinkedIn", keywords: "contact profile", href: profile.links.linkedin, external: true },
  { id: "action-x", group: "Actions", label: "X (Twitter)", keywords: "contact twitter", href: profile.links.x, external: true },
];

export function buildCommandIndex(): Command[] {
  const projectCommands: Command[] = projects
    .filter((p) => p.caseStudy || p.links.repo || p.links.live)
    .map((p) => ({
      id: `project-${p.slug}`,
      group: "Projects",
      label: p.name,
      hint: p.kind,
      keywords: [p.summary, ...p.stack, ...p.categories].join(" "),
      // Case studies have their own page; archive projects open their repo or live site.
      ...(p.caseStudy ? { href: `/projects/${p.slug}` } : { href: p.links.repo ?? p.links.live, external: true }),
    }));

  const experienceCommands: Command[] = experience.map((e) => ({
    id: `experience-${e.slug}`,
    group: "Experience",
    label: e.company,
    hint: e.role,
    keywords: [e.type, e.period, ...e.stack].join(" "),
    href: `/experience#${e.slug}`,
  }));

  const noteCommands: Command[] = notes.map((n) => ({
    id: `note-${n.slug}`,
    group: "Notes",
    label: n.title,
    keywords: [n.summary, ...n.tags].join(" "),
    href: `/notes/${n.slug}`,
  }));

  return [...pages, ...projectCommands, ...experienceCommands, ...noteCommands, ...actions];
}
