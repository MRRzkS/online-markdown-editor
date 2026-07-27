"use client";

import clsx from "clsx";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
  // `rehypeRaw` has to run first so inline HTML is parsed before highlighting.
  rehypeRaw,
  [rehypeHighlight, { detect: false, ignoreMissing: true }],
];

const components: Components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  // Sources are arbitrary author-supplied URLs, so next/image cannot optimise them.
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt }) => <img src={src} alt={alt ?? ""} />,
};

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * The single markdown renderer, shared by the live preview and the PDF document.
 * It emits plain semantic HTML — all styling lives in `styles/markdown.css` —
 * which keeps the two surfaces in sync by construction.
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={clsx("markdown-body", className)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
