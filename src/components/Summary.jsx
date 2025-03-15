import React from "react";
import { useTheme } from "../context/ThemeContext";

const Summary = ({
  totalCards,
  correctAnswers,
  incorrectAnswers,
  unattemptedCards,
  onReset,
  onBackToDashboard,
}) => {
  const { darkMode } = useTheme();

  const calculatePercentage = (value) => {
    return ((value.length / totalCards) * 100).toFixed(1);
  };

  const getGrade = () => {
    const percentage = (correctAnswers.length / totalCards) * 100;
    if (percentage >= 90) return { grade: "A", color: "#22c55e" };
    if (percentage >= 80) return { grade: "B", color: "#84cc16" };
    if (percentage >= 70) return { grade: "C", color: "#eab308" };
    if (percentage >= 60) return { grade: "D", color: "#f97316" };
    return { grade: "F", color: "#ef4444" };
  };

  const { grade, color } = getGrade();

  return (
    <div style={{ padding: "2rem" }}>
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
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--text-color)",
              marginBottom: "0.5rem",
            }}
          >
            Session Complete!
          </h2>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: color,
              marginTop: "1rem",
            }}
          >
            {grade}
          </div>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            {correctAnswers.length} out of {totalCards} correct
          </p>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderRadius: "0.5rem",
                color: "#22c55e",
              }}
            >
              <span>Correct Answers:</span>
              <span style={{ fontWeight: "600" }}>
                {correctAnswers.length} ({calculatePercentage(correctAnswers)}%)
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderRadius: "0.5rem",
                color: "#ef4444",
              }}
            >
              <span>Incorrect Answers:</span>
              <span style={{ fontWeight: "600" }}>
                {incorrectAnswers.length} (
                {calculatePercentage(incorrectAnswers)}%)
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "var(--card-bg-alt)",
                borderRadius: "0.5rem",
                color: "var(--text-color)",
              }}
            >
              <span>Skipped Questions:</span>
              <span style={{ fontWeight: "600" }}>
                {unattemptedCards.length} (
                {calculatePercentage(unattemptedCards)}%)
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onReset}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
            >
              Start New Session
            </button>
            <button
              onClick={onBackToDashboard}
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
