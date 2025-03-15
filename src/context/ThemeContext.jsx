import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has previously set a preference
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      return savedTheme === "true";
    }
    // Otherwise check for system preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem("darkMode", darkMode);

    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.style.setProperty("--bg-color", "#121212");
      document.documentElement.style.setProperty("--text-color", "#e0e0e0");
      document.documentElement.style.setProperty("--card-bg", "#1e1e1e");
      document.documentElement.style.setProperty("--border-color", "#333");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.style.setProperty("--bg-color", "#f8f9fa");
      document.documentElement.style.setProperty("--text-color", "#213547");
      document.documentElement.style.setProperty("--card-bg", "white");
      document.documentElement.style.setProperty("--border-color", "#e5e7eb");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
