/** Pure helpers for describing and naming the document being edited. */

const FALLBACK_TITLE = "Untitled document";
const FALLBACK_SLUG = "document";
const HEADING = /^[ \t]{0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/m;
const LEADING_HEADING = /^\s*#{1,6}[ \t]+[^\n]*\n?/;
const INLINE_MARKS = /[*_`~]/g;
const INLINE_LINK = /\[([^\]]*)\]\([^)]*\)/g;
const NON_SLUG_CHARS = /[^\p{Letter}\p{Number}]+/gu;
const WORDS_PER_MINUTE = 200;

/** First ATX heading in the document, stripped of inline formatting. */
export function deriveTitle(markdown: string): string {
  const heading = HEADING.exec(markdown)?.[2] ?? "";
  const plain = heading
    .replace(INLINE_LINK, "$1")
    .replace(INLINE_MARKS, "")
    .trim();

  return plain || FALLBACK_TITLE;
}

/**
 * Drops the heading that opens the document. Used when the PDF renders its own
 * title block, so the title is not printed twice.
 */
export function stripLeadingHeading(markdown: string): string {
  return markdown.replace(LEADING_HEADING, "");
}

export function toSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(NON_SLUG_CHARS, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || FALLBACK_SLUG;
}

export function toFileName(title: string, extension: string): string {
  return `${toSlug(title)}.${extension}`;
}

export interface DocumentStats {
  words: number;
  characters: number;
  lines: number;
  readingMinutes: number;
}

export function getDocumentStats(content: string): DocumentStats {
  const trimmed = content.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  return {
    words,
    characters: content.length,
    lines: content.split("\n").length,
    readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  };
}
