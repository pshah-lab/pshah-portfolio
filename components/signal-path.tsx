import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The hero's signature element: four real pipelines from four areas of work, each
 * linking to its evidence. A single pulse runs along each lane once on load
 * (CSS only, removed under prefers-reduced-motion).
 */
const lanes = [
  {
    area: "Cloud security",
    project: "StreamVault",
    href: "/projects/streamvault",
    steps: ["Cognito sign-in", "Auth Lambda", "Signed cookie", "CloudFront edge"],
  },
  {
    area: "FinOps",
    project: "Searce",
    href: "/experience#searce",
    steps: ["Billing data", "Utilization", "Idle and oversized", "Rightsizing"],
  },
  {
    area: "Applied AI",
    project: "InsightVault",
    href: "/projects/insightvault",
    steps: ["Question", "Embedding", "pgvector search", "Grounded answer"],
  },
  {
    area: "BCI research",
    project: "NeuroArm (team)",
    href: "/projects/neuroarm",
    steps: ["EEG", "Band power", "Classifier", "Arm command"],
  },
];

export function SignalPath() {
  return (
    <div className="panel overflow-hidden">
      <p className="border-b border-line px-5 py-3 text-sm text-muted">Four systems I’ve worked on, input to output</p>
      <ul className="divide-y divide-line">
        {lanes.map((lane, laneIndex) => (
          <li key={lane.area}>
            <Link
              href={lane.href}
              className="group block px-5 py-4 transition-colors hover:bg-ink/[0.03]"
              data-track="project_click"
              data-track-label={`hero:${lane.project}`}
            >
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{lane.area}</span>
                <span className="text-xs text-muted group-hover:text-accent">{lane.project}</span>
              </div>
              <div className="relative" style={{ ["--delay" as string]: `${0.35 + laneIndex * 0.3}s` }}>
                {/* track */}
                <div aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden">
                  <span className="signal-pulse absolute top-1/2 block h-[3px] w-[10%] -translate-y-1/2 rounded-full bg-accent opacity-0" />
                </div>
                <ol className="relative grid grid-cols-4 gap-2">
                  {lane.steps.map((step, i) => (
                    <li
                      key={step}
                      className={cn(
                        "signal-node flex min-h-11 items-center justify-center rounded-control border border-line bg-surface px-1 py-1.5 text-center text-[0.6875rem] font-medium leading-tight text-ink [overflow-wrap:anywhere] sm:px-2 sm:text-xs",
                        i === lane.steps.length - 1 && "text-accent",
                      )}
                      style={{ ["--step" as string]: i }}
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
