/**
 * Small counters in the same Upstash Redis as the visitor count: note reads and visits to
 * darkmode.pshah.fun. Writes use the read-write token; reads use the read-only token when
 * the integration provides one. Every call fails soft (null), so storage trouble never
 * breaks a page.
 */

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const writeToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const readToken = process.env.KV_REST_API_READ_ONLY_TOKEN || writeToken;

export const counterConfigured = Boolean(url && writeToken);

// Previews and local runs count separately so they never inflate the live numbers.
const ENV = process.env.VERCEL_ENV || "development";

export const noteReadsKey = (slug: string) => `portfolio:reads:${slug}:${ENV}`;
export const darkmodeVisitsKey = `darkmode:visits:${ENV}`;

async function command(token: string | undefined, args: string[], revalidate?: number): Promise<unknown> {
  if (!url || !token) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(3000),
      ...(revalidate ? { next: { revalidate } } : { cache: "no-store" as const }),
    });
    if (!res.ok) return null;
    return ((await res.json()) as { result?: unknown }).result ?? null;
  } catch {
    return null;
  }
}

export async function increment(key: string): Promise<number | null> {
  const result = await command(writeToken, ["INCR", key]);
  return typeof result === "number" ? result : null;
}

/** Current values for several keys; missing keys read as 0. `revalidate` caches the read. */
export async function readCounts(keys: string[], revalidate?: number): Promise<number[] | null> {
  if (keys.length === 0) return [];
  const result = await command(readToken, ["MGET", ...keys], revalidate);
  if (!Array.isArray(result)) return null;
  return result.map((v) => (v == null ? 0 : Number(v) || 0));
}

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|embedly|curl|wget|python-requests/i;

export const isBot = (userAgent: string | null) => !userAgent || BOT.test(userAgent);

// Best-effort per-IP limit (per server instance), keyed by counter so they don't share a budget.
const recent = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;

export function rateLimited(bucket: string, ip: string, max: number) {
  const now = Date.now();
  if (recent.size > 5000) recent.clear();
  const key = `${bucket}:${ip}`;
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > max;
}

export const clientIp = (headers: Headers) => headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
