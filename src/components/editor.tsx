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
    fontFamily: "var(--font-mono)",
    fontSize: "14px",
    lineHeight: "1.7",
  },
};

const lightTheme = EditorView.theme({
  ...typography,
  "&": { backgroundColor: "#ffffff" },
  ".cm-gutters": {
    backgroundColor: "#f8fafc",
    borderRight: "1px solid #e2e8f0",
    color: "#94a3b8",
  },
  ".cm-activeLineGutter": { backgroundColor: "#f1f5f9" },
  ".cm-activeLine": { backgroundColor: "#f8fafc" },
});

const darkTheme = EditorView.theme(typography);

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
