# Portfolio audit — 2026-09-28

Audit of `pshah.fun` performed before the redesign. Sources checked: this repository,
`public/Pratham_Resume.pdf` (treated as the most recent source of truth), and the public
GitHub repositories under `github.com/pshah-lab` (cloned and read, not just READMEs).

## Current architecture

| Area | Finding |
| --- | --- |
| Framework | Next.js 15 App Router, React 18, TypeScript, Tailwind 3 (shadcn scaffold from v0; package name `my-v0-project`) |
| Routing | One route (`/`). Everything else is anchors. No project pages, no case studies |
| Rendering | `app/page.tsx` is `"use client"`. Testimonial, Achievements, FAQ and Contact are `dynamic(..., { ssr: false })`, so **they are absent from the server HTML**. Crawlers and AI agents see neither the FAQ they were built for nor the contact section |
| Styling | Tailwind utilities with hard-coded hex values repeated in every component (`#f7f4ee`, `#080b10`, `#fbfaf7`); two `globals.css` files (one unused); blue→purple gradients in scroll widgets that contradict the stone/teal palette |
| Animation | GSAP + ScrollTrigger re-implemented in 8 components (~40 lines each, copy-pasted); disabled below 768px; ignores `prefers-reduced-motion` |
| 3D / media | three.js + R3F + drei + maath starfield, and a 740 KB `blackhole.webm`, both only in dark mode on desktop |
| Data | Content is hard-coded in each component and **duplicated 5×** (components, FAQ, JSON-LD, `/api/profile`, `llms.txt`, `llms-full.txt`), and the copies have drifted apart |
| APIs | `/api/profile` (static JSON), `/api/bot-tracker` (in-memory counter + HTML dashboard) |
| Middleware | Runs on every request to classify user agents; writes two response headers nothing reads |
| Deploy | Vercel; security headers in `next.config.mjs`; `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` both on |
| SEO | Good intent: metadata, OG image, sitemap, robots, JSON-LD Person/WebSite/FAQ/ItemList, llms.txt. But the sitemap lists a PDF, text files and an API route rather than pages, and JSON-LD claims content that is not rendered server-side |

## Current strengths (kept)

- Restrained, border-driven visual language; no gradient soup in the main sections.
- Real evidence exists: a shipped Chrome extension (1,000 users on the Chrome Web Store),
  real AWS work (StreamVault CDK stack, Cognito PKCE Lambda, FastAPI + DynamoDB),
  a real RAG pipeline (InsightVault), client work with a testimonial, and cloud FinOps impact.
- AEO/llms.txt thinking is ahead of most portfolios.
- Security headers are present.

## Major problems

1. **Contradictory facts across the site** (the resume disagrees with the site):
   - Searce: site says "Present"; resume says **Apr 2026 – Aug 2026**.
   - NeuraMach title: "Full-Stack Engineering Intern" vs resume "**AI Full-Stack Engineering Intern (QA Focus)**";
     outcomes "15+ issues / 40% fewer deployment failures" vs resume "**80+ defects, 20+ backend errors, 6 vulnerabilities**".
   - Hackathon: "Runner Up, March 2023" vs resume "**Second Runner-up, SHODH 1.0, 2025**".
   - Freelance: "November 2025" vs resume "**Jul 2025 – Nov 2025**"; stack "Next.js/Tailwind" vs resume "React.js, Vite, GSAP, Cloudinary".
2. **Claims the code does not support**:
   - InsightVault: site says "LangChain", "Upstash Redis", "tenant-scoped RLS". The repo uses none of them. RLS is enabled with allow-all policies, and tenant isolation exists only as a commented optional migration. The rate limiter is in-memory. The resume calls it "(Python)"; the repo is JavaScript / Next.js 16.
   - StreamVault: resume says "FFmpeg on EC2 **Spot** Instances, reducing processing costs by over 90%". `scripts/launch-ec2-chunk-job.sh` launches on-demand `c7i.2xlarge` and never requests Spot capacity. The claim is not verifiable from the repo.
   - Cloud Media Hub: `public/aws-s3-hub.webp` is a **generated mock dashboard** ("NEXUS CLOUD MEDIA HUB", "4.82 PB", "Hi, Alex R."), not the app. It implies scale that does not exist.
   - NeuroArm/BCI: both repos are **forks** of a team project. The 91.6% Random Forest accuracy is real, but it was measured on a 12,811-row, 14-feature dataset with a binary user-defined label. The notebook does not show left/right movement labels.
3. **Security**: `/api/bot-tracker?format=html` interpolates the request path and user agent into HTML without escaping (reflected/stored XSS within an instance), is public, and its in-memory state is meaningless on serverless. The CSP ships `'unsafe-eval'` to production. A phone number is published in HTML, FAQ and llms.txt.
4. **Performance**: The entire home page is a client component. three.js and a video load in dark mode. The GSAP bundle is duplicated across components. The favicon is a 136 KB 1024×1024 WebP misnamed `.ico`/`.jpg`. `"gsap": "latest"` is unpinned.
5. **Accessibility**: No skip link, no reduced-motion handling, a clickable `div` for "Scroll", icon `Button`s nested inside `<a>` (interactive inside interactive), and hover-only affordances.
6. **Positioning**: "Full-Stack Developer & Cloud Engineer" plus a flat project list. The AI and research dimensions are invisible, there is no hierarchy between a client site and a toy, and no project explains its architecture.
7. **Dead weight**: 11 unused shadcn primitives, `types/lucide-react.d.ts` shim, `scripts/install-gsap.js`, `styles/globals.css`, `hooks/use-mobile`, plus deps `nodemailer`, `react-hook-form`, `zod`, `sonner`, `embla`, `react-icons` (dynamic-imported per icon), `@hookform/resolvers`.

## Gap analysis

| Section | Existing | Missing / action |
| --- | --- | --- |
| Hero | Title + one line + resume modal | Positioning across product/cloud/AI, current status, evidence line, direct links |
| Now | — | New. Verified items only |
| Skills | Logo wall (incl. WordPress, Figma) | Capability groups with evidence links |
| Experience | 4 entries, conflicting data | Resume-aligned timeline + own page |
| Projects | 7 equal cards | Hierarchy, filters, 6 case studies with architecture |
| Metrics | — | Sourced impact strip |
| Research | Buried in achievements | Own page; publication details **NEEDS USER INPUT** |
| Certifications | FAQ text only | Section with explicit status |
| Achievements | 3 cards (1 wrong year) | Corrected list |
| GitHub | — | Cached, non-blocking repo feed with static fallback |
| Writing | — | Engineering notes grounded in real repos |
| Journey | — | Timeline explaining evolution |
| Setup | — | Compact setup section |
| AI-assisted engineering | — | Principles + workflow |
| Testimonials | 1, attributed to a company | Keep; person/role **NEEDS USER INPUT** |
| Contact | Links | Clear CTA, no form |
| Resume | Modal duplicating resume in JSX | `/resume` HTML page + PDF |
| Assistant | — | Grounded, citation-first "Ask" with optional LLM |
| SEO/AEO | Partial, client-rendered | Per-page metadata, per-route OG, generated llms.txt from one content model |
| Analytics | Vercel Analytics | + privacy-conscious click events (resume/GitHub/project/contact) |

## Proposed information architecture

```
/                     Hero · Impact · Now · Featured work · Capabilities · Experience · Research ·
                      Credentials · GitHub · Notes · Testimonial · Contact
/projects             All projects, filterable (All · Full stack · Cloud · AI · Research · Open source)
/projects/[slug]      Case study: overview → problem → role → architecture → decisions →
                      challenges → implementation → results → lessons → next → links
/experience           Detailed roles + skills used
/research             NeuroArm / BCI, EEG pipeline, publication
/journey              2022 → 2026 evolution
/notes, /notes/[slug] Engineering notes
/about                Working style, AI-assisted engineering, setup, education, FAQ
/resume               HTML resume + PDF
/api/ask              Portfolio assistant (retrieval-grounded)
/api/profile          Machine-readable profile (generated)
/llms.txt             Generated from the content model
```

## Design direction

"Engineering logbook": paper/graphite surfaces, hairline rules, a 12-column grid, mono
metadata labels, one signal-orange accent used sparingly, square corners, and no shadows.
A single signature element, an EEG-style signal trace, ties the BCI work to the systems
theme. Motion is CSS scroll-driven, runs zero JS, and is disabled for reduced motion.

## Components

- **Reuse**: `lib/utils.cn`, the section-header rhythm, the border-grid idea, security headers.
- **Replace**: every section component, navbar, footer, theme provider (→ `next-themes`, no flash),
  JSON-LD, resume modal (→ `/resume`), GSAP reveals (→ CSS), starfield/blackhole (removed).
- **New**: content model (`content/*`), `ArchitectureDiagram`, `MetricReadout`, `ProjectCard`,
  `ProjectFilter`, `CaseStudy` layout, `Timeline`, `GitHubFeed`, `NoteBody`, `AskPanel`,
  `SignalTrace`, `TrackClicks`.

## Content that needs verification

See `docs/CONTENT-TODO.md`.
