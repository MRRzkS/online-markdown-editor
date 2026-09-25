"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  Check,
  ChevronRight,
  Code2,
  Copy,
  FileDown,
  FileText,
  Maximize2,
  Minimize2,
  Moon,
  MoreHorizontal,
  PanelLeft,
  PanelRight,
  Sun,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setMobileMenuOpen(false);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
  }

  function handleExportMarkdown() {
    const title = deriveTitle(content);
    downloadFile(content, toFileName(title, "md"), "text/markdown");
    setMobileMenuOpen(false);
  }

  async function handleExportHtml() {
    const title = deriveTitle(content);
    const html = await buildHtmlDocument(content, title);
    downloadFile(html, toFileName(title, "html"), "text/html");
    setMobileMenuOpen(false);
  }

  function handleFullscreen() {
    onToggleFullscreen();
    setMobileMenuOpen(false);
  }

  return (
    <header className="editor-header relative z-30 flex min-h-16 shrink-0 items-center justify-between gap-2 px-2.5 sm:px-4">
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

      <div className="hidden items-center gap-1 rounded-[14px] border border-foreground/[0.07] bg-foreground/[0.03] p-1 md:flex">
        <IconButton label="Editor panel" active={showEditor} onClick={onToggleEditor}>
          <PanelLeft size={16} strokeWidth={1.5} />
        </IconButton>
        <IconButton label="Preview panel" active={showPreview} onClick={onTogglePreview}>
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
          <IconButton label={copied ? "Copied" : "Copy markdown"} onClick={handleCopy}>
            {copied ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
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
          className="editor-primary-action"
        >
          <FileDown size={15} strokeWidth={1.5} />
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <Dialog.Trigger asChild>
            <span className="lg:hidden">
              <IconButton label="More actions" active={mobileMenuOpen}>
                <MoreHorizontal size={18} strokeWidth={1.5} />
              </IconButton>
            </span>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="editor-sheet-overlay lg:hidden" />
            <Dialog.Content
              className="editor-action-sheet lg:hidden"
              aria-describedby={undefined}
            >
              <div className="editor-sheet-handle" aria-hidden />
              <div className="editor-sheet-header">
                <div>
                  <Dialog.Title>Document actions</Dialog.Title>
                  <p>Export, copy, or expand your workspace.</p>
                </div>
                <Dialog.Close asChild>
                  <button type="button" className="editor-sheet-close" aria-label="Close actions">
                    <X size={17} strokeWidth={1.5} />
                  </button>
                </Dialog.Close>
              </div>

              <div className="editor-sheet-actions">
                <SheetAction
                  icon={copied ? Check : Copy}
                  label={copied ? "Copied" : "Copy Markdown"}
                  detail="Copy source to clipboard"
                  onClick={handleCopy}
                />
                <SheetAction
                  icon={FileText}
                  label="Download Markdown"
                  detail="Save the editable .md file"
                  onClick={handleExportMarkdown}
                />
                <SheetAction
                  icon={Code2}
                  label="Download HTML"
                  detail="Export a standalone webpage"
                  onClick={handleExportHtml}
                />
                <SheetAction
                  icon={isFullscreen ? Minimize2 : Maximize2}
                  label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  detail="Use the whole display"
                  onClick={handleFullscreen}
                />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <IconButton
          label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
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

function SheetAction({
  icon: Icon,
  label,
  detail,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="editor-sheet-action">
      <span className="editor-sheet-action-icon">
        <Icon size={18} strokeWidth={1.4} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>
      <ChevronRight size={16} strokeWidth={1.4} className="shrink-0 opacity-35" />
    </button>
  );
}
