import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); // 🌟 Defaulted directly to lowercase value key format
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");

      // Finalize account production allocation matrix values
      signup({
        name,
        email,
        password,
        role: role.toLowerCase() // 🌟 Forced to lowercase
      });

      // Retrieve the freshly generated account matrix registration token from persistence
      const storedUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      // Branching delivery engine based on custom role mapping credentials
      if (storedUser && (storedUser.role === "Employer" || storedUser.role === "employer")) {
        navigate("/dashboard");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      setError(
        err.message || "Failed to create account."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem" }} className="form">
      <h2>Pipeline Registration</h2>
      {error && <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>⚠️ {error}</p>}
      
      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Select Core System Clearance Profile Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: "0.5rem" }}>
            <option value="candidate">Candidate (Looking for Placements)</option>
            <option value="employer">Employer (Posting Placement Roles)</option>
          </select>
        </div>
        <button type="submit" style={{ background: "#0d9488", color: "white", padding: "0.75rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
          Register Account Profile
        </button>
      </form>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Already indexed? <Link to="/login" style={{ color: "#0d9488" }}>Log in here</Link>
      </p>
    </div>
  );
}