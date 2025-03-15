import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
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
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      // Firebase authentication
      await login(email, password);
      showSuccess("Login successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      // Handle Firebase specific errors
      let errorMessage = "Login failed. Please try again.";

      if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed login attempts. Please try again later.";
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
            <h1 className="text-primary">Login</h1>
            <p>Welcome back! Please login to your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
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
                autoComplete="current-password"
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
                "Login"
              )}
            </button>
          </form>

          <div className="text-center my-4">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
