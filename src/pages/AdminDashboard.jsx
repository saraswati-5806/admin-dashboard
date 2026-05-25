import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  getJobs,
  getApplications
} from "../utils/storage";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  
  // 🎯 Declared state hook tracking mechanisms to feed your dynamic SVG tooltip metrics
  const [pieTooltip, setPieTooltip] = useState({ visible: false, text: "" });

  const dashboardRef = useRef(null);
  const manageJobsRef = useRef(null);
  const applicantsRef = useRef(null);

  useEffect(() => {
    loadRealtimeData();

    window.addEventListener("storage", loadRealtimeData);

    return () => {
      window.removeEventListener("storage", loadRealtimeData);
    };
  }, []);

  const loadRealtimeData = () => {
    setJobs(getJobs());
    setApplications(getApplications());
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const chartData = useMemo(() => {
    return jobs.map((job) => {
      const count = applications.filter(
        (a) => a.jobId === job.id
      ).length;

      return {
        title: job.title,
        applications: count
      };
    });
  }, [jobs, applications]);

  const categoryStats = useMemo(() => {
    const stats = {};

    jobs.forEach((job) => {
      const category = job.category || "IT";

      stats[category] = (stats[category] || 0) + 1;
    });

    return stats;
  }, [jobs]);

  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const activeJobs = jobs.filter(
    (j) => j.status !== "CLOSED"
  ).length;

  const totalUsers = JSON.parse(
    localStorage.getItem("hireflow_users") || "[]"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        fontFamily: '"Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Sidebar Navigation */}
      <div
        style={{
          width: "240px",
          background: "#1e293b",
          color: "#fff",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh"
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            marginBottom: "40px",
            fontWeight: "bold"
          }}
        >
          Admin Portal
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <div
            onClick={() => scrollToSection(dashboardRef)}
            style={{
              background: "#334155",
              padding: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Dashboard
          </div>

          <div
            onClick={() => scrollToSection(manageJobsRef)}
            style={{
              padding: "12px",
              opacity: 0.9,
              cursor: "pointer"
            }}
          >
            Manage Jobs
          </div>

          <div
            onClick={() => scrollToSection(applicantsRef)}
            style={{
              padding: "12px",
              opacity: 0.9,
              cursor: "pointer"
            }}
          >
            Applicants
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <div ref={dashboardRef}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px"
            }}
          >
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#0f172a"
              }}
            >
              Analytics Dashboard
            </h1>

            <div>
              <span>
                Welcome, <strong>Admin</strong>
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}
          >
            {[
              {
                title: "TOTAL JOBS POSTED",
                val: totalJobs
              },
              {
                title: "TOTAL APPLICATIONS",
                val: totalApplications
              },
              {
                title: "REGISTERED USERS",
                val: totalUsers
              },
              {
                title: "ACTIVE OPENINGS",
                val: activeJobs
              }
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.05)",
                  borderTop: "4px solid #3b82f6"
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: "bold",
                    marginBottom: "8px"
                  }}
                >
                  {card.title}
                </p>

                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#1e293b"
                  }}
                >
                  {card.val}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              marginBottom: "30px"
            }}
          >
            {/* Bar Graph */}
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "10px",
                boxShadow:
                  "0 4px 6px -1px rgba(0,0,0,0.05)"
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  marginBottom: "20px"
                }}
              >
                Applications per Job Listing
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                  height: "220px",
                  borderLeft: "2px solid #cbd5e1",
                  borderBottom: "2px solid #cbd5e1",
                  padding: "10px 20px"
                }}
              >
                {chartData.slice(0, 6).map((bar, idx) => {
                  const dynamicHeight =
                    Math.max(bar.applications * 45, 20);

                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <div
                        title={`${bar.applications} Applications`}
                        style={{
                          width: "45px",
                          height: `${dynamicHeight}px`,
                          backgroundColor:
                            bar.applications > 0
                              ? "#3b82f6"
                              : "#e2e8f0",
                          borderRadius: "4px 4px 0 0"
                        }}
                      />

                      <span
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          textAlign: "center"
                        }}
                      >
                        {bar.title.substring(0, 10)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Jobs distributed by Category (Pie Chart) */}
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#1e293b",
                  marginBottom: "15px",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                Jobs distributed by Category
              </h3>

              {pieTooltip.visible && (
                <div
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#1e293b",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    pointerEvents: "none",
                    zIndex: 10
                  }}
                >
                  {pieTooltip.text}
                </div>
              )}

              <svg
                width="200"
                height="200"
                viewBox="0 0 32 32"
                style={{
                  transform: "rotate(-90deg)",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
                onMouseEnter={() =>
                  setPieTooltip({
                    visible: true,
                    text: `IT: ${jobs.length} Jobs`
                  })
                }
                onMouseLeave={() =>
                  setPieTooltip({
                    ...pieTooltip,
                    visible: false
                  })
                }
              >
                <circle
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="32"
                  strokeDasharray="100 100"
                />
              </svg>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "20px",
                  fontSize: "12px"
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                  }}
                >
                  <b style={{ color: "#3b82f6" }}>■</b> IT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tables */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "20px"
          }}
        >
          {/* Jobs Table */}
          <div
            ref={manageJobsRef}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                color: "#1e293b"
              }}
            >
              Recent Job Listings
            </h3>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px"
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #f1f5f9",
                    textAlign: "left",
                    color: "#64748b"
                  }}
                >
                  <th style={{ padding: "12px 8px" }}>
                    Job Title
                  </th>
                  <th style={{ padding: "12px 8px" }}>
                    Category
                  </th>
                  <th style={{ padding: "12px 8px" }}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    style={{
                      borderBottom:
                        "1px solid #f1f5f9",
                      color: "#334155"
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 8px",
                        fontWeight: "500"
                      }}
                    >
                      {job.title}
                    </td>

                    <td style={{ padding: "12px 8px" }}>
                      {job.category || "IT"}
                    </td>

                    <td style={{ padding: "12px 8px" }}>
                      <span
                        style={{
                          background:
                            job.status === "CLOSED"
                              ? "#fee2e2"
                              : "#dcfce7",
                          color:
                            job.status === "CLOSED"
                              ? "#b91c1c"
                              : "#15803d",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {job.status || "ACTIVE"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Applicants Table */}
          <div
            ref={applicantsRef}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                color: "#1e293b"
              }}
            >
              Recent Applicants
            </h3>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px"
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #f1f5f9",
                    textAlign: "left",
                    color: "#64748b"
                  }}
                >
                  <th style={{ padding: "12px 8px" }}>
                    Applicant
                  </th>

                  <th style={{ padding: "12px 8px" }}>
                    Applied For
                  </th>

                  <th style={{ padding: "12px 8px" }}>
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => {
                  const job = jobs.find(
                    (j) => j.id === app.jobId
                  );

                  return (
                    <tr
                      key={app.id}
                      style={{
                        borderBottom:
                          "1px solid #f1f5f9",
                        color: "#334155"
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 8px",
                          fontWeight: "500"
                        }}
                      >
                        {app.candidateName}
                      </td>

                      <td style={{ padding: "12px 8px" }}>
                        {job?.title || "Unknown"}
                      </td>

                      <td
                        style={{
                          padding: "12px 8px",
                          color: "#64748b"
                        }}
                      >
                        {app.candidateEmail}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}