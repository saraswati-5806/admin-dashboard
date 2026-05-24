import React, { useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

export default function Admin() {

  // Initialize storage if missing
  useEffect(() => {

    const existingJobs = localStorage.getItem("hireflow_jobs");
    const existingApplications = localStorage.getItem("hireflow_applications");

    // Default fallback only if storage empty
    if (!existingJobs) {
      const initialJobs = [
        {
          id: "job_1",
          title: "Frontend Engineer",
          department: "Engineering",
          applicationsCount: 12,
          status: "Active"
        },
        {
          id: "job_2",
          title: "Product Designer",
          department: "Design",
          applicationsCount: 8,
          status: "Active"
        },
        {
          id: "job_3",
          title: "QA Analyst",
          department: "Operations",
          applicationsCount: 5,
          status: "Closed"
        }
      ];

      localStorage.setItem(
        "hireflow_jobs",
        JSON.stringify(initialJobs)
      );
    }

    if (!existingApplications) {

      const initialApplications = [
        {
          id: "app_1",
          candidateName: "John Doe",
          jobTitle: "Frontend Engineer",
          status: "Interviewing",
          date: "2026-05-20"
        },
        {
          id: "app_2",
          candidateName: "Jane Smith",
          jobTitle: "Product Designer",
          status: "Pending",
          date: "2026-05-21"
        },
        {
          id: "app_3",
          candidateName: "Alex Perry",
          jobTitle: "Frontend Engineer",
          status: "Rejected",
          date: "2026-05-19"
        }
      ];

      localStorage.setItem(
        "hireflow_applications",
        JSON.stringify(initialApplications)
      );
    }

  }, []);

  return (
    <div className="admin-page-wrapper">
      <AdminDashboard />
    </div>
  );
}