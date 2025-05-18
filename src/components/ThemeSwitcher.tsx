import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, Moon, Sun, Sparkles } from 'lucide-react';

type ThemeOption = {
  id: 'minimalist' | 'colorful' | 'retro' | 'dark';
  label: string;
  icon: React.ReactNode;
  colors: {
    bg: string;
    text: string;
    accent: string;
  };
};

const themeOptions: ThemeOption[] = [
  {
    id: 'minimalist',
    label: 'Minimalist',
    icon: <Sun size={20} />,
    colors: {
      bg: 'bg-minimalist-background',
      text: 'text-minimalist-primary',
      accent: 'bg-minimalist-accent',
    },
  },
  {
    id: 'colorful',
    label: 'Colorful',
    icon: <Palette size={20} />,
    colors: {
      bg: 'bg-colorful-background',
      text: 'text-colorful-primary',
      accent: 'bg-colorful-accent',
    },
  },
  {
    id: 'retro',
    label: 'Retro',
    icon: <Sparkles size={20} />,
    colors: {
      bg: 'bg-retro-background',
      text: 'text-retro-primary',
      accent: 'bg-retro-accent',
    },
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: <Moon size={20} />,
    colors: {
      bg: 'bg-dark-background',
      text: 'text-dark-primary',
      accent: 'bg-dark-accent',
    },
  },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current theme option
  const currentTheme = themeOptions.find(option => option.id === theme) || themeOptions[0];

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                   hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-label="Change theme"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {currentTheme.icon}
        </div>
        <span className="text-sm font-medium hidden sm:inline">
          {currentTheme.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden
                      border-2 animate-fadeIn">
          <div className="py-2 max-h-96 overflow-auto">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                className={`w-full text-left px-4 py-3 flex items-center gap-3
                           ${option.id === theme ? 'bg-opacity-10' : 'hover:bg-opacity-5'} 
                           transition-colors duration-150`}
                onClick={() => {
                  setTheme(option.id);
                  setIsOpen(false);
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                               border-2 ${option.id === theme ? 'border-current' : 'border-transparent'}`}>
                  {option.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
                {option.id === theme && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-current"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;