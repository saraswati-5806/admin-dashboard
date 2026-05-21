import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

export default function AdminDashboard() {
  // --- STATE MANAGEMENT ---
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  
  const currentUser = {
    name: 'Employer1',
    email: 'emp123@nova.com',
    role: 'Employer'
  };

  // --- STABILIZED INITIALIZATION ENGINE ---
  useEffect(() => {
    // 1. Force Setup Users
    let savedUsers = [];
    try {
      savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    } catch (e) { savedUsers = []; }
    
    if (!Array.isArray(savedUsers) || savedUsers.length === 0) {
      savedUsers = [{
        name: 'Employer1',
        email: 'emp123@nova.com',
        password: 'emp123',
        role: 'Employer'
      }];
      localStorage.setItem('users', JSON.stringify(savedUsers));
    }
    setUsers(savedUsers);

    // 2. Force Setup Jobs Owned by Employer1
    let savedJobs = [];
    try {
      savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    } catch (e) { savedJobs = []; }

    if (!Array.isArray(savedJobs) || savedJobs.length === 0) {
      savedJobs = [
        { id: '1', title: 'Web Developer', company: 'Nova Solutions', location: 'Mumbai', salary: '₹8,00,000', status: 'active', postedBy: 'emp123@nova.com' },
        { id: '2', title: 'UI/UX Designer', company: 'Nova Solutions', location: 'Pune', salary: '₹6,50,000', status: 'active', postedBy: 'emp123@nova.com' },
        { id: '3', title: 'Software Engineer', company: 'Tech Corp', location: 'Bangalore', salary: '₹12,00,000', status: 'active', postedBy: 'emp123@nova.com' },
        { id: '4', title: 'Data Analyst', company: 'Data Insights', location: 'Remote', salary: '₹7,00,000', status: 'active', postedBy: 'emp123@nova.com' }
      ];
      localStorage.setItem('jobs', JSON.stringify(savedJobs));
    }
    setJobs(savedJobs);

    // 3. Force Setup Applications
    let savedApps = [];
    try {
      savedApps = JSON.parse(localStorage.getItem('applications')) || [];
    } catch (e) { savedApps = []; }

    if (!Array.isArray(savedApps) || savedApps.length === 0) {
      savedApps = [
        { id: 'a1', name: 'Amit Sharma', email: 'amit@gmail.com', appliedFor: 'Web Developer' },
        { id: 'a2', name: 'Priya Patel', email: 'priya@gmail.com', appliedFor: 'Web Developer' },
        { id: 'a3', name: 'Rohan Das', email: 'rohan@gmail.com', appliedFor: 'UI/UX Designer' }
      ];
      localStorage.setItem('applications', JSON.stringify(savedApps));
    }
    setApplications(savedApps);
  }, []);

  // --- OPERATIONS ENGINE ---
  const handleAddNewJob = () => {
    const jobTitle = prompt("Enter Job Title:");
    if (!jobTitle) return;
    const companyName = prompt("Enter Company Name:", "Nova Solutions");
    const cityLoc = prompt("Enter Location:", "Mumbai");
    const basicSalary = prompt("Enter Salary package:", "₹6,0,000");

    const newJobObj = {
      id: String(Date.now()),
      title: jobTitle,
      company: companyName || 'Nova Solutions',
      location: cityLoc || 'Remote',
      salary: basicSalary || 'Negotiable',
      status: 'active',
      postedBy: currentUser.email
    };

    const updated = [newJobObj, ...jobs];
    setJobs(updated);
    localStorage.setItem('jobs', JSON.stringify(updated));
  };

  const handleDeleteJob = (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job profile?")) return;
    const updatedJobs = jobs.filter(j => String(j.id) !== String(jobId));
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const handleEditJob = (jobId) => {
    const targetJob = jobs.find(j => String(j.id) === String(jobId));
    const newTitle = prompt("Edit Job Title:", targetJob?.title || '');
    if (!newTitle) return;

    const updatedJobs = jobs.map(j => String(j.id) === String(jobId) ? { ...j, title: newTitle } : j);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  // --- FILTERS & INTERFACES DATA FORMATTING ---
  const filteredJobs = jobs.filter(job => {
    const titleMatch = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const companyMatch = (job.company || '').toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = locationFilter === 'all' || (job.location || '').toLowerCase() === locationFilter.toLowerCase();
    return (titleMatch || companyMatch) && locationMatch;
  });

  const barChartData = jobs.map(job => ({
    name: job.title || 'Untitled',
    Applications: applications.filter(app => (app.appliedFor || '').toLowerCase() === (job.title || '').toLowerCase()).length
  }));

  const locationCounts = jobs.reduce((acc, j) => {
    const city = j.location || 'Remote';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(locationCounts).map(loc => ({
    name: loc,
    value: locationCounts[loc]
  }));

  const COLORS = ['#2e6da4', '#27ae60', '#e67e22', '#9b59b6', '#e74c3c'];

  return (
    <div style={styles.container}>
      {/* SIDEBAR PANEL */}
      <aside style={styles.sidebar}>
        <div style={styles.brandTitle}>HireFlow Studio</div>
        <div style={styles.profileBox}>
          <div style={styles.onlineDot} />
          <span>User: <strong>{currentUser.name}</strong></span>
        </div>
        <nav style={styles.navMenu}>
          <a href="#employer" style={{...styles.navLink, ...styles.activeNavLink}}>💼 Employer Desk</a>
          <a href="#admin" style={styles.navLink}>📊 Admin Analytics Panel</a>
        </nav>
      </aside>

      {/* CORE FRAMEWORK CONTROLLER PANEL */}
      <div style={styles.mainContent}>
        <header style={styles.topNavbar}>
          <div style={styles.searchBarRow}>
            <input
              type="text"
              placeholder="🔍 Filter job cards..."
              style={styles.inputField}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              style={styles.dropdownField}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {Object.keys(locationCounts).map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <button style={styles.addJobPrimaryBtn} onClick={handleAddNewJob}>+ Add New Posting</button>
        </header>

        {/* --- SECTION 1: EMPLOYER DASHBOARD CARDS WORKSPACE --- */}
        <section style={styles.workspaceSection}>
          <h2 style={styles.sectionTitle}>💼 Employer Workspace — Job Cards & Candidate Pipelines</h2>
          <div style={styles.cardsGridContainer}>
            {filteredJobs.length === 0 ? (
              <p style={styles.emptyMessageText}>No active job cards found.</p>
            ) : (
              filteredJobs.map((job) => {
                const linkedApps = applications.filter(app => (app.appliedFor || '').toLowerCase() === (job.title || '').toLowerCase());
                return (
                  <div key={job.id} style={styles.employerJobCard}>
                    <div style={styles.jobCardHeader}>
                      <div>
                        <h3 style={styles.jobTitleHeading}>{job.title}</h3>
                        <p style={styles.jobSubText}>🏢 {job.company} • 📍 {job.location}</p>
                      </div>
                      <span style={styles.salaryBadge}>{job.salary}</span>
                    </div>
                    <div style={styles.cardActionsRow}>
                      <button style={styles.cardEditBtn} onClick={() => handleEditJob(job.id)}>Edit Title</button>
                      <button style={styles.cardDeleteBtn} onClick={() => handleDeleteJob(job.id)}>Delete Post</button>
                    </div>
                    <div style={styles.applicantsContainerSection}>
                      <h4 style={styles.applicantsPanelTitle}>Applied Candidates ({linkedApps.length})</h4>
                      {linkedApps.length === 0 ? (
                        <p style={styles.noApplicantsText}>No active applicants linked yet.</p>
                      ) : (
                        <div style={styles.applicantsStackLayout}>
                          {linkedApps.map((app) => (
                            <div key={app.id} style={styles.candidateProfileCard}>
                              <div style={styles.miniUserAvatar}>{(app.name || 'C').charAt(0)}</div>
                              <div>
                                <div style={styles.candidateNameText}>{app.name}</div>
                                <div style={styles.candidateEmailText}>✉️ {app.email}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '10px 0' }} />

        {/* --- SECTION 2: GLOBAL ADMIN METRICS WORKSPACE --- */}
        <section style={styles.workspaceSection}>
          <h2 style={styles.sectionTitle}>📊 Admin Global Analytics Panel Engine</h2>
          <div style={styles.kpiGridContainer}>
            <div style={{ ...styles.kpiCard, backgroundColor: '#2e6da4' }}>
              <div><div style={styles.kpiLabel}>Global Jobs</div><div style={styles.kpiValue}>{jobs.length}</div></div>
              <span style={styles.kpiLargeIcon}>💼</span>
            </div>
            <div style={{ ...styles.kpiCard, backgroundColor: '#27ae60' }}>
              <div><div style={styles.kpiLabel}>Total Applicants</div><div style={styles.kpiValue}>{applications.length}</div></div>
              <span style={styles.kpiLargeIcon}>📄</span>
            </div>
            <div style={{ ...styles.kpiCard, backgroundColor: '#8e44ad' }}>
              <div><div style={styles.kpiLabel}>Total Users</div><div style={styles.kpiValue}>{users.length}</div></div>
              <span style={styles.kpiLargeIcon}>👥</span>
            </div>
            <div style={{ ...styles.kpiCard, backgroundColor: '#d35400' }}>
              <div><div style={styles.kpiLabel}>Active Openings</div><div style={styles.kpiValue}>{jobs.length}</div></div>
              <span style={styles.kpiLargeIcon}>🔥</span>
            </div>
          </div>

          <div style={styles.adminSplitGrid}>
            <div style={styles.adminTableWrapperCard}>
              <h3 style={styles.panelBlockTitle}>System Data Matrix Summary</h3>
              <table style={styles.dataTable}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeaderCell}>Job Title</th>
                    <th style={styles.tableHeaderCell}>Location</th>
                    <th style={styles.tableHeaderCell}>Owner Account</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} style={styles.tableDataRow}>
                      <td style={styles.tableCell}><strong>{job.title}</strong></td>
                      <td style={styles.tableCell}>{job.location}</td>
                      <td style={styles.tableCell}><span style={styles.ownerTag}>{job.postedBy}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.chartsColumnWrapper}>
              <div style={styles.chartVisualCard}>
                <h4 style={styles.chartBlockHeading}>Job Applications Volume Matrix</h4>
                <div style={{ width: '100%', height: 160 }}>
                  <ResponsiveContainer>
                    <BarChart data={barChartData}>
                      <XAxis dataKey="name" stroke="#7f8c8d" fontSize={9} tickLine={false} />
                      <YAxis allowDecimals={false} stroke="#7f8c8d" fontSize={9} />
                      <Tooltip />
                      <Bar dataKey="Applications" fill="#2e6da4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={styles.chartVisualCard}>
                <h4 style={styles.chartBlockHeading}>Regional Jobs Proportions Slice</h4>
                <div style={{ width: '100%', height: 160 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Styling Object Matrix
const styles = {
  container: { display: 'flex', height: '100vh', width: '100vw', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', overflow: 'hidden' },
  sidebar: { width: '220px', backgroundColor: '#0f172a', color: '#f8fafc', display: 'flex', flexDirection: 'column', padding: '20px' },
  brandTitle: { fontSize: '1.3rem', fontWeight: 'bold', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '12px', color: '#38bdf8', textAlign: 'center' },
  profileBox: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '20px', backgroundColor: '#1e293b', padding: '6px 10px', borderRadius: '4px' },
  onlineDot: { width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '6px' },
  navLink: { padding: '10px 14px', color: '#94a3b8', textDecoration: 'none', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '500' },
  activeNavLink: { color: '#ffffff', backgroundColor: '#334155', borderLeft: '4px solid #38bdf8' },
  mainContent: { flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '20px', gap: '20px' },
  topNavbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px 18px', borderRadius: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' },
  searchBarRow: { display: 'flex', gap: '10px', flex: 1, marginRight: '15px' },
  inputField: { flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' },
  dropdownField: { width: '150px', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '0.85rem' },
  addJobPrimaryBtn: { backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
  workspaceSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  sectionTitle: { margin: 0, fontSize: '1.15rem', color: '#0f172a', fontWeight: '700' },
  cardsGridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' },
  emptyMessageText: { color: '#64748b', fontStyle: 'italic' },
  employerJobCard: { backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' },
  jobCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start' },
  jobTitleHeading: { margin: '0 0 2px 0', fontSize: '1.05rem', color: '#1e293b', fontWeight: '600' },
  jobSubText: { margin: 0, fontSize: '0.8rem', color: '#64748b' },
  salaryBadge: { backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '15px', fontSize: '0.78rem', fontWeight: '600' },
  cardActionsRow: { display: 'flex', gap: '8px' },
  cardEditBtn: { flex: 1, backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' },
  cardDeleteBtn: { flex: 1, backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' },
  applicantsContainerSection: { backgroundColor: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #edf2f7' },
  applicantsPanelTitle: { margin: '0 0 8px 0', fontSize: '0.8rem', color: '#334155', fontWeight: '700' },
  noApplicantsText: { margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' },
  applicantsStackLayout: { display: 'flex', flexDirection: 'column', gap: '6px' },
  candidateProfileCard: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e2e8f0' },
  miniUserAvatar: { width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem' },
  candidateNameText: { fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' },
  candidateEmailText: { fontSize: '0.72rem', color: '#64748b' },
  kpiGridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' },
  kpiCard: { padding: '12px 15px', borderRadius: '6px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  kpiLabel: { fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase' },
  kpiValue: { fontSize: '1.5rem', fontWeight: 'bold' },
  kpiLargeIcon: { fontSize: '1.5rem', opacity: 0.3 },
  adminSplitGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  adminTableWrapperCard: { backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '15px' },
  panelBlockTitle: { margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' },
  dataTable: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeaderRow: { borderBottom: '2px solid #edf2f7' },
  tableHeaderCell: { padding: '8px', fontSize: '0.75rem', color: '#64748b' },
  tableDataRow: { borderBottom: '1px solid #f1f5f9' },
  tableCell: { padding: '10px 8px', fontSize: '0.8rem', color: '#334155' },
  ownerTag: { backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 4px', borderRadius: '4px', fontSize: '0.7rem' },
  chartsColumnWrapper: { display: 'flex', flexDirection: 'column', gap: '15px' },
  chartVisualCard: { backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px' },
  chartBlockHeading: { margin: '0 0 8px 0', fontSize: '0.8rem', color: '#1e293b', fontWeight: '600' }
};