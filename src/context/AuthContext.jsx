import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || "User",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Register a new user
  const register = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update profile with name
    if (name) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    }

    return userCredential.user;
  };

  // Login user
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  // Logout user
  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <LoadingSpinner fullScreen size="large" />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
