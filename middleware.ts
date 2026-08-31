import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const path = request.nextUrl.pathname;

  // Skip static assets (images, css, js, fonts)
  if (
    path.startsWith("/_next") ||
    path.startsWith("/favicon") ||
    path.endsWith(".png") ||
    path.endsWith(".jpg") ||
    path.endsWith(".webp") ||
    path.endsWith(".css") ||
    path.endsWith(".js")
  ) {
    return NextResponse.next();
  }

  const ua = userAgent.toLowerCase();

  let category = "HUMAN";
  let botName = "Human Visitor";

  // AI Bots
  if (ua.includes("gptbot")) { category = "AI_BOT"; botName = "GPTBot"; }
  else if (ua.includes("chatgpt-user")) { category = "AI_BOT"; botName = "ChatGPT-User"; }
  else if (ua.includes("claudebot")) { category = "AI_BOT"; botName = "ClaudeBot"; }
  else if (ua.includes("claude-web")) { category = "AI_BOT"; botName = "Claude-Web"; }
  else if (ua.includes("perplexitybot")) { category = "AI_BOT"; botName = "PerplexityBot"; }
  else if (ua.includes("google-extended")) { category = "AI_BOT"; botName = "Google-Extended"; }
  else if (ua.includes("applebot-extended")) { category = "AI_BOT"; botName = "Applebot-Extended"; }
  else if (ua.includes("bytespider")) { category = "AI_BOT"; botName = "Bytespider"; }
  else if (ua.includes("cohere-ai")) { category = "AI_BOT"; botName = "Cohere-AI"; }
  // Search Engines
  else if (ua.includes("googlebot")) { category = "SEARCH_ENGINE"; botName = "Googlebot"; }
  else if (ua.includes("bingbot")) { category = "SEARCH_ENGINE"; botName = "Bingbot"; }
  else if (ua.includes("yandexbot")) { category = "SEARCH_ENGINE"; botName = "YandexBot"; }
  else if (ua.includes("duckduckbot")) { category = "SEARCH_ENGINE"; botName = "DuckDuckGoBot"; }
  else if (ua.includes("baiduspider")) { category = "SEARCH_ENGINE"; botName = "Baiduspider"; }

  const response = NextResponse.next();

  response.headers.set("X-Traffic-Category", category);
  response.headers.set("X-Bot-Name", botName);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
