import { useNavigate } from "react-router-dom";

export default function JobCard({ job, onApply, showAction = true }) {
  const navigate = useNavigate();

  return (
    <div 
      className="job-card" 
      onClick={() => navigate(`/jobs/${job.id}`)}
      style={{ 
        padding: "1.5rem", 
        border: "1px solid #e2e8f0", 
        borderRadius: "8px", 
        margin: "1rem 0",
        background: "#ffffff",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease-on-out"
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#0d9488" }}>{job.title}</h3>
      <p style={{ margin: "0 0 0.25rem 0", fontWeight: "600", color: "#1e293b" }}>🏢 {job.company || "Unknown Company"}</p>
      <p style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>💰 {job.salary || "Not Disclosed"}</p>
      <p style={{ margin: "0 0 1rem 0", fontSize: "0.95rem", color: "#334155", lineHeight: "1.5" }}>{job.description}</p>
      
      {job.requirements && job.requirements.length > 0 && (
        <div style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {job.requirements.map((req, index) => (
            <span key={index} style={{ background: "#f1f5f9", color: "#475569", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem" }}>
              {req}
            </span>
          ))}
        </div>
      )}

      {showAction && onApply && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Stops the card navigation redirect from firing simultaneously
            onApply(job.id);
          }} 
          style={{ background: "#0d9488", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}
        >
          Apply Now
        </button>
      )}
    </div>
  );
}