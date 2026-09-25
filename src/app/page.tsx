import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  FileDown,
  LockKeyhole,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    eyebrow: "Live preview",
    title: "Write on one side. See the finished document on the other.",
    description:
      "GitHub-flavored Markdown renders as you type, with syntax highlighting, tables, links, and clean document typography.",
  },
  {
    icon: FileDown,
    eyebrow: "Beautiful exports",
    title: "Turn Markdown into a document you can actually send.",
    description:
      "Export sharp, selectable PDF, self-contained HTML, or raw Markdown without uploading your content anywhere.",
  },
  {
    icon: LockKeyhole,
    eyebrow: "Private by design",
    title: "Your draft stays in your browser.",
    description:
      "No account, no backend, and no document upload. Open the editor and start writing immediately.",
  },
];

const details = [
  "Cursor-aware formatting toolbar",
  "Light and dark themes",
  "Responsive split-pane workspace",
];

export default function Home() {
  return (
    <main className="landing-page min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="landing-aurora landing-aurora-one" aria-hidden />
      <div className="landing-aurora landing-aurora-two" aria-hidden />

      <nav className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="liquid-glass flex w-full items-center justify-between rounded-[22px] px-3 py-2.5 sm:px-4">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2.5 rounded-xl px-1 font-semibold tracking-tight"
            aria-label="MarkdownPad home"
          >
            <span className="brand-mark" aria-hidden>
              M
            </span>
            <span>MarkdownPad</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <a href="#features" className="nav-link">Features</a>
            <a href="#workflow" className="nav-link">Workflow</a>
            <a href="#privacy" className="nav-link">Privacy</a>
          </div>

          <Link href="/editor" className="button-primary">
            Open editor
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </nav>

      <section className="relative mx-auto grid min-h-[88svh] w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.035] px-3 py-1.5 text-xs font-medium tracking-tight text-muted-foreground">
            <Sparkles size={14} strokeWidth={1.5} />
            Browser-first Markdown workspace
          </div>

          <h1 className="max-w-4xl text-[clamp(3.3rem,8.6vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
            Write.
            <br />
            See it.
            <br />
            <span className="text-accent-strong">Ship it.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A focused online Markdown editor with live preview and print-quality
            export. No setup, no account, no upload.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/editor" className="button-primary button-large">
              Start writing
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
            <a href="#features" className="button-secondary button-large">
              Explore features
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
            {["Free to use", "No sign-up", "Works locally"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check size={14} strokeWidth={1.5} className="text-accent-strong" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-stage relative mx-auto w-full max-w-3xl">
          <div className="hero-orbit hero-orbit-one" aria-hidden />
          <div className="hero-orbit hero-orbit-two" aria-hidden />

          <div className="hero-window">
            <div className="hero-window-bar">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-foreground/20" />
                <span className="size-2.5 rounded-full bg-foreground/14" />
                <span className="size-2.5 rounded-full bg-foreground/10" />
              </div>
              <div className="hero-window-title">Product brief.md</div>
              <div className="w-10" />
            </div>

            <div className="grid min-h-[410px] md:grid-cols-2">
              <div className="hero-editor-pane border-b border-foreground/8 p-5 md:border-b-0 md:border-r">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Markdown
                  </span>
                  <span className="hero-live-dot">Live</span>
                </div>
                <div className="space-y-3 text-[13px] leading-6 text-muted-foreground">
                  <p><span className="text-accent-strong">#</span> Product brief</p>
                  <p className="text-foreground/84">A focused writing workspace for modern teams.</p>
                  <p><span className="text-accent-strong">##</span> Why it matters</p>
                  <p>- Write without visual clutter</p>
                  <p>- Preview changes instantly</p>
                  <p>- Export a polished document</p>
                  <p className="hero-caret-line">Ready to share<span className="hero-caret" /></p>
                </div>
              </div>

              <div className="hero-preview-pane bg-secondary/72 p-5 text-primary">
                <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/45">
                  Preview
                </div>
                <article className="mx-auto max-w-sm">
                  <p className="mb-3 text-xs font-medium text-primary/45">DOCUMENT</p>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em]">Product brief</h2>
                  <p className="mt-3 text-sm leading-6 text-primary/62">
                    A focused writing workspace for modern teams.
                  </p>
                  <div className="my-6 h-px bg-primary/10" />
                  <h3 className="text-sm font-semibold">Why it matters</h3>
                  <ul className="mt-3 space-y-2 text-sm text-primary/62">
                    <li>Write without visual clutter</li>
                    <li>Preview changes instantly</li>
                    <li>Export a polished document</li>
                  </ul>
                </article>
              </div>
            </div>

            <div className="hero-window-footer">
              <span>47 words</span>
              <span>1 min read</span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-medium text-foreground">
                <Zap size={13} strokeWidth={1.5} />
                Instant preview
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-moment relative border-y border-foreground/[0.06] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            One uninterrupted flow
          </p>
          <div className="overflow-hidden">
            <p className="marketing-line text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              From thought
              <span className="mx-[0.16em] text-accent-strong">→</span>
              document.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-kicker">Built for focus</p>
          <h2 className="section-title">
            Everything you need.
            <span className="text-muted-foreground"> Nothing fighting for attention.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={index === 0 ? "feature-card col-span-2 lg:col-span-1" : "feature-card"}
              >
                <div className="feature-icon">
                  <Icon size={22} strokeWidth={1.25} />
                </div>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.035em] sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-24 sm:px-6 sm:pb-32 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="self-center">
          <p className="section-kicker">Designed around the document</p>
          <h2 className="section-title max-w-xl">A workspace that gets out of your way.</h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
            The interface stays quiet while the document remains central. Formatting,
            preview, stats, and exports are one click away when you need them.
          </p>
          <div className="mt-8 space-y-3">
            {details.map((detail) => (
              <div key={detail} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex size-7 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.035]">
                  <Check size={14} strokeWidth={1.5} />
                </span>
                {detail}
              </div>
            ))}
          </div>
        </div>

        <div className="workflow-visual">
          <div className="workflow-rail" aria-hidden />
          {[
            ["01", "Write", "Start with Markdown, shortcuts, or the formatting toolbar."],
            ["02", "Review", "See the rendered result beside your source without switching context."],
            ["03", "Export", "Download PDF, HTML, or Markdown when the document is ready."],
          ].map(([number, title, copy]) => (
            <div key={number} className="workflow-step">
              <span className="workflow-number">{number}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="privacy" className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="privacy-panel">
          <div>
            <p className="section-kicker">Private by default</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(2.4rem,6vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Your writing stays yours.
            </h2>
          </div>
          <div className="max-w-md self-end">
            <p className="text-base leading-7 text-muted-foreground">
              MarkdownPad runs without document uploads or account storage. Your
              content stays in the browser while you write and export.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="liquid-glass final-cta relative overflow-hidden rounded-[32px] px-6 py-12 sm:px-10 sm:py-16">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="section-kicker">Ready when you are</p>
              <h2 className="mt-3 max-w-3xl text-[clamp(2.5rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                Open a blank page.
                <br />
                Make it useful.
              </h2>
            </div>
            <Link href="/editor" className="button-primary button-large shrink-0">
              Open MarkdownPad
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 pb-8 pt-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>MarkdownPad</span>
        <span>Fast, private, browser-first Markdown editing.</span>
      </footer>
    </main>
  );
}
