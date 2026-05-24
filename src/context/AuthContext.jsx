import { createContext, useContext, useState, useEffect } from "react";
import * as storage from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ DARK MODE STATE FIX
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("hireflow_darkmode") || "false");
  });

  // ✅ Persist dark mode
  useEffect(() => {
    localStorage.setItem("hireflow_darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const user = storage.getCurrentUser();

    if (user) {
      const formattedRole =
        user.role?.toLowerCase() === "employer" ||
        user.role?.toLowerCase() === "admin"
          ? "Employer"
          : "Candidate";

      setCurrentUser({ ...user, role: formattedRole });
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === "emp123@nova.com" && password === "emp123") {
      const adminUser = {
        id: "admin_dev",
        name: "Employer1",
        email: email,
        role: "Employer",
        clearance: "Employer"
      };

      storage.setCurrentUser(adminUser);
      setCurrentUser(adminUser);

      return true;
    }

    const storedUsers = JSON.parse(
      localStorage.getItem("hireflow_users") || "[]"
    );

    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const formattedRole =
        foundUser.role?.toLowerCase() === "employer"
          ? "Employer"
          : "Candidate";

      const updatedUser = {
        ...foundUser,
        role: formattedRole
      };

      storage.setCurrentUser(updatedUser);
      setCurrentUser(updatedUser);

      return true;
    }

    return false;
  };

  const signup = (userData) => {
    const storedUsers = JSON.parse(
      localStorage.getItem("hireflow_users") || "[]"
    );

    const newUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role.toLowerCase(),
      company:
        userData.role.toLowerCase() === "employer"
          ? "NovaSpark Solutions"
          : ""
    };

    storedUsers.push(newUser);

    localStorage.setItem(
      "hireflow_users",
      JSON.stringify(storedUsers)
    );

    login(newUser.email, newUser.password);
  };

  const logout = () => {
    storage.clearCurrentUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,

        // ✅ FIX
        darkMode,
        setDarkMode
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}