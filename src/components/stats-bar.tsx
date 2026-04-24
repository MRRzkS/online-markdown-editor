"use client";

interface StatsBarProps {
  content: string;
}

export function StatsBar({ content }: StatsBarProps) {
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const lines = content.split("\n").length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="flex items-center gap-4 px-4 py-1.5 text-xs text-muted-foreground border-t border-border bg-muted/30">
      <span>{words} words</span>
      <span>{chars} chars</span>
      <span>{lines} lines</span>
      <span>~{readTime} min read</span>
    </div>
  );
}
