"use client";

import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@/components/editor";
import { Header } from "@/components/header";
import { Preview } from "@/components/preview";
import { StatsBar } from "@/components/stats-bar";
import { Toolbar } from "@/components/toolbar";
import { applyMarkdownAction, type MarkdownAction } from "@/lib/markdown-format";
import { SAMPLE_DOCUMENT } from "@/lib/sample-document";

export default function Home() {
  const [content, setContent] = useState(SAMPLE_DOCUMENT);
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  // Fullscreen can also be left with Escape, which fires no click of ours.
  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const handleAction = useCallback((action: MarkdownAction) => {
    const view = editorRef.current?.view;
    if (view) {
      applyMarkdownAction(view, action);
    }
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  }

  // At least one pane always stays open.
  function togglePane(pane: "editor" | "preview") {
    if (pane === "editor" && showPreview) setShowEditor(!showEditor);
    if (pane === "preview" && showEditor) setShowPreview(!showPreview);
  }

  const paneClass = showEditor && showPreview ? "w-1/2" : "w-full";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <Header
        content={content}
        showEditor={showEditor}
        showPreview={showPreview}
        isFullscreen={isFullscreen}
        onToggleEditor={() => togglePane("editor")}
        onTogglePreview={() => togglePane("preview")}
        onToggleFullscreen={toggleFullscreen}
      />

      <main className="flex flex-1 overflow-hidden">
        {showEditor && (
          <section
            className={clsx("flex flex-col border-r border-border", paneClass)}
          >
            <Toolbar onAction={handleAction} />
            <div className="flex-1 overflow-hidden">
              <Editor ref={editorRef} value={content} onChange={setContent} />
            </div>
            <StatsBar content={content} />
          </section>
        )}

        {showPreview && (
          <section className={clsx("flex flex-col", paneClass)}>
            <div className="border-b border-border bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Preview
            </div>
            <div className="min-h-0 flex-1">
              <Preview content={content} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
