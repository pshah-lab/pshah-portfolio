"use client";

import { AskAi } from "@/components/ask-ai";
import { LocalTime } from "@/components/local-time";
import { VisitorCount } from "@/components/visitor-count";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300/70 py-8 dark:border-white/10">
      <div className="section-shell flex flex-col gap-4 text-sm text-stone-600 dark:text-stone-300">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <AskAi
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
            linkClassName="border border-stone-300 px-2.5 py-1 text-stone-900 transition-colors hover:border-teal-700 hover:text-teal-700 dark:border-white/15 dark:text-white dark:hover:border-teal-300 dark:hover:text-teal-300"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <LocalTime />
            <VisitorCount />
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-stone-300/70 pt-4 dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pratham Shah</p>
          <p>Full-stack development, interfaces, and applied AI systems.</p>
        </div>
      </div>
    </footer>
  );
}
