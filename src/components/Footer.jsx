import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-color)",
        borderTop: "1px solid var(--border-color)",
        padding: "2rem 0",
        marginTop: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-color)",
              }}
            >
              Flashcard App
            </h3>
            <p style={{ color: "var(--text-color)" }}>
              Improve your knowledge with our interactive flashcard system.
              Learn at your own pace.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-color)",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/">Home</Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Link to="/flashcards">Study</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-color)",
              }}
            >
              Resources
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#">Help Center</a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#">Study Tips</a>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <a href="#">Contact Support</a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-color)",
              }}
            >
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                style={{ fontSize: "1.5rem", color: "var(--primary-color)" }}
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                style={{ fontSize: "1.5rem", color: "var(--primary-color)" }}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                style={{ fontSize: "1.5rem", color: "var(--primary-color)" }}
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p style={{ marginTop: "1rem", color: "var(--text-color)" }}>
              Subscribe to our newsletter for study tips and updates.
            </p>
            <div className="flex" style={{ marginTop: "0.5rem" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  borderRadius: "0.375rem 0 0 0.375rem",
                  borderRight: "none",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  borderColor: "var(--border-color)",
                }}
              />
              <button
                className="btn btn-primary"
                style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-color)",
            textAlign: "center",
            color: "var(--text-color)",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} Flashcard App. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
