"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * One delegated listener instead of client-side links everywhere. Any element with
 * `data-track="event-name"` (and optional `data-track-label`) sends a Vercel Analytics
 * event. No personal data is attached: only the event name and a static label.
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const label = el.dataset.trackLabel;
      track(el.dataset.track!, label ? { label } : undefined);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
