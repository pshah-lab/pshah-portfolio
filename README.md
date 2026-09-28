# pshah.fun

Source for [pshah.fun](https://pshah.fun), the portfolio of Pratham Shah: full-stack, cloud and applied AI engineering.

Next.js 15 (App Router), TypeScript and Tailwind CSS, deployed on Vercel. Every page is statically
prerendered except the assistant API.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # typecheck + lint + production build
pnpm build && pnpm start
pnpm resume       # regenerate the SDE and Cloud resume PDFs + docs/resume/*.md from content/
```

Requires Node.js 20+ and pnpm. No environment variables are needed to run it; see `.env.example`
for the optional ones.

## Where things live

```
content/            ← edit this to update the site
  profile.ts        identity, links, "Now", setup, working principles
  experience.ts     roles (resume is the source of truth)
  projects.ts       projects + case studies (problem, architecture, decisions…)
  credentials.ts    certifications, achievements, impact metrics, capabilities, journey, FAQ
  notes.ts          engineering notes (structured blocks, no HTML)
  resume.ts         the one-page resume, composed from the files above
  types.ts          the content model
app/                routes: /, /projects, /projects/[slug], /experience, /research,
                    /journey, /notes, /notes/[slug], /about, /resume,
                    /llms.txt, /llms-full.txt, /api/profile, /api/ask
components/         UI (server components by default; client only where interactive)
lib/seo.ts          per-page metadata + JSON-LD builders
lib/github.ts       cached GitHub API with static fallback
lib/assistant/      knowledge index + BM25 retrieval for the assistant
docs/AUDIT.md       audit that preceded the redesign
docs/CONTENT-TODO.md  facts that still need the owner's input
```

Pages, JSON-LD, `llms.txt`, `/api/profile` and the assistant all read from `content/`, so a fact
is written once. Every number shown on the site carries a `source`.

### Resume

`content/resume.ts` defines two one-page fresher resumes from the same verified content as the site:
**SDE** (software development roles) and **Cloud** (cloud, DevOps and FinOps roles). Experience bullets
are identical in both; the summary, section order, skills and projects differ.

`pnpm resume` renders both to A4 PDFs with headless Chrome (`public/Pratham_Shah_Resume_SDE.pdf`,
`public/Pratham_Shah_Resume_Cloud.pdf`, plus Markdown in `docs/resume/`). The build fails if either PDF
runs past one page or contains an em or en dash, so the output stays ATS-friendly: one column, standard
headings, real text, plain ASCII punctuation. Public PDFs omit the phone number;
`RESUME_PHONE="+91-…" pnpm resume` writes copies with it to `docs/resume/private/` (gitignored).

### Adding a project

Add an entry to `content/projects.ts`. `tier: "featured" | "notable" | "archive"` controls
prominence. Adding a `caseStudy` generates `/projects/<slug>`, its Open Graph image, sitemap
entry and structured data automatically.

## Assistant ("Ask about my work")

`/api/ask` retrieves the most relevant content chunks with a small in-process BM25 index, with no
vector database needed for a corpus this size.

- Without `ANTHROPIC_API_KEY`, it answers by quoting the matching content, with source links.
- With the key set, Claude writes a short answer grounded only in the retrieved chunks, with
  citations. The system prompt forbids facts outside the context and treats the question as
  untrusted. Server-side fallbacks (`fallbacks: "default"`) are enabled.
- Guardrails: 300-character questions, a relevance floor, per-IP rate limiting (best effort on
  serverless, so set a spend limit on the key), no-store responses, and plain-text rendering.
- The panel's code is only downloaded when someone opens it.

## Analytics

Vercel Analytics plus four custom events, sent through a single delegated click listener
(`components/track-clicks.tsx`) on elements with `data-track`: `resume_click`, `github_click`,
`project_click`, `contact_click` (plus `assistant_open`, `project_live_click`). Only an event
name and a static label are sent.

## Deployment

Vercel, with the default Next.js settings. Set any optional variables from `.env.example` in the
Vercel project. Security headers (CSP, HSTS, frame and referrer policy) are defined in
`next.config.mjs`.
