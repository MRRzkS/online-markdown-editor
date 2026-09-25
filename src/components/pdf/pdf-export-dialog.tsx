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
        <Dialog.Overlay className="fixed inset-0 z-40 bg-primary/55 backdrop-blur-xl" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex h-[min(92vh,46rem)] w-[min(96vw,72rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[26px] border border-foreground/[0.08] bg-background shadow-[0_32px_100px_rgba(0,0,0,0.32)] outline-none">
          <div className="flex min-h-20 items-center justify-between gap-4 border-b border-foreground/[0.07] px-5 sm:px-6">
            <div>
              <Dialog.Title className="text-base font-semibold tracking-[-0.025em]">
                Export PDF
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-xs leading-5 text-muted-foreground">
                Real text, working links, and print-quality pagination.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex min-h-0 flex-1">
            <div className="w-full space-y-6 overflow-y-auto p-5 sm:p-6 lg:w-[22rem] lg:shrink-0 lg:border-r lg:border-foreground/[0.07]">
              <div>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Document setup
                </p>
                <div className="space-y-5">
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
                </div>
              </div>

              <div className="h-px bg-foreground/[0.07]" />

              <div className="space-y-5">
                <SegmentedField
                  label="Page breaks"
                  value={options.pageBreaks}
                  choices={PAGE_BREAK_CHOICES}
                  onChange={(value) => update("pageBreaks", value)}
                />
                <p className="-mt-2 text-xs leading-5 text-muted-foreground">
                  Start pages at chapter or section headings when needed.
                </p>
                <ToggleField
                  label="Title block"
                  description="Add title, date, and word count to page one."
                  checked={options.titleBlock}
                  onChange={(value) => update("titleBlock", value)}
                />
              </div>
            </div>

            <div className="pdf-preview flex-1 bg-foreground/[0.025] p-6" aria-hidden>
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

          <div className="flex min-h-20 items-center justify-between gap-4 border-t border-foreground/[0.07] px-5 sm:px-6">
            <p className="hidden max-w-lg text-xs leading-5 text-muted-foreground sm:block">
              Choose <strong className="font-semibold text-foreground">Save as PDF</strong> in
              your browser print dialog.
            </p>
            <button
              type="button"
              onClick={() => printDocument()}
              className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <FileDown size={16} strokeWidth={1.5} />
              Download PDF
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
