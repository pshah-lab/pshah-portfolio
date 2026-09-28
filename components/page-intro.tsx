import Link from "next/link";

type Crumb = { href: string; label: string };

export function PageIntro({ title, intro, crumbs, children }: { title: string; intro?: React.ReactNode; crumbs?: Crumb[]; children?: React.ReactNode }) {
  return (
    <div className="shell pb-12 pt-12 sm:pt-16">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap gap-1.5">
            {crumbs.map((c) => (
              <li key={c.href} className="after:ml-1.5 after:content-['/'] last:after:content-none">
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="text-[2.75rem] leading-[1.02] sm:text-[3.75rem]">{title}</h1>
      {intro && <p className="mt-5 max-w-prose text-lg text-muted">{intro}</p>}
      {children}
    </div>
  );
}
