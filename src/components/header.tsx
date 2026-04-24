"use client";

import {
  Sun,
  Moon,
  Download,
  FileText,
  Copy,
  Check,
  PanelLeftClose,
  PanelRightClose,
  Maximize2,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";

interface HeaderProps {
  content: string;
  showEditor: boolean;
  showPreview: boolean;
  onToggleEditor: () => void;
  onTogglePreview: () => void;
  onToggleFullscreen: () => void;
}

export function Header({
  content,
  showEditor,
  showPreview,
  onToggleEditor,
  onTogglePreview,
  onToggleFullscreen,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleExportHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #1e293b; }
    pre { background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
    code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; color: #64748b; font-style: italic; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e2e8f0; padding: 0.5rem 0.75rem; }
    th { background: #f8f9fa; }
    img { max-width: 100%; border-radius: 0.5rem; }
    a { color: #6366f1; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
  </style>
</head>
<body>${content}</body>
</html>`;

    // We need to render the markdown to HTML first, so use a simple approach
    const blob = new Blob(
      [
        `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Exported Markdown</title><style>body{font-family:-apple-system,sans-serif;max-width:800px;margin:0 auto;padding:2rem;line-height:1.7;color:#1e293b}pre{background:#f1f5f9;padding:1rem;border-radius:8px;overflow-x:auto}code{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:0.9em}pre code{background:none;padding:0}blockquote{border-left:4px solid #6366f1;padding-left:1rem;color:#64748b;font-style:italic}table{border-collapse:collapse;width:100%}th,td{border:1px solid #e2e8f0;padding:8px 12px}th{background:#f8f9fa}hr{border:none;border-top:1px solid #e2e8f0;margin:2rem 0}</style></head><body><pre>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body></html>`,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex items-center justify-between px-3 py-2 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 font-semibold text-sm tracking-tight">
          MarkdownPad
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleEditor}
          title={showEditor ? "Hide editor" : "Show editor"}
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <PanelLeftClose size={16} />
        </button>
        <button
          onClick={onTogglePreview}
          title={showPreview ? "Hide preview" : "Show preview"}
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <PanelRightClose size={16} />
        </button>
        <button
          onClick={onToggleFullscreen}
          title="Toggle fullscreen"
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <Maximize2 size={16} />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <button
          onClick={handleCopy}
          title="Copy markdown"
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <button
          onClick={handleExportMarkdown}
          title="Export .md"
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText size={16} />
        </button>
        <button
          onClick={handleExportHTML}
          title="Export .html"
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          <Download size={16} />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
