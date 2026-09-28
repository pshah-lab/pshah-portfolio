import type { NoteBlock } from "@/content/types";
import { FlowDiagram } from "./flow-diagram";

/** Renders structured note content as React text nodes, so nothing is ever injected as HTML. */
export function NoteBody({ blocks }: { blocks: NoteBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="max-w-prose leading-[1.75]">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="pt-4 text-[1.625rem] leading-tight">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="max-w-prose space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i} className="panel overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed" tabIndex={0} aria-label={`${block.lang} code`}>
                <code>{block.code}</code>
              </pre>
            );
          case "flow":
            return <FlowDiagram key={i} flow={block.flow} />;
        }
      })}
    </div>
  );
}
