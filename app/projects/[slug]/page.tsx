import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectLinks } from "@/components/project-card";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { caseStudies, getProject } from "@/content/projects";
import { breadcrumbSchema, pageMetadata, projectSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} case study`, description: `${p.summary} ${p.description}`.slice(0, 300), path: `/projects/${p.slug}` });
}

const sections = [
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "implementation", label: "Implementation" },
  { id: "results", label: "Results" },
  { id: "takeaways", label: "Takeaways" },
  { id: "next", label: "What's next" },
];

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24 border-t border-line pt-10">
      <h2 id={id} className="text-[1.75rem] leading-tight sm:text-[2rem]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose space-y-3">
      {items.map((item) => (
        <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  const cs = project.caseStudy;

  const i = caseStudies.findIndex((p) => p.slug === slug);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article>
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <PageIntro
        title={project.name}
        intro={project.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
        ]}
      >
        <p className="mt-4 text-sm text-muted">
          {project.kind}
          {project.period ? `, ${project.period}` : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <ProjectLinks project={project} />
        </div>
      </PageIntro>

      {project.image && (
        <div className="shell">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="w-full rounded-panel border border-line"
          />
        </div>
      )}

      <div className="shell grid gap-12 py-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-ink">Role</dt>
              <dd className="mt-1 text-muted">{cs.role}</dd>
            </div>
            {project.period && (
              <div>
                <dt className="font-semibold text-ink">Timeline</dt>
                <dd className="mt-1 text-muted">{project.period}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold text-ink">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            {project.metrics?.map((m) => (
              <div key={m.label}>
                <dt className="font-display text-2xl font-semibold tabular-nums text-ink">{m.value}</dt>
                <dd className="text-muted">
                  {m.label}. {m.context}.<span className="mt-1 block text-xs">Source: {m.source}</span>
                </dd>
              </div>
            ))}
          </dl>
          <nav aria-label="On this page" className="mt-8 hidden border-t border-line pt-5 lg:block">
            <ol className="space-y-1.5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 space-y-12">
          <section aria-label="Overview" className="max-w-prose">
            <p className="text-lg leading-relaxed text-ink">{project.description}</p>
          </section>

          <Block id="problem" title="Problem">
            <p className="max-w-prose">{cs.problem}</p>
            <h3 className="mt-6 text-base">Why it was worth building</h3>
            <p className="mt-2 max-w-prose text-muted">{cs.why}</p>
          </Block>

          <Block id="architecture" title="Architecture">
            <div className="space-y-4">
              {cs.architecture.map((flow) => (
                <FlowDiagram key={flow.title} flow={flow} />
              ))}
            </div>
          </Block>

          <Block id="decisions" title="Technical decisions">
            <div className="grid gap-4 md:grid-cols-2">
              {cs.decisions.map((d) => (
                <div key={d.title} className="panel p-5">
                  <h3 className="text-base leading-snug">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="challenges" title="Challenges">
            <div className="max-w-prose space-y-6">
              {cs.challenges.map((c) => (
                <div key={c.title}>
                  <h3 className="text-base">{c.title}</h3>
                  <p className="mt-1.5 text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="implementation" title="What I built">
            <Bullets items={cs.implementation} />
          </Block>

          <Block id="results" title="Results">
            <Bullets items={cs.results} />
          </Block>

          <Block id="takeaways" title="Takeaways">
            <Bullets items={cs.lessons} />
          </Block>

          <Block id="next" title="What I'd do next">
            <Bullets items={cs.next} />
          </Block>

          {project.notes && (
            <aside className="panel max-w-prose p-5 text-sm">
              <h2 className="font-sans text-sm font-semibold">Notes on sources</h2>
              <ul className="mt-2 space-y-1.5 text-muted">
                {project.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </aside>
          )}

          <nav aria-label="Next case study" className="border-t border-line pt-8">
            <Link href={`/projects/${next.slug}`} className="group block">
              <span className="text-sm text-muted">Next case study</span>
              <span className="mt-1 block font-display text-2xl group-hover:text-accent">{next.name}</span>
              <span className="mt-1 block text-muted">{next.summary}</span>
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
