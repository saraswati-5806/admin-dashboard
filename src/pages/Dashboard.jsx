import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getEmployerDashboard,
  addJob,
  deleteJob,
  updateJob
} from "../utils/storage";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    postedJobs: [],
    applications: []
  });

  // NEW MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadDashboard();
    }
  }, [currentUser]);

  const loadDashboard = () => {
    const data = getEmployerDashboard(currentUser.id);
    setDashboardData(data);
  };

  const handleDeleteJob = (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    deleteJob(id);
    loadDashboard();
  };

  const jobs = dashboardData.postedJobs;
  const applications = dashboardData.applications;

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily: '"Segoe UI", sans-serif'
      }}
    >
      <div style={{ padding: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px"
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#1e293b",
                margin: "0 0 5px 0"
              }}
            >
              Employer Dashboard
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b"
              }}
            >
              Logged in as:
              <strong style={{ color: "#0ea5e9" }}>
                {" "}
                {currentUser?.name}
              </strong>
            </p>
          </div>

          {/* UPDATED ADD JOB BUTTON */}
          <button
            onClick={() => {
              setEditingJob(null);
              setShowModal(true);
            }}
            style={{
              backgroundColor: "#0ea5e9",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ➕ Inject New Job Listing
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}
        >
          {[
            {
              title: "TOTAL JOBS POSTED",
              val: jobs.length,
              color: "#3b82f6"
            },
            {
              title: "TOTAL APPLICATIONS",
              val: applications.length,
              color: "#10b981"
            },
            {
              title: "REGISTERED USERS",
              val: JSON.parse(
                localStorage.getItem("hireflow_users") || "[]"
              ).length,
              color: "#f59e0b"
            },
            {
              title: "ACTIVE OPENINGS",
              val: jobs.filter(
                (j) => j.status === "ACTIVE"
              ).length,
              color: "#ec4899"
            }
          ].map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 6px -1px rgba(0,0,0,0.05)",
                borderTop: `4px solid ${card.color}`
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  fontWeight: "bold",
                  margin: "0 0 8px 0"
                }}
              >
                {card.title}
              </p>

              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  margin: 0
                }}
              >
                {card.val}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1.2fr",
            gap: "30px"
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                color: "#1e293b",
                marginBottom: "20px",
                fontWeight: "600"
              }}
            >
              Your Posted Jobs ({jobs.length})
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              {jobs.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px"
                  }}
                >
                  No jobs posted yet.
                </div>
              )}

              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() =>
                    navigate(`/jobs/${job.id}`)
                  }
                  style={{
                    backgroundColor: "#fff",
                    padding: "16px 20px",
                    borderRadius: "10px",
                    boxShadow:
                      "0 2px 4px rgba(0,0,0,0.02)",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <div>
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        color: "#1e293b",
                        fontSize: "15px",
                        fontWeight: "600"
                      }}
                    >
                      {job.title}
                    </h4>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "13px"
                      }}
                    >
                      📍 {job.location} | 💰 {job.salary}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px"
                    }}
                  >
                    {/* UPDATED EDIT BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingJob(job);
                        setShowModal(true);
                      }}
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px"
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) =>
                        handleDeleteJob(job.id, e)
                      }
                      style={{
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "18px",
                color: "#1e293b",
                marginBottom: "20px",
                fontWeight: "600"
              }}
            >
              Recent Applicants
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
              }}
            >
              {applications.length === 0 && (
                <div
                  style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px"
                  }}
                >
                  No applications yet.
                </div>
              )}

              {applications.map((app) => (
                <div
                  key={app.id}
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 6px 0",
                      color: "#10b981",
                      fontWeight: "600"
                    }}
                  >
                    {app.job_title}
                  </h4>

                  <p
                    style={{
                      margin: "0 0 10px 0",
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#334155"
                    }}
                  >
                    👤 {app.candidateName}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#64748b"
                    }}
                  >
                    {app.candidateEmail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px"
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: "760px",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              position: "relative"
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px"
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#0f172a"
                }}
              >
                {editingJob
                  ? "🛠 Modify Existing Job Struct"
                  : "🚀 Create New Employment Allocation Node"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingJob(null);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "32px",
                  cursor: "pointer",
                  color: "#64748b"
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.target);

                const jobPayload = {
                  id: editingJob?.id,
                  title: formData.get("title"),
                  company: formData.get("company"),
                  salary: formData.get("salary"),
                  location: formData.get("location"),
                  description: formData.get("description"),
                  category: "IT",
                  requirements: [],
                  postedBy: currentUser.id,
                  status: "ACTIVE"
                };

                if (editingJob) {
                  updateJob(jobPayload);
                } else {
                  addJob(jobPayload);
                }

                loadDashboard();

                setShowModal(false);
                setEditingJob(null);
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "22px"
                }}
              >
                <input
                  name="title"
                  defaultValue={editingJob?.title || ""}
                  placeholder="Job Designation Title"
                  required
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    fontSize: "16px"
                  }}
                />

                <input
                  name="company"
                  defaultValue={
                    editingJob?.company ||
                    "NovaSpark Solutions"
                  }
                  placeholder="Company"
                  required
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    fontSize: "16px"
                  }}
                />

                <input
                  name="salary"
                  defaultValue={editingJob?.salary || ""}
                  placeholder="Compensation Package Structure"
                  required
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    fontSize: "16px"
                  }}
                />

                <input
                  name="location"
                  defaultValue={editingJob?.location || ""}
                  placeholder="Geographic Operation Bounds"
                  required
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    fontSize: "16px"
                  }}
                />

                <textarea
                  name="description"
                  rows="6"
                  defaultValue={
                    editingJob?.description || ""
                  }
                  placeholder="Job Functions Log Scope"
                  required
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    fontSize: "16px",
                    resize: "none"
                  }}
                />

                {/* ACTION BUTTONS */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "15px",
                    marginTop: "10px"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingJob(null);
                    }}
                    style={{
                      backgroundColor: "#94a3b8",
                      color: "#fff",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Abort
                  </button>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#0f766e",
                      color: "#fff",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Commit Parameters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}