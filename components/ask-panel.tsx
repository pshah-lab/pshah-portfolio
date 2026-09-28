"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const suggestions = [
  "What cloud experience does Pratham have?",
  "What did he build at NeuraMach?",
  "Tell me about NeuroArm",
  "Which projects use AWS?",
  "What is InsightVault?",
  "What roles is he looking for?",
];

type Result = { answer: string; sources: { title: string; href: string }[]; mode: string };

export function AskPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      input.current?.focus();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  async function ask(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    setAsked(text);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "The assistant couldn't answer. Try again.");
      else setResult(data);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-labelledby="ask-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-lg border-l border-line bg-bg p-0 text-ink backdrop:bg-ink/40 sm:max-w-md"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <h2 id="ask-title" className="font-display text-xl">
              Ask about my work
            </h2>
            <p className="mt-1 text-sm text-muted">Answers come only from the content of this site, with links to the source.</p>
          </div>
          <button type="button" onClick={onClose} className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-control hover:bg-ink/5">
            <X className="h-5 w-5" aria-hidden />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5" aria-live="polite" aria-busy={loading}>
          {!asked && (
            <>
              <p className="text-sm text-muted">Try one of these:</p>
              <ul className="mt-3 flex flex-col gap-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => ask(s)} className="w-full rounded-control border border-line bg-surface px-3 py-2.5 text-left text-sm hover:border-ink/40">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {asked && <p className="rounded-control bg-surface px-3 py-2 text-sm font-medium">{asked}</p>}
          {loading && <p className="mt-4 text-sm text-muted">Looking through the portfolio…</p>}
          {error && <p className="mt-4 text-sm text-ink">{error}</p>}
          {result && (
            <div className="mt-4">
              <p className="whitespace-pre-line leading-relaxed">{result.answer}</p>
              {result.sources.length > 0 && (
                <>
                  <p className="mt-5 text-sm font-semibold">Sources</p>
                  <ol className="mt-2 space-y-1 text-sm">
                    {result.sources.map((s, i) => (
                      <li key={`${s.href}-${i}`}>
                        <span className="text-muted">[{i + 1}]</span>{" "}
                        <Link href={s.href} onClick={onClose} className="link">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </>
              )}
              {result.mode === "extractive" && (
                <p className="mt-4 text-xs text-muted">Quoted directly from the site. The AI answer mode isn’t enabled on this deployment.</p>
              )}
            </div>
          )}
        </div>

        <form
          className="flex gap-2 border-t border-line p-4"
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
        >
          <label htmlFor="ask-input" className="sr-only">
            Your question
          </label>
          <input
            ref={input}
            id="ask-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={300}
            placeholder="Ask about projects, cloud, AI…"
            className="min-h-11 flex-1 rounded-control border border-line bg-surface px-3 text-base placeholder:text-muted focus:border-accent"
          />
          <button type="submit" disabled={loading || !question.trim()} className="btn-primary disabled:opacity-50">
            Ask
          </button>
        </form>
      </div>
    </dialog>
  );
}
