import { getApplicationsByJob } from "../utils/storage";

export default function ApplicantList({ jobId }) {
  // 🌟 Fault tolerant array loading configuration
  const applicants = getApplicationsByJob(jobId) || [];

  return (
    <div style={{ padding: "1rem 0" }}>
      <h4>Applicants Status Feed</h4>
      {applicants.length === 0 ? (
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>No submission parameters loaded for this pipeline segment.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {applicants.map((app, index) => (
            <div key={index} style={{ padding: "0.75rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "4px" }}>
              <p style={{ margin: "0 0 0.25rem 0", fontWeight: "bold" }}>👤 Name: {app.candidateName || "Anonymous Node"}</p>
              <p style={{ margin: "0", fontSize: "0.85rem", color: "#475569" }}>📧 Contact: {app.candidateEmail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}