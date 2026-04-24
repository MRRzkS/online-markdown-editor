"use client";

import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Minus,
  Table,
} from "lucide-react";

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
}

const Divider = () => <div className="w-px h-5 bg-border mx-1" />;

export function Toolbar({ onInsert }: ToolbarProps) {
  const buttons = [
    { icon: Bold, label: "Bold", action: () => onInsert("**", "**") },
    { icon: Italic, label: "Italic", action: () => onInsert("*", "*") },
    {
      icon: Strikethrough,
      label: "Strikethrough",
      action: () => onInsert("~~", "~~"),
    },
    <Divider key="d1" />,
    { icon: Heading1, label: "H1", action: () => onInsert("# ") },
    { icon: Heading2, label: "H2", action: () => onInsert("## ") },
    { icon: Heading3, label: "H3", action: () => onInsert("### ") },
    <Divider key="d2" />,
    { icon: List, label: "Bullet List", action: () => onInsert("- ") },
    { icon: ListOrdered, label: "Ordered List", action: () => onInsert("1. ") },
    { icon: Quote, label: "Blockquote", action: () => onInsert("> ") },
    <Divider key="d3" />,
    { icon: Code, label: "Code", action: () => onInsert("```\n", "\n```") },
    { icon: Link, label: "Link", action: () => onInsert("[", "](url)") },
    {
      icon: Image,
      label: "Image",
      action: () => onInsert("![alt](", ")"),
    },
    { icon: Minus, label: "HR", action: () => onInsert("\n---\n") },
    {
      icon: Table,
      label: "Table",
      action: () =>
        onInsert(
          "\n| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |\n"
        ),
    },
  ];

  return (
    <div className="flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto">
      {buttons.map((btn, i) =>
        "icon" in btn ? (
          <button
            key={i}
            onClick={btn.action}
            title={btn.label}
            className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <btn.icon size={16} />
          </button>
        ) : (
          btn
        )
      )}
    </div>
  );
}
