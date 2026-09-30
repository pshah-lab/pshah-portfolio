import { NextResponse, type NextRequest } from "next/server";
import { getNote } from "@/content/notes";
import { clientIp, counterConfigured, increment, isBot, noteReadsKey, rateLimited } from "@/lib/counter";

export const runtime = "nodejs";

/**
 * Counts one read of a note. The client calls this once per browser per note, and only
 * after the note has been open for a while, so the number means "read", not "loaded".
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const headers = { "Cache-Control": "no-store" };
  const { slug } = await params;
  if (!getNote(slug)) return NextResponse.json({ error: "Unknown note" }, { status: 404, headers });
  if (!counterConfigured || isBot(req.headers.get("user-agent"))) return new NextResponse(null, { status: 204, headers });
  if (rateLimited("reads", clientIp(req.headers), 10)) return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });

  const reads = await increment(noteReadsKey(slug));
  if (reads === null) return new NextResponse(null, { status: 204, headers });
  return NextResponse.json({ reads }, { headers });
}
