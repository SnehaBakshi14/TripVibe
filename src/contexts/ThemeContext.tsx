import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'minimalist',
  setTheme: () => {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('tripvibe-theme') as Theme | null;
    return savedTheme || 'minimalist';
  });

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('tripvibe-theme', theme);
    
    // Update the body class for the theme
    const body = document.body;
    body.classList.remove('theme-minimalist', 'theme-colorful', 'theme-retro', 'theme-dark');
    body.classList.add(`theme-${theme}`);
    
    // Set data attribute for theme on the html element
    document.documentElement.setAttribute('data-theme', theme);
    
    // For dark mode compatibility with system preferences
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDarkMode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};