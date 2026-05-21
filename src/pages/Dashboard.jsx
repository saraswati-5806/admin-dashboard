import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as storage from "../utils/storage";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", company: "", salary: "", description: "" });

  async function loadDashboardCore() {
    setLoading(true); // 🌟 Force explicit initial load state before async lookups run
    try {
      if (currentUser?.role === "Employer") {
        const data = storage.getEmployerDashboard(currentUser.id);
        setDashboardData(data);
      } else if (currentUser?.role === "Candidate") {
        const data = storage.getCandidateApplications(currentUser.id);
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Dashboard compilation process exception dropped:", error);
    } finally {
      setLoading(false); // 🌟 Cleanly switches off view flags when data layers clear safely
    }
  }

  useEffect(() => {
    if (currentUser) {
      loadDashboardCore();
    }
  }, [currentUser]);

  const handleJobCreationSubmit = (e) => {
    e.preventDefault();
    // 🌟 Appends standard professional arrays automatically to employer creations
    storage.addJob({
      ...formData,
      postedBy: currentUser.id,
      requirements: ["Communication", "Teamwork", "Problem Solving"]
    });
    setFormData({ title: "", company: "", salary: "", description: "" });
    loadDashboardCore();
  };

  if (loading) {
    return <div style={{ padding: "3rem", textAlign: "center" }}><h3>Compiling system data matrices...</h3></div>;
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2>Workspace Hub Dashboard</h2>
      <p>Welcome back, <strong>{currentUser?.name}</strong> [Clearance Profile: <em>{currentUser?.role}</em>]</p>

      {currentUser?.role === "Employer" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem" }}>
          <div className="form" style={{ padding: "1.5rem" }}>
            <h3>Publish New Strategic Opportunity Card</h3>
            <form onSubmit={handleJobCreationSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="text" placeholder="Job Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
              <input type="text" placeholder="Salary Package (e.g. ₹12L - ₹15L)" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} required />
              <textarea placeholder="Role Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <button type="submit">Broadcast Listing Profile</button>
            </form>
          </div>

          <div>
            <h3>Active Placement Nodes Posted ({dashboardData?.totalJobs || 0})</h3>
            {dashboardData?.applications?.map((app, index) => (
              <div key={index} className="job-card" style={{ padding: "1rem", margin: "0.5rem 0" }}>
                <h4>{app.job_title}</h4>
                <p>👤 Candidate: <strong>{app.candidateName}</strong> ({app.candidateEmail})</p>
                <small>Submitted Timestamp Trace: {app.appliedAt}</small>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <h3>My Active Pipeline Submissions ({dashboardData?.length || 0})</h3>
          {dashboardData?.length === 0 ? (
            <p>Your workspace hasn't routed any placement application modules yet.</p>
          ) : (
            dashboardData?.map((app, index) => (
              <div key={index} className="job-card" style={{ padding: "1rem", margin: "0.5rem 0" }}>
                <h4>{app.title}</h4>
                <p>🏢 {app.company} | 📍 {app.location}</p>
                <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem" }}>
                  Status: Active Storage Loop Processing
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}