import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { aiUseCases, profile, setup, workingPrinciples } from "@/content/profile";
import { faqs } from "@/content/credentials";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Pratham Shah: how he works, how he uses AI as an engineering tool, his development setup, education, and answers to common questions.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      <PageIntro title="About">
        <div className="mt-6 max-w-prose space-y-4 text-lg text-muted">
          <p>
            I’m Pratham, a software engineer in {profile.location}. I finished a B.Tech in Computer Science at{" "}
            {profile.education.school} in 2026.
          </p>
          <p>
            My work spans three layers that usually belong to different people: the product a user touches, the cloud
            infrastructure under it, and the AI or ML that makes it smarter. I started in research, classifying EEG
            signals for a prosthetic arm. Then came products and client work, and in 2026 production cloud engineering on
            AWS and Google Cloud.
          </p>
          <p>
            What ties it together is an interest in how systems behave: where the data goes, what it costs, what breaks
            first. The <Link href="/journey" className="link">journey page</Link> has the longer version.
          </p>
        </div>
      </PageIntro>

      <div className="shell space-y-20 pb-24">
        <section aria-labelledby="ai" className="border-t border-line pt-12">
          <h2 id="ai" className="h-section scroll-mt-24">
            How I use AI in engineering
          </h2>
          <p className="mt-3 max-w-prose text-muted">
            AI makes me faster at the parts of engineering that are search, recall and first drafts. It doesn’t make
            decisions for me.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {workingPrinciples.map((w) => (
              <div key={w.title} className="panel p-5">
                <h3 className="text-base">{w.title}</h3>
                <p className="mt-2 text-sm text-muted">{w.body}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-10 text-lg">Where it earns its place</h3>
          <dl className="mt-4 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiUseCases.map((u) => (
              <div key={u.name} className="border-t border-line pt-3">
                <dt className="font-semibold text-ink">{u.name}</dt>
                <dd className="mt-1 text-sm text-muted">{u.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="setup" className="border-t border-line pt-12">
          <h2 id="setup" className="h-section scroll-mt-24">
            Setup
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {setup.map((g) => (
              <div key={g.group}>
                <h3 className="text-base">{g.group}</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {g.items.map((item) => (
                    <li key={item.name}>
                      <span className="text-ink">{item.name}</span>
                      {item.note && <span className="block text-muted">{item.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq" className="border-t border-line pt-12">
          <h2 id="faq" className="h-section scroll-mt-24">
            Common questions
          </h2>
          <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{f.question}</h3>
                  <span aria-hidden className="text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
