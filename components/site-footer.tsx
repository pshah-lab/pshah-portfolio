import Link from "next/link";
import { profile, site } from "@/content/profile";
import { VisitorCount } from "./visitor-count";

const columns = [
  {
    title: "Work",
    links: [
      { href: "/projects", label: "All projects" },
      { href: "/experience", label: "Experience" },
      { href: "/research", label: "Research" },
      { href: "/journey", label: "Journey" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/notes", label: "Engineering notes" },
      { href: "/about", label: "About and setup" },
      { href: "/resume", label: "Resume" },
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { href: profile.links.github, label: "GitHub" },
      { href: profile.links.linkedin, label: "LinkedIn" },
      { href: profile.links.x, label: "X" },
      { href: profile.links.email, label: "Email" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="font-display text-lg font-semibold">Pratham Shah</p>
          <p className="mt-2 text-sm text-muted">
            {profile.shortRole}, based in {profile.location}.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-sans text-sm font-semibold text-ink">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => {
                const external = l.href.startsWith("http") || l.href.startsWith("mailto:");
                return (
                  <li key={l.href}>
                    {external ? (
                      <a
                        href={l.href}
                        className="text-sm text-muted hover:text-ink"
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        data-track={l.label === "GitHub" ? "github_click" : l.label === "Email" ? "contact_click" : undefined}
                        data-track-label="footer"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-sm text-muted hover:text-ink">
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="shell flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:flex-wrap sm:justify-between">
        <p>© {new Date().getFullYear()} Pratham Shah</p>
        <VisitorCount />
        <p>
          Content last reviewed{" "}
          <time dateTime={site.updated}>
            {new Date(site.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          . Every figure on this site names its source.
        </p>
      </div>
    </footer>
  );
}
