import type { Flow } from "@/content/types";
import { cn } from "@/lib/utils";

type Props = {
  flow: Flow;
  /** Always one column (for narrow containers). Default: wraps into as many columns as fit. */
  vertical?: boolean;
  /** Render without the panel frame. */
  bare?: boolean;
  className?: string;
};

/**
 * Architecture / data-flow diagram rendered from data as an ordered list, so it is
 * readable by screen readers and search engines. Steps are numbered because they
 * are a real sequence; the grid wraps to fit any container width.
 */
export function FlowDiagram({ flow, vertical = false, bare = false, className }: Props) {
  return (
    <figure className={cn(!bare && "panel p-5 sm:p-6", className)}>
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-semibold text-ink">{flow.title}</span>
        {flow.caption && <span className="text-sm text-muted">{flow.caption}</span>}
      </figcaption>
      <ol
        className="grid gap-2"
        style={{ gridTemplateColumns: vertical ? "1fr" : "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))" }}
      >
        {flow.nodes.map((node, i) => (
          <li key={`${node.label}-${i}`} className="flex gap-3 rounded-control border border-line bg-bg px-3 py-2.5">
            <span aria-hidden className="pt-px text-xs font-semibold tabular-nums text-accent">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium leading-snug text-ink">{node.label}</span>
              {node.detail && <span className="mt-1 block break-words font-mono text-xs leading-snug text-muted">{node.detail}</span>}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
