import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        color: darkMode ? "white" : "#333",
        fontSize: "1.25rem",
        padding: 0,
      }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <span role="img" aria-label="Light mode">
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="Dark mode">
          🌙
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
