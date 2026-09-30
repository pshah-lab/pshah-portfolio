import { NextResponse } from "next/server";
import { notes } from "@/content/notes";
import { noteReadsKey, readCounts } from "@/lib/counter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Read counts for every note, `{ [slug]: number }`. Cached at the edge for 5 minutes. */
export async function GET() {
  const counts = await readCounts(notes.map((n) => noteReadsKey(n.slug)));
  if (!counts) return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(Object.fromEntries(notes.map((n, i) => [n.slug, counts[i]])), {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600" },
  });
}
