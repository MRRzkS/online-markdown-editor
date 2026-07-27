"use client";

import { getDocumentStats } from "@/lib/document";

export function StatsBar({ content }: { content: string }) {
  const { words, characters, lines, readingMinutes } = getDocumentStats(content);

  return (
    <div className="flex items-center gap-4 border-t border-border bg-muted/30 px-4 py-1.5 text-xs text-muted-foreground">
      <span>{words.toLocaleString()} words</span>
      <span>{characters.toLocaleString()} chars</span>
      <span>{lines.toLocaleString()} lines</span>
      <span>~{readingMinutes} min read</span>
    </div>
  );
}
