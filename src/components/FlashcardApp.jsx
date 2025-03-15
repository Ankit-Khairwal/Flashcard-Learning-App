import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import Timer from "./Timer";
import Summary from "./Summary";
import { flashcards } from "../data/flashcards";

const SESSION_TIME = 600; // 10 minutes in seconds

const SUBJECTS = {
  MATHEMATICS: {
    name: "Mathematics",
    icon: "✖️",
    description: "Practice mathematical concepts and problem-solving",
    color: "#4C51BF",
  },
  SCIENCE: {
    name: "Science",
    icon: "🔬",
    description: "Explore scientific principles and theories",
    color: "#38A169",
  },
  HISTORY: {
    name: "History",
    icon: "📚",
    description: "Learn about important historical events",
    color: "#C53030",
  },
  GEOGRAPHY: {
    name: "Geography",
    icon: "🌍",
    description: "Discover places and geographical concepts",
    color: "#2B6CB0",
  },
  GENERAL_KNOWLEDGE: {
    name: "General Knowledge",
    icon: "🧠",
    description: "Test your knowledge across various topics",
    color: "#6B46C1",
  },
};

const FlashcardApp = () => {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [unattemptedCards, setUnattemptedCards] = useState([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  // Get current difficulty's flashcards
  const currentFlashcards = sessionQuestions;

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize session with subject-specific questions
  const initializeSession = (subject) => {
    const subjectQuestions = flashcards[subject]?.[currentDifficulty] || [];
    const randomizedQuestions = shuffleArray(subjectQuestions);
    setSessionQuestions(randomizedQuestions);
    setCurrentSubject(subject);
    setIsSessionStarted(true);
    setCurrentIndex(0);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setUnattemptedCards([]);
    setAnsweredQuestions([]);
    setIsSessionComplete(false);
  };

  // Handle page reload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your progress will be reset.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAnswer = (isCorrect) => {
    const currentCard = currentFlashcards[currentIndex];
    if (isCorrect) {
      setCorrectAnswers([...correctAnswers, currentCard]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentCard]);
    }
    setAnsweredQuestions([
      ...answeredQuestions,
      { index: currentIndex, isCorrect },
    ]);
    moveToNextCard();
  };

  const handleSkip = () => {
    const currentCard = currentFlashcards[currentIndex];
    setUnattemptedCards([...unattemptedCards, currentCard]);
    setAnsweredQuestions([
      ...answeredQuestions,
      { index: currentIndex, skipped: true },
    ]);
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentIndex < currentFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      endSession();
    }
  };

  const moveToPreviousCard = () => {
    if (currentIndex === 0) {
      setCurrentIndex(currentFlashcards.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }

    if (answeredQuestions.length > 0) {
      const lastAnswer = answeredQuestions[answeredQuestions.length - 1];
      if (lastAnswer) {
        if (lastAnswer.skipped) {
          setUnattemptedCards(unattemptedCards.slice(0, -1));
        } else if (lastAnswer.isCorrect) {
          setCorrectAnswers(correctAnswers.slice(0, -1));
        } else {
          setIncorrectAnswers(incorrectAnswers.slice(0, -1));
        }
        setAnsweredQuestions(answeredQuestions.slice(0, -1));
      }
    }
  };

  const endSession = () => {
    setIsSessionComplete(true);
  };

  const resetSession = () => {
    initializeSession(currentSubject);
  };

  const handleDifficultyChange = (difficulty) => {
    setCurrentDifficulty(difficulty);
    if (currentSubject) {
      initializeSession(currentSubject);
    }
  };

  const chooseNewSubject = () => {
    setIsSessionStarted(false);
    setCurrentSubject(null);
  };

  if (showDashboard) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-color)",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "1.5rem",
              padding: "3rem 2rem",
              marginBottom: "3rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                color: "var(--text-color)",
                marginBottom: "1rem",
              }}
            >
              Welcome to FlashCards 📚
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: "1.6",
              }}
            >
              Ready to enhance your knowledge? Choose from our diverse range of
              subjects and start learning with interactive flashcards.
            </p>
            <button
              onClick={() => setShowDashboard(false)}
              style={{
                backgroundColor: "#4C51BF",
                color: "white",
                padding: "1rem 2.5rem",
                borderRadius: "0.75rem",
                border: "none",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 4px 6px rgba(76, 81, 191, 0.2)",
                ":hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 8px rgba(76, 81, 191, 0.3)",
                },
              }}
            >
              Start Studying →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              padding: "1rem",
            }}
          >
            {Object.entries(SUBJECTS).map(([key, subject]) => (
              <div
                key={key}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: `2px solid ${subject.color}20`,
                  boxShadow: `0 4px 6px ${subject.color}10`,
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {subject.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "var(--text-color)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {subject.name}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {subject.description}
                </p>
                <div
                  style={{
                    color: subject.color,
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  {flashcards[key]?.easy?.length || 0} questions available
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isSessionComplete) {
    return (
      <Summary
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        unattemptedCards={unattemptedCards}
        onReset={resetSession}
        onBackToSubjects={chooseNewSubject}
        totalCards={currentFlashcards.length}
        subjectName={SUBJECTS[currentSubject].name}
        subjectIcon={SUBJECTS[currentSubject].icon}
      />
    );
  }

  if (!isSessionStarted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-color)",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "var(--text-color)",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Choose Your Study Subject
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Select a subject to start your flashcard session
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              padding: "1rem",
            }}
          >
            {Object.entries(SUBJECTS).map(([key, subject]) => (
              <button
                key={key}
                onClick={() => initializeSession(key)}
                style={{
                  backgroundColor: "var(--card-bg)",
                  border: `2px solid ${subject.color}20`,
                  borderRadius: "1rem",
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 4px 6px ${subject.color}10`,
                  ":hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 8px 12px ${subject.color}20`,
                    borderColor: subject.color,
                  },
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {subject.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "var(--text-color)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {subject.name}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    lineHeight: "1.4",
                  }}
                >
                  {subject.description}
                </p>
                <div
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.9rem",
                    color: subject.color,
                    fontWeight: "500",
                  }}
                >
                  {flashcards[key]?.easy?.length || 0} questions available
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            background: "var(--card-bg)",
            padding: "1rem 1.5rem",
            borderRadius: "1rem",
            boxShadow: `0 2px 4px ${SUBJECTS[currentSubject].color}20`,
            border: `1px solid ${SUBJECTS[currentSubject].color}20`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "2rem",
              }}
            >
              {SUBJECTS[currentSubject].icon}
            </span>
            <div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "var(--text-color)",
                }}
              >
                {SUBJECTS[currentSubject].name}
              </h2>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                }}
              >
                Difficulty:{" "}
                {currentDifficulty.charAt(0).toUpperCase() +
                  currentDifficulty.slice(1)}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <Timer
              key={`timer-${currentIndex}-${isSessionComplete}`}
              duration={SESSION_TIME}
              onTimeUp={endSession}
              isComplete={isSessionComplete}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  color: "var(--text-color)",
                  fontWeight: "500",
                }}
              >
                Question {currentIndex + 1} of {currentFlashcards.length}
              </span>
              <button
                onClick={chooseNewSubject}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-muted)",
                  padding: "0.25rem 0",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                }}
              >
                Choose New Subject
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            background: "var(--card-bg)",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: `0 4px 6px ${SUBJECTS[currentSubject].color}10`,
            border: `1px solid ${SUBJECTS[currentSubject].color}20`,
          }}
        >
          {currentFlashcards.length > 0 ? (
            <>
              <Flashcard
                flashcard={currentFlashcards[currentIndex]}
                onAnswer={handleAnswer}
                onSkip={handleSkip}
                isLastCard={currentIndex === currentFlashcards.length - 1}
                onDifficultyChange={handleDifficultyChange}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={moveToPreviousCard}
                  style={{
                    backgroundColor: SUBJECTS[currentSubject].color,
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>←</span>
                  {currentIndex === 0
                    ? "Go to Last Question"
                    : "Previous Question"}
                </button>
                {currentIndex < currentFlashcards.length - 1 && (
                  <button
                    onClick={handleSkip}
                    style={{
                      backgroundColor: SUBJECTS[currentSubject].color + "90",
                      color: "white",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Skip Question
                  </button>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "3rem",
                fontSize: "1.1rem",
              }}
            >
              No questions available for this subject and difficulty level.
              <button
                onClick={chooseNewSubject}
                style={{
                  display: "block",
                  margin: "1rem auto 0",
                  padding: "0.5rem 1rem",
                  backgroundColor: SUBJECTS[currentSubject].color,
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Choose Another Subject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;
