import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flashcard from "./Flashcard";
import Timer from "./Timer";
import Summary from "./Summary";
import { flashcards, localStorageKeys } from "../data/flashcards";
import { useTheme } from "../context/ThemeContext";

const SESSION_TIME = 600; // 10 minutes in seconds

const FlashcardApp = () => {
  const navigate = useNavigate();
  const { darkMode: _ } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem(
      localStorageKeys.CURRENT_CARD_INDEX
    );
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [correctAnswers, setCorrectAnswers] = useState(() => {
    const saved = localStorage.getItem(localStorageKeys.CORRECT_ANSWERS);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState(() => {
    const saved = localStorage.getItem(localStorageKeys.INCORRECT_ANSWERS);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [unattemptedCards, setUnattemptedCards] = useState(() => {
    const saved = localStorage.getItem(localStorageKeys.UNATTEMPTED_CARDS);
    return saved ? parseInt(saved, 10) : flashcards.length;
  });

  const [isSessionComplete, setIsSessionComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.CURRENT_CARD_INDEX,
      currentIndex.toString()
    );
    localStorage.setItem(
      localStorageKeys.CORRECT_ANSWERS,
      correctAnswers.toString()
    );
    localStorage.setItem(
      localStorageKeys.INCORRECT_ANSWERS,
      incorrectAnswers.toString()
    );
    localStorage.setItem(
      localStorageKeys.UNATTEMPTED_CARDS,
      unattemptedCards.toString()
    );
  }, [currentIndex, correctAnswers, incorrectAnswers, unattemptedCards]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }
    setUnattemptedCards((prev) => prev - 1);
    moveToNextCard();
  };

  const handleSkip = () => {
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      endSession();
    }
  };

  const endSession = () => {
    setIsSessionComplete(true);
  };

  const resetSession = () => {
    localStorage.removeItem(localStorageKeys.CURRENT_CARD_INDEX);
    localStorage.removeItem(localStorageKeys.CORRECT_ANSWERS);
    localStorage.removeItem(localStorageKeys.INCORRECT_ANSWERS);
    localStorage.removeItem(localStorageKeys.UNATTEMPTED_CARDS);
    localStorage.removeItem(localStorageKeys.TIMER);

    setCurrentIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setUnattemptedCards(flashcards.length);
    setIsSessionComplete(false);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (isSessionComplete) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-color)",
          padding: "1.5rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <button
            onClick={handleBackToDashboard}
            style={{
              marginBottom: "1.5rem",
              backgroundColor: "var(--secondary-color)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "background-color 0.3s",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </button>

          <Summary
            totalCards={flashcards.length}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            unattemptedCards={unattemptedCards}
            onRestart={resetSession}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        padding: "1.5rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={handleBackToDashboard}
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              transition: "background-color 0.3s",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </button>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--primary-color)",
            }}
          >
            Flashcard Session
          </h1>
        </div>

        <Timer initialTime={SESSION_TIME} onTimeEnd={endSession} />

        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-color)",
            }}
          >
            Progress: {currentIndex + 1} / {flashcards.length}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <p style={{ color: "#22c55e" }}>Correct: {correctAnswers}</p>
            <p style={{ color: "#ef4444" }}>Incorrect: {incorrectAnswers}</p>
            <p style={{ color: "var(--text-secondary)" }}>
              Remaining: {unattemptedCards}
            </p>
          </div>
        </div>

        <Flashcard
          flashcard={flashcards[currentIndex]}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            gap: "1rem",
          }}
        >
          <button
            onClick={() =>
              currentIndex > 0 && setCurrentIndex((prev) => prev - 1)
            }
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              opacity: currentIndex === 0 ? "0.5" : "1",
              transition: "background-color 0.3s",
              border: "none",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            }}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={moveToNextCard}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              opacity: currentIndex === flashcards.length - 1 ? "0.5" : "1",
              transition: "background-color 0.3s",
              border: "none",
              cursor:
                currentIndex === flashcards.length - 1
                  ? "not-allowed"
                  : "pointer",
            }}
            disabled={currentIndex === flashcards.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;
