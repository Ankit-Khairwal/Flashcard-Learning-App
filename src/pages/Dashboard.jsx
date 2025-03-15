import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { darkMode } = useTheme();

  // Sample flashcard sets
  const flashcardSets = [
    {
      id: 1,
      title: "General Knowledge",
      description: "Test your knowledge on various general topics",
      cardCount: 5,
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Mathematics",
      description: "Practice basic math problems and equations",
      cardCount: 10,
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "Science",
      description: "Learn about scientific concepts and theories",
      cardCount: 8,
      difficulty: "Easy",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleStartSession = () => {
    navigate("/flashcards");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
      }}
    >
      <header className="shadow" style={{ backgroundColor: "var(--card-bg)" }}>
        <div className="container flex justify-between items-center py-4">
          <h1
            className="text-primary"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--primary-color)",
            }}
          >
            Flashcard App
          </h1>
          <button
            onClick={handleLogout}
            className="btn"
            style={{ backgroundColor: "#dc3545", color: "white" }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container py-4">
        <div className="my-4">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "var(--text-color)",
            }}
          >
            Welcome, {user?.name || "User"}
          </h2>
          <p style={{ color: "var(--text-color)" }}>
            Select a flashcard set below to start studying or create your own
            custom set.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {flashcardSets.map((set) => (
            <div
              key={set.id}
              className="card"
              style={{
                backgroundColor: "var(--card-bg)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: darkMode
                  ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                  : "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid var(--border-color)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "var(--text-color)",
                }}
              >
                {set.title}
              </h3>
              <p
                style={{
                  marginBottom: "1rem",
                  color: "var(--text-color)",
                }}
              >
                {set.description}
              </p>
              <div
                className="flex justify-between"
                style={{ marginBottom: "1rem", fontSize: "0.875rem" }}
              >
                <span style={{ color: "var(--text-color)" }}>
                  {set.cardCount} cards
                </span>
                <span
                  style={{
                    fontWeight: "500",
                    color:
                      set.difficulty === "Easy"
                        ? "#22c55e"
                        : set.difficulty === "Medium"
                        ? "#eab308"
                        : "#ef4444",
                  }}
                >
                  {set.difficulty}
                </span>
              </div>
              <button
                onClick={handleStartSession}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                }}
              >
                Start Session
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
