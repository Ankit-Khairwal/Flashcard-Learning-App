import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Flashcard = ({ flashcard, onAnswer, onSkip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const { darkMode } = useTheme();

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleSubmitGuess = (isCorrect) => {
    if (!hasAnswered) {
      onAnswer(isCorrect);
      setHasAnswered(true);
    }
  };

  const handleSkip = () => {
    if (!hasAnswered) {
      onSkip();
      setHasAnswered(true);
    }
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
      }}
    >
      <div
        style={{
          padding: "2rem",
          cursor: "pointer",
          transition: "transform 0.5s",
          transform: isFlipped ? "scale(-1, 1)" : "none",
          backgroundColor: isFlipped ? "var(--card-bg-alt)" : "var(--card-bg)",
        }}
        onClick={handleFlip}
      >
        <div
          style={{
            transition: "transform 0.5s",
            transform: isFlipped ? "scale(-1, 1)" : "none",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "var(--text-color)",
            }}
          >
            {isFlipped ? "Answer:" : "Question:"}
          </h2>
          <p
            style={{
              color: "var(--text-color)",
              fontSize: "1.125rem",
            }}
          >
            {isFlipped ? flashcard.answer : flashcard.question}
          </p>
        </div>
      </div>

      {!isFlipped && !hasAnswered && (
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your answer..."
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid var(--border-color)",
              borderRadius: "0.25rem",
              marginBottom: "0.5rem",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-color)",
            }}
          />
        </div>
      )}

      {isFlipped && !hasAnswered && (
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => handleSubmitGuess(true)}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Correct
          </button>
          <button
            onClick={() => handleSubmitGuess(false)}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Incorrect
          </button>
        </div>
      )}

      {!isFlipped && !hasAnswered && (
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleSkip}
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
