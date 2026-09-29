"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pshah:visitor-number";

/** 1 → "1st", 2 → "2nd", 13 → "13th", 478 → "478th". */
export function ordinal(n: number): string {
  const lastTwo = n % 100;
  const suffix = lastTwo >= 11 && lastTwo <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n.toLocaleString("en-US")}${suffix}`;
}

/**
 * "You're the 478th visitor". Counted once per browser: the number is kept in
 * localStorage, so refreshes and return visits show the same number instead of
 * incrementing. Renders nothing until a real number exists.
 */
export function VisitorCount({ className }: { className?: string }) {
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
    <p className={className}>
      You’re the <span className="font-semibold tabular-nums">{ordinal(n)}</span> visitor.
    </p>
  );
}
