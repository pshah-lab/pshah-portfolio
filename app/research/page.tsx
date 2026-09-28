import Link from "next/link";
import { FlowDiagram } from "@/components/flow-diagram";
import { PageIntro } from "@/components/page-intro";
import { JsonLd } from "@/components/json-ld";
import { getProject } from "@/content/projects";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research: EEG and brain-computer interfaces",
  description:
    "Pratham Shah’s brain-computer interface research on the NeuroArm team: EEG preprocessing, band-power features, and Random Forest and MLP classification.",
  path: "/research",
});

export default function ResearchPage() {
  const neuro = getProject("neuroarm")!;
  const cs = neuro.caseStudy!;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }])} />
      <PageIntro
        title="Research"
        intro="From July 2024 to May 2025 I was part of the team building NeuroArm, a brain-computer interface for controlling a prosthetic arm with EEG. I worked on the signal side: getting from raw brain activity to a movement decision someone can see and check."
      />

      <div className="shell space-y-16 pb-24">
        <section aria-labelledby="pipeline">
          <h2 id="pipeline" className="h-section">
            The pipeline
          </h2>
          <p className="mt-3 max-w-prose text-muted">
            EEG is microvolt-level, noisy and different for every person. Each stage exists to throw away something that
            isn’t intent.
          </p>
          <FlowDiagram flow={cs.architecture[0]} className="mt-8" />
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["Preprocessing", "A filtering stage in the NeuroArm app, then standardization (StandardScaler) so electrodes and bands with larger raw values don't dominate the model."],
              ["Feature extraction", "Band power per electrode: delta (0.5–4 Hz), theta (4–8), alpha (8–13), beta (13–30) and gamma (30–50), summarized as mean and standard deviation."],
              ["Classification", "A 100-tree Random Forest as the baseline and a two-layer MLP (128 → 64, dropout 0.3, early stopping) as the neural alternative."],
              ["Visualization", "A web app that walks through upload, signal view, filtering, features, training and results, so the pipeline can be inspected rather than trusted blindly."],
            ].map(([t, b]) => (
              <div key={t} className="panel p-5">
                <dt className="font-semibold text-ink">{t}</dt>
                <dd className="mt-1.5 text-sm text-muted">{b}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="results" className="border-t border-line pt-12">
          <h2 id="results" className="h-section">
            Results in the public notebooks
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-display text-[3.5rem] font-semibold leading-none tabular-nums">91.6%</p>
              <p className="mt-2 text-muted">Random Forest test accuracy, macro F1 0.92</p>
            </div>
            <div className="max-w-prose space-y-3 text-muted">
              <p>
                Measured on 2,563 held-out samples from a 12,811-sample, 14-feature EEG dataset with a binary label (80/20
                split). Per class: precision 0.96 and recall 0.87 for class 0; precision 0.88 and recall 0.96 for class 1.
              </p>
              <p>
                These are within-dataset numbers from a random split. They don’t show how the model transfers to a new
                person; cross-subject validation is the honest next test.
              </p>
              <p>
                <a href="https://github.com/pshah-lab/BCI" target="_blank" rel="noopener noreferrer" className="link">
                  See the notebooks on GitHub
                </a>
                . NeuroArm was a team project, and the public repositories are forks of the team’s.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-line pt-12">
          <div className="flex flex-wrap gap-3">
            <Link href="/projects/neuroarm" className="btn-primary">
              NeuroArm case study
            </Link>
            <a href={neuro.links.live} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Open the NeuroArm app
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
