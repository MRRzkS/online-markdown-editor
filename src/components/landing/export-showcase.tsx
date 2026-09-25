"use client";

import { FileDown } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type Paper = "a4" | "letter";
type Margin = "compact" | "normal" | "roomy";
type Scale = "small" | "default" | "large";

const paperOptions: Array<{ value: Paper; label: string }> = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "Letter" },
];

const marginOptions: Array<{ value: Margin; label: string }> = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "roomy", label: "Roomy" },
];

const scaleOptions: Array<{ value: Scale; label: string }> = [
  { value: "small", label: "S" },
  { value: "default", label: "M" },
  { value: "large", label: "L" },
];

export function ExportShowcase() {
  const [paper, setPaper] = useState<Paper>("a4");
  const [margin, setMargin] = useState<Margin>("normal");
  const [scale, setScale] = useState<Scale>("default");

  return (
    <div className="export-showcase" aria-label="Interactive PDF export preview">
      <div className="export-showcase-glow" aria-hidden />

      <div className="export-control-panel">
        <div className="export-control-heading">
          <div>
            <span>PDF setup</span>
            <strong>Make it yours.</strong>
          </div>
          <span className="export-ready-dot"><i /> Ready</span>
        </div>

        <ControlGroup label="Paper">
          {paperOptions.map((option) => (
            <ControlButton
              key={option.value}
              active={paper === option.value}
              onClick={() => setPaper(option.value)}
            >
              {option.label}
            </ControlButton>
          ))}
        </ControlGroup>

        <ControlGroup label="Margins" columns={3}>
          {marginOptions.map((option) => (
            <ControlButton
              key={option.value}
              active={margin === option.value}
              onClick={() => setMargin(option.value)}
            >
              {option.label}
            </ControlButton>
          ))}
        </ControlGroup>

        <ControlGroup label="Text size" columns={3}>
          {scaleOptions.map((option) => (
            <ControlButton
              key={option.value}
              active={scale === option.value}
              onClick={() => setScale(option.value)}
            >
              {option.label}
            </ControlButton>
          ))}
        </ControlGroup>

        <Link href="/editor" className="export-open-editor">
          <FileDown size={15} strokeWidth={1.5} />
          Open export panel
        </Link>
      </div>

      <div className="paper-stage">
        <div
          className="paper-sheet"
          data-paper={paper}
          data-margin={margin}
          data-scale={scale}
          aria-live="polite"
        >
          <div className="paper-content">
            <small>PRODUCT BRIEF</small>
            <h3>A document that feels done.</h3>
            <p>
              Readable type. Thoughtful spacing. Ready to share from the moment
              you export.
            </p>
            <div className="paper-rule" />
            <h4>Why it matters</h4>
            <ul>
              <li>Real, selectable text</li>
              <li>Working links</li>
              <li>Clean page breaks</li>
            </ul>
          </div>
        </div>
        <div className="paper-shadow" aria-hidden />
        <div className="paper-meta">
          <span>{paper === "a4" ? "A4" : "US Letter"}</span>
          <span>{margin} margins</span>
          <span>{scale === "default" ? "medium" : scale} text</span>
        </div>
      </div>
    </div>
  );
}

function ControlGroup({
  label,
  columns = 2,
  children,
}: {
  label: string;
  columns?: 2 | 3;
  children: ReactNode;
}) {
  return (
    <div className="export-control-group">
      <span className="control-label">{label}</span>
      <div
        className="export-segmented"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    </div>
  );
}

function ControlButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={active ? "export-segment active" : "export-segment"}
    >
      {children}
    </button>
  );
}
