import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center fade-in"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: darkMode
          ? "linear-gradient(to bottom, #1a1a2e, #121212)"
          : "linear-gradient(to bottom, #e6f0ff, #ffffff)",
        padding: 0,
        margin: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(59, 130, 246, 0.1)"
            : "rgba(59, 130, 246, 0.1)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(34, 197, 94, 0.1)"
            : "rgba(34, 197, 94, 0.1)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        className="card"
        style={{
          maxWidth: "1000px",
          width: "90%",
          zIndex: 1,
          backgroundColor: "var(--card-bg)",
          boxShadow: darkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-4 text-center">
          <h1
            className="text-primary"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Flashcard Learning App
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              marginBottom: "2rem",
              color: "var(--text-color)",
            }}
          >
            Improve your knowledge with our interactive flashcard system. Test
            yourself, track your progress, and learn at your own pace.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ marginTop: "2rem" }}
          >
            <Link
              to="/login"
              className="btn btn-primary"
              style={{
                padding: "0.75rem 1.5rem",
                minWidth: "150px",
                fontSize: "1.1rem",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn"
              style={{
                backgroundColor: "var(--success-color)",
                color: "white",
                padding: "0.75rem 1.5rem",
                minWidth: "150px",
                fontSize: "1.1rem",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div
          style={{
            backgroundColor: darkMode
              ? "rgba(30, 30, 30, 0.5)"
              : "rgba(248, 249, 250, 0.7)",
            padding: "2rem",
            borderTop: `1px solid var(--border-color)`,
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: "var(--text-color)",
              textAlign: "center",
            }}
          >
            Features
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="card" style={{ height: "100%" }}>
              <h3
                className="text-primary"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  role="img"
                  aria-label="Interactive"
                  style={{ marginRight: "0.5rem" }}
                >
                  🔄
                </span>
                Interactive Flashcards
              </h3>
              <p>
                Create custom flashcards, flip them to test your knowledge, and
                track your progress over time.
              </p>
            </div>
            <div className="card" style={{ height: "100%" }}>
              <h3
                className="text-primary"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  role="img"
                  aria-label="Timer"
                  style={{ marginRight: "0.5rem" }}
                >
                  ⏱️
                </span>
                Timed Sessions
              </h3>
              <p>
                Study with timed sessions to improve retention and focus. Set
                your own pace and track improvements.
              </p>
            </div>
            <div className="card" style={{ height: "100%" }}>
              <h3
                className="text-primary"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  role="img"
                  aria-label="Progress"
                  style={{ marginRight: "0.5rem" }}
                >
                  📊
                </span>
                Progress Tracking
              </h3>
              <p>
                Monitor your performance with detailed statistics and
                visualizations of your learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
