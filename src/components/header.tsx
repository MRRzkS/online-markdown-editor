"use client";

import {
  Check,
  Code2,
  Copy,
  FileDown,
  FileText,
  Maximize2,
  Minimize2,
  Moon,
  PanelLeft,
  PanelRight,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { deriveTitle, toFileName } from "@/lib/document";
import { downloadFile } from "@/lib/download";
import { buildHtmlDocument } from "@/lib/export-html";
import { PdfExportDialog } from "./pdf/pdf-export-dialog";
import { IconButton } from "./ui/icon-button";

const COPY_FEEDBACK_MS = 2000;

interface HeaderProps {
  content: string;
  showEditor: boolean;
  showPreview: boolean;
  isFullscreen: boolean;
  onToggleEditor: () => void;
  onTogglePreview: () => void;
  onToggleFullscreen: () => void;
}

export function Header({
  content,
  showEditor,
  showPreview,
  isFullscreen,
  onToggleEditor,
  onTogglePreview,
  onToggleFullscreen,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
  }

  function handleExportMarkdown() {
    const title = deriveTitle(content);
    downloadFile(content, toFileName(title, "md"), "text/markdown");
  }

  async function handleExportHtml() {
    const title = deriveTitle(content);
    const html = await buildHtmlDocument(content, title);
    downloadFile(html, toFileName(title, "html"), "text/html");
  }

  return (
    <header className="relative z-30 flex min-h-16 items-center justify-between gap-2 border-b border-foreground/[0.07] bg-background/75 px-2.5 backdrop-blur-xl backdrop-saturate-[180%] sm:px-4">
      <Link
        href="/"
        className="flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-1.5 transition-opacity hover:opacity-80"
        aria-label="Back to MarkdownPad home"
      >
        <span className="brand-mark" aria-hidden>M</span>
        <span className="hidden text-sm font-semibold tracking-[-0.025em] sm:block">
          MarkdownPad
        </span>
      </Link>

      <div className="hidden items-center gap-1 rounded-xl border border-foreground/[0.07] bg-foreground/[0.03] p-1 md:flex">
        <IconButton
          label="Editor panel"
          active={showEditor}
          onClick={onToggleEditor}
        >
          <PanelLeft size={16} strokeWidth={1.5} />
        </IconButton>
        <IconButton
          label="Preview panel"
          active={showPreview}
          onClick={onTogglePreview}
        >
          <PanelRight size={16} strokeWidth={1.5} />
        </IconButton>
        <IconButton
          label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 size={16} strokeWidth={1.5} />
          ) : (
            <Maximize2 size={16} strokeWidth={1.5} />
          )}
        </IconButton>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-1">
        <div className="hidden items-center gap-1 lg:flex">
          <IconButton
            label={copied ? "Copied" : "Copy markdown"}
            onClick={handleCopy}
          >
            {copied ? (
              <Check size={16} strokeWidth={1.5} />
            ) : (
              <Copy size={16} strokeWidth={1.5} />
            )}
          </IconButton>
          <IconButton label="Download .md" onClick={handleExportMarkdown}>
            <FileText size={16} strokeWidth={1.5} />
          </IconButton>
          <IconButton label="Download .html" onClick={handleExportHtml}>
            <Code2 size={16} strokeWidth={1.5} />
          </IconButton>
        </div>

        <button
          type="button"
          onClick={() => setPdfDialogOpen(true)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-foreground px-3 text-xs font-semibold text-background transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-4"
        >
          <FileDown size={15} strokeWidth={1.5} />
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <IconButton
          label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun size={16} strokeWidth={1.5} />
          ) : (
            <Moon size={16} strokeWidth={1.5} />
          )}
        </IconButton>
      </div>

      <PdfExportDialog
        content={content}
        open={pdfDialogOpen}
        onOpenChange={setPdfDialogOpen}
      />
    </header>
  );
}
