import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simple validation
      if (!email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Firebase registration
      await register(email, password, name);
      showSuccess("Account created successfully! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      // Handle Firebase specific errors
      let errorMessage = "Registration failed. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please login instead.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 fade-in"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6f0ff, #ffffff)",
      }}
    >
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="p-4">
          <div className="text-center my-4">
            <h1 className="text-primary">Sign Up</h1>
            <p>Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                disabled={loading}
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                opacity: loading ? "0.7" : "1",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "42px",
              }}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center my-4">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
