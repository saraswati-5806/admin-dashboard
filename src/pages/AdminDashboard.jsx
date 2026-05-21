import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  // 1. Initialize jobs cleanly. If localStorage is empty, use your mock analytics values
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("hireflow_jobs");
    return savedJobs ? JSON.parse(savedJobs) : [
      { id: "101", title: "Web Developer", category: "IT", status: "ACTIVE", applicationsCount: 2 },
      { id: "102", title: "UI Designer", category: "Design", status: "ACTIVE", applicationsCount: 1 },
      { id: "103", title: "Data Analyst", category: "IT", status: "CLOSED", applicationsCount: 0 },
      { id: "104", title: "Marketing Manager", category: "Marketing", status: "ACTIVE", applicationsCount: 1 }
    ];
  });

  // 2. Initialize applications/applicants cleanly
  const [applicants, setApplicants] = useState(() => {
    const savedApps = localStorage.getItem("hireflow_applications");
    return savedApps ? JSON.parse(savedApps) : [
      { id: "a1", name: "Amit Sharma", appliedFor: "Web Developer", email: "amit@example.com" },
      { id: "a2", name: "Priya Patel", appliedFor: "Web Developer", email: "priya@example.com" },
      { id: "a3", name: "Rohan Das", appliedFor: "UI Designer", email: "rohan@example.com" },
      { id: "a4", name: "Sneha Reddy", appliedFor: "Marketing Manager", email: "sneha@example.com" }
    ];
  });

  // 3. Keep localStorage synchronized safely without breaking compilation
  useEffect(() => {
    localStorage.setItem("hireflow_jobs", JSON.stringify(jobs));
    localStorage.setItem("hireflow_applications", JSON.stringify(applicants));
  }, [jobs, applicants]);

  // ... rest of your JSX rendering (Charts, Tables, etc.)
  return (
    <div>
      {/* Your gorgeous charts and tables implementation code goes here */}
    </div>
  );
}