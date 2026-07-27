export const SAMPLE_DOCUMENT = `# Welcome to MarkdownPad

A distraction-free markdown editor with a **live preview** and a print-quality
**PDF export** — no account, no upload, nothing leaves your browser.

## Export to PDF

Hit **PDF** in the toolbar to open the export panel. You get a real paper
preview and a handful of controls:

| Setting     | Options                    |
| ----------- | -------------------------- |
| Paper size  | A4, Letter                 |
| Margins     | Compact, Normal, Roomy     |
| Text size   | Small, Normal, Large       |
| Page breaks | None, Chapters, Sections   |
| Title block | Title, date and word count |

Headings stay glued to the paragraph beneath them, code blocks and tables never
split across a page, and the text stays selectable and searchable in the
finished file.

## Everything else

- **Live preview** — GitHub Flavored Markdown, rendered as you type
- **Syntax highlighting** — 190+ languages via highlight.js
- **Dark & light themes** — the PDF always exports on white paper
- **Exports** — \`.pdf\`, \`.html\` and \`.md\`

\`\`\`typescript
interface ExportOptions {
  paper: "a4" | "letter";
  margin: "compact" | "normal" | "roomy";
}

function exportPdf(options: ExportOptions): void {
  console.log(\`Printing on \${options.paper}\`);
}
\`\`\`

> "The best way to predict the future is to invent it."
> — Alan Kay

---

Start typing on the left and watch it render on the right.
`;
