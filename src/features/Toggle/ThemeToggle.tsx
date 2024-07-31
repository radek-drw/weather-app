import React from 'react';
import { useTheme } from '../../ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import Toggle from './Toggle';

interface ThemeContextType {
  toggleTheme: () => void;
  theme: string;
}

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme } = useTheme() as ThemeContextType;

  const isLight = theme === 'dark';

  return (
    <Toggle
      isToggled={!isLight}
      onClick={toggleTheme}
      Icon1={FaSun}
      Icon2={FaMoon}
      ariaLabel="Toggle theme"
      testId="theme-toggle"
    />
  );
};

export default ThemeToggle;
