import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import Timer from "./Timer";
import Summary from "./Summary";
import { flashcards } from "./flashcards";

const SESSION_TIME = 600; // 10 minutes in seconds

const SUBJECTS = {
  MATHEMATICS: {
    name: "Mathematics",
    icon: "✖️",
    description: "Practice mathematical concepts and problem-solving",
    color: "#4C51BF",
    gradient: "linear-gradient(135deg, #4C51BF, #6B46C1)",
  },
  SCIENCE: {
    name: "Science",
    icon: "🔬",
    description: "Explore scientific principles and theories",
    color: "#38A169",
    gradient: "linear-gradient(135deg, #38A169, #2F855A)",
  },
  HISTORY: {
    name: "History",
    icon: "📚",
    description: "Learn about important historical events",
    color: "#C53030",
    gradient: "linear-gradient(135deg, #C53030, #9B2C2C)",
  },
  GEOGRAPHY: {
    name: "Geography",
    icon: "🌍",
    description: "Discover places and geographical concepts",
    color: "#2B6CB0",
    gradient: "linear-gradient(135deg, #2B6CB0, #2C5282)",
  },
  GENERAL_KNOWLEDGE: {
    name: "General Knowledge",
    icon: "🧠",
    description: "Test your knowledge across various topics",
    color: "#6B46C1",
    gradient: "linear-gradient(135deg, #6B46C1, #553C9A)",
  },
};

// Create a reusable Navbar component
const Navbar = ({
  onDashboardClick,
  showBackButton = false,
  currentSubject = null,
  currentDifficulty = "",
  currentIndex = 0,
  totalCards = 0,
}) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0 1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #4C51BF, #6B46C1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: "white",
            boxShadow: "0 4px 10px rgba(76, 81, 191, 0.3)",
          }}
        >
          📚
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--text-color)",
            margin: 0,
          }}
        >
          FlashCards
          <span
            style={{
              background: "linear-gradient(90deg, #4C51BF, #6B46C1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "0.25rem",
            }}
          >
            Pro
          </span>
        </h2>
      </div>

      {currentSubject && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginLeft: "1rem",
            marginRight: "auto",
            background: `${SUBJECTS[currentSubject].color}10`,
            padding: "0.5rem 1rem",
            borderRadius: "1rem",
            border: `1px solid ${SUBJECTS[currentSubject].color}20`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
              }}
            >
              {SUBJECTS[currentSubject].icon}
            </span>
            <span
              style={{
                fontWeight: "600",
                color: SUBJECTS[currentSubject].color,
              }}
            >
              {SUBJECTS[currentSubject].name}
            </span>
          </div>
          {totalCards > 0 && (
            <>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                {currentIndex + 1} / {totalCards}
              </span>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                }}
              >
                {currentDifficulty.charAt(0).toUpperCase() +
                  currentDifficulty.slice(1)}
              </span>
            </>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {showBackButton && (
          <button
            onClick={onDashboardClick}
            style={{
              background: "var(--card-bg)",
              color: "var(--text-muted)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--bg-color)";
              e.currentTarget.style.color = "#4C51BF";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "var(--card-bg)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🏠</span>
            Dashboard
          </button>
        )}
        <button
          style={{
            background: "var(--card-bg)",
            color: "var(--text-muted)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>🌙</span>
          Theme
        </button>
        <button
          style={{
            background: "var(--card-bg)",
            color: "var(--text-muted)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>👤</span>
          Profile
        </button>
      </div>
    </header>
  );
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
          backgroundImage:
            "radial-gradient(circle at 10% 20%, var(--bg-color) 0%, var(--card-bg) 90%)",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4C51BF15, #4C51BF05)",
            filter: "blur(60px)",
            zIndex: "0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #38A16915, #38A16905)",
            filter: "blur(70px)",
            zIndex: "0",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "15%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C5303015, #C5303005)",
            filter: "blur(50px)",
            zIndex: "0",
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            padding: "2rem",
            position: "relative",
            zIndex: "1",
          }}
        >
          {/* Use the Navbar component */}
          <Navbar />

          {/* Hero Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "5rem",
              position: "relative",
              padding: "0 1rem",
            }}
          >
            <div
              style={{
                fontSize: "4.5rem",
                marginBottom: "1.5rem",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <span>📚</span>
              <span>🧠</span>
              <span>✏️</span>
            </div>

            <h1
              style={{
                fontSize: "5rem",
                fontWeight: "800",
                color: "var(--text-color)",
                marginBottom: "1.5rem",
                textAlign: "center",
                lineHeight: "1.1",
              }}
            >
              Master Any Subject
              <div
                style={{
                  background: "linear-gradient(90deg, #4C51BF, #6B46C1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  marginLeft: "0.5rem",
                }}
              >
                Faster
              </div>
            </h1>

            <p
              style={{
                fontSize: "1.35rem",
                color: "var(--text-muted)",
                maxWidth: "750px",
                margin: "0 auto 3.5rem",
                lineHeight: "1.7",
                textAlign: "center",
              }}
            >
              Boost your knowledge with our interactive flashcards. Choose from
              multiple subjects, track your progress, and master new concepts at
              your own pace.
            </p>

            <button
              onClick={() => setShowDashboard(false)}
              style={{
                background: "linear-gradient(90deg, #4C51BF, #6B46C1)",
                color: "white",
                padding: "1.5rem 3.5rem",
                borderRadius: "1.25rem",
                border: "none",
                fontSize: "1.35rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px rgba(76, 81, 191, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(76, 81, 191, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(76, 81, 191, 0.3)";
              }}
            >
              Start Learning Now
              <span style={{ fontSize: "1.5rem" }}>→</span>
            </button>
          </div>

          {/* Features Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2.5rem",
              marginBottom: "5rem",
              flexWrap: "wrap",
              padding: "0 1rem",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Focused Learning",
                description:
                  "Subject-specific flashcards to target your studies exactly where you need them most",
                color: "#4C51BF",
              },
              {
                icon: "⏱️",
                title: "Timed Sessions",
                description:
                  "Track your speed and improve with each session to optimize your study time",
                color: "#38A169",
              },
              {
                icon: "📊",
                title: "Progress Tracking",
                description:
                  "See your results and focus on areas to improve with detailed performance metrics",
                color: "#C53030",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  width: "320px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "var(--border-color)";
                }}
              >
                {/* Background decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: `${feature.color}08`,
                    zIndex: "0",
                  }}
                />

                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "1.25rem",
                    background: `${feature.color}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    marginBottom: "1.75rem",
                    position: "relative",
                    zIndex: "1",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--text-color)",
                    marginBottom: "1rem",
                    position: "relative",
                    zIndex: "1",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    position: "relative",
                    zIndex: "1",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Subjects Section */}
          <div
            style={{
              padding: "3rem",
              borderRadius: "2rem",
              background: "var(--card-bg)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.05)",
              border: "1px solid var(--border-color)",
              marginBottom: "3rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                color: "var(--text-color)",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Available Subjects
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                textAlign: "center",
                maxWidth: "700px",
                margin: "0 auto 3rem",
                lineHeight: "1.6",
              }}
            >
              Choose from our curated collection of subjects and start mastering
              new concepts today
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {Object.entries(SUBJECTS).map(([key, subject]) => (
                <div
                  key={key}
                  onClick={() => {
                    setShowDashboard(false);
                    initializeSession(key);
                  }}
                  style={{
                    background: "var(--bg-color)",
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: `2px solid ${subject.color}20`,
                    boxShadow: `0 10px 20px ${subject.color}05`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 15px 30px ${subject.color}15`;
                    e.currentTarget.style.borderColor = `${subject.color}40`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 10px 20px ${subject.color}05`;
                    e.currentTarget.style.borderColor = `${subject.color}20`;
                  }}
                >
                  {/* Background decoration */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-30px",
                      right: "-30px",
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      background: `${subject.color}10`,
                      zIndex: "0",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: "1",
                    }}
                  >
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "1.25rem",
                        background: subject.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        marginBottom: "1.5rem",
                        boxShadow: `0 8px 16px ${subject.color}20`,
                        color: "white",
                      }}
                    >
                      {subject.icon}
                    </div>

                    <h3
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: "700",
                        color: "var(--text-color)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {subject.name}
                    </h3>

                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.95rem",
                        marginBottom: "1.5rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {subject.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: `${subject.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8rem",
                          }}
                        >
                          📝
                        </span>
                        <span
                          style={{
                            color: subject.color,
                            fontSize: "0.95rem",
                            fontWeight: "600",
                          }}
                        >
                          {flashcards[key]?.easy?.length || 0} questions
                        </span>
                      </div>

                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: `${subject.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: subject.color,
                          fontSize: "1.25rem",
                          transition: "all 0.3s ease",
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer
            style={{
              textAlign: "center",
              padding: "2rem 0",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
            }}
          >
            <p>© 2023 FlashCards Pro. All rights reserved.</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Terms
              </a>
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Privacy
              </a>
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Help
              </a>
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Contact
              </a>
            </div>
          </footer>
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
          backgroundImage:
            "radial-gradient(circle at 10% 20%, var(--bg-color) 0%, var(--card-bg) 90%)",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4C51BF15, #4C51BF05)",
            filter: "blur(60px)",
            zIndex: "0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #38A16915, #38A16905)",
            filter: "blur(70px)",
            zIndex: "0",
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            padding: "2rem",
            position: "relative",
            zIndex: "1",
          }}
        >
          {/* Use the Navbar component */}
          <Navbar
            showBackButton={true}
            onDashboardClick={() => setShowDashboard(true)}
          />

          {/* Main Content */}
          <div
            style={{
              padding: "3rem",
              borderRadius: "2rem",
              background: "var(--card-bg)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.05)",
              border: "1px solid var(--border-color)",
              marginBottom: "3rem",
            }}
          >
            <h1
              style={{
                fontSize: "2.75rem",
                fontWeight: "800",
                color: "var(--text-color)",
                textAlign: "center",
                marginBottom: "0.5rem",
                background: "linear-gradient(90deg, #4C51BF, #6B46C1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Choose Your Study Subject
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                textAlign: "center",
                maxWidth: "700px",
                margin: "0 auto 3rem",
                lineHeight: "1.6",
              }}
            >
              Select a subject below to start your personalized flashcard
              session
            </p>

            {/* Difficulty Selector */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "3rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "var(--bg-color)",
                  borderRadius: "1rem",
                  padding: "0.5rem",
                  border: "1px solid var(--border-color)",
                }}
              >
                {["easy", "medium", "hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setCurrentDifficulty(difficulty)}
                    style={{
                      padding: "0.75rem 1.5rem",
                      borderRadius: "0.75rem",
                      border: "none",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      background:
                        currentDifficulty === difficulty
                          ? "linear-gradient(90deg, #4C51BF, #6B46C1)"
                          : "transparent",
                      color:
                        currentDifficulty === difficulty
                          ? "white"
                          : "var(--text-muted)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {Object.entries(SUBJECTS).map(([key, subject]) => (
                <div
                  key={key}
                  onClick={() => initializeSession(key)}
                  style={{
                    background: "var(--bg-color)",
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: `2px solid ${subject.color}20`,
                    boxShadow: `0 10px 20px ${subject.color}05`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 15px 30px ${subject.color}15`;
                    e.currentTarget.style.borderColor = `${subject.color}40`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 10px 20px ${subject.color}05`;
                    e.currentTarget.style.borderColor = `${subject.color}20`;
                  }}
                >
                  {/* Background decoration */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-30px",
                      right: "-30px",
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      background: `${subject.color}10`,
                      zIndex: "0",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: "1",
                    }}
                  >
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "1.25rem",
                        background: subject.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        marginBottom: "1.5rem",
                        boxShadow: `0 8px 16px ${subject.color}20`,
                        color: "white",
                      }}
                    >
                      {subject.icon}
                    </div>

                    <h3
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: "700",
                        color: "var(--text-color)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {subject.name}
                    </h3>

                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.95rem",
                        marginBottom: "1.5rem",
                        lineHeight: "1.6",
                      }}
                    >
                      {subject.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: `${subject.color}15`,
                            fontSize: "0.8rem",
                          }}
                        >
                          {currentDifficulty === "easy"
                            ? "🟢"
                            : currentDifficulty === "medium"
                            ? "🟠"
                            : "🔴"}
                        </span>
                        <span
                          style={{
                            color: subject.color,
                            fontSize: "0.95rem",
                            fontWeight: "600",
                          }}
                        >
                          {flashcards[key]?.[currentDifficulty]?.length || 0}{" "}
                          questions
                        </span>
                      </div>

                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: subject.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "1.25rem",
                          transition: "all 0.3s ease",
                          boxShadow: `0 4px 8px ${subject.color}30`,
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer
            style={{
              textAlign: "center",
              padding: "2rem 0",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
            }}
          >
            <p>© 2023 FlashCards Pro. All rights reserved.</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Terms
              </a>
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Privacy
              </a>
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Help
              </a>
              <a href="#" style={{ color: "var(--text-muted)" }}>
                Contact
              </a>
            </div>
          </footer>
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
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Use the Navbar component */}
        <Navbar
          showBackButton={true}
          onDashboardClick={() => setShowDashboard(true)}
          currentSubject={currentSubject}
          currentDifficulty={currentDifficulty}
          currentIndex={currentIndex}
          totalCards={currentFlashcards.length}
        />

        {/* Main Content */}
        <div
          style={{
            position: "relative",
            background: "var(--card-bg)",
            borderRadius: "1.5rem",
            padding: "3rem",
            boxShadow: `0 12px 24px ${SUBJECTS[currentSubject].color}10`,
            border: `2px solid ${SUBJECTS[currentSubject].color}20`,
          }}
        >
          {currentFlashcards.length > 0 ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "1rem",
                  background: "var(--bg-color)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <Timer
                  key={`timer-${currentIndex}-${isSessionComplete}`}
                  duration={SESSION_TIME}
                  onTimeUp={endSession}
                  isComplete={isSessionComplete}
                />
              </div>

              <Flashcard
                flashcard={currentFlashcards[currentIndex]}
                onAnswer={handleAnswer}
                onSkip={handleSkip}
                isLastCard={currentIndex === currentFlashcards.length - 1}
                onDifficultyChange={handleDifficultyChange}
              />

              {/* Navigation Controls */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "3rem",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={moveToPreviousCard}
                  style={{
                    backgroundColor: "var(--bg-color)",
                    color: SUBJECTS[currentSubject].color,
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                    border: `2px solid ${SUBJECTS[currentSubject].color}30`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>←</span>
                  {currentIndex === 0 ? "Last Question" : "Previous"}
                </button>

                {currentIndex < currentFlashcards.length - 1 && (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={handleSkip}
                      style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-muted)",
                        padding: "1rem 2rem",
                        borderRadius: "1rem",
                        border: "2px solid var(--border-color)",
                        cursor: "pointer",
                        fontSize: "1rem",
                        fontWeight: "600",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Skip Question
                      <span style={{ fontSize: "1.2rem" }}>⟳</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                }}
              >
                📚
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "var(--text-color)",
                  marginBottom: "0.5rem",
                }}
              >
                No Questions Available
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  maxWidth: "500px",
                  marginBottom: "2rem",
                }}
              >
                There are no questions available for this subject and difficulty
                level. Try selecting a different combination.
              </p>
              <button
                onClick={chooseNewSubject}
                style={{
                  backgroundColor: SUBJECTS[currentSubject].color,
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "1rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  boxShadow: `0 8px 16px ${SUBJECTS[currentSubject].color}30`,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>↩</span>
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
