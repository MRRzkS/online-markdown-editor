import type { CSSProperties } from "react";

/**
 * Layout settings for the PDF export, plus the translation from those settings
 * into the CSS the browser's print engine consumes. Keeping the mapping here
 * means the on-screen paper preview and the printed page stay in lockstep.
 */

export type PaperSize = "a4" | "letter";
export type MarginPreset = "compact" | "normal" | "roomy";
export type TextScale = "small" | "normal" | "large";
/** Which heading level, if any, forces a fresh page. */
export type PageBreakMode = "none" | "chapters" | "sections";

export interface PdfOptions {
  paper: PaperSize;
  margin: MarginPreset;
  textScale: TextScale;
  /** Render a title and metadata block above the document body. */
  titleBlock: boolean;
  pageBreaks: PageBreakMode;
}

export const PAPER_SIZES = {
  a4: { label: "A4", cssSize: "A4", widthMm: 210 },
  letter: { label: "Letter", cssSize: "Letter", widthMm: 215.9 },
} as const satisfies Record<
  PaperSize,
  { label: string; cssSize: string; widthMm: number }
>;

export const MARGIN_PRESETS = {
  compact: { label: "Compact", mm: 12 },
  normal: { label: "Normal", mm: 20 },
  roomy: { label: "Roomy", mm: 28 },
} as const satisfies Record<MarginPreset, { label: string; mm: number }>;

export const TEXT_SCALES = {
  small: { label: "Small", pt: 10 },
  normal: { label: "Normal", pt: 11 },
  large: { label: "Large", pt: 12.5 },
} as const satisfies Record<TextScale, { label: string; pt: number }>;

export const PAGE_BREAK_MODES = {
  none: { label: "None" },
  chapters: { label: "Chapters" },
  sections: { label: "Sections" },
} as const satisfies Record<PageBreakMode, { label: string }>;

export const DEFAULT_PDF_OPTIONS: PdfOptions = {
  paper: "a4",
  margin: "normal",
  textScale: "normal",
  titleBlock: true,
  pageBreaks: "none",
};

export interface Choice<T extends string> {
  value: T;
  label: string;
}

function toChoices<T extends string>(
  presets: Record<T, { label: string }>
): Choice<T>[] {
  return (Object.entries(presets) as [T, { label: string }][]).map(
    ([value, { label }]) => ({ value, label })
  );
}

export const PAPER_CHOICES = toChoices(PAPER_SIZES);
export const MARGIN_CHOICES = toChoices(MARGIN_PRESETS);
export const TEXT_SCALE_CHOICES = toChoices(TEXT_SCALES);
export const PAGE_BREAK_CHOICES = toChoices(PAGE_BREAK_MODES);

/**
 * Stylesheet injected into the print frame. `@page` is the only way to control
 * the physical sheet, and forcing colour adjustment keeps code blocks and table
 * headers from printing as blank white boxes.
 */
export function buildPageStyle(options: PdfOptions): string {
  const { cssSize } = PAPER_SIZES[options.paper];
  const { mm } = MARGIN_PRESETS[options.margin];

  return `
    @page { size: ${cssSize}; margin: ${mm}mm; }
    @media print {
      html, body { margin: 0; padding: 0; background: #fff; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;
}

/** Custom properties that make the on-screen preview match the printed sheet. */
export function buildPaperStyle(options: PdfOptions): CSSProperties {
  return {
    "--pdf-page-width": `${PAPER_SIZES[options.paper].widthMm}mm`,
    "--pdf-page-margin": `${MARGIN_PRESETS[options.margin].mm}mm`,
    "--pdf-font-size": `${TEXT_SCALES[options.textScale].pt}pt`,
  } as CSSProperties;
}
