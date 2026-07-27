import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Markdown → HTML using the same remark/rehype plugins the live preview runs on,
 * so the exported file matches what the author sees.
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeHighlight, { detect: false, ignoreMissing: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

export async function markdownToHtml(markdown: string): Promise<string> {
  return String(await processor.process(markdown));
}

/** Standalone stylesheet — the export has to look right with no assets alongside it. */
const STYLESHEET = `
  :root {
    --ink: #1f2933;
    --ink-soft: #6b7280;
    --surface: #f5f7fa;
    --line: #d9e0e8;
    --accent: #2f5fd0;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0 auto;
    padding: 3rem 1.5rem 6rem;
    max-width: 46rem;
    color: var(--ink);
    background: #fff;
    font: 16px/1.7 "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-text-size-adjust: 100%;
  }
  h1, h2, h3, h4, h5, h6 { margin: 2em 0 .75em; font-weight: 600; line-height: 1.3; }
  h1 { font-size: 2em; padding-bottom: .3em; border-bottom: 1px solid var(--line); }
  h2 { font-size: 1.5em; padding-bottom: .3em; border-bottom: 1px solid var(--line); }
  h3 { font-size: 1.25em; }
  h4 { font-size: 1em; }
  h5 { font-size: .9em; }
  h6 { font-size: .85em; color: var(--ink-soft); }
  :is(h1, h2, h3, h4, h5, h6):first-child { margin-top: 0; }
  p, ul, ol, pre, blockquote, table { margin: 0 0 1.15em; }
  ul { padding-left: 1.5em; list-style: disc; }
  ol { padding-left: 1.5em; list-style: decimal; }
  li { margin: .3em 0; }
  li > :is(ul, ol) { margin: .3em 0; }
  a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
  strong { font-weight: 600; }
  code {
    padding: .15em .4em;
    border-radius: 4px;
    background: var(--surface);
    font: .875em/1.5 "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }
  pre {
    padding: 1em 1.15em;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--surface);
    overflow-x: auto;
  }
  pre code { padding: 0; background: none; font-size: .85em; }
  blockquote {
    padding: .1em 0 .1em 1.15em;
    border-left: 3px solid var(--accent);
    color: var(--ink-soft);
  }
  blockquote > :last-child { margin-bottom: 0; }
  table { width: 100%; border-collapse: collapse; font-size: .925em; }
  th, td { padding: .5em .75em; border: 1px solid var(--line); text-align: left; }
  th { background: var(--surface); font-weight: 600; }
  hr { margin: 2.5em 0; border: 0; border-top: 1px solid var(--line); }
  img { max-width: 100%; height: auto; border-radius: 8px; }
  .hljs-comment, .hljs-quote { color: #6a737d; font-style: italic; }
  .hljs-keyword, .hljs-selector-tag, .hljs-doctag { color: #d73a49; }
  .hljs-string, .hljs-regexp, .hljs-addition { color: #032f62; }
  .hljs-number, .hljs-literal, .hljs-type, .hljs-variable { color: #005cc5; }
  .hljs-title, .hljs-section { color: #6f42c1; }
  .hljs-built_in, .hljs-name { color: #22863a; }
  .hljs-attr, .hljs-attribute, .hljs-symbol, .hljs-meta { color: #e36209; }
  .hljs-deletion { color: #b31d28; }
`;

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => HTML_ESCAPES[char]);
}

/** Wraps rendered markdown into a shareable, dependency-free HTML file. */
export async function buildHtmlDocument(
  markdown: string,
  title: string
): Promise<string> {
  const body = await markdownToHtml(markdown);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${STYLESHEET}</style>
</head>
<body>
${body}
</body>
</html>
`;
}
