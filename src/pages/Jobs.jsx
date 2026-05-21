import { useState, useEffect } from "react";
import * as storage from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setJobs(storage.getJobs() || []);
  }, []);

  // 🛡️ Fault-Tolerant Search Logic
  const filteredJobs = jobs.filter((j) => {
    const search = searchQuery.toLowerCase();
    const matchesTitle = j.title?.toLowerCase().includes(search) || false;
    const matchesCompany = j.company?.toLowerCase().includes(search) || false;
    return matchesTitle || matchesCompany;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h2>Strategic Opportunities Pipeline</h2>
        <input 
          type="text" 
          placeholder="Filter by designation or corporate entity..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>

      {/* 🌟 Empty-State Condition Rendering Wrapper */}
      {filteredJobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 2rem", background: "#f8fafc", borderRadius: "8px", border: "2px dashed #cbd5e1" }} className="job-card">
          <h3>No Operational Paths Found</h3>
          <p style={{ color: "#64748b" }}>No matching workspace allocations line up with query parameter: "{searchQuery}"</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#0d9488" }}>{job.title}</h3>
                <h5 style={{ margin: "0 0 1rem 0", opacity: 0.8 }}>🏢 {job.company}</h5>
                <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 1rem 0" }}>
                  {job.description?.substring(0, 100)}...
                </p>
              </div>
              <button onClick={() => navigate(`/jobs/${job.id}`)} style={{ width: "100%", marginTop: "auto" }}>
                Inspect Parameters
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}