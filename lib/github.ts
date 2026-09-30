import { profile } from "@/content/profile";

export type Repo = {
  name: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
  pushedAt: string | null;
  fork: boolean;
};

/** Curated repos shown on the home page, with descriptions written for this site. */
const selected: Omit<Repo, "stars" | "pushedAt" | "fork">[] = [
  { name: "force-dark-mode-extension", url: "https://github.com/pshah-lab/force-dark-mode-extension", description: "Manifest V3 dark-mode extension with an offline PDF viewer. 1,270+ weekly users.", language: "JavaScript" },
  { name: "StreamVault", url: "https://github.com/pshah-lab/StreamVault", description: "HLS streaming on AWS: CDK, Cognito PKCE, CloudFront signed cookies, FastAPI.", language: "TypeScript" },
  { name: "insightVault", url: "https://github.com/pshah-lab/insightVault", description: "RAG over PDFs with Supabase pgvector and multi-provider embeddings.", language: "JavaScript" },
  { name: "aws-s3-mongodb-media-hub", url: "https://github.com/pshah-lab/aws-s3-mongodb-media-hub", description: "Zero-buffer uploads to S3 with a MongoDB catalog and design doc.", language: "JavaScript" },
  { name: "FinWise---FinChess", url: "https://github.com/pshah-lab/FinWise---FinChess", description: "Financial literacy taught through chess, built on chess.js.", language: "TypeScript" },
  { name: "BCI", url: "https://github.com/pshah-lab/BCI", description: "EEG classification notebooks: Random Forest and MLP.", language: "Jupyter Notebook" },
];

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

async function fetchRepos(): Promise<ApiRepo[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${profile.handle}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      // Cached and revalidated in the background: the page never waits on GitHub
      // after the first build, and we stay far below the 60 req/h anonymous limit.
      next: { revalidate: 60 * 60 * 6 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as ApiRepo[]) : null;
  } catch {
    return null;
  }
}

export async function getGitHubData(): Promise<{ selected: Repo[]; recent: Repo[]; live: boolean }> {
  const api = await fetchRepos();
  const byName = new Map(api?.map((r) => [r.name.toLowerCase(), r]));

  const merged: Repo[] = selected.map((s) => {
    const r = byName.get(s.name.toLowerCase());
    return {
      ...s,
      language: r?.language ?? s.language,
      stars: r?.stargazers_count ?? 0,
      pushedAt: r?.pushed_at ?? null,
      fork: r?.fork ?? false,
    };
  });

  const recent: Repo[] = (api ?? [])
    .filter((r) => !r.fork && r.name.toLowerCase() !== profile.handle.toLowerCase())
    .slice(0, 5)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description ?? "",
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      fork: r.fork,
    }));

  return { selected: merged, recent, live: api !== null };
}
