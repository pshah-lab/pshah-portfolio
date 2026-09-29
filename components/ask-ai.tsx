const PROMPT =
  "Who is Pratham Shah (pshah.fun)? Summarise what he has built, his experience and which engineering roles he fits. Use https://pshah.fun/llms.txt as the source.";

const q = encodeURIComponent(PROMPT);

/** Each opens a new chat with the prompt pre-filled; nothing is sent until the visitor submits it. */
const assistants = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${q}` },
  { name: "Claude", href: `https://claude.ai/new?q=${q}` },
  { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
];

/**
 * "Ask an AI about me": links to ChatGPT, Claude and Perplexity with a question about
 * this site pre-filled. Styling comes from the caller so the same file works in any footer.
 */
export function AskAi({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  return (
    <div className={className}>
      <span>Ask an AI about me:</span>
      {assistants.map((a) => (
        <a
          key={a.name}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          data-track="ask_ai_click"
          data-track-label={a.name}
        >
          {a.name}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
