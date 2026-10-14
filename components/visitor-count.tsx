"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pshah:visitor-number";

/*
 * The production counter was seeded at 477 (visitors carried over from Vercel Analytics). Until
 * 30 Sep 2026 VERCEL_ENV wasn't exposed, so early browsers got small numbers from the development
 * key and saved them. In production any saved number below this is stale and is replaced once.
 */
const FIRST_PRODUCTION_NUMBER = 478;
const PRODUCTION_HOSTS = new Set(["pshah.fun", "www.pshah.fun"]);

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
    const minValid = PRODUCTION_HOSTS.has(location.hostname) ? FIRST_PRODUCTION_NUMBER : 1;
    if (Number.isInteger(parsed) && parsed >= minValid) {
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
