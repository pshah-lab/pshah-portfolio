import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignalPath } from "@/components/signal-path";
import { SectionHeader } from "@/components/section-header";
import { EvidenceList } from "@/components/evidence-list";
import { FeaturedProject, ProjectCard } from "@/components/project-card";
import { GitHubFeed, GitHubFeedSkeleton } from "@/components/github-feed";
import { ContributionGraph } from "@/components/contribution-graph";
import { ContactBlock } from "@/components/contact-block";
import { JsonLd } from "@/components/json-ld";
import { now, profile } from "@/content/profile";
import { projects, toCard } from "@/content/projects";
import { experience } from "@/content/experience";
import { achievements, capabilities, certifications, evidence, testimonials } from "@/content/credentials";
import { notes } from "@/content/notes";
import { profilePageSchema } from "@/lib/seo";

const featured = ["streamvault", "insightvault", "abhinandan-mountreea", "force-dark-mode"].map(
  (slug) => projects.find((p) => p.slug === slug)!,
);
const notable = projects.filter((p) => p.tier === "notable").map(toCard);

const fmtDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="border-b border-line">
        <div className="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              Open to junior cloud, backend and full-stack roles, {profile.location}
            </p>
            <h1 id="hero-title" className="mt-5 text-[3.25rem] leading-[0.95] sm:text-[4.5rem] xl:text-[5.25rem]">
              Pratham Shah
            </h1>
            <p className="mt-4 text-[1.375rem] font-medium leading-snug text-ink sm:text-[1.75rem]">
              Cloud and full-stack engineer. 2026 CS graduate, Google Cloud Associate Cloud Engineer.
            </p>
            <p className="mt-5 max-w-prose text-lg text-muted">{profile.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-primary">
                See selected work
              </Link>
              <Link href="/resume" className="btn-secondary" data-track="resume_click" data-track-label="hero">
                Resume
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link" data-track="github_click" data-track-label="hero">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link" data-track="contact_click" data-track-label="hero:linkedin">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.links.email} className="link" data-track="contact_click" data-track-label="hero:email">
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
          <SignalPath />
        </div>
      </section>

      {/* Impact */}
      <section aria-labelledby="impact" className="section">
        <div className="shell">
          <SectionHeader
            id="impact"
            title="What you can check"
            intro="Everything below links to something you can open: source code, a live product, a store listing or the role write-up."
          />
          <EvidenceList items={evidence} />
        </div>
      </section>

      {/* Featured work */}
      <section aria-labelledby="work" className="section border-t border-line">
        <div className="shell">
          <SectionHeader
            id="work"
            title="Selected work"
            intro="The two projects on my resume, plus paid client work and a shipped extension. Each has a case study with the architecture and the decisions behind it."
            action={{ href: "/projects", label: `All ${projects.length} projects` }}
          />
          <div className="space-y-6">
            {featured.map((p, i) => (
              <FeaturedProject key={p.slug} project={p} priority={i === 0} />
            ))}
          </div>
          <h3 className="mt-14 text-lg">More work</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {notable.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities" className="section border-t border-line">
        <div className="shell">
          <SectionHeader
            id="capabilities"
            title="Three kinds of engineering, one engineer"
            intro="Grouped by what I can do rather than by logo. Every line points to where it was done."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.id} className="panel flex flex-col p-6">
                <h3 className="font-display text-xl">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.statement}</p>
                <ul className="mt-5 space-y-3">
                  {c.abilities.map((a) => (
                    <li key={a.name} className="border-t border-line pt-3 text-sm">
                      <span className="text-ink">{a.name}</span>
                      <span className="mt-0.5 block text-muted">
                        {a.href ? (
                          <Link href={a.href} className="hover:text-accent">
                            {a.evidence}
                          </Link>
                        ) : (
                          a.evidence
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-xs leading-relaxed text-muted">{c.tools.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Now + experience */}
      <section aria-labelledby="experience-home" className="section border-t border-line">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="now" className="h-section scroll-mt-24">
              Now
            </h2>
            <p className="mt-3 text-sm text-muted">Updated {now.updated}.</p>
            <dl className="mt-8 space-y-6">
              {now.items.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-semibold text-ink">{item.label}</dt>
                  <dd className="mt-1 text-muted">
                    {item.text}{" "}
                    <Link href={item.href} className="link text-sm">
                      Details<span className="sr-only">: {item.label.toLowerCase()}</span>
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeader
              id="experience-home"
              title="Experience"
              action={{ href: "/experience", label: "Full experience" }}
              className="mb-6"
            />
            <ol className="border-t border-line">
              {experience.map((e) => (
                <li key={e.slug} className="border-b border-line">
                  <Link href={`/experience#${e.slug}`} className="grid gap-1 py-5 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                    <span className="text-sm tabular-nums text-muted">{e.period}</span>
                    <span>
                      <span className="block font-semibold text-ink">{e.company}</span>
                      <span className="block text-sm text-ink">{e.role}</span>
                      <span className="mt-1 block text-sm text-muted">{e.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Research + credentials */}
      <section aria-labelledby="credentials" className="section border-t border-line">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="research-home" className="h-section">
              Research
            </h2>
            <p className="mt-4 text-muted">
              On the NeuroArm team at IS360 Technologies I worked on EEG preprocessing and classification for a
              brain-controlled prosthetic arm, and on a visualization that shows the signal path from brain to arm.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/research" className="btn-secondary">
                Read about the research
              </Link>
              <Link href="/projects/neuroarm" className="btn-secondary">
                NeuroArm case study
              </Link>
            </div>
          </div>
          <div>
            <h2 id="credentials" className="h-section scroll-mt-24">
              Credentials
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {certifications.map((c) => (
                <li key={c.name} className="py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span>
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-accent" data-track="credential_click" data-track-label={c.name}>
                          {c.name}
                          <span className="sr-only"> (verify on Credly, opens in a new tab)</span>
                        </a>
                      ) : (
                        <span className="font-semibold text-ink">{c.name}</span>
                      )}
                      <span className="block text-sm text-muted">
                        {c.issuer}
                        {c.date && `. Issued ${fmtDay(c.date)}`}
                        {c.expires && `, valid until ${fmtDay(c.expires)}`}
                        {c.url && (
                          <>
                            {". "}
                            <a href={c.url} target="_blank" rel="noopener noreferrer" className="link">
                              Verify on Credly
                            </a>
                          </>
                        )}
                      </span>
                    </span>
                    <span className={c.status === "Certified" ? "tag border-accent/50 text-accent" : "tag"}>{c.status}</span>
                  </div>
                  {c.image && (
                    <a href={c.image.src} target="_blank" rel="noopener noreferrer" className="mt-4 block max-w-sm overflow-hidden rounded-control border border-line transition-colors hover:border-ink/40">
                      <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 640px) 384px, 100vw" className="h-auto w-full" />
                      <span className="sr-only">Open the full-size certificate</span>
                    </a>
                  )}
                </li>
              ))}
              {achievements
                .filter((a) => a.category === "Hackathon")
                .map((a) => (
                  <li key={a.title} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                    <span>
                      <span className="font-semibold text-ink">{a.title}</span>
                      <span className="block text-sm text-muted">{a.context}</span>
                    </span>
                    <span className="text-sm tabular-nums text-muted">{a.year}</span>
                  </li>
                ))}
              <li className="py-4">
                <span className="font-semibold text-ink">{profile.education.degree}</span>
                <span className="block text-sm text-muted">
                  {profile.education.school}, {profile.education.location}. {profile.education.status}.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* GitHub */}
      <section aria-labelledby="github" className="section border-t border-line">
        <div className="shell">
          <SectionHeader
            id="github"
            title="Open source"
            intro="Selected public repositories. Every project on this site that isn't client work has its source here."
          />
          <ContributionGraph
            color="rgb(var(--accent))"
            className="panel mb-8 p-5 text-muted sm:p-6"
            textClassName="text-muted"
            linkClassName="link"
          />
          <Suspense fallback={<GitHubFeedSkeleton />}>
            <GitHubFeed />
          </Suspense>
        </div>
      </section>

      {/* Notes */}
      <section aria-labelledby="notes" className="section border-t border-line">
        <div className="shell">
          <SectionHeader
            id="notes"
            title="Engineering notes"
            intro="Walkthroughs of specific decisions in my own code."
            action={{ href: "/notes", label: "All notes" }}
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link href={`/notes/${n.slug}`} className="panel flex h-full flex-col p-5 transition-colors hover:border-ink/40">
                  <span className="text-xs text-muted">{n.tags.join(", ")}</span>
                  <span className="mt-2 font-semibold leading-snug text-ink">{n.title}</span>
                  <span className="mt-2 text-sm text-muted">{n.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section aria-labelledby="testimonial" className="section border-t border-line">
        <div className="shell">
          <h2 id="testimonial" className="sr-only">
            Client feedback
          </h2>
          {testimonials.map((t) => (
            <figure key={t.quote} className="max-w-4xl">
              <blockquote className="text-[1.5rem] leading-snug text-ink sm:text-[2rem]">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-muted">
                <span className="font-semibold text-ink">{t.person ?? t.organization}</span>
                {t.role ? `, ${t.role}` : ""}. {t.relationship}, {t.date}.{" "}
                <Link href="/projects/abhinandan-mountreea" className="link text-sm">
                  See the project
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ContactBlock />
    </>
  );
}

