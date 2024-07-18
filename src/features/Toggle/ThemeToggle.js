import React from "react";
import { useTheme } from "../../ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import Toggle from "./Toggle";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();
  const isLight = theme === "dark";

  return (
    <Toggle 
      isToggled={!isLight} 
      onClick={toggleTheme} 
      Icon1={FaSun} 
      Icon2={FaMoon} 
      ariaLabel="Toggle theme" 
    />
  );
};

export default ThemeToggle;
