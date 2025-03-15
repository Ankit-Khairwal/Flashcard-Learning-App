import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show navbar on login or signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "var(--primary-color)",
        color: "white",
        boxShadow: darkMode
          ? "0 2px 8px rgba(0, 0, 0, 0.5)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            Flashcard App
          </Link>

          {user && (
            <div className="flex" style={{ marginLeft: "2rem" }}>
              <Link
                to="/dashboard"
                className="px-4"
                style={{
                  color: "white",
                  textDecoration: "none",
                  borderBottom:
                    location.pathname === "/dashboard"
                      ? "2px solid white"
                      : "none",
                }}
              >
                {/* Dashboard
              </Link>
              <Link
                to="/flashcards"
                className="px-4"
                style={{
                  color: "white",
                  textDecoration: "none",
                  borderBottom:
                    location.pathname === "/flashcards"
                      ? "2px solid white"
                      : "none",
                }}
              > */}
                Study
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <ThemeToggle />

          <div style={{ marginLeft: "1rem" }}>
            {user ? (
              <div className="flex items-center">
                <span style={{ marginRight: "1rem" }}>
                  Hello, {user.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="btn"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    marginRight: "0.5rem",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn"
                  style={{
                    backgroundColor: "white",
                    color: "var(--primary-color)",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
