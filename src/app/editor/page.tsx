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

export default function EditorPage() {
  const [content, setContent] = useState(SAMPLE_DOCUMENT);
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [mobilePane, setMobilePane] = useState<"editor" | "preview">("editor");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const handleAction = useCallback((action: MarkdownAction) => {
    const view = editorRef.current?.view;
    if (view) applyMarkdownAction(view, action);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  }

  function togglePane(pane: "editor" | "preview") {
    if (pane === "editor" && showPreview) {
      setShowEditor(!showEditor);
      if (!showEditor) setMobilePane("editor");
    }
    if (pane === "preview" && showEditor) {
      setShowPreview(!showPreview);
      if (!showPreview) setMobilePane("preview");
    }
  }

  const split = showEditor && showPreview;

  return (
    <div className="editor-app flex h-dvh min-h-0 flex-col overflow-hidden bg-background text-foreground">
      <Header
        content={content}
        showEditor={showEditor}
        showPreview={showPreview}
        isFullscreen={isFullscreen}
        onToggleEditor={() => togglePane("editor")}
        onTogglePreview={() => togglePane("preview")}
        onToggleFullscreen={toggleFullscreen}
      />

      {split && (
        <div className="mx-2 mt-2 grid shrink-0 grid-cols-2 rounded-[14px] border border-foreground/[0.08] bg-foreground/[0.035] p-1 md:hidden">
          <button
            type="button"
            onClick={() => setMobilePane("editor")}
            className={clsx(
              "min-h-11 rounded-[10px] px-3 text-sm font-semibold transition",
              mobilePane === "editor"
                ? "bg-secondary text-primary shadow-sm"
                : "text-muted-foreground"
            )}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setMobilePane("preview")}
            className={clsx(
              "min-h-11 rounded-[10px] px-3 text-sm font-semibold transition",
              mobilePane === "preview"
                ? "bg-secondary text-primary shadow-sm"
                : "text-muted-foreground"
            )}
          >
            Preview
          </button>
        </div>
      )}

      <main className="min-h-0 flex-1 p-2 sm:p-3">
        <div className="editor-workspace flex h-full min-h-0 overflow-hidden rounded-[18px] border border-foreground/[0.08] bg-foreground/[0.018] shadow-[0_18px_60px_rgba(0,0,0,0.08)] sm:rounded-[22px]">
          {showEditor && (
            <section
              className={clsx(
                "min-w-0 flex-col overflow-hidden",
                split ? "md:w-1/2" : "w-full",
                split && mobilePane !== "editor" ? "hidden md:flex" : "flex"
              )}
            >
              <Toolbar onAction={handleAction} />
              <div className="min-h-0 flex-1 overflow-hidden">
                <Editor ref={editorRef} value={content} onChange={setContent} />
              </div>
              <StatsBar content={content} />
            </section>
          )}

          {showPreview && (
            <section
              className={clsx(
                "preview-panel min-w-0 flex-col overflow-hidden",
                split ? "md:w-1/2 md:border-l" : "w-full",
                split && mobilePane !== "preview" ? "hidden md:flex" : "flex"
              )}
            >
              <div className="preview-panel-header flex min-h-12 shrink-0 items-center justify-between border-b px-4">
                <div>
                  <p className="preview-kicker text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Rendered document
                  </p>
                  <p className="preview-label text-xs font-medium">Live preview</p>
                </div>
                <span className="preview-live inline-flex items-center gap-1.5 text-[11px] font-medium">
                  <span className="size-1.5 rounded-full bg-accent-strong" />
                  Live
                </span>
              </div>
              <div className="min-h-0 flex-1">
                <Preview content={content} />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
