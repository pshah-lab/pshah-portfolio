import { ProjectExplorer } from "@/components/project-explorer";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { projects, toCard } from "@/content/projects";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Pratham Shah across full-stack, cloud, AI and BCI research: InsightVault (RAG on pgvector), NeuroArm (EEG classification), StreamVault (AWS HLS), Cloud Media Hub, Force Dark Mode and client work.",
  path: "/projects",
});

const order = { featured: 0, notable: 1, archive: 2 } as const;
const sorted = [...projects].sort((a, b) => order[a.tier] - order[b.tier]).map(toCard);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
      <PageIntro
        title="Projects"
        intro="Case studies first, then smaller builds. Six projects have write-ups covering the problem, architecture, decisions and results; the rest link to source or a live demo."
      />
      <section aria-labelledby="project-list" className="shell pb-24">
        <h2 id="project-list" className="sr-only">
          All projects
        </h2>
        <ProjectExplorer projects={sorted} />
      </section>
    </>
  );
}
