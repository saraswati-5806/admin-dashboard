import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import * as storage from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(
      localStorage.getItem(
        "hireflow_darkmode"
      ) || "false"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "hireflow_darkmode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  useEffect(() => {
    const user = storage.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    setLoading(false);
  }, []);

  const normalizeRole = (role) => {
    return role?.toLowerCase() === "employer"
      ? "Employer"
      : "Candidate";
  };

  const login = (email, password) => {
    // 🎯 CRITICAL FIX: Intercept static developer credentials to match seeded database constraints
    if (email === "emp123@nova.com" && password === "emp123") {
      const adminUser = {
        id: "user_emp_1", // Restores structural binding to your 22 default jobs
        name: "Employer1",
        email: email,
        role: "Employer",
        clearance: "Employer",
        company: "NovaSpark Solutions"
      };

      storage.setCurrentUser(adminUser);
      setCurrentUser(adminUser);
      return adminUser;
    }

    // Dynamic user lookup pipeline
    const users = JSON.parse(
      localStorage.getItem("hireflow_users") ||
        "[]"
    );

    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!foundUser) {
      return null;
    }

    const loggedInUser = {
      ...foundUser,
      role: normalizeRole(foundUser.role)
    };

    storage.setCurrentUser(loggedInUser);
    setCurrentUser(loggedInUser);

    return loggedInUser;
  };

  const signup = (userData) => {
    const users = JSON.parse(
      localStorage.getItem("hireflow_users") ||
        "[]"
    );

    const existingUser = users.find(
      (u) => u.email === userData.email
    );

    if (existingUser) {
      throw new Error(
        "Email already registered."
      );
    }

    const newUser = {
      id:
        "user_" +
        Math.random()
          .toString(36)
          .substring(2, 10),

      name: userData.name,

      email: userData.email,

      password: userData.password,

      role: userData.role,

      company:
        userData.role === "employer"
          ? "NovaSpark Solutions"
          : ""
    };

    users.push(newUser);

    localStorage.setItem(
      "hireflow_users",
      JSON.stringify(users)
    );

    return login(
      userData.email,
      userData.password
    );
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