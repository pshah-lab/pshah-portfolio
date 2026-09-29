"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowUpRight, Briefcase, Download, FileText, FolderGit2, Search, Sparkles, type LucideIcon } from "lucide-react";
import type { Command, CommandGroup } from "@/lib/command-index";
import { cn } from "@/lib/utils";

const GROUPS: CommandGroup[] = ["Pages", "Projects", "Experience", "Notes", "Actions"];
const GROUP_ICON: Record<CommandGroup, LucideIcon> = {
  Pages: FileText,
  Projects: FolderGit2,
  Experience: Briefcase,
  Notes: FileText,
  Actions: Sparkles,
};

/**
 * Lower score ranks first. Every word of the query has to appear somewhere in the item;
 * matches in the visible label beat matches only in hidden keywords.
 */
function score(c: Command, query: string): number | null {
  const label = c.label.toLowerCase();
  const hay = `${label} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const words = hay.split(/[^a-z0-9.+#]+/);
  // Short terms must start a word ("rag" shouldn't match "storage"); longer ones can match anywhere.
  const found = (t: string) => (t.length < 4 ? words.some((w) => w.startsWith(t)) : hay.includes(t));
  if (!terms.every(found)) return null;
  if (label.startsWith(query)) return 0;
  if (label.includes(query)) return 1;
  if (terms.every((t) => label.split(/[\s,()]+/).some((w) => w.startsWith(t)))) return 2;
  return 3;
}

type Props = {
  open: boolean;
  onClose: () => void;
  commands: Command[];
  onAsk: () => void;
};

export function CommandPalette({ open, onClose, commands, onAsk }: Props) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setActive(0);
      setCopied(false);
      d.showModal();
      input.current?.focus();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const q = query.trim().toLowerCase();
  // With no query, show everything grouped; with one, a single ranked list.
  const results = useMemo(() => {
    if (!q) return GROUPS.flatMap((g) => commands.filter((c) => c.group === g));
    return commands
      .map((c, i) => ({ c, i, s: score(c, q) }))
      .filter((r): r is { c: Command; i: number; s: number } => r.s !== null)
      .sort((a, b) => a.s - b.s || a.i - b.i)
      .map((r) => r.c);
  }, [commands, q]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(c: Command) {
    track("palette_select", { label: c.id });
    if (c.action === "copy-email") {
      navigator.clipboard?.writeText(c.hint ?? "").then(
        () => {
          setCopied(true);
          setTimeout(onClose, 700);
        },
        () => onClose(),
      );
      return;
    }
    onClose();
    if (c.action === "toggle-theme") setTheme(resolvedTheme === "dark" ? "light" : "dark");
    else if (c.action === "ask") onAsk();
    else if (c.href && (c.external || c.download)) window.open(c.href, "_blank", "noopener,noreferrer");
    else if (c.href) router.push(c.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  }

  const optionId = (i: number) => `cmd-option-${i}`;

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-label="Search the site"
      className="mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-panel border border-line bg-bg p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <input
          ref={input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search projects, experience, notes…"
          role="combobox"
          aria-expanded
          aria-controls="cmd-list"
          aria-activedescendant={results[active] ? optionId(active) : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">Esc</kbd>
      </div>

      <ul ref={list} id="cmd-list" role="listbox" aria-label="Results" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">No results for “{query.trim()}”</li>}
        {results.map((c, i) => {
          const heading = !q && (i === 0 || results[i - 1].group !== c.group) ? c.group : null;
          const Icon = c.download ? Download : GROUP_ICON[c.group];
          const selected = i === active;
          return (
            <li key={c.id} role="presentation">
              {heading && (
                <div role="presentation" className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted first:pt-1">
                  {heading}
                </div>
              )}
              <div
                id={optionId(i)}
                role="option"
                aria-selected={selected}
                data-index={i}
                onMouseMove={() => !selected && setActive(i)}
                onClick={() => run(c)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-3 py-2 text-sm",
                  selected ? "bg-accent-soft text-ink" : "text-ink/90",
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", selected ? "text-accent" : "text-muted")} aria-hidden />
                <span className="min-w-0 flex-1 truncate">
                  {c.action === "copy-email" && copied ? "Copied to clipboard" : c.label}
                </span>
                {c.hint && c.action !== "copy-email" && <span className="hidden max-w-[45%] truncate text-xs text-muted sm:block">{c.hint}</span>}
                {q && <span className="shrink-0 font-mono text-[11px] text-muted">{c.group}</span>}
                {(c.external || c.download) && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted sm:flex">
        <span>↑↓ to move</span>
        <span>↵ to open</span>
        <span>esc to close</span>
      </div>
    </dialog>
  );
}
