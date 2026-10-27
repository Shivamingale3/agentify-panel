import { createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export type ThemeState = {
  /** what the user picked */
  theme: Theme;
  /** what is actually on screen, with `system` resolved */
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

/** Keep in sync with the pre-paint script in index.html. */
export const THEME_STORAGE_KEY = 'agentify-theme';

export const ThemeContext = createContext<ThemeState | null>(null);
