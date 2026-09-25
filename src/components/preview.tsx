"use client";

import { MarkdownContent } from "./markdown-content";

export function Preview({ content }: { content: string }) {
  return (
    <div className="h-full overflow-auto bg-secondary">
      <MarkdownContent
        content={content}
        className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
      />
    </div>
  );
}
