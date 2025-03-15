import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationContainer from "./components/NotificationContainer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FlashcardApp from "./components/FlashcardApp";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <div
              className="app-container"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />
              <NotificationContainer />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/flashcards"
                    element={
                      <ProtectedRoute>
                        <FlashcardApp />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
