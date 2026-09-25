import Link from "next/link";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { ExportShowcase } from "@/components/landing/export-showcase";

const benefits = [
  ["Live", "Preview as you type"],
  ["Private", "Nothing is uploaded"],
  ["Flexible", "PDF, HTML, and Markdown"],
];

export default function Home() {
  return (
    <main className="landing-page min-h-screen overflow-x-clip bg-background text-foreground">
      <nav className="site-nav">
        <div className="site-nav-inner">
          <Link href="/" className="apple-brand" aria-label="MarkdownPad home">
            <span className="brand-mark" aria-hidden>M</span>
            <span>MarkdownPad</span>
          </Link>

          <div className="hidden items-center md:flex">
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#export" className="nav-link">Export</a>
            <a href="#privacy" className="nav-link">Privacy</a>
          </div>

          <Link href="/editor" className="nav-cta">
            Open editor
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </nav>

      <section className="hero-apple">
        <div className="hero-glow" aria-hidden />
        <div className="hero-copy">
          <p className="eyebrow-pill">
            <Sparkles size={14} strokeWidth={1.4} />
            MarkdownPad
          </p>
          <h1 className="hero-title">
            Markdown.
            <br />
            <span>Made effortless.</span>
          </h1>
          <p className="hero-subtitle">
            Write in Markdown, see the finished document instantly, and export it
            beautifully. No account. No upload. Nothing in the way.
          </p>
          <div className="hero-actions">
            <Link href="/editor" className="button-primary button-large">
              Start writing
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
            <a href="#experience" className="button-secondary button-large">
              See how it works
            </a>
          </div>
        </div>

        <div className="product-stage" aria-label="MarkdownPad product preview">
          <div className="product-halo" aria-hidden />
          <div className="product-window">
            <div className="product-titlebar">
              <div className="window-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <span>product-brief.md</span>
              <span className="product-status"><i /> Live</span>
            </div>

            <div className="product-body">
              <div className="product-source">
                <div className="product-pane-label">Markdown</div>
                <div className="code-lines" aria-label="Markdown source">
                  <p><b>#</b> Product brief</p>
                  <p>A focused writing workspace for modern teams.</p>
                  <p><b>##</b> Why it matters</p>
                  <p>- Write without visual clutter</p>
                  <p>- Preview changes instantly</p>
                  <p>- Export a polished document</p>
                </div>
              </div>

              <div className="product-preview">
                <div className="product-pane-label">Preview</div>
                <article aria-label="Rendered Markdown preview">
                  <h2 className="preview-h1">Product brief</h2>
                  <p>A focused writing workspace for modern teams.</p>
                  <h3 className="preview-h2">Why it matters</h3>
                  <ul className="product-bullets">
                    <li>Write without visual clutter</li>
                    <li>Preview changes instantly</li>
                    <li>Export a polished document</li>
                  </ul>
                </article>
              </div>
            </div>

            <div className="product-footer">
              <span>23 words</span>
              <span>&lt;1 min read</span>
              <span className="ml-auto">Instant preview</span>
            </div>
          </div>
        </div>
      </section>

      <section className="statement-section">
        <p className="statement-kicker">One uninterrupted flow</p>
        <h2 className="statement-title">
          Write. <span>Preview.</span> Export.
        </h2>
      </section>

      <section id="experience" className="story-section">
        <div className="story-copy">
          <p className="section-kicker">Live preview</p>
          <h2 className="story-title">
            Your words.
            <br />
            Already finished.
          </h2>
          <p className="story-body">
            Markdown stays on the left. A clean, readable document appears on the
            right as you type. No context switching, no extra preview tab.
          </p>
        </div>

        <div className="story-visual live-visual" aria-label="Markdown live preview example">
          <div className="live-source">
            <span># Meeting notes</span>
            <span>## Decisions</span>
            <span>- Ship the new onboarding</span>
            <span>- Keep the flow simple</span>
          </div>
          <div className="live-document">
            <h3 className="live-h1">Meeting notes</h3>
            <h4 className="live-h2">Decisions</h4>
            <ul>
              <li>Ship the new onboarding</li>
              <li>Keep the flow simple</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="export" className="story-section story-section-reverse export-story">
        <div className="story-copy">
          <p className="section-kicker">Print-quality export</p>
          <h2 className="story-title">
            From Markdown
            <br />
            to something polished.
          </h2>
          <p className="story-body">
            Tune the page before you export. The preview responds instantly, while
            the final PDF keeps real text, working links, and clean pagination.
          </p>
          <div className="inline-checks">
            <span><Check size={15} strokeWidth={1.5} /> Vector-sharp PDF</span>
            <span><Check size={15} strokeWidth={1.5} /> Working hyperlinks</span>
            <span><Check size={15} strokeWidth={1.5} /> Clean pagination</span>
          </div>
        </div>

        <ExportShowcase />
      </section>

      <section id="privacy" className="privacy-apple">
        <div className="privacy-icon">
          <LockKeyhole size={34} strokeWidth={1.2} />
        </div>
        <p className="section-kicker">Private by design</p>
        <h2>
          Your draft stays
          <br />
          in your browser.
        </h2>
        <p>
          MarkdownPad does not need an account or a document upload. Open it,
          write, export, and leave.
        </p>
      </section>

      <section className="benefits-strip" aria-label="MarkdownPad benefits">
        {benefits.map(([title, detail]) => (
          <div key={title} className="benefit-item">
            <span>{title}</span>
            <p>{detail}</p>
          </div>
        ))}
      </section>

      <section className="final-apple">
        <div className="final-glow" aria-hidden />
        <p className="section-kicker">Ready when you are</p>
        <h2>Open a blank page.</h2>
        <p>Everything else can disappear.</p>
        <Link href="/editor" className="button-primary button-large">
          Open MarkdownPad
          <ArrowRight size={18} strokeWidth={1.5} />
        </Link>
      </section>

      <footer className="apple-footer">
        <span>MarkdownPad</span>
        <span>Fast. Private. Browser-first.</span>
      </footer>
    </main>
  );
}
