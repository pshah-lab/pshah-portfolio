import nextPkg from "next/package.json";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { caseStudies } from "@/content/projects";
import { experience } from "@/content/experience";
import { notes } from "@/content/notes";
import { costDecisions, costsChecked, runningCosts } from "@/content/stats";
import { fetchContributions } from "@/lib/github-contributions";
import { readVisitorCount } from "@/lib/visitors";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Stats",
  description:
    "What it costs to run pshah.fun, line by line with sources, plus live numbers: visitors, GitHub activity and the deployed commit.",
  path: "/stats",
});

// Live numbers refresh at most once an hour.
export const revalidate = 3600;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
const usd = (n: number) => `$${n.toFixed(n % 1 ? 2 : 0)}`;

export default async function StatsPage() {
  const [visitors, contributions] = await Promise.all([readVisitorCount(), fetchContributions()]);

  const known = runningCosts.filter((c) => c.monthlyUsd !== undefined);
  const unknown = runningCosts.filter((c) => c.monthlyUsd === undefined);
  const monthly = known.reduce((sum, c) => sum + (c.monthlyUsd ?? 0), 0);

  const sha = process.env.VERCEL_GIT_COMMIT_SHA;
  const repo =
    process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG
      ? `https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
      : undefined;
  const refreshed = new Date().toISOString();

  const live: { label: string; value: React.ReactNode; note: string }[] = [
    {
      label: "Visitors",
      value: visitors?.toLocaleString("en-US") ?? "–",
      note: visitors === null ? "Counter unavailable right now" : "Browsers counted since Aug 2025",
    },
    {
      label: "GitHub contributions",
      value: contributions?.total.toLocaleString("en-US") ?? "–",
      note: "In the last year",
    },
    { label: "Case studies", value: caseStudies.length, note: "Projects with a full write-up" },
    { label: "Engineering notes", value: notes.length, note: "Short technical write-ups" },
    { label: "Roles", value: experience.length, note: "Internships, freelance and research" },
    {
      label: "Deployed commit",
      value: sha ? (
        repo ? (
          <a href={`${repo}/commit/${sha}`} target="_blank" rel="noopener noreferrer" className="link font-mono">
            {sha.slice(0, 7)}
          </a>
        ) : (
          <span className="font-mono">{sha.slice(0, 7)}</span>
        )
      ) : (
        <span className="font-mono">local</span>
      ),
      note: process.env.VERCEL_GIT_COMMIT_REF ? `Branch ${process.env.VERCEL_GIT_COMMIT_REF}` : "Not built on Vercel",
    },
  ];

  const stack = [
    `Next.js ${nextPkg.version}`,
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js 22",
    "Vercel",
    "Upstash Redis",
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Stats", path: "/stats" }])]} />
      <PageIntro
        title="Stats"
        intro="What it takes to run this site: the monthly bill, line by line, and a few live numbers. Cloud cost is part of my work, so it seemed fair to show my own."
      />

      <div className="shell space-y-20 pb-24">
        <section aria-labelledby="cost" className="border-t border-line pt-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_2fr]">
            <div>
              <h2 id="cost" className="h-section scroll-mt-24">
                Running cost
              </h2>
              <p className="mt-6 font-display text-[3.5rem] leading-none tabular-nums text-ink">
                {usd(monthly)}
                <span className="ml-2 text-lg text-muted">/ month</span>
              </p>
              <p className="mt-4 text-sm text-muted">
                {unknown.length > 0
                  ? `Plus ${unknown.map((c) => c.item.toLowerCase()).join(" and ")}, billed ${unknown
                      .map((c) => c.billing?.toLowerCase() ?? "separately")
                      .join(", ")}; its cost isn't recorded here yet.`
                  : "Everything included; the domain was paid for two years up front and is shown here per month."}{" "}
                Figures checked {fmtDate(costsChecked)}. Vercel Hobby has no billing API, so they are updated by hand.
              </p>
            </div>

            <ul className="divide-y divide-line border-y border-line">
              {runningCosts.map((c) => (
                <li key={c.item} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{c.item}</p>
                    <p className="text-sm text-muted">
                      {c.provider} · {c.plan}
                    </p>
                    <p className="mt-2 text-sm text-muted">{c.role}</p>
                    <p className="mt-1 text-xs text-muted/80">Source: {c.source}</p>
                  </div>
                  <p className="order-first font-mono text-sm tabular-nums text-ink sm:order-none sm:text-right">
                    {c.monthlyUsd !== undefined ? `${usd(c.monthlyUsd)}/mo` : `${c.billing ?? "Separate"}, not recorded`}
                    {c.monthlyUsd !== undefined && c.billing && <span className="block text-xs text-muted">{c.billing}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="live" className="border-t border-line pt-12">
          <h2 id="live" className="h-section scroll-mt-24">
            Live numbers
          </h2>
          <p className="mt-3 max-w-prose text-muted">
            Read when this page was generated, at most once an hour. Last refresh {fmtDate(refreshed)}.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((s) => (
              <div key={s.label} className="panel p-5">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-2 font-display text-[2rem] leading-none tabular-nums text-ink">{s.value}</dd>
                <dd className="mt-2 text-xs text-muted">{s.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cheap" className="border-t border-line pt-12">
          <h2 id="cheap" className="h-section scroll-mt-24">
            How it stays this cheap
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {costDecisions.map((d) => (
              <div key={d.title} className="panel p-5">
                <h3 className="text-base">{d.title}</h3>
                <p className="mt-2 text-sm text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="stack" className="border-t border-line pt-12">
          <h2 id="stack" className="h-section scroll-mt-24">
            Stack
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          {repo && (
            <p className="mt-6 text-sm text-muted">
              Source:{" "}
              <a href={repo} target="_blank" rel="noopener noreferrer" className="link" data-track="github_click" data-track-label="stats">
                {repo.replace("https://", "")}
              </a>
            </p>
          )}
        </section>
      </div>
    </>
  );
}
