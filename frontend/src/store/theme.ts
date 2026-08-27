import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: (theme) => {
    localStorage.setItem('flowza-theme', theme);
    const resolved = resolveTheme(theme);
    updateHtmlClass(resolved);
    set({ theme, resolvedTheme: resolved });
  },
  initialize: () => {
    const savedTheme = (localStorage.getItem('flowza-theme') as Theme);
    // Strict light mode default: only activate dark if explicitly set to 'dark' by user
    const initialTheme: Theme = savedTheme === 'dark' ? 'dark' : 'light';
    const resolved = resolveTheme(initialTheme);
    updateHtmlClass(resolved);
    set({ theme: initialTheme, resolvedTheme: resolved });
  },
}));

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'dark') {
    return 'dark';
  }
  return 'light';
}

function updateHtmlClass(resolvedTheme: 'light' | 'dark') {
  const root = window.document.documentElement;
  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
