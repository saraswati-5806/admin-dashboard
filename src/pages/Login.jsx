import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Call the updated login context function
    const isSuccess = login(email, password);

    if (isSuccess) {
      // Retrieve the freshly authenticated user context matrix from persistence
      const storedUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      // Branching route delivery engine based on authenticated user permissions
      if (storedUser && storedUser.role === "Employer") {
        navigate("/dashboard");
      } else {
        navigate("/jobs");
      }
    } else {
      // Triggers your warning alert text component
      setError("Invalid email address or password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem", background: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }} className="form">
      <h2 style={{ color: "#0f172a", marginBottom: "1.5rem" }}>Account Login</h2>
      {error && <p style={{ color: "#ef4444", fontSize: "0.9rem", margin: "0 0 1rem 0" }}>⚠️ {error}</p>}
      
      <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem", color: "#475569" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem", color: "#475569" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1" }} />
        </div>
        <button type="submit" style={{ background: "#0d9488", color: "white", padding: "0.75rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>
          Authenticate Session
        </button>
      </form>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#64748b" }}>
        New to the pipeline? <Link to="/signup" style={{ color: "#0d9488", fontWeight: "600" }}>Create an account</Link>
      </p>
    </div>
  );
}