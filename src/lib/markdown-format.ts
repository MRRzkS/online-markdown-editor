import { EditorSelection, type ChangeSpec, type EditorState } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

/**
 * Toolbar formatting expressed as data, applied through CodeMirror's
 * transaction API so edits land at the cursor and stay undoable.
 */
export type MarkdownAction =
  /** Surround the selection, e.g. `**bold**`. */
  | { type: "wrap"; before: string; after: string; placeholder: string }
  /** Set the heading level of every selected line. */
  | { type: "heading"; level: 1 | 2 | 3 }
  /** Add or remove a line marker such as `- ` or `> `. */
  | { type: "linePrefix"; prefix: string }
  /** Drop a multi-line snippet below the cursor, optionally placing the caret
   *  at an offset inside it. */
  | { type: "block"; snippet: string; caret?: number };

const HEADING_MARKER = /^#{1,6}[ \t]+/;

export function applyMarkdownAction(
  view: EditorView,
  action: MarkdownAction
): void {
  const { state } = view;

  switch (action.type) {
    case "wrap":
      view.dispatch(wrapSelection(state, action));
      break;
    case "heading":
      view.dispatch(replaceLineMarker(state, "#".repeat(action.level) + " "));
      break;
    case "linePrefix":
      view.dispatch(toggleLinePrefix(state, action.prefix));
      break;
    case "block":
      view.dispatch(insertBlock(state, action));
      break;
  }

  view.focus();
}

function wrapSelection(
  state: EditorState,
  { before, after, placeholder }: Extract<MarkdownAction, { type: "wrap" }>
) {
  const spec = state.changeByRange((range) => {
    const text = state.sliceDoc(range.from, range.to) || placeholder;
    const contentStart = range.from + before.length;

    return {
      changes: { from: range.from, to: range.to, insert: before + text + after },
      range: EditorSelection.range(contentStart, contentStart + text.length),
    };
  });

  return { ...spec, scrollIntoView: true };
}

/** Replaces any existing `#` marker so H1 → H2 swaps instead of stacking. */
function replaceLineMarker(state: EditorState, marker: string) {
  const changes = selectedLines(state).map(({ from, text }) => {
    const existing = HEADING_MARKER.exec(text)?.[0] ?? "";
    return { from, to: from + existing.length, insert: marker };
  });

  return { changes, scrollIntoView: true };
}

/** Adds the prefix, or strips it when every selected line already has it. */
function toggleLinePrefix(state: EditorState, prefix: string) {
  const lines = selectedLines(state);
  const isActive = lines.every(({ text }) => text.startsWith(prefix));

  const changes: ChangeSpec[] = lines.map(({ from }) =>
    isActive ? { from, to: from + prefix.length } : { from, insert: prefix }
  );

  return { changes, scrollIntoView: true };
}

function insertBlock(
  state: EditorState,
  { snippet, caret }: Extract<MarkdownAction, { type: "block" }>
) {
  const line = state.doc.lineAt(state.selection.main.to);
  const separator = line.text.trim() ? "\n\n" : "";
  const insert = `${separator}${snippet}\n`;

  return {
    changes: { from: line.to, insert },
    selection: {
      anchor: line.to + separator.length + (caret ?? snippet.length),
    },
    scrollIntoView: true,
  };
}

function selectedLines(state: EditorState) {
  const { from, to } = state.selection.main;
  const first = state.doc.lineAt(from).number;
  const last = state.doc.lineAt(to).number;

  return Array.from({ length: last - first + 1 }, (_, index) =>
    state.doc.line(first + index)
  );
}
