import { ArrowUpRight, Star } from "lucide-react";
import { getGitHubData } from "@/lib/github";
import { profile } from "@/content/profile";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export async function GitHubFeed() {
  const { selected, recent, live } = await getGitHubData();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <ul className="grid gap-3 sm:grid-cols-2">
        {selected.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="github_click"
              data-track-label={repo.name}
              className="panel flex h-full flex-col p-4 transition-colors hover:border-ink/40"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="truncate font-mono text-sm text-ink">{repo.name}</span>
                <ArrowUpRight className="h-4 w-4 flex-none text-muted" aria-hidden />
              </span>
              <span className="mt-2 text-sm text-muted">{repo.description}</span>
              <span className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-muted">
                {repo.language && <span>{repo.language}</span>}
                {repo.stars > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" aria-hidden />
                    {repo.stars}
                    <span className="sr-only">stars</span>
                  </span>
                )}
                {repo.fork && <span>Fork of team repo</span>}
                {repo.pushedAt && <span>Updated {fmt(repo.pushedAt)}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="panel p-5">
        <h3 className="text-base">Recently pushed</h3>
        {recent.length > 0 ? (
          <ol className="mt-4 space-y-3">
            {recent.map((r) => (
              <li key={r.name} className="flex items-baseline justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="truncate font-mono text-sm text-ink hover:text-accent">
                  {r.name}
                </a>
                {r.pushedAt && (
                  <time dateTime={r.pushedAt} className="flex-none text-xs text-muted">
                    {new Date(r.pushedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </time>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm text-muted">Live activity is unavailable right now. The full history is on GitHub.</p>
        )}
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          data-track="github_click"
          data-track-label="profile"
          className="btn-secondary mt-5 w-full"
        >
          github.com/{profile.handle}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
        {live && <p className="mt-3 text-xs text-muted">From the GitHub API, refreshed every 6 hours.</p>}
      </div>
    </div>
  );
}

export function GitHubFeedSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]" aria-hidden>
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="panel h-32 animate-pulse" />
        ))}
      </div>
      <div className="panel h-72 animate-pulse" />
    </div>
  );
}
