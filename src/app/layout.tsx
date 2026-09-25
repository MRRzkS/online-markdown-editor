import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MarkdownPad — Online Markdown Editor",
    template: "%s — MarkdownPad",
  },
  description:
    "A fast, private online Markdown editor with live preview and print-quality PDF, HTML, and Markdown export.",
  keywords: [
    "online markdown editor",
    "markdown live preview",
    "markdown to pdf",
    "markdown editor",
    "markdown export",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
