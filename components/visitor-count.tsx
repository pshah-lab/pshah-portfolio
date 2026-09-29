"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pshah:visitor-number";

/**
 * "You're visitor #1,234". Counted once per browser: the number is kept in
 * localStorage, so refreshes and return visits show the same number instead of
 * incrementing. Renders nothing until a real number exists.
 */
export function VisitorCount() {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked (private mode, strict settings): still count once this session.
    }
    const parsed = saved ? Number(saved) : NaN;
    if (Number.isInteger(parsed) && parsed > 0) {
      setN(parsed);
      return;
    }

    const controller = new AbortController();
    fetch("/api/visit", { method: "POST", signal: controller.signal })
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data: { visitor?: number } | null) => {
        if (!data?.visitor) return;
        setN(data.visitor);
        try {
          localStorage.setItem(STORAGE_KEY, String(data.visitor));
        } catch {
          // Not persisted; fine.
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!n) return null;
  return (
    <p>
      You’re visitor <span className="tabular-nums text-ink">#{n.toLocaleString("en-IN")}</span>. Thanks for stopping by.
    </p>
  );
}
