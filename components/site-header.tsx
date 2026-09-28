"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageSquareText, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

// The assistant is only downloaded when someone opens it.
const AskPanel = dynamic(() => import("./ask-panel").then((m) => m.AskPanel), { ssr: false });

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [askLoaded, setAskLoaded] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  const openAsk = () => {
    setAskLoaded(true);
    setAskOpen(true);
    setMenuOpen(false);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink" aria-label="Pratham Shah, home">
          Pratham Shah
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  data-track={item.href === "/resume" ? "resume_click" : undefined}
                  data-track-label="header"
                  className={cn(
                    "rounded-control px-3 py-2 text-sm transition-colors hover:text-ink",
                    isActive(item.href) ? "text-ink underline decoration-accent decoration-2 underline-offset-[10px]" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openAsk}
            data-track="assistant_open"
            className="hidden h-10 items-center gap-2 rounded-control border border-line bg-surface px-3 text-sm text-ink transition-colors hover:border-ink/40 sm:inline-flex"
          >
            <MessageSquareText className="h-4 w-4 text-accent" aria-hidden />
            Ask about my work
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Primary" hidden={!menuOpen} className="border-t border-line bg-bg lg:hidden">
        <ul className="shell grid py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center border-b border-line/60 text-lg",
                  isActive(item.href) ? "text-accent" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button type="button" onClick={openAsk} className="flex min-h-12 w-full items-center gap-2 text-left text-lg text-ink">
              <MessageSquareText className="h-5 w-5 text-accent" aria-hidden />
              Ask about my work
            </button>
          </li>
        </ul>
      </nav>

      {askLoaded && <AskPanel open={askOpen} onClose={() => setAskOpen(false)} />}
    </header>
  );
}
