import { NextRequest, NextResponse } from "next/server";
import { getTrackerStats, recordRequest } from "@/lib/bot-tracker";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  // Record this request to tracker
  recordRequest(userAgent, path);

  const stats = getTrackerStats();

  if (searchParams.get("format") === "html") {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bot Tracker Dashboard | pshah.fun</title>
  <style>
    body { background: #080b10; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; padding: 30px; margin: 0; }
    .container { max-width: 1000px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 8px; color: #5eead4; }
    p.sub { color: #94a3b8; font-size: 15px; margin-top: 0; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 30px; }
    .card { background: #0f172a; border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; }
    .card .val { font-size: 32px; font-weight: 700; color: #ffffff; margin-top: 8px; }
    .card .lbl { font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
    table { width: 100%; border-collapse: collapse; background: #0f172a; border-radius: 8px; overflow: hidden; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.1); }
    th, td { text-align: left; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; }
    th { background: rgba(255,255,255,0.04); color: #cbd5e1; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
    .badge-ai { background: rgba(94, 234, 212, 0.15); color: #5eead4; border: 1px solid rgba(94, 234, 212, 0.3); }
    .badge-search { background: rgba(96, 165, 250, 0.15); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.3); }
    .badge-human { background: rgba(241, 245, 249, 0.1); color: #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Bot Activity Tracker</h1>
    <p class="sub">Live crawl activity and traffic metrics for pshah.fun</p>

    <div class="grid">
      <div class="card">
        <div class="lbl">Total Requests</div>
        <div class="val">${stats.totalRequests}</div>
      </div>
      <div class="card">
        <div class="lbl">Human Visitors</div>
        <div class="val" style="color: #60a5fa;">${stats.trafficDistribution.humanPercentage}</div>
      </div>
      <div class="card">
        <div class="lbl">AI Bot Crawls</div>
        <div class="val" style="color: #5eead4;">${stats.trafficDistribution.aiBotPercentage}</div>
      </div>
      <div class="card">
        <div class="lbl">Search Engine Crawls</div>
        <div class="val" style="color: #a78bfa;">${stats.trafficDistribution.searchEnginePercentage}</div>
      </div>
    </div>

    <h2 style="font-size: 20px; color: #ffffff; margin-bottom: 16px;">Bot Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Bot Identifier</th>
          <th>Crawl Count</th>
        </tr>
      </thead>
      <tbody>
        ${
          Object.keys(stats.botBreakdown).length > 0
            ? Object.entries(stats.botBreakdown)
                .map(
                  ([bot, count]) =>
                    `<tr><td>${bot}</td><td><strong>${count}</strong></td></tr>`
                )
                .join("")
            : `<tr><td colspan="2" style="color:#64748b;">No bot crawls recorded yet in this session.</td></tr>`
        }
      </tbody>
    </table>

    <h2 style="font-size: 20px; color: #ffffff; margin-bottom: 16px;">Recent Request Feed</h2>
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Category</th>
          <th>Bot / Client</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        ${
          stats.recentLogs.length > 0
            ? stats.recentLogs
                .map(
                  (log) => `
          <tr>
            <td style="color:#94a3b8; font-size:12px;">${log.timestamp}</td>
            <td><span class="badge ${
              log.category === "AI_BOT"
                ? "badge-ai"
                : log.category === "SEARCH_ENGINE"
                ? "badge-search"
                : "badge-human"
            }">${log.category}</span></td>
            <td>${log.botName}</td>
            <td style="color:#5eead4; font-family:monospace;">${log.path}</td>
          </tr>`
                )
                .join("")
            : `<tr><td colspan="4" style="color:#64748b;">No recent requests logged yet.</td></tr>`
        }
      </tbody>
    </table>
  </div>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.json(stats, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}
