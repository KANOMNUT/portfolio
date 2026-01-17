import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme-preference';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    } else {
      // Check system preference if no stored theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    setIsLoaded(true);
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    // Apply theme class to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Store in localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isLoaded,
  };
};
