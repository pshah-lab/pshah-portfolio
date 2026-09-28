import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { journey } from "@/content/credentials";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journey",
  description: "How Pratham Shah's engineering work evolved from 2022 to 2026: computer science foundations, BCI research, client work, and production cloud and AI engineering.",
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Journey", path: "/journey" }])} />
      <PageIntro
        title="Journey"
        intro="The path ran from research to products to production systems. Each year added a layer: first models on noisy real-world data, then shipping to users and clients, then infrastructure and cost."
      />
      <ol className="shell relative pb-24">
        {journey.map((event) => (
          <li key={event.year} className="grid gap-4 border-t border-line py-10 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-10">
            <p className="font-display text-[2.5rem] font-semibold leading-none tabular-nums text-accent">{event.year}</p>
            <div className="max-w-prose">
              <h2 className="text-[1.5rem] leading-tight sm:text-[1.75rem]">{event.title}</h2>
              <p className="mt-3 text-muted">{event.body}</p>
              {event.href &&
                (event.href.startsWith("http") ? (
                  <a href={event.href} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-sm">
                    See more<span className="sr-only"> about {event.year}</span>
                  </a>
                ) : (
                  <Link href={event.href} className="link mt-3 inline-block text-sm">
                    See more<span className="sr-only"> about {event.year}</span>
                  </Link>
                ))}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
