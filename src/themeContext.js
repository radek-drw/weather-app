import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

// FOR DEFAULT LIGHT MODE WHEN APP OPENS UNCOMMENT 'Default light mode', comment 'Default dark mode' and change 'useState' to 'light'
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // -----Default light mode-----
  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  // -----Default dark mode-----
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
