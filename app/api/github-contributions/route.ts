import { NextResponse } from "next/server";
import { fetchContributions } from "@/lib/github-contributions";

// Rebuilt at most every 12 hours; visitors are always served the cached copy.
export const revalidate = 43200;

export async function GET() {
  const data = await fetchContributions();
  if (!data) return new NextResponse(null, { status: 204 });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=43200, stale-while-revalidate=86400" },
  });
}
