import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout, darkMode, setDarkMode } = useAuth() || {};
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  // Convert role to lower case string to ensure clean authentication match 
  const normalizedRole = currentUser?.role?.trim().toLowerCase();

  return (
    <nav style={{
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "1rem 2rem",
      background: darkMode ? "#1e293b" : "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      borderBottom: darkMode ? "1px solid #334155" : "1px solid #e2e8f0"
    }}>
      {/* Brand Identity Branding Logo */}
      <div style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#0d9488", cursor: "pointer" }} onClick={() => navigate("/")}>
        HireFlow 🚀
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link to="/jobs" style={{ color: darkMode ? "#f8fafc" : "#334155", textDecoration: "none" }}>Browse Jobs</Link>
        
        {/* 🌓 Dark Mode Toggler */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
          title="Toggle UI Color Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* CONDITION LOGIC PIPELINE MATRIX */}
        {!currentUser ? (
          <>
            <Link to="/login"><button style={{ background: "transparent", color: "#0d9488", border: "1px solid #0d9488", padding: "0.4rem 1rem", borderRadius: "4px", cursor: "pointer" }}>Login</button></Link>
            <Link to="/signup"><button style={{ background: "#0d9488", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "4px", cursor: "pointer" }}>Sign Up</button></Link>
          </>
        ) : normalizedRole === "candidate" ? (
          <>
            <Link to="/dashboard" style={{ color: darkMode ? "#f8fafc" : "#334155", textDecoration: "none", fontWeight: "500" }}>My Workspace</Link>
            <button onClick={handleLogoutClick} style={{ background: "#64748b", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "4px", cursor: "pointer" }}>Disconnect</button>
          </>
        ) : (
          <>
            {/* Employer / Admin Layout Pipeline View Actions */}
            <Link to="/dashboard" style={{ color: darkMode ? "#f8fafc" : "#334155", textDecoration: "none", fontWeight: "500" }}>Employer Panel</Link>
            
            {/* SAFELY PRESERVED ADMIN DASHBOARD PORTAL LINK ACCESSIBILITY HOOK */}
            <Link to="/admin-dashboard" style={{ 
              padding: '0.4rem 1rem', 
              color: '#2e6da4', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              border: '1px dashed #2e6da4',
              borderRadius: '4px'
            }}>
              💼 Admin Panel
            </Link>
            
            <button onClick={handleLogoutClick} style={{ background: "#64748b", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "4px", cursor: "pointer" }}>Disconnect</button>
          </>
        )}
      </div>
    </nav>
  );
}