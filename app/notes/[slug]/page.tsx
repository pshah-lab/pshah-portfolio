import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteBody } from "@/components/note-body";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { getNote, notes } from "@/content/notes";
import { getProject } from "@/content/projects";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return pageMetadata({ title: n.title, description: n.summary, path: `/notes/${n.slug}`, type: "article", publishedTime: n.date });
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const project = note.project ? getProject(note.project) : undefined;

  return (
    <article>
      <JsonLd
        data={[
          articleSchema(note),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Notes", path: "/notes" },
            { name: note.title, path: `/notes/${note.slug}` },
          ]),
        ]}
      />
      <PageIntro
        title={note.title}
        intro={note.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/notes", label: "Notes" },
        ]}
      >
        <p className="mt-5 text-sm text-muted">
          <time dateTime={note.date}>{new Date(note.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
          {", "}
          {note.tags.join(", ")}
        </p>
      </PageIntro>
      <div className="shell pb-24">
        <div className="max-w-3xl">
          <NoteBody blocks={note.body} />
          <footer className="mt-12 border-t border-line pt-6 text-sm text-muted">
            <p>Based on: {note.basis}.</p>
            {project && (
              <p className="mt-2">
                Project:{" "}
                <Link href={`/projects/${project.slug}`} className="link">
                  {project.name} case study
                </Link>
                {project.links.repo && (
                  <>
                    {", "}
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="link">
                      source on GitHub
                    </a>
                  </>
                )}
              </p>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
