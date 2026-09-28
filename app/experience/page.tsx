import Link from "next/link";
import { FlowDiagram } from "@/components/flow-diagram";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Pratham Shah's experience: Google Cloud FinOps at Searce, full-stack Next.js and FastAPI work at NeuraMach AI Studios, freelance front-end work, and BCI research at IS360 Technologies.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }])} />
      <PageIntro
        title="Experience"
        intro="Two internships in 2026, one on AWS and one on Google Cloud, plus freelance client work and a year of brain-computer interface research."
      />
      <ol className="shell pb-24">
        {experience.map((e) => (
          <li key={e.slug} id={e.slug} className="scroll-mt-24 border-t border-line py-12">
            <article className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
              <div className="text-sm text-muted">
                <p className="tabular-nums text-ink">{e.period}</p>
                <p className="mt-1">{e.type}</p>
                <p>{e.location}</p>
              </div>
              <div className="min-w-0">
                <h2 className="text-[1.75rem] leading-tight sm:text-[2.125rem]">{e.company}</h2>
                <p className="mt-1 text-lg text-ink">{e.role}</p>
                <p className="mt-4 max-w-prose text-muted">{e.summary}</p>

                {e.metrics && (
                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                    {e.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd>
                          <span className="font-display text-3xl font-semibold tabular-nums text-ink">{m.value}</span>
                          <span className="block text-sm text-muted">{m.label}</span>
                          <span className="block text-xs text-muted">Source: {m.source}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <h3 className="mt-8 text-base">What I did</h3>
                <ul className="mt-3 max-w-prose space-y-2.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                      {h}
                    </li>
                  ))}
                </ul>

                {e.architecture && <FlowDiagram flow={e.architecture} className="mt-8" />}

                <p className="mt-6 text-sm text-muted">
                  <span className="font-semibold text-ink">Stack:</span> {e.stack.join(", ")}
                </p>

                {e.relatedProjects && (
                  <p className="mt-3 text-sm">
                    Related:{" "}
                    {e.relatedProjects.map((slug, i) => {
                      const p = getProject(slug);
                      return p ? (
                        <span key={slug}>
                          {i > 0 && ", "}
                          <Link href={`/projects/${slug}`} className="link">
                            {p.name}
                          </Link>
                        </span>
                      ) : null;
                    })}
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
}
