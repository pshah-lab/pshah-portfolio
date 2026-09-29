/**
 * Contribution calendar for the GitHub profile, parsed from the public page GitHub itself
 * renders on profiles (github.com/users/<user>/contributions). No token needed.
 *
 * GitHub can change this markup without notice. Parsing is defensive: if the shape is
 * wrong, the caller gets null and the graph is hidden rather than showing bad data.
 */

export const GITHUB_USER = "pshah-lab";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { user: string; total: number; days: ContributionDay[]; fetchedAt: string };

const CELL = /<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;
const TOOLTIP = /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;

export function parseContributions(html: string, user = GITHUB_USER): Contributions | null {
  // Tooltip text holds the exact count, keyed by the cell's id.
  const counts = new Map<string, number>();
  for (const m of html.matchAll(TOOLTIP)) {
    const text = m[2].trim();
    const n = /^No contributions/i.test(text) ? 0 : Number((/^([\d,]+)\s+contributions?/i.exec(text)?.[1] ?? "").replace(/,/g, ""));
    if (Number.isFinite(n)) counts.set(m[1], n);
  }

  const days: ContributionDay[] = [];
  for (const m of html.matchAll(CELL)) {
    const tag = m[0];
    const id = /\bid="([^"]+)"/.exec(tag)?.[1];
    const level = Number(/\bdata-level="(\d)"/.exec(tag)?.[1] ?? NaN);
    if (!id || !(level >= 0 && level <= 4)) continue;
    days.push({ date: m[1], count: counts.get(id) ?? (level === 0 ? 0 : NaN), level: level as ContributionDay["level"] });
  }

  // A year is 365–371 cells. Anything far off means the markup changed.
  if (days.length < 300 || days.some((d) => Number.isNaN(d.count))) return null;

  days.sort((a, b) => a.date.localeCompare(b.date));
  return { user, total: days.reduce((sum, d) => sum + d.count, 0), days, fetchedAt: new Date().toISOString() };
}

export async function fetchContributions(user = GITHUB_USER): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { "User-Agent": "pshah.fun contribution graph", Accept: "text/html" },
      next: { revalidate: 60 * 60 * 12 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return parseContributions(await res.text(), user);
  } catch {
    return null;
  }
}
