"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { useTheme } from "./theme-provider";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const lightTheme = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff",
  },
  ".cm-content": {
    fontFamily: "var(--font-mono), monospace",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  ".cm-gutters": {
    backgroundColor: "#f8f9fa",
    borderRight: "1px solid #e2e8f0",
    color: "#94a3b8",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#f1f5f9",
  },
  ".cm-activeLine": {
    backgroundColor: "#f8fafc",
  },
});

const darkThemeOverride = EditorView.theme({
  ".cm-content": {
    fontFamily: "var(--font-mono), monospace",
    fontSize: "14px",
    lineHeight: "1.6",
  },
});

export function Editor({ value, onChange }: EditorProps) {
  const { theme } = useTheme();

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={[
        markdown({ base: markdownLanguage }),
        EditorView.lineWrapping,
      ]}
      theme={theme === "dark" ? [oneDark, darkThemeOverride] : lightTheme}
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
