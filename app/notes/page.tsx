import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { NoteReads } from "@/components/note-reads";
import { JsonLd } from "@/components/json-ld";
import { notes } from "@/content/notes";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Engineering notes",
  description: "Technical notes by Pratham Shah on RAG retrieval, CloudFront signed cookies for HLS, and streaming uploads to S3, each drawn from his own code.",
  path: "/notes",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function NotesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Notes", path: "/notes" }])} />
      <PageIntro
        title="Engineering notes"
        intro="Short write-ups of specific decisions in my own repositories: what the code does, why, and the trade-off it accepts. Each note links to the code it describes."
      />
      <ol className="shell pb-24">
        {notes.map((n) => (
          <li key={n.slug} className="border-t border-line">
            <Link href={`/notes/${n.slug}`} className="group grid gap-2 py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10">
              <time dateTime={n.date} className="text-sm text-muted">
                {fmt(n.date)}
              </time>
              <span>
                <span className="block font-display text-2xl leading-tight group-hover:text-accent">{n.title}</span>
                <span className="mt-2 block max-w-prose text-muted">{n.summary}</span>
                <span className="mt-3 block text-xs text-muted">
                  {n.tags.join(", ")}
                  <NoteReads slug={n.slug} className="before:mx-2 before:content-['·']" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
