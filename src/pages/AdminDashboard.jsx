import React, { useState } from 'react';

export default function AdminDashboard() {
  const [jobs] = useState([
    { id: "101", title: "React Native Developer", category: "IT", status: "ACTIVE" },
    { id: "102", title: "UI/UX Product Designer", category: "Design", status: "ACTIVE" },
    { id: "103", title: "Data Analyst", category: "IT", status: "CLOSED" },
    { id: "104", title: "Marketing Manager", category: "Marketing", status: "ACTIVE" }
  ]);

  const [applicants] = useState([
    { id: "a1", name: "Ananya Iyer", appliedFor: "React Native Developer", email: "ananya@example.com" },
    { id: "a2", name: "Ananya Iyer", appliedFor: "UI/UX Product Designer", email: "ananya@example.com" }
  ]);

  // 📈 Interactive pop-up overlay state handlers
  const [barTooltip, setBarTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
  const [pieTooltip, setPieTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <div style={{ width: '240px', background: '#1e293b', color: '#fff', padding: '20px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '40px', fontWeight: 'bold' }}>Admin Portal</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ background: '#334155', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Dashboard</div>
          <div style={{ padding: '12px', opacity: 0.7, cursor: 'pointer' }}>Manage Jobs</div>
          <div style={{ padding: '12px', opacity: 0.7, cursor: 'pointer' }}>Applicants</div>
        </div>
      </div>

      {/* Main Content View Frame */}
      <div style={{ flex: 1, padding: '30px' }}>
        
        {/* Upper Toolbar Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a' }}>Analytics Dashboard</h1>
          <div>
            <span>Welcome, <strong>Admin</strong></span>
          </div>
        </div>

        {/* 4 Status Matrix Indicator Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "TOTAL JOBS POSTED", val: 22 },
            { title: "TOTAL APPLICATIONS", val: 4 },
            { title: "REGISTERED USERS", val: "4" },
            { title: "ACTIVE OPENINGS", val: 22 }
          ].map((card, i) => (
            <div key={i} style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderTop: '4px solid #3b82f6' }}>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>{card.title}</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>{card.val}</p>
            </div>
          ))}
        </div>

        {/* CHARTS BLOCK WITH TEXT POP-UPS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
          
          {/* Applications per Job Listing (Bar Graph) */}
          <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>Applications per Job Listing</h3>
            
            {/* Pop-up text overlay for Bar Chart */}
            {barTooltip.visible && (
              <div style={{ position: 'absolute', top: barTooltip.y - 40, left: barTooltip.x - 50, background: '#1e293b', color: '#fff', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
                {barTooltip.text}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px', borderLeft: '2px solid #cbd5e1', borderBottom: '2px solid #cbd5e1', padding: '10px 20px' }}>
              {[
                { label: "React Native", height: '160px', apps: "1 Application" },
                { label: "UI/UX Prod", height: '160px', apps: "1 Application" },
                { label: "Data Analyst", height: '20px', apps: "0 Applications" },
                { label: "Marketing", height: '20px', apps: "0 Applications" }
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
          </div>

          {/* Jobs distributed by Category (Pie Chart) */}
          <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '15px', width: '100%', textAlign: 'left' }}>Jobs distributed by Category</h3>
            
            {/* Pop-up text overlay for Pie Chart */}
            {pieTooltip.visible && (
              <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', background: '#1e293b', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10 }}>
                {pieTooltip.text}
              </div>
            )}

            <svg 
              width="200" 
              height="200" 
              viewBox="0 0 32 32" 
              style={{ transform: 'rotate(-90deg)', borderRadius: '50%', cursor: 'pointer' }}
              onMouseEnter={() => setPieTooltip({ visible: true, text: "IT: 50% | Design: 25% | Marketing: 25%" })}
              onMouseLeave={() => setPieTooltip({ ...pieTooltip, visible: false })}
            >
              <circle r="16" cx="16" cy="16" fill="transparent" stroke="#22c55e" strokeWidth="32" strokeDasharray="25 100" />
              <circle r="16" cx="16" cy="16" fill="transparent" stroke="#f59e0b" strokeWidth="32" strokeDasharray="25 100" strokeDashoffset="-25" />
              <circle r="16" cx="16" cy="16" fill="transparent" stroke="#3b82f6" strokeWidth="32" strokeDasharray="50 100" strokeDashoffset="-50" />
            </svg>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><b style={{ color: '#3b82f6' }}>■</b> IT</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><b style={{ color: '#22c55e' }}>■</b> Design</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><b style={{ color: '#f59e0b' }}>■</b> Marketing</span>
            </div>
          </div>

        </div>

        {/* Bottom Data Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px' }}>
          
          {/* Job Listings List */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '15px', color: '#1e293b' }}>Recent Job Listings</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '12px 8px' }}>Job Title</th>
                  <th style={{ padding: '12px 8px' }}>Category</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '500' }}>{job.title}</td>
                    <td style={{ padding: '12px 8px' }}>{job.category}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{ background: job.status === 'ACTIVE' ? '#dcfce7' : '#fee2e2', color: job.status === 'ACTIVE' ? '#15803d' : '#b91c1c', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Incoming Candidate Tracking Feed */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '15px', color: '#1e293b' }}>Recent Applicants</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '12px 8px' }}>Applicant Name</th>
                  <th style={{ padding: '12px 8px' }}>Applied For</th>
                  <th style={{ padding: '12px 8px' }}>Email ID</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '500' }}>{app.name}</td>
                    <td style={{ padding: '12px 8px' }}>{app.appliedFor}</td>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>{app.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}