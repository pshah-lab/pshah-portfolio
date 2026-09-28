import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  intro?: React.ReactNode;
  action?: { href: string; label: string };
  className?: string;
};

export function SectionHeader({ id, title, intro, action, className }: Props) {
  return (
    <div className={cn("mb-10 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end", className)}>
      <div className="max-w-2xl">
        <h2 id={id} className="h-section scroll-mt-24">
          {title}
        </h2>
        {intro && <p className="mt-3 text-muted">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="link text-sm md:mb-1">
          {action.label}
        </Link>
      )}
    </div>
  );
}
