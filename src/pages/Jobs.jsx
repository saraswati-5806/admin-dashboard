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

  const filteredJobs = jobs.filter((j) => {
    const search = searchQuery.toLowerCase();
    return j.title?.toLowerCase().includes(search) || j.company?.toLowerCase().includes(search);
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
          style={{ width: "100%", maxWidth: "400px", padding: "0.6rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 2rem", background: "#f8fafc", borderRadius: "8px", border: "2px dashed #cbd5e1" }}>
          <h3>No Operational Paths Found</h3>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              onClick={() => navigate(`/jobs/${job.id}`)} // ✨ Absolute Router navigation route string applied on card click
              style={{ 
                padding: "1.5rem", 
                background: "#ffffff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "8px", 
                boxShadow: "0 4px 6px rgba(0,0,0,0.02)", 
                cursor: "pointer", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                transition: "transform 0.2s ease"
              }}
              className="job-card"
            >
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#0d9488" }}>{job.title}</h3>
                <h5 style={{ margin: "0 0 1rem 0", color: "#475569" }}>🏢 {job.company}</h5>
                <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 1rem 0" }}>
                  {job.description?.substring(0, 100)}...
                </p>
              </div>
              <button style={{ width: "100%", marginTop: "auto", background: "#0d9488", color: "#ffffff", border: "none", padding: "0.5rem", borderRadius: "4px", fontWeight: "bold" }}>
                Inspect Parameters
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}