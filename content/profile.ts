export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://pshah.fun").replace(/\/$/, ""),
  name: "Pratham Shah",
  locale: "en_US",
  updated: "2026-09-28",
};

export const profile = {
  name: "Pratham Shah",
  handle: "pshah-lab",
  role: "Cloud and full-stack engineer",
  shortRole: "Cloud and full-stack engineer",
  location: "Pune, India",
  email: "pshah88669@gmail.com",
  /** One sentence used for meta descriptions and the OG image. */
  tagline:
    "2026 Computer Science graduate in Pune and Google Cloud Associate Cloud Engineer, working on cloud, backend and full-stack systems.",
  /** Hero lead. Mirrors the resume summary; every clause is backed by experience.ts or projects.ts. */
  lead:
    "Internships in Google Cloud cost optimization at Searce and full-stack Next.js and FastAPI work at NeuraMach AI Studios. Outside work I build on AWS and ship small products: a CDK-defined streaming platform, a RAG app on Postgres and pgvector, and a Chrome extension with 1,270+ weekly users.",
  links: {
    github: "https://github.com/pshah-lab",
    linkedin: "https://www.linkedin.com/in/pratham-shah-729432258/",
    x: "https://x.com/pshah_lab",
    email: "mailto:pshah88669@gmail.com",
    resume: "/Pratham_Resume.pdf",
  },
  education: {
    degree: "B.Tech in Computer Science",
    school: "MIT-ADT University",
    location: "Pune, India",
    period: "2022 – 2026",
    status: "Completed 2026",
    source: "Resume",
  },
};

/**
 * "Now" — only things that can be verified from the resume or public repositories.
 * Items the owner still needs to confirm live in docs/CONTENT-TODO.md.
 */
export const now = {
  updated: "September 2026",
  items: [
    {
      label: "Just finished",
      text: "A cloud reliability internship at Searce (Apr – Aug 2026), working on Google Cloud cost optimization, and a B.Tech in Computer Science at MIT-ADT University, Pune.",
      href: "/experience#searce",
    },
    {
      label: "Shipping",
      text: "Force Dark Mode 1.7.0, a Chrome extension with 1,270+ weekly users. The latest release added offline DOCX and PPTX preview, brightness and contrast sliders, and scheduled dark mode.",
      href: "/projects/force-dark-mode",
    },
    {
      label: "Open to",
      text: "Junior cloud, backend, FinOps and full-stack engineering roles in India.",
      href: "/#contact",
    },
  ],
};

export const openTo = ["Cloud Engineering", "Backend Engineering", "FinOps", "Full-Stack Engineering"];

export const workingPrinciples = [
  {
    title: "AI multiplies judgment; it doesn’t replace it",
    body: "I use AI assistants for code exploration, debugging, test scaffolding, documentation and first drafts of repetitive code. Architecture, security boundaries and what ships stay my decision, and generated code gets the same review as any other contributor’s.",
  },
  {
    title: "Write the plan before the code",
    body: "Larger changes start as a short spec and an implementation plan checked into the repo. The Force Dark Mode repository keeps these under documentation/specs and documentation/plans. An AI pair works far better against a written plan than against a vague prompt.",
  },
  {
    title: "Verify claims against the system",
    body: "Generated answers get checked against the code, the docs or a running system before I rely on them. The same rule applies to this site: every number on it names its source.",
  },
  {
    title: "Measure cost and performance, then change things",
    body: "The Searce FinOps work and the Abhinandan Mountreea performance pass both started from measurement: billing and utilization data in one case, load time in the other.",
  },
];

export const aiUseCases = [
  { name: "Code exploration", body: "Mapping an unfamiliar codebase before changing it, e.g. tracing a request path across Next.js, Lambda and DynamoDB." },
  { name: "Debugging", body: "Forming and ranking hypotheses from stack traces and logs, then confirming each one by hand." },
  { name: "Tests and fixtures", body: "Scaffolding test cases and edge cases, then trimming them to the ones that actually guard behaviour." },
  { name: "Documentation", body: "Drafting READMEs, architecture notes and compliance docs from the code, then editing for accuracy." },
  { name: "Prototyping", body: "Getting a throwaway version running quickly to test an idea before designing the real one." },
  { name: "Review", body: "A second pass over diffs for missed error handling, injection risks and unclear naming." },
];

export type SetupGroup = { group: string; items: { name: string; note?: string }[] };

export const setup: SetupGroup[] = [
  {
    group: "Hardware",
    items: [{ name: "MacBook Air M3" }],
  },
  {
    group: "Editor and terminal",
    items: [
      { name: "VS Code" },
      { name: "Cursor" },
      { name: "GitHub Copilot" },
      { name: "zsh + Git" },
    ],
  },
  {
    group: "Build and ship",
    items: [
      { name: "Node.js + pnpm", note: "Package manager across these repos" },
      { name: "Docker", note: "StreamVault progress API" },
      { name: "AWS CDK", note: "StreamVault infrastructure" },
      { name: "Vercel", note: "Frontend hosting, including this site" },
    ],
  },
  {
    group: "Cloud and data",
    items: [
      { name: "AWS", note: "S3, CloudFront, Lambda, API Gateway, DynamoDB, Cognito, EC2, SES" },
      { name: "Google Cloud", note: "Associate Cloud Engineer" },
      { name: "Supabase", note: "Postgres + pgvector" },
      { name: "MongoDB" },
    ],
  },
  {
    group: "AI",
    items: [
      { name: "Claude", note: "Pair programming, review, docs" },
      { name: "OpenAI, Gemini, Groq APIs", note: "InsightVault embeddings and generation" },
    ],
  },
];
