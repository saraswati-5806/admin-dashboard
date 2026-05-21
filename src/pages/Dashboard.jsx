import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🚀 Added for parameter navigation

export default function Dashboard() {
  const navigate = useNavigate(); // 🚀 Navigation hook instance
  
  const [jobs, setJobsState] = useState([
    { id: 1, title: "React Native Developer", location: "Mumbai, MH", salary: "12-16 LPA", status: "ACTIVE" },
    { id: 2, title: "Cloud Security Specialist", location: "Remote", salary: "18-24 LPA", status: "ACTIVE" },
    { id: 3, title: "UI/UX Product Designer", location: "Bangalore, KA", salary: "9-14 LPA", status: "ACTIVE" },
    { id: 4, title: "Lead DevOps Architect", location: "Pune, MH", salary: "22-28 LPA", status: "ACTIVE" },
    { id: 5, title: "Data Platform Engineer", location: "Hyderabad, TS", salary: "15-20 LPA", status: "ACTIVE" },
    { id: 6, title: "Staff Backend Engineer", location: "Remote", salary: "20-26 LPA", status: "ACTIVE" },
    { id: 7, title: "QA Automation Engineer", location: "Chennai, TN", salary: "8-11 LPA", status: "ACTIVE" },
    { id: 8, title: "Technical Product Manager", location: "Mumbai, MH", salary: "16-22 LPA", status: "ACTIVE" },
    { id: 9, title: "Frontend Core Specialist", location: "Remote", salary: "11-15 LPA", status: "ACTIVE" },
    { id: 10, title: "AI/ML Integration Lead", location: "Bangalore, KA", salary: "25-35 LPA", status: "ACTIVE" },
    { id: 11, title: "Full Stack Engineer", location: "Delhi, NCR", salary: "10-14 LPA", status: "ACTIVE" },
    { id: 12, title: "Solutions Consultant", location: "Remote", salary: "14-19 LPA", status: "ACTIVE" },
    { id: 13, title: "Scrum Master Facilitator", location: "Pune, MH", salary: "9-13 LPA", status: "ACTIVE" },
    { id: 14, title: "Cyber Security Analyst", location: "Hyderabad, TS", salary: "12-17 LPA", status: "ACTIVE" },
    { id: 15, title: "Site Reliability Specialist", location: "Remote", salary: "14-20 LPA", status: "ACTIVE" },
    { id: 16, title: "Database Operations Engineer", location: "Chennai, TN", salary: "11-16 LPA", status: "ACTIVE" },
    { id: 17, title: "Technical Writer Lead", location: "Remote", salary: "7-10 LPA", status: "ACTIVE" },
    { id: 18, title: "Infrastructure Security Architect", location: "Bangalore, KA", salary: "24-30 LPA", status: "ACTIVE" },
    { id: 19, title: "iOS Application Engineer", location: "Mumbai, MH", salary: "13-18 LPA", status: "ACTIVE" },
    { id: 20, title: "Data Analyst Executive", location: "Pune, MH", salary: "8-12 LPA", status: "ACTIVE" },
    { id: 21, title: "Cloud FinOps Manager", location: "Remote", salary: "15-21 LPA", status: "ACTIVE" },
    { id: 22, title: "Principal Systems Engineer", location: "Bangalore, KA", salary: "30-40 LPA", status: "ACTIVE" }
  ]);

  const handleDeleteJob = (id, e) => {
    e.stopPropagation(); // Prevents clicking delete from opening description page
    setJobsState(jobs.filter(job => job.id !== id));
  };

  const handleEditJob = (id, e) => {
    e.stopPropagation(); // Prevents clicking edit from opening description page
    alert(`Editing job parameter node: ID #${id}`);
  };

  const handleAddJob = () => {
    const title = prompt("Enter Job Title:");
    if (!title) return;
    const location = prompt("Enter Location (e.g., Remote, Mumbai):") || "Remote";
    const salary = prompt("Enter Salary Package (e.g., 12-15 LPA):") || "Negotiable";
    
    const newJob = {
      id: Date.now(),
      title,
      location,
      salary,
      status: "ACTIVE"
    };
    setJobsState([newJob, ...jobs]);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Segoe UI", sans-serif' }}>
      <div style={{ padding: '40px' }}>
        
        {/* Title Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 5px 0' }}>Operational Control Dashboard</h1>
            <p style={{ margin: 0, color: '#64748b' }}>Logged in Node: <strong style={{ color: '#0ea5e9' }}>Employer 1 Panel (Employer)</strong></p>
          </div>
          {/* ➕ CLICKABLE: Add Job Button wired */}
          <button 
            onClick={handleAddJob}
            style={{ backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0ea5e9'}
          >
            ➕ Inject New Job Listing
          </button>
        </div>

        {/* 4 Status Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {[
            { title: "TOTAL JOBS POSTED", val: jobs.length, color: '#3b82f6' },
            { title: "TOTAL APPLICATIONS", val: "2", color: '#10b981' },
            { title: "REGISTERED USERS", val: "2", color: '#f59e0b' },
            { title: "ACTIVE OPENINGS", val: jobs.filter(j => j.status === 'ACTIVE').length, color: '#ec4899' }
          ].map((card, i) => (
            <div key={i} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderTop: `4px solid ${card.color}` }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', margin: '0 0 8px 0' }}>{card.title}</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>{card.val}</p>
            </div>
          ))}
        </div>

        {/* Content Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }}>
          
          {/* Left Side: Jobs */}
          <div>
            <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px', fontWeight: '600' }}>Active System Allocation Records ({jobs.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {jobs.map(job => (
                /* 🎯 CLICKABLE: Clicking the entire card navigates to inspect details configuration parameter view */
                <div 
                  key={job.id} 
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.15s, border-color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
                  title="Click to inspect description parameters"
                >
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>{job.title}</h4>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>📍 {job.location} | 💰 {job.salary}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* 🛠️ CLICKABLE: Edit and Delete Buttons mapped */}
                    <button 
                      onClick={(e) => handleEditJob(job.id, e)}
                      style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={(e) => handleDeleteJob(job.id, e)}
                      style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Applicants */}
          <div>
            <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px', fontWeight: '600' }}>Submitted Applicant Streams</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#10b981', fontWeight: '600' }}>React Native Developer</h4>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '14px', color: '#334155' }}>👤 Ananya Iyer</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>"Passionate mobile engineer with 2+ years React Native experience."</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#3b82f6', fontWeight: '600' }}>UI/UX Product Designer</h4>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '14px', color: '#334155' }}>👤 Ananya Iyer</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>"Expert in product dashboard UI patterns and prototyping."</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}