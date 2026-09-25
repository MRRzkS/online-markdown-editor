"use client";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import type { Ref } from "react";
import { useTheme } from "@/hooks/use-theme";

const extensions = [
  markdown({ base: markdownLanguage }),
  EditorView.lineWrapping,
];

const typography = {
  ".cm-content": {
    fontFamily: "var(--font-inter)",
    fontSize: "14px",
    lineHeight: "1.78",
    padding: "18px 8px 24px",
  },
  ".cm-line": {
    padding: "0 12px",
  },
  ".cm-gutters": {
    fontFamily: "var(--font-inter)",
    fontSize: "11px",
  },
};

const lightTheme = EditorView.theme({
  ...typography,
  "&": { backgroundColor: "transparent", color: "#0b0d12" },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "1px solid rgba(11,13,18,.06)",
    color: "rgba(11,13,18,.34)",
  },
  ".cm-activeLineGutter": { backgroundColor: "rgba(11,13,18,.035)" },
  ".cm-activeLine": { backgroundColor: "rgba(11,13,18,.022)" },
  ".cm-selectionBackground": { backgroundColor: "rgba(110,92,255,.16) !important" },
});

const darkTheme = EditorView.theme({
  ...typography,
  "&": { backgroundColor: "transparent" },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "1px solid rgba(245,245,247,.07)",
    color: "rgba(245,245,247,.36)",
  },
  ".cm-activeLineGutter": { backgroundColor: "rgba(245,245,247,.045)" },
  ".cm-activeLine": { backgroundColor: "rgba(245,245,247,.025)" },
  ".cm-selectionBackground": { backgroundColor: "rgba(141,130,255,.18) !important" },
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  ref?: Ref<ReactCodeMirrorRef>;
}

export function Editor({ value, onChange, ref }: EditorProps) {
  const { theme } = useTheme();

  return (
    <CodeMirror
      ref={ref}
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme={theme === "dark" ? [oneDark, darkTheme] : lightTheme}
      className="h-full overflow-auto"
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        foldGutter: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: false,
      }}
    />
  );
}
