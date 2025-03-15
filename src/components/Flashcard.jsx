import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

const DIFFICULTY_COLORS = {
  [DIFFICULTY_LEVELS.EASY]: "#22c55e",
  [DIFFICULTY_LEVELS.MEDIUM]: "#eab308",
  [DIFFICULTY_LEVELS.HARD]: "#ef4444",
};

const DIFFICULTY_LABELS = {
  [DIFFICULTY_LEVELS.EASY]: "Easy",
  [DIFFICULTY_LEVELS.MEDIUM]: "Medium",
  [DIFFICULTY_LEVELS.HARD]: "Hard",
};

const Flashcard = ({
  flashcard,
  onAnswer,
  onSkip,
  isLastCard,
  onDifficultyChange,
}) => {
  const [userGuess, setUserGuess] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState(
    DIFFICULTY_LEVELS.EASY
  );
  const { darkMode } = useTheme();

  // Reset state when flashcard or difficulty changes
  useEffect(() => {
    setUserGuess("");
    setHasAnswered(false);
    setFeedback(null);
    setShowAnswer(false);
    setShowHint(false);
    setRevealStage(0);
  }, [flashcard, currentDifficulty]);

  const handleDifficultyChange = (difficulty) => {
    setCurrentDifficulty(difficulty);
    if (onDifficultyChange) {
      onDifficultyChange(difficulty);
    }
  };

  const normalizeAnswer = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.,!?;:'"]/g, "")
      .replace(/\s+/g, " ");
  };

  const checkAnswer = () => {
    if (!userGuess.trim()) {
      return;
    }

    const normalizedUserGuess = normalizeAnswer(userGuess);
    const normalizedCorrectAnswer = normalizeAnswer(flashcard.answer);
    const isCorrect = normalizedUserGuess === normalizedCorrectAnswer;

    setFeedback({
      isCorrect,
      message: isCorrect
        ? "Correct! Well done!"
        : `Incorrect. The correct answer is: ${flashcard.answer}`,
    });
    setHasAnswered(true);
    setShowAnswer(true);

    // Delay moving to next card to show feedback
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const handleSkip = () => {
    if (!hasAnswered) {
      setFeedback({
        isCorrect: false,
        message: `Skipped. The correct answer was: ${flashcard.answer}`,
      });
      setHasAnswered(true);
      setShowAnswer(true);

      // Delay moving to next card to show feedback
      setTimeout(() => {
        onSkip();
      }, 1500);
    }
  };

  const getHint = () => {
    const answer = flashcard.answer;
    const words = answer.split(" ");

    switch (currentDifficulty) {
      case DIFFICULTY_LEVELS.EASY:
        // More helpful hints for easy mode
        if (revealStage === 0) return `First letter: ${answer[0]}`;
        if (revealStage === 1) return `Length: ${answer.length} characters`;
        if (revealStage === 2) return `Number of words: ${words.length}`;
        if (revealStage === 3) return `First word: ${words[0]}`;
        return answer;

      case DIFFICULTY_LEVELS.MEDIUM:
        // Less revealing hints for medium mode
        if (revealStage === 0) return `First letter: ${answer[0]}`;
        if (revealStage === 1) return `Length: ${answer.length} characters`;
        if (revealStage === 2) return `Number of words: ${words.length}`;
        if (revealStage === 3)
          return `First and last letters: ${answer[0]}...${
            answer[answer.length - 1]
          }`;
        return answer;

      case DIFFICULTY_LEVELS.HARD:
        // Minimal hints for hard mode
        if (revealStage === 0) return `Length: ${answer.length} characters`;
        if (revealStage === 1) return `Number of words: ${words.length}`;
        if (revealStage === 2) return `First letter: ${answer[0]}`;
        if (revealStage === 3)
          return `Last letter: ${answer[answer.length - 1]}`;
        return answer;
    }
  };

  const handleRevealMore = () => {
    if (revealStage < 4) {
      setRevealStage(revealStage + 1);
      setShowHint(true);
    } else {
      setShowAnswer(true);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Difficulty Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {Object.values(DIFFICULTY_LEVELS).map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => handleDifficultyChange(difficulty)}
            style={{
              backgroundColor:
                currentDifficulty === difficulty
                  ? DIFFICULTY_COLORS[difficulty]
                  : "var(--card-bg)",
              color:
                currentDifficulty === difficulty
                  ? "white"
                  : "var(--text-color)",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              border: `2px solid ${DIFFICULTY_COLORS[difficulty]}`,
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            {DIFFICULTY_LABELS[difficulty]}
          </button>
        ))}
      </div>

      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        {/* Question Card */}
        <div
          style={{
            flex: "1",
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
              padding: "1rem",
              backgroundColor: DIFFICULTY_COLORS[currentDifficulty],
              color: "white",
              fontSize: "0.875rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {DIFFICULTY_LABELS[currentDifficulty]} Level Question
          </div>

          <div
            style={{
              padding: "2rem",
              backgroundColor: "var(--card-bg)",
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
              Question:
            </h2>
            <p
              style={{
                color: "var(--text-color)",
                fontSize: "1.125rem",
              }}
            >
              {flashcard.question}
            </p>
          </div>

          {!hasAnswered && (
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
                onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <button
                  onClick={checkAnswer}
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    flex: "1",
                  }}
                >
                  Check Answer
                </button>
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
            </div>
          )}

          {feedback && (
            <div
              style={{
                padding: "1rem",
                borderTop: "1px solid var(--border-color)",
                backgroundColor: feedback.isCorrect
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
                color: feedback.isCorrect ? "#22c55e" : "#ef4444",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {feedback.message}
              {isLastCard && hasAnswered && (
                <div style={{ marginTop: "1rem" }}>
                  <p
                    style={{
                      color: "var(--text-color)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    This is the last question.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div
          style={{
            flex: "1",
            backgroundColor: "var(--card-bg)",
            borderRadius: "0.75rem",
            boxShadow: darkMode
              ? "0 4px 6px rgba(0, 0, 0, 0.3)"
              : "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: DIFFICULTY_COLORS[currentDifficulty],
              color: "white",
              fontSize: "0.875rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Available Hints:{" "}
            {currentDifficulty === DIFFICULTY_LEVELS.EASY
              ? "4"
              : currentDifficulty === DIFFICULTY_LEVELS.MEDIUM
              ? "3"
              : "2"}
          </div>

          <div
            style={{
              padding: "2rem",
              backgroundColor: "var(--card-bg)",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Help Section
              {!hasAnswered && (
                <button
                  onClick={handleRevealMore}
                  style={{
                    backgroundColor: DIFFICULTY_COLORS[currentDifficulty],
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  {showAnswer ? "Answer Revealed" : "Need Help?"}
                </button>
              )}
            </h2>

            {!hasAnswered && (showHint || showAnswer) && (
              <div
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "var(--card-bg-alt)",
                  borderRadius: "0.5rem",
                  border: `1px solid ${DIFFICULTY_COLORS[currentDifficulty]}`,
                }}
              >
                <p
                  style={{
                    color: "var(--text-color)",
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Hint {revealStage + 1}/
                  {currentDifficulty === DIFFICULTY_LEVELS.EASY
                    ? "5"
                    : currentDifficulty === DIFFICULTY_LEVELS.MEDIUM
                    ? "4"
                    : "3"}
                  :
                </p>
                <p
                  style={{
                    color: DIFFICULTY_COLORS[currentDifficulty],
                    fontSize: "1.125rem",
                    fontWeight: "500",
                  }}
                >
                  {getHint()}
                </p>
              </div>
            )}

            {(showAnswer || hasAnswered) && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderRadius: "0.5rem",
                  border: "1px solid #22c55e",
                }}
              >
                <p
                  style={{
                    color: "#22c55e",
                    fontSize: "1.125rem",
                    fontWeight: "500",
                  }}
                >
                  Answer: {flashcard.answer}
                </p>
              </div>
            )}

            {!hasAnswered && !showAnswer && (
              <div
                style={{
                  marginTop: "1rem",
                  color: "var(--text-color)",
                  fontSize: "0.875rem",
                  textAlign: "center",
                }}
              >
                <p>
                  Need help? Click the button above to reveal hints step by
                  step.
                </p>
                <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
                  Each hint will give you more information about the answer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
