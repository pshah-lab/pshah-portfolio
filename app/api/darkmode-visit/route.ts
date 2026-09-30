import { NextResponse, type NextRequest } from "next/server";
import { clientIp, counterConfigured, darkmodeVisitsKey, increment, isBot, rateLimited } from "@/lib/counter";

export const runtime = "nodejs";

/*
 * Visit counter for darkmode.pshah.fun (Force Dark Mode's site on GitHub Pages, which has no
 * backend). The site sends one bodiless POST per browser with navigator.sendBeacon. No
 * cookies, nothing stored about the visitor: just one number goes up.
 */
const ORIGINS = new Set(["https://darkmode.pshah.fun"]);

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (origin && ORIGINS.has(origin)) headers["Access-Control-Allow-Origin"] = origin;

  // Only count beacons from the site itself.
  if (!origin || !ORIGINS.has(origin)) return new NextResponse(null, { status: 403, headers });
  if (!counterConfigured || isBot(req.headers.get("user-agent"))) return new NextResponse(null, { status: 204, headers });
  if (rateLimited("darkmode", clientIp(req.headers), 3)) return new NextResponse(null, { status: 429, headers });

  await increment(darkmodeVisitsKey);
  return new NextResponse(null, { status: 204, headers });
}
