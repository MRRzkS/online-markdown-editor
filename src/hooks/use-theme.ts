"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeToTheme,
  type Theme,
} from "@/lib/theme";

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  const toggleTheme = useCallback(() => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }, []);

  return { theme, toggleTheme };
}
