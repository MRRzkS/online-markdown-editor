"use client";

import { MarkdownContent } from "./markdown-content";

export function Preview({ content }: { content: string }) {
  return (
    <div className="h-full overflow-auto">
      <MarkdownContent content={content} className="mx-auto max-w-3xl p-6" />
    </div>
  );
}
