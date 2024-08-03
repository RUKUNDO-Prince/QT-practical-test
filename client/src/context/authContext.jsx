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

  // LOGIN FUNCTION
  const login = async (inputs) => {
    try {
      const res = await axios.post("/api/auth/login", inputs, { withCredentials: true });
      const userData = res.data.user;
      setCurrentUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // LOGOUT FUNCTION
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // UODATE LOCALSTORAGE WHEN SESSION CHANGES
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
