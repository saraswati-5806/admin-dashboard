import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const auth = useAuth();
  
  // Safe default values if context returns null unexpectedly
  const currentUser = auth ? auth.currentUser : null;
  const logout = auth ? auth.logout : () => {};
  const darkMode = auth ? auth.darkMode : false;
  const setDarkMode = auth ? auth.setDarkMode : () => {};

  return (
    <nav className="navbar">
      <h2>HireFlow</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>

        {!currentUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {currentUser && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/admin" style={{ padding: '10px', color: '#2e6da4', fontWeight: 'bold' }}>
              💼 Admin Panel
            </Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        )}

        

        {/* 🌓 Dark Mode Toggler */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: "transparent", border: "none", fontSize: "1.2rem", cursor: "pointer", padding: "0 0.5rem" }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}