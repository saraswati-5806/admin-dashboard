import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      width: "100%",
      minHeight: "92vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "0",
      padding: "4rem 2rem",
      boxSizing: "border-box",
      // Absolute direct fallback image engine query pipeline
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('/bg-hero.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed"
    }}>
      
      <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "3.5rem", color: "#0d9488", marginBottom: "1rem", fontWeight: "800" }}>Streamline Your Engineering Placement Loop</h1>
        <p style={{ fontSize: "1.25rem", color: "#e2e8f0", marginBottom: "2.5rem", lineHeight: "1.6" }}>
          HireFlow bridges the gap between software engineering candidates and active technical placement matrices using client-side memory spaces.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "4rem" }}>
          <button onClick={() => navigate("/jobs")} style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "#0d9488", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
            Explore Openings
          </button>
          <button onClick={() => navigate("/signup")} style={{ padding: "1rem 2rem", fontSize: "1.1rem", background: "#115e59", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
            Register Node
          </button>
        </div>

        <div style={{ background: "rgba(224, 242, 254, 0.95)", padding: "2rem", borderRadius: "8px", border: "1px solid #0d9488", color: "#0f172a" }}>
          <h3 style={{ margin: "0 0 0.5rem 0" }}>💡 Engineering Architecture Directive</h3>
          <p style={{ margin: "0", fontSize: "0.95rem", lineHeight: "1.5", color: "#1e293b" }}>
            This interface compiles and maps operations straight to browser local memory cells. No isolated backend runtime engine threads are required to sustain current mock validation testing.
          </p>
        </div>
      </div>
    </div>
  );
}