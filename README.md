# MarkdownPad ✨

A beautiful online Markdown editor with live preview, built with Next.js.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## Features

- 📝 **Live Preview** — Real-time markdown rendering as you type
- 🎨 **Syntax Highlighting** — Beautiful code blocks with highlight.js
- 🌗 **Dark / Light Mode** — Toggle theme with one click, persisted in localStorage
- 📊 **Word Count** — Words, characters, lines, and estimated reading time
- 💾 **Export** — Download as `.md` or `.html`
- 🛠️ **Toolbar** — Quick formatting buttons for bold, italic, headings, lists, etc.
- 📐 **Split Pane** — Editor and side-by-side preview, toggle either panel
- ⛶ **Fullscreen** — Distraction-free writing mode
- 📱 **Responsive** — Works on desktop and tablet

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Editor:** CodeMirror 6
- **Markdown:** react-markdown + remark-gfm + rehype-highlight
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/markdown-editor)

1. Push this repo to GitHub
2. Import in [Vercel](https://vercel.com)
3. Deploy — zero configuration needed

## License

MIT
