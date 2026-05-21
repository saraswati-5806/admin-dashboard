import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      setError("");

      // 🔍 Read from unified system schema array
      const storedUsers = JSON.parse(localStorage.getItem("hireflow_users") || "[]");

      const matchedUser = storedUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!matchedUser) {
        setError("Invalid email address or matching security password parameters.");
        return;
      }

      // 🌟 Pass whole object profile structure securely into our context tree
      login(matchedUser);
      navigate("/dashboard");

    } catch (err) {
      setError(err.message || "Failed to finalize authentication session routing.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem" }} className="form">
      <h2>Account Login</h2>
      {error && <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>⚠️ {error}</p>}
      
      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <button type="submit" style={{ background: "#0d9488", color: "white", padding: "0.75rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
          Authenticate Session
        </button>
      </form>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        New to the pipeline? <Link to="/signup" style={{ color: "#0d9488" }}>Create an account</Link>
      </p>
    </div>
  );
}