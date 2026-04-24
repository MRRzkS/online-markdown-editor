"use client";

import { useState, useCallback, useRef } from "react";
import { Header } from "@/components/header";
import { Toolbar } from "@/components/toolbar";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { StatsBar } from "@/components/stats-bar";

const DEFAULT_CONTENT = `# Welcome to MarkdownPad ✨

A beautiful online markdown editor with **live preview**, syntax highlighting, and export options.

## Features

- 📝 **Live Preview** — See your markdown rendered in real-time
- 🎨 **Syntax Highlighting** — Code blocks look great out of the box
- 🌗 **Dark / Light Mode** — Toggle with one click
- 📊 **Word Count** — Track words, characters, and reading time
- 💾 **Export** — Download as \`.md\` or \`.html\`
- 🛠️ **Toolbar** — Quick access to common formatting

## Code Example

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}! Welcome to MarkdownPad.\`;
}

console.log(greet("World"));
\`\`\`

## Table Example

| Feature       | Status |
| ------------- | ------ |
| Live Preview  | ✅      |
| Dark Mode     | ✅      |
| Export        | ✅      |
| Toolbar       | ✅      |

## Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

---

Start editing on the left panel and watch the magic happen! 🚀
`;

export default function Home() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<{ view: { state: { selection: { main: { from: number } } }; dispatch: (tr: { selection: { anchor: number }; scrollIntoView?: boolean } & Record<string, unknown>) => void } } | null>(null);

  const handleInsert = useCallback(
    (before: string, after?: string) => {
      // Simple insert at the end of current content for now
      // In a full implementation, this would insert at cursor position in CodeMirror
      setContent((prev) => prev + before + (after ?? ""));
    },
    []
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Header
        content={content}
        showEditor={showEditor}
        showPreview={showPreview}
        onToggleEditor={() => {
          if (showEditor && !showPreview) return;
          setShowEditor(!showEditor);
        }}
        onTogglePreview={() => {
          if (showPreview && !showEditor) return;
          setShowPreview(!showPreview);
        }}
        onToggleFullscreen={toggleFullscreen}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {showEditor && (
          <div
            className={`flex flex-col border-r border-border ${
              showPreview ? "w-1/2" : "w-full"
            }`}
          >
            <Toolbar onInsert={handleInsert} />
            <div className="flex-1 overflow-hidden">
              <Editor value={content} onChange={setContent} />
            </div>
            <StatsBar content={content} />
          </div>
        )}

        {/* Preview Panel */}
        {showPreview && (
          <div
            className={`flex flex-col ${showEditor ? "w-1/2" : "w-full"}`}
          >
            <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground border-b border-border bg-muted/30">
              Preview
            </div>
            <div className="flex-1 overflow-auto">
              <Preview content={content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
