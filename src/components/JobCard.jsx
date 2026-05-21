export default function JobCard({ job, onApply, showAction = true }) {
  return (
    <div className="job-card" style={{ padding: "1.5rem", border: "1px solid #e2e8f0", borderRadius: "8px", margin: "1rem 0" }}>
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#0d9488" }}>{job.title}</h3>
      <p style={{ margin: "0 0 0.25rem 0", fontWeight: "600" }}>🏢 {job.company || "Unknown Company"}</p>
      <p style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>💰 {job.salary || "Not Disclosed"}</p>
      <p style={{ margin: "0 0 1rem 0", fontSize: "0.95rem" }}>{job.description}</p>
      
      {job.requirements && job.requirements.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          {job.requirements.map((req, index) => (
            <span key={index} style={{ background: "#f1f5f9", color: "#475569", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", marginRight: "0.5rem" }}>
              {req}
            </span>
          ))}
        </div>
      )}

      {showAction && onApply && (
        <button onClick={() => onApply(job.id)} style={{ background: "#0d9488", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}>
          Apply Now
        </button>
      )}
    </div>
  );
}