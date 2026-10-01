/**
 * Content model for the portfolio. Every page, the JSON-LD, /llms.txt, /api/profile
 * and the portfolio assistant read from these structures, so a fact is written once.
 *
 * Provenance matters here: anything shown as a number carries a `source` so a reader
 * (or a reviewer) can see where it came from. Unknown facts stay `undefined` and are
 * tracked in docs/CONTENT-TODO.md instead of being guessed.
 */

export type ProjectCategory = "full-stack" | "cloud" | "ai" | "research" | "open-source";

export type Link = { label: string; href: string };

/** A step in an architecture / data-flow diagram. */
export type FlowNode = {
  label: string;
  /** Concrete component, file or service, e.g. `match_chunks()` or `Lambda`. */
  detail?: string;
};

export type Flow = {
  title: string;
  caption?: string;
  nodes: FlowNode[];
};

export type Metric = {
  value: string;
  label: string;
  context: string;
  /** Where the number comes from. Required: no unsourced numbers on this site. */
  source: string;
};

export type Decision = { title: string; body: string };

export type CaseStudy = {
  problem: string;
  why: string;
  role: string;
  architecture: Flow[];
  decisions: Decision[];
  challenges: Decision[];
  implementation: string[];
  results: string[];
  lessons: string[];
  next: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** One line: what it is. */
  summary: string;
  /** Short paragraph for cards. */
  description: string;
  categories: ProjectCategory[];
  tier: "featured" | "notable" | "archive";
  kind: string;
  /** Verified period, e.g. "Nov 2025 – Sep 2026". Omit if unknown. */
  period?: string;
  stack: string[];
  image?: { src: string; alt: string; width: number; height: number };
  links: { live?: string; repo?: string; docs?: string; store?: string };
  /** Brand the project is published under, when it isn't just me. `id` matches that site's own JSON-LD. */
  publisher?: { name: string; url: string; id?: string };
  metrics?: Metric[];
  caseStudy?: CaseStudy;
  /** Honest caveats shown on the case study, e.g. "Team project; repo is a fork". */
  notes?: string[];
  /** Present only for the (at most two) projects on the resume. Same text on site and PDF. */
  resume?: { tagline: string; bullets: string[] };
};

export type CardProject = Omit<Project, "caseStudy"> & { hasCaseStudy: boolean };

export type Experience = {
  slug: string;
  role: string;
  company: string;
  type: "Internship" | "Freelance" | "Research";
  location: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, omitted when ongoing
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metrics?: Metric[];
  architecture?: Flow;
  relatedProjects?: string[];
  /** Included on the one-page resume (content/resume.ts). */
  onResume: boolean;
};

export type Certification = {
  name: string;
  issuer: string;
  status: "Certified" | "In progress";
  /** Public credential URL (anyone can open it without signing in). */
  url?: string;
  /** Issue and expiry dates, YYYY-MM-DD, as printed on the certificate. */
  date?: string;
  expires?: string;
  image?: { src: string; alt: string; width: number; height: number };
};

export type Achievement = {
  title: string;
  context: string;
  year: string;
  category: "Research" | "Product" | "Impact";
  source: string;
};

export type Publication = {
  title?: string;
  venue: string;
  venueFull: string;
  topic: string;
  year?: string;
  authors?: string[];
  url?: string;
};

export type Testimonial = {
  quote: string;
  organization: string;
  person?: string;
  role?: string;
  relationship: string;
  date: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  body: string;
  href?: string;
};

export type CapabilityGroup = {
  id: "product" | "cloud" | "ai";
  name: string;
  statement: string;
  abilities: { name: string; evidence: string; href?: string }[];
  tools: string[];
};

export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "flow"; flow: Flow };

export type Note = {
  slug: string;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  project?: string;
  basis: string;
  body: NoteBlock[];
};

export type Faq = { question: string; answer: string };
