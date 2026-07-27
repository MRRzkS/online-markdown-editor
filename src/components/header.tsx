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
    <header className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-red-500/80" />
          <span className="size-3 rounded-full bg-yellow-500/80" />
          <span className="size-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-sm font-semibold tracking-tight">
          MarkdownPad
        </span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          label="Editor panel"
          active={showEditor}
          onClick={onToggleEditor}
        >
          <PanelLeft size={16} />
        </IconButton>
        <IconButton
          label="Preview panel"
          active={showPreview}
          onClick={onTogglePreview}
        >
          <PanelRight size={16} />
        </IconButton>
        <IconButton
          label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </IconButton>

        <Divider />

        <IconButton
          label={copied ? "Copied" : "Copy markdown"}
          onClick={handleCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </IconButton>
        <IconButton label="Download .md" onClick={handleExportMarkdown}>
          <FileText size={16} />
        </IconButton>
        <IconButton label="Download .html" onClick={handleExportHtml}>
          <Code2 size={16} />
        </IconButton>

        <button
          type="button"
          onClick={() => setPdfDialogOpen(true)}
          className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <FileDown size={15} />
          PDF
        </button>

        <Divider />

        <IconButton
          label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
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

function Divider() {
  return <div className="mx-1 h-5 w-px bg-border" />;
}
