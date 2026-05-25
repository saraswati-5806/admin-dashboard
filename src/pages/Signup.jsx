import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");

      const user = signup({
        name,
        email,
        password,
        role
      });

      if (user.role === "Employer") {
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
    <div
      style={{
        maxWidth: "400px",
        margin: "4rem auto",
        padding: "2rem"
      }}
      className="form"
    >
      <h2>Register Account</h2>

      {error && (
        <p
          style={{
            color: "#ef4444",
            fontSize: "0.9rem"
          }}
        >
          ⚠️ {error}
        </p>
      )}

      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem"
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "0.5rem"
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem"
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "0.5rem"
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem"
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "0.5rem"
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.25rem"
            }}
          >
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            style={{
              width: "100%",
              padding: "0.5rem"
            }}
          >
            <option value="candidate">
              Candidate
            </option>

            <option value="employer">
              Employer
            </option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            background: "#0d9488",
            color: "white",
            padding: "0.75rem",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem"
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#0d9488"
          }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}