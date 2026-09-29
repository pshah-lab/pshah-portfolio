import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

/*
 * Visitor counter backed by Upstash Redis (Vercel Marketplace → Storage → Upstash).
 * The integration sets KV_REST_API_URL / KV_REST_API_TOKEN; UPSTASH_* names also work.
 * Without them the endpoint returns 204 and the footer simply shows nothing.
 *
 * The client calls this once per browser (it remembers its number in localStorage),
 * so the count is "browsers that visited", not page views.
 */
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Previews and local runs count separately so they never inflate the live number.
const KEY = `portfolio:visitors:${process.env.VERCEL_ENV || "development"}`;

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|embedly|curl|wget|python-requests/i;

// Best-effort per-IP limit (per server instance) so one person can't inflate the count.
const recent = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function limited(ip: string) {
  const now = Date.now();
  if (recent.size > 5000) recent.clear();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  if (!url || !token) return new NextResponse(null, { status: 204, headers });

  const ua = req.headers.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return new NextResponse(null, { status: 204, headers });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });

  try {
    const res = await fetch(`${url}/incr/${encodeURIComponent(KEY)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return new NextResponse(null, { status: 204, headers });
    const { result } = (await res.json()) as { result?: number };
    if (typeof result !== "number") return new NextResponse(null, { status: 204, headers });
    return NextResponse.json({ visitor: result }, { headers });
  } catch {
    // Storage down or slow: stay silent rather than show a wrong number.
    return new NextResponse(null, { status: 204, headers });
  }
}
