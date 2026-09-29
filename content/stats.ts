/**
 * What it costs to run pshah.fun, shown on /stats. Every line names where the figure comes
 * from. Vercel Hobby has no billing API, so these are updated by hand; `checked` is the date
 * they were last confirmed. A cost that isn't known yet stays `undefined` (see
 * docs/CONTENT-TODO.md) and the page says so instead of guessing.
 */

export type RunningCost = {
  item: string;
  provider: string;
  plan: string;
  /** What it does for the site. */
  role: string;
  /** Monthly cost in USD. `undefined` means not recorded yet. */
  monthlyUsd?: number;
  /** Shown instead of a monthly figure when the bill isn't monthly, e.g. a yearly domain. */
  billing?: string;
  source: string;
};

export const costsChecked = "2026-09-29";

export const runningCosts: RunningCost[] = [
  {
    item: "Hosting and CDN",
    provider: "Vercel",
    plan: "Hobby",
    role: "Builds from GitHub on every push, serves the static pages and runs the API routes.",
    monthlyUsd: 0,
    source: "Vercel project settings",
  },
  {
    item: "Visitor counter storage",
    provider: "Upstash Redis",
    plan: "Free tier, via the Vercel Marketplace",
    role: "One key, incremented once per browser. Reads on this page use a read-only token.",
    monthlyUsd: 0,
    source: "Vercel Marketplace integration",
  },
  {
    item: "Analytics",
    provider: "Vercel Web Analytics",
    plan: "Included with Hobby",
    role: "Page views and a few named click events. No cookies and no personal data.",
    monthlyUsd: 0,
    source: "Vercel project settings",
  },
  {
    item: "Portfolio assistant",
    provider: "Runs in a Vercel function",
    plan: "Search-only mode",
    role: "Answers from this site's own content with keyword retrieval. No LLM API key is configured, so no model is called and nothing is billed per question.",
    monthlyUsd: 0,
    source: "Vercel environment variables (no ANTHROPIC_API_KEY set)",
  },
  {
    item: "Source code and activity",
    provider: "GitHub",
    plan: "Free",
    role: "Hosts the repository. The contribution graph and repo list are read from public GitHub pages and cached for 12 hours.",
    monthlyUsd: 0,
    source: "github.com/pshah-lab",
  },
  {
    item: "Fonts",
    provider: "IBM Plex, self-hosted",
    plan: "SIL Open Font License",
    role: "Served from this site, so there are no requests to a font CDN.",
    monthlyUsd: 0,
    source: "app/fonts/OFL-LICENSE.txt",
  },
  {
    item: "Domain",
    provider: "pshah.fun",
    plan: "DNS on Vercel",
    role: "The address. The only part of the site that isn't free.",
    monthlyUsd: undefined,
    billing: "Yearly",
    source: "Registrar invoice (not recorded yet)",
  },
];

/** Engineering choices that keep the bill at zero. Each is visible in the repository. */
export const costDecisions: { title: string; body: string }[] = [
  {
    title: "Pages are prerendered",
    body: "Almost every page is static HTML built at deploy time, so a visit is served from Vercel's CDN without running a function.",
  },
  {
    title: "External data is cached",
    body: "GitHub data refreshes at most every 12 hours and this page at most every hour, so traffic spikes don't turn into API calls.",
  },
  {
    title: "Heavy features load on demand",
    body: "The assistant and the ⌘K palette download only when someone opens them.",
  },
  {
    title: "One write per visitor",
    body: "The counter increments once per browser and is rate-limited per IP, so storage use stays tiny.",
  },
  {
    title: "No paid model by default",
    body: "The assistant works without an LLM. Adding a key would switch it to generated answers, billed per token.",
  },
];
