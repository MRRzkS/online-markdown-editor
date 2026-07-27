"use client";

import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
  Table,
  type LucideIcon,
} from "lucide-react";
import type { MarkdownAction } from "@/lib/markdown-format";
import { IconButton } from "./ui/icon-button";

type ToolbarItem =
  | { kind: "separator" }
  | { kind: "action"; icon: LucideIcon; label: string; action: MarkdownAction };

const separator: ToolbarItem = { kind: "separator" };

const items: ToolbarItem[] = [
  {
    kind: "action",
    icon: Bold,
    label: "Bold",
    action: { type: "wrap", before: "**", after: "**", placeholder: "bold" },
  },
  {
    kind: "action",
    icon: Italic,
    label: "Italic",
    action: { type: "wrap", before: "_", after: "_", placeholder: "italic" },
  },
  {
    kind: "action",
    icon: Strikethrough,
    label: "Strikethrough",
    action: { type: "wrap", before: "~~", after: "~~", placeholder: "struck" },
  },
  separator,
  {
    kind: "action",
    icon: Heading1,
    label: "Heading 1",
    action: { type: "heading", level: 1 },
  },
  {
    kind: "action",
    icon: Heading2,
    label: "Heading 2",
    action: { type: "heading", level: 2 },
  },
  {
    kind: "action",
    icon: Heading3,
    label: "Heading 3",
    action: { type: "heading", level: 3 },
  },
  separator,
  {
    kind: "action",
    icon: List,
    label: "Bullet list",
    action: { type: "linePrefix", prefix: "- " },
  },
  {
    kind: "action",
    icon: ListOrdered,
    label: "Numbered list",
    action: { type: "linePrefix", prefix: "1. " },
  },
  {
    kind: "action",
    icon: Quote,
    label: "Blockquote",
    action: { type: "linePrefix", prefix: "> " },
  },
  separator,
  {
    kind: "action",
    icon: Code,
    label: "Code block",
    action: { type: "block", snippet: "```\n\n```", caret: 4 },
  },
  {
    kind: "action",
    icon: Link,
    label: "Link",
    action: { type: "wrap", before: "[", after: "](https://)", placeholder: "text" },
  },
  {
    kind: "action",
    icon: Image,
    label: "Image",
    action: { type: "wrap", before: "![", after: "](https://)", placeholder: "alt" },
  },
  {
    kind: "action",
    icon: Minus,
    label: "Divider",
    action: { type: "block", snippet: "---" },
  },
  {
    kind: "action",
    icon: Table,
    label: "Table",
    action: {
      type: "block",
      snippet:
        "| Column | Column |\n| ------ | ------ |\n| Cell   | Cell   |",
    },
  },
];

export function Toolbar({
  onAction,
}: {
  onAction: (action: MarkdownAction) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 overflow-x-auto border-b border-border px-2 py-1.5">
      {items.map((item, index) =>
        item.kind === "separator" ? (
          <div key={index} className="mx-1 h-5 w-px shrink-0 bg-border" />
        ) : (
          <IconButton
            key={index}
            label={item.label}
            onClick={() => onAction(item.action)}
          >
            <item.icon size={16} />
          </IconButton>
        )
      )}
    </div>
  );
}
