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
      const formattedRole = 
        user.role?.toLowerCase() === "employer" || user.role?.toLowerCase() === "admin" 
          ? "Employer" 
          : "Candidate";
      setCurrentUser({ ...user, role: formattedRole });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // 1. Master Developer Bypass (Works even if localStorage is completely empty)
    if (email === "emp123@nova.com" && password === "emp123") {
      const adminUser = { 
        id: "admin_dev",
        name: "Employer1",
        email: email, 
        role: "Employer", // Force Employer layout access
        clearance: "Employer" 
      };
      storage.setCurrentUser(adminUser);
      setCurrentUser(adminUser);
      return true; 
    }

    // 2. Standard Query Lookup against registered storage users array
    const storedUsers = JSON.parse(localStorage.getItem("hireflow_users") || "[]");
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Force title-case immediately upon entering application pipeline
      const formattedRole = foundUser.role?.toLowerCase() === "employer" ? "Employer" : "Candidate";
      const updatedUser = { ...foundUser, role: formattedRole };
      
      storage.setCurrentUser(updatedUser);
      setCurrentUser(updatedUser);
      return true;
    }

    // Return false if no credentials match so your Login page can show the error alert
    return false;
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
    
    // Log them in automatically by passing credentials to our updated handler
    login(newUser.email, newUser.password);
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