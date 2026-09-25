"use client";

import { getDocumentStats } from "@/lib/document";

export function StatsBar({ content }: { content: string }) {
  const { words, characters, lines, readingMinutes } = getDocumentStats(content);

  return (
    <div className="flex min-h-10 items-center gap-4 overflow-x-auto border-t border-foreground/[0.07] bg-foreground/[0.018] px-4 text-[11px] font-medium text-muted-foreground">
      <span className="whitespace-nowrap">{words.toLocaleString()} words</span>
      <span className="whitespace-nowrap">{characters.toLocaleString()} chars</span>
      <span className="whitespace-nowrap">{lines.toLocaleString()} lines</span>
      <span className="whitespace-nowrap">~{readingMinutes} min read</span>
      <span className="ml-auto hidden items-center gap-1.5 whitespace-nowrap sm:inline-flex">
        <span className="size-1.5 rounded-full bg-accent-strong" />
        Browser session
      </span>
    </div>
  );
}
