/**
 * Read-only access to the visitor count kept by app/api/visit. Uses the read-only token the
 * Upstash integration provides, so a bug here can never change the number.
 */

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Must match the key in app/api/visit/route.ts.
const KEY = `portfolio:visitors:${process.env.VERCEL_ENV || "development"}`;

export async function readVisitorCount(): Promise<number | null> {
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const { result } = (await res.json()) as { result?: string | null };
    const n = Number(result);
    return result != null && Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}
