"use client";

import type { Ref } from "react";
import { MarkdownContent } from "@/components/markdown-content";
import { getDocumentStats, stripLeadingHeading } from "@/lib/document";
import { buildPaperStyle, type PdfOptions } from "@/lib/pdf-options";

interface PdfDocumentProps {
  content: string;
  title: string;
  options: PdfOptions;
  ref?: Ref<HTMLDivElement>;
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

/**
 * The sheet that gets printed. `react-to-print` clones this exact node into a
 * hidden frame, so what the dialog previews is what lands in the PDF.
 */
export function PdfDocument({ content, title, options, ref }: PdfDocumentProps) {
  const { words } = getDocumentStats(content);

  // The title block already shows the opening heading; printing it twice looks
  // like a mistake, so the body starts just after it.
  const body = options.titleBlock ? stripLeadingHeading(content) : content;

  return (
    <article
      ref={ref}
      className="pdf-document"
      style={buildPaperStyle(options)}
      data-page-breaks={options.pageBreaks}
    >
      {options.titleBlock && (
        <header className="pdf-document-header">
          <h1>{title}</h1>
          <p>
            {new Date().toLocaleDateString(undefined, DATE_FORMAT)} ·{" "}
            {words.toLocaleString()} words
          </p>
        </header>
      )}

      <MarkdownContent content={body} />
    </article>
  );
}
