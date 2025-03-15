import React from "react";
import { useTheme } from "../context/ThemeContext";

const Summary = ({
  totalCards,
  correctAnswers,
  incorrectAnswers,
  unattemptedCards,
  onRestart,
}) => {
  const { darkMode } = useTheme();

  const calculatePercentage = (value) => {
    return ((value / totalCards) * 100).toFixed(1);
  };

  return (
    <div
      style={{
        maxWidth: "42rem",
        margin: "0 auto",
        backgroundColor: "var(--card-bg)",
        borderRadius: "0.75rem",
        boxShadow: darkMode
          ? "0 4px 6px rgba(0, 0, 0, 0.3)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        padding: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "var(--text-color)",
        }}
      >
        Session Summary
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "var(--text-color)" }}>Total Cards:</span>
          <span style={{ fontWeight: "600", color: "var(--text-color)" }}>
            {totalCards}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#22c55e",
          }}
        >
          <span>Correct Answers:</span>
          <span style={{ fontWeight: "600" }}>
            {correctAnswers} ({calculatePercentage(correctAnswers)}%)
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#ef4444",
          }}
        >
          <span>Incorrect Answers:</span>
          <span style={{ fontWeight: "600" }}>
            {incorrectAnswers} ({calculatePercentage(incorrectAnswers)}%)
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "var(--text-secondary)",
          }}
        >
          <span>Unattempted Cards:</span>
          <span style={{ fontWeight: "600" }}>
            {unattemptedCards} ({calculatePercentage(unattemptedCards)}%)
          </span>
        </div>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={onRestart}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            padding: "0.5rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Start New Session
        </button>
      </div>
    </div>
  );
};

export default Summary;
