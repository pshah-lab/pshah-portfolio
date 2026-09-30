"use client";

import { useEffect, useState } from "react";

/** Counts stay hidden until they're big enough to mean something. */
const MIN_SHOWN = 10;
/** Seconds a note has to be open in a visible tab before it counts as read. */
const READ_AFTER_S = 15;

const storageKey = (slug: string) => `pshah:read:${slug}`;

// One request for all counts, shared by every NoteReads on the page.
let allCounts: Promise<Record<string, number> | null> | null = null;
const fetchCounts = () =>
  (allCounts ??= fetch("/api/reads")
    .then((res) => (res.status === 200 ? (res.json() as Promise<Record<string, number>>) : null))
    .catch(() => null));

function alreadyCounted(slug: string) {
  try {
    return localStorage.getItem(storageKey(slug)) === "1";
  } catch {
    return false;
  }
}

/**
 * "214 reads". With `track`, also counts this browser's read once it has had the note open
 * for 15 seconds; list pages only display.
 */
export function NoteReads({ slug, track = false, className }: { slug: string; track?: boolean; className?: string }) {
  const [reads, setReads] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCounts().then((counts) => {
      if (!cancelled && counts && typeof counts[slug] === "number") setReads((r) => Math.max(r ?? 0, counts[slug]));
    });
    if (!track || alreadyCounted(slug)) return () => void (cancelled = true);

    let seconds = 0;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (++seconds < READ_AFTER_S) return;
      clearInterval(timer);
      fetch(`/api/reads/${encodeURIComponent(slug)}`, { method: "POST" })
        .then((res) => (res.status === 200 ? res.json() : null))
        .then((data: { reads?: number } | null) => {
          try {
            localStorage.setItem(storageKey(slug), "1");
          } catch {
            // Not persisted; this browser may be counted again next time. Acceptable.
          }
          if (!cancelled && data?.reads) setReads(data.reads);
        })
        .catch(() => {});
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [slug, track]);

  if (reads === null || reads < MIN_SHOWN) return null;
  return <span className={className}>{reads.toLocaleString("en-US")} reads</span>;
}
