import Link from "next/link";
import { Download } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { resume, resumes } from "@/content/resume";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Pratham Shah: 2026 CS graduate in Pune, Google Cloud Associate Cloud Engineer. Internships at Searce (Google Cloud cost optimization) and NeuraMach AI Studios (full-stack, Next.js/FastAPI). PDF available.",
  path: "/resume",
});

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="border-b border-line pb-2 text-2xl">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 max-w-prose list-disc space-y-1.5 pl-5 text-muted marker:text-line">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resume", path: "/resume" }])} />
      <PageIntro title="Resume" intro={resume.summary}>
        <p className="mt-3 text-sm text-muted">
          {resume.location}. Two one-page versions: one for software development roles, one for cloud roles.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {Object.values(resumes).map((r, i) => (
            <a
              key={r.file}
              href={`/${r.file}.pdf`}
              download
              className={i === 0 ? "btn-primary" : "btn-secondary"}
              data-track="resume_click"
              data-track-label={`resume:download:${r.variant}`}
            >
              <Download className="h-4 w-4" aria-hidden />
              {r.label} resume (PDF)
            </a>
          ))}
          <a href={profile.links.email} className="btn-secondary" data-track="contact_click" data-track-label="resume:email">
            {profile.email}
          </a>
        </div>
      </PageIntro>

      <div className="shell grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="r-exp">
            <Heading id="r-exp">Experience</Heading>
            <div className="mt-6 space-y-8">
              {resume.experience.map((e) => (
                <div key={e.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-lg">
                      {e.role}, {e.company}
                    </h3>
                    <span className="text-sm tabular-nums text-muted">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted">{e.location}</p>
                  <Bullets items={e.bullets} />
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="r-proj">
            <Heading id="r-proj">Projects</Heading>
            <div className="mt-6 space-y-8">
              {resume.projects.map((p) => {
                const slug = projects.find((x) => x.name === p.name)?.slug;
                return (
                  <div key={p.name}>
                    <h3 className="text-lg">
                      {slug ? (
                        <Link href={`/projects/${slug}`} className="hover:text-accent">
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                      <span className="font-normal text-muted">: {p.tagline}</span>
                    </h3>
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link text-sm" data-track="github_click" data-track-label={`resume:${p.name}`}>
                      {p.repo.replace("https://", "")}
                    </a>
                    <Bullets items={p.bullets} />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-10">
          <section aria-labelledby="r-skills">
            <Heading id="r-skills">Skills</Heading>
            <dl className="mt-4 space-y-3 text-sm">
              {resume.skills.map((g) => (
                <div key={g.label}>
                  <dt className="font-semibold text-ink">{g.label}</dt>
                  <dd className="text-muted">{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="r-cert">
            <Heading id="r-cert">Certification</Heading>
            <ul className="mt-4 space-y-2 text-sm">
              {resume.certifications.map((c) => (
                <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-4 text-ink">
                  <span>
                    {c.issuer} {c.name}
                    {c.url && (
                      <>
                        {" · "}
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="link">
                          Verify on Credly
                        </a>
                      </>
                    )}
                  </span>
                  {c.date && (
                    <span className="text-muted tabular-nums">
                      {new Date(`${c.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="r-edu">
            <Heading id="r-edu">Education</Heading>
            <p className="mt-4 font-semibold text-ink">{resume.education.degree}</p>
            <p className="text-sm text-muted">
              {resume.education.school}, {resume.education.location}. {resume.education.period}, {resume.education.status.toLowerCase()}.
            </p>
          </section>
          <section aria-labelledby="r-ach">
            <Heading id="r-ach">Achievements</Heading>
            <ul className="mt-4 space-y-3 text-sm">
              {resume.achievements.map((a) => (
                <li key={a.text} className="text-ink">
                  {a.text}
                  {a.year && <span className="text-muted"> ({a.year})</span>}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
