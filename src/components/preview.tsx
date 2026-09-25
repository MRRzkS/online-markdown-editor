"use client";

import { MarkdownContent } from "./markdown-content";

export function Preview({ content }: { content: string }) {
  return (
    <div className="preview-surface h-full overflow-auto">
      <MarkdownContent
        content={content}
        className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
      />
    </div>
  );
}
