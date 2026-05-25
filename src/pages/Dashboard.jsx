import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ title: "", company: "", salary: "", location: "", description: "" });

  // Normalize checks to handle both lowercase and uppercase roles gracefully
  const isEmployer = currentUser?.role?.toLowerCase() === "employer";
  const isCandidate = currentUser?.role?.toLowerCase() === "candidate";

  async function loadDashboardCore() {
    setLoading(true);
    try {
      if (isEmployer) {
        const data = storage.getEmployerDashboard(currentUser.id);
        setDashboardData(data);
      } else if (isCandidate) {
        const data = storage.getCandidateApplications(currentUser.id);
        setDashboardData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentUser) {
      loadDashboardCore();
    }
  }, [currentUser]);

  const handleOpenCreateForm = () => {
    setEditingJob(null);
    setFormData({ title: "", company: currentUser?.company || "NovaSpark Solutions", salary: "", location: "", description: "" });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (job) => {
    setEditingJob(job);
    setFormData({ title: job.title, company: job.company, salary: job.salary, location: job.location, description: job.description });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (jobId) => {
    if (window.confirm("Confirm structural deletion protocol? Linked applicant records will cascade.")) {
      storage.deleteJob(jobId);
      loadDashboardCore();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      storage.updateJob({ ...editingJob, ...formData, requirements: ["Systems Engineering", "Operations"] });
    } else {
      storage.addJob({ ...formData, postedBy: currentUser.id, requirements: ["Systems Engineering", "Operations"] });
    }
    setIsFormOpen(false);
    loadDashboardCore();
  };

  if (loading) {
    return <div style={{ padding: "4rem", textAlign: "center" }}><h3>Compiling Secure Ledger Pipelines...</h3></div>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1.5rem", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #e2e8f0", paddingBottom: "1rem" }}>
        <div>
          <h2>Operational Control Dashboard</h2>
          <p>Logged in Node: <strong style={{ color: "#0d9488" }}>{currentUser?.name}</strong> Panel ({currentUser?.role})</p>
        </div>
        {isEmployer && (
          <button onClick={handleOpenCreateForm} style={{ background: "#0d9488", color: "white", padding: "0.75rem 1.5rem", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
            ➕ Inject New Job Listing
          </button>
        )}
      </div>

      {isFormOpen && (
        <div style={{ background: "rgba(15,23,42,0.7)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ background: "white", padding: "2rem", borderRadius: "8px", width: "100%", maxWidth: "550px", color: "#1e293b" }}>
            <h3>{editingJob ? "🔧 Modify Existing Job Struct" : "🚀 Create New Employment Allocation Node"}</h3>
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <input type="text" placeholder="Job Designation Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ padding: "0.6rem" }} />
              <input type="text" placeholder="Corporate Entity Brand Name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required disabled style={{ padding: "0.6rem" }} />
              <input type="text" placeholder="Compensation Package Structure" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} required style={{ padding: "0.6rem" }} />
              <input type="text" placeholder="Geographic Operation Bounds" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required style={{ padding: "0.6rem" }} />
              <textarea placeholder="Job Functions Log Scope" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required style={{ padding: "0.6rem", minHeight: "120px" }} />
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsFormOpen(false)} style={{ background: "#94a3b8", color: "white" }}>Abort</button>
                <button type="submit" style={{ background: "#0d9488", color: "white" }}>Commit Parameters</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEmployer ? (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", marginTop: "2rem" }}>
          <div>
            <h3>Active System Allocation Records ({dashboardData?.postedJobs?.length || 0})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              {dashboardData?.postedJobs?.map((job) => (
                <div key={job.id} style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "1.25rem", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4 style={{ margin: "0 0 0.25rem 0", color: "#0f172a" }}>{job.title}</h4>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>📍 {job.location} | 💰 {job.salary}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => handleOpenEditForm(job)} style={{ background: "#3b82f6", color: "white", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Edit</button>
                      <button onClick={() => handleDeleteClick(job.id)} style={{ background: "#ef4444", color: "white", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Submitted Applicant Streams</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              {dashboardData?.applications?.length === 0 ? (
                <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No verification files uploaded to active nodes.</p>
              ) : (
                dashboardData?.applications?.map((app) => (
                  <div key={app.id} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "1rem", borderRadius: "8px" }}>
                    <h5 style={{ margin: "0 0 0.5rem 0", color: "#0d9488" }}>{app.job_title}</h5>
                    <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.9rem", fontWeight: "bold" }}>👤 {app.candidateName}</p>
                    <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#64748b" }}>✉️ {app.candidateEmail}</p>
                    <div style={{ background: "#ffffff", padding: "0.5rem", borderRadius: "4px", fontSize: "0.75rem", border: "1px solid #cbd5e1" }}>
                      <strong>Cover Trace:</strong> "{app.resumeText || "No text payload provided."}"
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <h3>Your Outgoing System Placements ({dashboardData?.length || 0})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {dashboardData?.map((app) => (
              <div key={app.id} style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "1rem", borderRadius: "8px" }}>
                <h4>{app.title}</h4>
                <p style={{ color: "#64748b" }}>🏢 {app.company} | 📍 {app.location}</p>
                <small style={{ color: "#0d9488" }}>Status Flag: Dynamic Storage Active Trace Loop ({app.appliedAt})</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}