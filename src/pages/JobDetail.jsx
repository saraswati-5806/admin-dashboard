import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobRecord = storage.getJobById(id);
    setJob(jobRecord);
  }, [id]);

  const handleApply = () => {
    if (!currentUser) {
      alert("Session check expired. Authenticate registration vectors before applying.");
      navigate("/login");
      return;
    }

    // 🛡️ Guard Block: Detects and filters duplicated application submissions
    const existingApps = JSON.parse(localStorage.getItem("hireflow_applications") || "[]");
    const alreadyApplied = existingApps.find(
      (a) => a.jobId === job.id && a.candidateId === currentUser.id
    );

    if (alreadyApplied) {
      alert("System Warning: You have already routed a placement file payload to this job ID.");
      return;
    }

    storage.addApplication({
      jobId: job.id,
      candidateId: currentUser.id,
      candidateName: currentUser.name || "Engineering Member",
      candidateEmail: currentUser.email
    });

    alert("Application packet routed successfully to browser local node indices.");
    navigate("/dashboard");
  };

  if (!job) {
    return <div style={{ padding: "4rem", textAlign: "center" }}><h3>Target resource indexing failed...</h3></div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "0 1rem" }}>
      <button onClick={() => navigate("/jobs")} style={{ marginBottom: "1.5rem", background: "#64748b" }}>← Back to Index</button>
      
      <div className="job-card" style={{ padding: "2rem" }}>
        <h2>{job.title}</h2>
        <h4 style={{ color: "#0d9488", margin: "0.5rem 0" }}>🏢 {job.company}</h4>
        <p>📍 <strong>Location Node:</strong> {job.location || "Remote Deployment"}</p>
        <p>💰 <strong>Compensation Bracket:</strong> {job.salary}</p>
        
        <hr style={{ margin: "1.5rem 0", opacity: 0.2 }} />
        
        <h3>Role Specification Log</h3>
        <p style={{ lineHeight: "1.7" }}>{job.description}</p>

        {job.requirements && (
          <div style={{ margin: "1.5rem 0" }}>
            <h3>Required Skills</h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {job.requirements.map((req, idx) => (
                <span key={idx} style={{ background: "#0d9488", color: "white", padding: "0.35rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>{req}</span>
              ))}
            </div>
          </div>
        )}

        {currentUser?.role !== "Employer" && (
          <button onClick={handleApply} style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", marginTop: "1.5rem" }}>
            Submit Placement Application
          </button>
        )}
      </div>
    </div>
  );
}