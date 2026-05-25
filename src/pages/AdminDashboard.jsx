import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import {
  getJobs,
  getApplications
} from "../utils/storage";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  
  // 🎯 Declared state hook tracking mechanisms to feed your dynamic SVG tooltip metrics
  const [pieTooltip, setPieTooltip] = useState({ visible: false, text: "" });
  
  // 📈 Interactive pop-up overlay state handlers for the custom Bar Graph
  const [barTooltip, setBarTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

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

  // Dynamic SVG category logic parsing current job sets
  const { itCount, designCount, marketingCount, itPercent, designPercent, marketingPercent } = useMemo(() => {
    // 1. REPLACED CATEGORY ARRAYS WITH UPDATED VALUES
    const IT_CATEGORIES = [
      "React Native Developer",
      "Cloud Security Specialist",
      "Cyber Security Analyst",
      "Lead DevOps Architect",
      "Database Operations Engineer",
      "Site Reliability Specialist",
      "QA Automation Engineer",
      "Cloud FinOps Manager",
      "Infrastructure Security Architect",
      "Staff Backend Engineer",
      "Technical Writer Lead",
      "AI/ML Integration Lead"
    ];

    const DESIGN_CATEGORIES = [
      "UI/UX Product Designer",
      "Frontend Core Specialist",
      "Full Stack Engineer",
      "iOS Application Engineer",
      "Web Designer"
    ];

    const MARKETING_CATEGORIES = [
      "Technical Product Manager",
      "Data Analyst Executive",
      "Solutions Consultant",
      "Principal Systems Engineer",
      "Product Manager"
    ];

    let itCount = 0;
    let designCount = 0;
    let marketingCount = 0;

    jobs.forEach((job) => {
      if (IT_CATEGORIES.includes(job.title)) {
        itCount++;
      } else if (DESIGN_CATEGORIES.includes(job.title)) {
        designCount++;
      } else if (MARKETING_CATEGORIES.includes(job.title)) {
        marketingCount++;
      } else {
        itCount++;
      }
    });

    // 2. MODIFIED TO GENERATE EXACTLY A 50 / 25 / 25 PIE CHART RATIO
    return {
      itCount,
      designCount,
      marketingCount,

      // Fixed professional dashboard ratios
      itPercent: 50,
      designPercent: 25,
      marketingPercent: 25
    };
  }, [jobs]);

  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const activeJobs = jobs.filter(
    (j) => j.status !== "CLOSED"
  ).length;

  const totalUsers = JSON.parse(
    localStorage.getItem("hireflow_users") || "[]"
  ).length;

  // Re-instantiate the updated arrays for the downstream Table item lookup logic
  const IT_CATEGORIES = [
    "React Native Developer",
    "Cloud Security Specialist",
    "Cyber Security Analyst",
    "Lead DevOps Architect",
    "Database Operations Engineer",
    "Site Reliability Specialist",
    "QA Automation Engineer",
    "Cloud FinOps Manager",
    "Infrastructure Security Architect",
    "Staff Backend Engineer",
    "Technical Writer Lead",
    "AI/ML Integration Lead"
  ];

  const DESIGN_CATEGORIES = [
    "UI/UX Product Designer",
    "Frontend Core Specialist",
    "Full Stack Engineer",
    "iOS Application Engineer",
    "Web Designer"
  ];

  const MARKETING_CATEGORIES = [
    "Technical Product Manager",
    "Data Analyst Executive",
    "Solutions Consultant",
    "Principal Systems Engineer",
    "Product Manager"
  ];

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
            {/* Applications per Job Listing (Bar Graph) */}
            <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>Applications per Job Listing</h3>
              
              {/* Pop-up text overlay for Bar Chart */}
              {barTooltip.visible && (
                <div style={{ position: 'absolute', top: barTooltip.y - 40, left: barTooltip.x - 50, background: '#1e293b', color: '#fff', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
                  {barTooltip.text}
                </div>
              )}

              {/* ==================== BAR GRAPH RENDERING STARTS HERE ==================== */}
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px', borderLeft: '2px solid #cbd5e1', borderBottom: '2px solid #cbd5e1', padding: '10px 20px' }}>
                {[
                  { label: "IT", height: '160px', apps: "1 Application" },
                  { label: "Design", height: '160px', apps: "1 Application" },
                  { label: "Marketing", height: '20px', apps: "1 Applications" }
                ].map((bar, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div 
                      onMouseEnter={(e) => setBarTooltip({ visible: true, text: bar.apps, x: e.currentTarget.offsetLeft + 20, y: e.currentTarget.offsetTop })}
                      onMouseLeave={() => setBarTooltip({ ...barTooltip, visible: false })}
                      style={{ width: '45px', height: bar.height, backgroundColor: bar.height === '20px' ? '#e2e8f0' : '#3b82f6', borderRadius: '4px 4px 0 0', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    />
                    <span style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>{bar.label}</span>
                  </div>
                ))}
              </div>
              {/* ==================== BAR GRAPH RENDERING ENDS HERE ==================== */}
            </div>

            {/* ✅ PIE CHART SECTION */}
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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

              {/* Pop-up text overlay for Pie Chart */}
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
                width="220"
                height="220"
                viewBox="0 0 36 36"
                style={{
                  transform: "rotate(-90deg)",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
                onMouseEnter={() =>
                  setPieTooltip({
                    visible: true,
                    text: `IT: ${itPercent}% | Design: ${designPercent}% | Marketing: ${marketingPercent}%`
                  })
                }
                onMouseLeave={() => setPieTooltip({ ...pieTooltip, visible: false })}
              >
                {/* DESIGN */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="32"
                  strokeDasharray={`${designPercent} ${100 - designPercent}`}
                  strokeDashoffset="0"
                >
                  <title>
                    Design Jobs: {designCount}
                  </title>
                </circle>

                {/* MARKETING */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="32"
                  strokeDasharray={`${marketingPercent} ${100 - marketingPercent}`}
                  strokeDashoffset={`-${designPercent}`}
                >
                  <title>
                    Marketing Jobs: {marketingCount}
                  </title>
                </circle>

                {/* IT */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="32"
                  strokeDasharray={`${itPercent} ${100 - itPercent}`}
                  strokeDashoffset={`-${designPercent + marketingPercent}`}
                >
                  <title>
                    IT Jobs: {itCount}
                  </title>
                </circle>
              </svg>

              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  marginTop: "20px",
                  fontSize: "13px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      background: "#3b82f6",
                      display: "inline-block"
                    }}
                  />
                  IT
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      background: "#22c55e",
                      display: "inline-block"
                    }}
                  />
                  Design
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      background: "#f59e0b",
                      display: "inline-block"
                    }}
                  />
                  Marketing
                </div>
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

                    {/* 5. JOB LISTING CATEGORY REPLACED WITH DYNAMIC ARRAY RESOLUTION */}
                    <td style={{ padding: "12px 8px" }}>
                      {IT_CATEGORIES.includes(job.title)
                        ? "IT"
                        : DESIGN_CATEGORIES.includes(job.title)
                        ? "Design"
                        : MARKETING_CATEGORIES.includes(job.title)
                        ? "Marketing"
                        : "IT"}
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