import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // Login function to authenticate the user
  const login = async (inputs) => {
    try {
      const res = await axios.post("/api/auth/login", inputs, { withCredentials: true });
      const userData = res.data.user; // Extract user data from response
      setCurrentUser(userData); // Set the currentUser state
      localStorage.setItem("user", JSON.stringify(userData)); // Update localStorage
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // Logout function to clear the user session
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null); // Clear the currentUser state
      localStorage.removeItem("user"); // Remove user data from localStorage
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Update localStorage when currentUser changes
  useEffect(() => {
    if (currentUser !== null) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
