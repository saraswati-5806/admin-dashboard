import React from 'react';
import AdminDashboard from './AdminDashboard'; // Import the dashboard view with charts

export default function Admin() {
  return (
    <div className="admin-page-wrapper">
      <AdminDashboard />
    </div>
  );
}

// 1. Check for existing data, otherwise fall back to rich default mock profiles
const initialJobs = JSON.parse(localStorage.getItem("hireflow_jobs")) || [
  { id: "job_1", title: "Frontend Engineer", department: "Engineering", applicationsCount: 12, status: "Active" },
  { id: "job_2", title: "Product Designer", department: "Design", applicationsCount: 8, status: "Active" },
  { id: "job_3", title: "QA Analyst", department: "Operations", applicationsCount: 5, status: "Closed" }
];

const initialApplications = JSON.parse(localStorage.getItem("hireflow_applications")) || [
  { id: "app_1", candidateName: "John Doe", jobTitle: "Frontend Engineer", status: "Interviewing", date: "2026-05-20" },
  { id: "app_2", candidateName: "Jane Smith", jobTitle: "Product Designer", status: "Pending", date: "2026-05-21" },
  { id: "app_3", candidateName: "Alex Perry", jobTitle: "Frontend Engineer", status: "Rejected", date: "2026-05-19" }
];

// 2. Set your React state values using these fallback vectors
/*const [jobs, setJobs] = useState(initialJobs);
const [applications, setApplications] = useState(initialApplications);
*/

// 3. Optional: Initialize storage so the values persist across reloads
useEffect(() => {
  if (!localStorage.getItem("hireflow_jobs")) {
    localStorage.setItem("hireflow_jobs", JSON.stringify(initialJobs));
  }
  if (!localStorage.getItem("hireflow_applications")) {
    localStorage.setItem("hireflow_applications", JSON.stringify(initialApplications));
  }
}, []);