import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { THEME_STORAGE_KEY, ThemeContext, type Theme } from './theme-context';

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

const subscribe = (onChange: () => void) => {
  systemDark.addEventListener('change', onChange);
  return () => systemDark.removeEventListener('change', onChange);
};

// storage can throw in private mode or with blocked site data
const readTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* fall through to system */
  }
  return 'system';
};

/** Owns the light/dark/system choice and applies it as `.dark` on <html>. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme);
  const prefersDark = useSyncExternalStore(subscribe, () => systemDark.matches);
  const resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* choice still applies for this session */
    }
  };

  return <ThemeContext value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext>;
}
