import { renderOg, ogSize } from "@/lib/og";
import { caseStudies, getProject } from "@/content/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project case study by Pratham Shah";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug)!;
  const flow = p.caseStudy?.architecture[0];
  return renderOg({
    kicker: `Case study, ${p.kind}`,
    title: p.name,
    subtitle: p.summary,
    steps: flow?.nodes.slice(0, 5).map((n) => n.label),
  });
}
