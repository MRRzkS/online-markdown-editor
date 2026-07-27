# MarkdownPad

Write markdown, watch it render, and export a PDF that actually looks like a
document — all in the browser. No account, no upload, nothing leaves your machine.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## The headline feature: markdown → tidy PDF

Hit **PDF** and you get an export panel with a live paper preview on the right.
Change a setting, watch the sheet reflow, then download.

| Setting         | Options                      |
| --------------- | ---------------------------- |
| **Paper size**  | A4 · Letter                  |
| **Margins**     | Compact · Normal · Roomy     |
| **Text size**   | Small · Normal · Large       |
| **Page breaks** | None · Chapters · Sections   |
| **Title block** | Title, date and word count   |

### Why the output looks right

The PDF is produced by the browser's own print engine, not by screenshotting the
page. That single decision buys a lot:

- **Real text** — selectable, searchable, copy-pasteable. Not a picture of text.
- **Vector sharp** — crisp at 100% and at 400%. No blurry rasterised headings.
- **Working hyperlinks** — links stay clickable in the finished file.
- **Honest pagination** — headings stay with the paragraph they introduce, code
  blocks and tables never split mid-block, table headers repeat across pages, and
  paragraphs don't strand single lines.
- **Always on white** — the sheet ignores the app's dark theme and uses an
  ink-friendly palette, so you don't print a black rectangle.
- **Long code wraps** instead of running off the edge of the paper.

The preview and the printed page are *the same DOM node* with the same
stylesheet, so what you see is what you get by construction — not by two layout
engines happening to agree.

## Everything else

- **Live preview** — GitHub Flavored Markdown, rendered as you type
- **Syntax highlighting** — 190+ languages, themed for light, dark and print
- **Dark / light themes** — applied before first paint, so no flash on reload
- **Cursor-aware toolbar** — formatting wraps your selection and toggles cleanly;
  headings swap level instead of stacking `#`
- **More exports** — self-contained `.html` and raw `.md`, named after your title
- **Split panes** — collapse either side, or go fullscreen
- **Live stats** — words, characters, lines, reading time

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run lint
```

## How it works

```
markdown ──► react-markdown ──► .markdown-body ──┬──► live preview
             remark-gfm                          │
             rehype-highlight                    └──► .pdf-document ──► react-to-print
                                                                        └► browser print engine ──► PDF
```

One renderer feeds both surfaces. `.pdf-document` is a self-contained light
scope that redefines every design token it inherits, so it renders identically
in the dark-themed dialog and inside the hidden print frame. Layout settings map
to CSS: paper size and margins become an `@page` rule, text size and page width
become custom properties.

### Project layout

```
src/
├── app/            layout, page, global styles
├── components/
│   ├── pdf/        export dialog, printable document, option fields
│   └── ui/         shared primitives
├── hooks/          use-theme
├── lib/            markdown pipeline, PDF options, formatting, download
└── styles/         markdown, syntax and print stylesheets
```

## Built with

Rather than hand-rolling a PDF writer, this leans on maintained open source:

| Concern            | Library                                      |
| ------------------ | -------------------------------------------- |
| Framework          | [Next.js](https://nextjs.org) (App Router)   |
| Editor             | [CodeMirror 6](https://codemirror.net)        |
| Markdown rendering | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| HTML export        | [unified](https://unifiedjs.com) / remark / rehype |
| Syntax highlighting| [highlight.js](https://highlightjs.org)       |
| Print orchestration| [react-to-print](https://github.com/MatthewHerbst/react-to-print) |
| Dialog / a11y      | [Radix UI](https://www.radix-ui.com)          |
| Styling            | [Tailwind CSS](https://tailwindcss.com)       |
| Icons              | [Lucide](https://lucide.dev)                  |

## Note on saving

Downloading the PDF opens your browser's print dialog — choose **Save as PDF** as
the destination. That extra click is what keeps the export vector-quality and
server-free: the same engine that renders the page writes the file, so there is
no upload, no rasterisation, and no backend to run.

## License

MIT
