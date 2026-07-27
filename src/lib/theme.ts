export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "markdownpad-theme";
export const DEFAULT_THEME: Theme = "dark";

/**
 * The `<html>` class list is the source of truth for the theme: an inline
 * script applies it before first paint, and React subscribes to it rather than
 * keeping a second copy in state that could disagree with what is on screen.
 */
const listeners = new Set<() => void>();

export function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTheme(): Theme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

export function getServerTheme(): Theme {
  return DEFAULT_THEME;
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing modes can reject writes; the theme still applies.
  }

  listeners.forEach((listener) => listener());
}

/** Runs before first paint so a reload never flashes the wrong palette. */
export const THEME_INIT_SCRIPT = `
(function () {
  var fallback = ${JSON.stringify(DEFAULT_THEME)};
  var theme = fallback;
  try {
    theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}) === "light" ? "light" : fallback;
  } catch (error) {}
  document.documentElement.classList.add(theme);
})();
`;
