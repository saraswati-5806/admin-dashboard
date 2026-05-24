import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getEmployerDashboard,
  addJob,
  deleteJob
} from "../utils/storage";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    postedJobs: [],
    applications: []
  });

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

  const handleEditJob = (job, e) => {
    e.stopPropagation();

    const updatedTitle =
      prompt("Edit Job Title", job.title) || job.title;

    const updatedLocation =
      prompt("Edit Location", job.location) || job.location;

    const updatedSalary =
      prompt("Edit Salary", job.salary) || job.salary;

    const jobs =
      JSON.parse(localStorage.getItem("hireflow_jobs")) || [];

    const updatedJobs = jobs.map((j) =>
      j.id === job.id
        ? {
            ...j,
            title: updatedTitle,
            location: updatedLocation,
            salary: updatedSalary
          }
        : j
    );

    localStorage.setItem(
      "hireflow_jobs",
      JSON.stringify(updatedJobs)
    );

    loadDashboard();
  };

  const handleAddJob = () => {
    const title = prompt("Enter Job Title");

    if (!title) return;

    const location =
      prompt("Enter Location") || "Remote";

    const salary =
      prompt("Enter Salary Package") || "Negotiable";

    const description =
      prompt("Enter Job Description") ||
      "No description provided.";

    const newJob = {
      title,
      location,
      salary,
      description,
      company: currentUser.company || "NovaSpark Solutions",
      requirements: [],
      postedBy: currentUser.id,
      status: "ACTIVE"
    };

    addJob(newJob);

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
            marginBottom: "30px"
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

          <button
            onClick={handleAddJob}
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
            ➕ Add New Job
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
                    <button
                      onClick={(e) =>
                        handleEditJob(job, e)
                      }
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
                    {app.resumeText}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}