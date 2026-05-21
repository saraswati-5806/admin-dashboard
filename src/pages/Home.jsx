import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "900px", margin: "4rem auto", padding: "0 2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "#0d9488", marginBottom: "1rem" }}>Streamline Your Engineering Placement Loop</h1>
      <p style={{ fontSize: "1.2rem", color: "#475569", marginBottom: "2.5rem", lineHeight: "1.6" }}>
        HireFlow bridges the gap between software engineering candidates and active technical placement matrices using client-side memory spaces.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "4rem" }}>
        <button onClick={() => navigate("/jobs")} style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
          Explore Openings
        </button>
        <button onClick={() => navigate("/signup")} style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "#115e59" }}>
          Register Node
        </button>
      </div>

      <div style={{ background: "#e0f2fe", padding: "2rem", borderRadius: "8px", border: "1px solid #0d9488", color: "#0f172a" }}>
        <h3>💡 Engineering Architecture Directive</h3>
        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.95rem", lineHeight: "1.5" }}>
          This interface compiles and maps operations straight to browser local memory cells. No isolated backend runtime engine threads are required to sustain current mock validation testing.
        </p>
      </div>
    </div>
  );
}