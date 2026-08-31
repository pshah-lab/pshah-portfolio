export interface BotLogEntry {
  timestamp: string;
  botName: string;
  category: "AI_BOT" | "SEARCH_ENGINE" | "HUMAN";
  path: string;
  userAgent: string;
  ip?: string;
}

export interface BotTrackerStats {
  totalRequests: number;
  humanRequests: number;
  searchEngineRequests: number;
  aiBotRequests: number;
  trafficDistribution: {
    humanPercentage: string;
    searchEnginePercentage: string;
    aiBotPercentage: string;
  };
  botBreakdown: Record<string, number>;
  pathBreakdown: Record<string, number>;
  recentLogs: BotLogEntry[];
}

// In-memory store for edge/node runtime tracking
const statsStore: {
  totalRequests: number;
  humanRequests: number;
  searchEngineRequests: number;
  aiBotRequests: number;
  botBreakdown: Record<string, number>;
  pathBreakdown: Record<string, number>;
  recentLogs: BotLogEntry[];
} = {
  totalRequests: 0,
  humanRequests: 0,
  searchEngineRequests: 0,
  aiBotRequests: 0,
  botBreakdown: {},
  pathBreakdown: {},
  recentLogs: [],
};

export function identifyUserAgent(userAgentStr: string): {
  category: "AI_BOT" | "SEARCH_ENGINE" | "HUMAN";
  botName: string;
} {
  const ua = userAgentStr.toLowerCase();

  // AI Bots
  if (ua.includes("gptbot")) return { category: "AI_BOT", botName: "GPTBot (OpenAI)" };
  if (ua.includes("chatgpt-user")) return { category: "AI_BOT", botName: "ChatGPT-User" };
  if (ua.includes("claudebot")) return { category: "AI_BOT", botName: "ClaudeBot (Anthropic)" };
  if (ua.includes("claude-web")) return { category: "AI_BOT", botName: "Claude-Web" };
  if (ua.includes("perplexitybot")) return { category: "AI_BOT", botName: "PerplexityBot" };
  if (ua.includes("google-extended")) return { category: "AI_BOT", botName: "Google-Extended (Gemini)" };
  if (ua.includes("applebot-extended")) return { category: "AI_BOT", botName: "Applebot-Extended" };
  if (ua.includes("bytespider")) return { category: "AI_BOT", botName: "Bytespider (ByteDance)" };
  if (ua.includes("cohere-ai")) return { category: "AI_BOT", botName: "Cohere-AI" };
  if (ua.includes("amazonbot")) return { category: "AI_BOT", botName: "Amazonbot" };

  // Search Engine Crawlers
  if (ua.includes("googlebot")) return { category: "SEARCH_ENGINE", botName: "Googlebot" };
  if (ua.includes("bingbot")) return { category: "SEARCH_ENGINE", botName: "Bingbot" };
  if (ua.includes("yandexbot")) return { category: "SEARCH_ENGINE", botName: "YandexBot" };
  if (ua.includes("duckduckbot")) return { category: "SEARCH_ENGINE", botName: "DuckDuckGoBot" };
  if (ua.includes("baiduspider")) return { category: "SEARCH_ENGINE", botName: "Baiduspider" };
  if (ua.includes("slurp")) return { category: "SEARCH_ENGINE", botName: "Yahoo Slurp" };
  if (ua.includes("facebookexternalhit")) return { category: "SEARCH_ENGINE", botName: "Facebook Crawler" };
  if (ua.includes("twitterbot")) return { category: "SEARCH_ENGINE", botName: "TwitterBot" };
  if (ua.includes("linkedinbot")) return { category: "SEARCH_ENGINE", botName: "LinkedInBot" };

  return { category: "HUMAN", botName: "Human Visitor" };
}

export function recordRequest(userAgentStr: string, path: string) {
  const { category, botName } = identifyUserAgent(userAgentStr);

  statsStore.totalRequests += 1;

  if (category === "HUMAN") {
    statsStore.humanRequests += 1;
  } else if (category === "SEARCH_ENGINE") {
    statsStore.searchEngineRequests += 1;
  } else if (category === "AI_BOT") {
    statsStore.aiBotRequests += 1;
  }

  // Update bot breakdown count
  statsStore.botBreakdown[botName] = (statsStore.botBreakdown[botName] || 0) + 1;

  // Update path breakdown count
  statsStore.pathBreakdown[path] = (statsStore.pathBreakdown[path] || 0) + 1;

  // Append recent log entry
  const entry: BotLogEntry = {
    timestamp: new Date().toISOString(),
    botName,
    category,
    path,
    userAgent: userAgentStr.slice(0, 150),
  };

  statsStore.recentLogs.unshift(entry);
  if (statsStore.recentLogs.length > 50) {
    statsStore.recentLogs.pop();
  }
}

export function getTrackerStats(): BotTrackerStats {
  const total = Math.max(statsStore.totalRequests, 1);
  const humanPct = ((statsStore.humanRequests / total) * 100).toFixed(1) + "%";
  const searchPct = ((statsStore.searchEngineRequests / total) * 100).toFixed(1) + "%";
  const aiPct = ((statsStore.aiBotRequests / total) * 100).toFixed(1) + "%";

  return {
    totalRequests: statsStore.totalRequests,
    humanRequests: statsStore.humanRequests,
    searchEngineRequests: statsStore.searchEngineRequests,
    aiBotRequests: statsStore.aiBotRequests,
    trafficDistribution: {
      humanPercentage: humanPct,
      searchEnginePercentage: searchPct,
      aiBotPercentage: aiPct,
    },
    botBreakdown: statsStore.botBreakdown,
    pathBreakdown: statsStore.pathBreakdown,
    recentLogs: statsStore.recentLogs,
  };
}
