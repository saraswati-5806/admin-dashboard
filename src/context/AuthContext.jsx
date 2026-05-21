import { createContext, useContext, useState, useEffect } from "react";
import * as storage from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = storage.getCurrentUser();
    if (user) {
      // Standardize role to title-case when restoring session
      const formattedRole = user.role?.toLowerCase() === "employer" ? "Employer" : "Candidate";
      setCurrentUser({ ...user, role: formattedRole });
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    // Force title-case immediately upon entering application pipeline
    const formattedRole = user.role?.toLowerCase() === "employer" ? "Employer" : "Candidate";
    const updatedUser = { ...user, role: formattedRole };
    
    storage.setCurrentUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  const signup = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem("hireflow_users") || "[]");
    
    const newUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role.toLowerCase(), // stored lowercase in user DB
      company: userData.role.toLowerCase() === "employer" ? "NovaSpark Solutions" : ""
    };

    storedUsers.push(newUser);
    localStorage.setItem("hireflow_users", JSON.stringify(storedUsers));
    
    // Log them in automatically with corrected title-casing
    login(newUser);
  };

  const logout = () => {
    storage.clearCurrentUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}