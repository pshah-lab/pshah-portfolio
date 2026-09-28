import Link from "next/link";

type Item = { claim: string; detail: string; proof: string; href: string };

/** Claims paired with where to verify them. Replaces decorative stat tiles. */
export function EvidenceList({ items }: { items: Item[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.claim}>
          <Link
            href={item.href}
            className="grid gap-x-8 gap-y-1 py-5 transition-colors hover:bg-ink/[0.03] sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,12rem)] sm:items-baseline"
          >
            <span className="font-display text-xl font-semibold leading-tight text-ink">{item.claim}</span>
            <span className="text-muted">{item.detail}</span>
            <span className="text-sm text-accent sm:text-right">{item.proof}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
