"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ContributionDay, Contributions } from "@/lib/github-contributions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Share of the accent colour per GitHub level; level 0 is a faint neutral.
const LEVEL_MIX = [0, 30, 55, 78, 100];

const cellColor = (level: number) =>
  level === 0
    ? "color-mix(in srgb, currentColor 10%, transparent)"
    : `color-mix(in srgb, var(--graph-color) ${LEVEL_MIX[level]}%, transparent)`;

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

type Props = {
  /** Accent colour for active days, any CSS colour. */
  color: string;
  className?: string;
  /** Classes for the small text (total, legend, months). */
  textClassName?: string;
  linkClassName?: string;
};

/**
 * GitHub contribution calendar for the last year. Data comes from /api/github-contributions
 * (cached 12 hours). Space is reserved while loading so the page doesn't jump; if the data
 * can't be fetched the whole block hides.
 */
export function ContributionGraph({ color, className, textClassName, linkClassName }: Props) {
  const [data, setData] = useState<Contributions | null | "error">(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github-contributions", { signal: controller.signal })
      .then((res) => (res.status === 200 ? res.json() : "error"))
      .then(setData)
      .catch((e) => {
        if (e?.name !== "AbortError") setData("error");
      });
    return () => controller.abort();
  }, []);

  const view = useMemo(() => {
    if (!data || data === "error") return null;
    // Columns are weeks starting on Sunday, like GitHub's own graph.
    const pad = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
    const cells: (ContributionDay | null)[] = [...Array(pad).fill(null), ...data.days];
    const weeks: (ContributionDay | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const labels: { col: number; text: string }[] = [];
    weeks.forEach((week, col) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = Number(first.date.slice(5, 7)) - 1;
      const prev = labels.at(-1);
      if ((!prev || MONTHS[month] !== prev.text) && (!prev || col - prev.col >= 3)) labels.push({ col, text: MONTHS[month] });
    });

    const busiest = data.days.reduce((a, b) => (b.count > a.count ? b : a));
    return { weeks, labels, busiest };
  }, [data]);

  // On narrow screens the graph scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    if (!view) return;
    // Wait for the freshly rendered grid to be laid out before measuring its width.
    const frame = requestAnimationFrame(() => {
      const el = scroller.current;
      if (el) el.scrollLeft = el.scrollWidth;
    });
    return () => cancelAnimationFrame(frame);
  }, [view]);

  if (data === "error") return null;

  const summary =
    view && data
      ? `${data.total.toLocaleString("en-US")} GitHub contributions in the last year. Busiest day: ${fmtDate(view.busiest.date)} with ${view.busiest.count}.`
      : "Loading GitHub contributions";

  return (
    <figure className={className} style={{ ["--graph-color" as string]: color }}>
      <div ref={scroller} className="overflow-x-auto pb-1">
        <div className="min-w-[680px]">
          {/* Month labels */}
          <div className={`relative mb-1.5 h-4 ${textClassName ?? ""}`} aria-hidden>
            {view?.labels.map((l) => (
              <span key={l.col} className="absolute text-xs" style={{ left: `${(l.col / view.weeks.length) * 100}%` }}>
                {l.text}
              </span>
            ))}
          </div>
          <div
            role="img"
            aria-label={summary}
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${view?.weeks.length ?? 53}, minmax(0, 1fr))`,
              gridTemplateRows: "repeat(7, minmax(0, 1fr))",
              gridAutoFlow: "column",
            }}
          >
            {view
              ? view.weeks.flatMap((week, w) =>
                  Array.from({ length: 7 }, (_, d) => {
                    const day = week[d];
                    return (
                      <div
                        key={`${w}-${d}`}
                        className="aspect-square rounded-[2px]"
                        style={{ background: day ? cellColor(day.level) : "transparent" }}
                        title={day ? `${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${fmtDate(day.date)}` : undefined}
                      />
                    );
                  }),
                )
              : Array.from({ length: 53 * 7 }, (_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-[2px]" style={{ background: cellColor(0) }} />
                ))}
          </div>
        </div>
      </div>
      <figcaption className={`mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs ${textClassName ?? ""}`}>
        <span>
          {view && data ? (
            <>
              <span className="font-semibold tabular-nums">{data.total.toLocaleString("en-US")}</span> contributions in the last year on{" "}
              <a href={`https://github.com/${data.user}`} target="_blank" rel="noopener noreferrer" className={linkClassName} data-track="github_click" data-track-label="contribution-graph">
                GitHub
              </a>
            </>
          ) : (
            "Loading GitHub activity…"
          )}
        </span>
        <span className="flex items-center gap-1" aria-hidden>
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="inline-block size-[10px] rounded-[2px]" style={{ background: cellColor(l) }} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
