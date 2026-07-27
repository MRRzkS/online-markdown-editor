"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FileDown, X } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { deriveTitle, toSlug } from "@/lib/document";
import {
  DEFAULT_PDF_OPTIONS,
  MARGIN_CHOICES,
  PAGE_BREAK_CHOICES,
  PAPER_CHOICES,
  TEXT_SCALE_CHOICES,
  buildPageStyle,
  type PdfOptions,
} from "@/lib/pdf-options";
import { SegmentedField, ToggleField } from "./option-fields";
import { PdfDocument } from "./pdf-document";

interface PdfExportDialogProps {
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Export panel for the PDF.
 *
 * The document is rendered by the browser's own print engine rather than being
 * rasterised, which is what keeps the output crisp: real text, selectable and
 * searchable, with working hyperlinks and vector-sharp glyphs at any zoom.
 */
export function PdfExportDialog({
  content,
  open,
  onOpenChange,
}: PdfExportDialogProps) {
  const [options, setOptions] = useState<PdfOptions>(DEFAULT_PDF_OPTIONS);
  const paperRef = useRef<HTMLDivElement>(null);
  const title = deriveTitle(content);

  const printDocument = useReactToPrint({
    contentRef: paperRef,
    documentTitle: toSlug(title),
    pageStyle: buildPageStyle(options),
  });

  function update<K extends keyof PdfOptions>(key: K, value: PdfOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex h-[min(90vh,44rem)] w-[min(95vw,70rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-3.5">
            <div>
              <Dialog.Title className="text-sm font-semibold">
                Export PDF
              </Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground">
                Laid out on real paper — text stays selectable and links stay
                clickable.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex min-h-0 flex-1">
            <div className="w-full space-y-5 overflow-y-auto p-5 lg:w-80 lg:shrink-0 lg:border-r lg:border-border">
              <SegmentedField
                label="Paper size"
                value={options.paper}
                choices={PAPER_CHOICES}
                onChange={(value) => update("paper", value)}
              />
              <SegmentedField
                label="Margins"
                value={options.margin}
                choices={MARGIN_CHOICES}
                onChange={(value) => update("margin", value)}
              />
              <SegmentedField
                label="Text size"
                value={options.textScale}
                choices={TEXT_SCALE_CHOICES}
                onChange={(value) => update("textScale", value)}
              />

              <SegmentedField
                label="Page breaks"
                value={options.pageBreaks}
                choices={PAGE_BREAK_CHOICES}
                onChange={(value) => update("pageBreaks", value)}
              />
              <p className="-mt-3 text-xs text-muted-foreground">
                Start a new page at every <code>#</code> heading (chapters) or
                every <code>#</code> and <code>##</code> heading (sections).
              </p>

              <div className="border-t border-border pt-5">
                <ToggleField
                  label="Title block"
                  description="Document title, date and word count on page one."
                  checked={options.titleBlock}
                  onChange={(value) => update("titleBlock", value)}
                />
              </div>
            </div>

            {/* Below `lg` this is parked off-screen by CSS rather than hidden:
                the print frame needs a rendered node to clone. */}
            <div className="pdf-preview flex-1 p-6" aria-hidden>
              <div className="pdf-preview-paper mx-auto w-fit">
                <PdfDocument
                  ref={paperRef}
                  content={content}
                  title={title}
                  options={options}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3">
            <p className="text-xs text-muted-foreground">
              Pick <strong className="font-medium">Save as PDF</strong> as the
              destination in the print dialog.
            </p>
            <button
              type="button"
              onClick={() => printDocument()}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <FileDown size={16} />
              Download PDF
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
