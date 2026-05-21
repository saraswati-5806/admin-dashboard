import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function AdminDashboard() {
  // --- 1. DATA SOURCING & STATE MANAGEMENT ---
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  // Load Data safely from LocalStorage on component mount
  useEffect(() => {
    const rawJobs = JSON.parse(localStorage.getItem('hireflow_jobs')) || [];
    const rawApps = JSON.parse(localStorage.getItem('hireflow_applications')) || [];
    const rawUsers = JSON.parse(localStorage.getItem('hireflow_users')) || [];

    setJobs(rawJobs);
    setApplications(rawApps);
    setUsers(rawUsers);
  }, []);

  // --- 2. SAFE DATA MUTATION MANAGERS (DELETE ACTIONS) ---
  const handleDeleteJob = (jobId) => {
    // Filter out the job item securely
    const updatedJobs = jobs.filter((job, index) => {
      const currentId = job.id || (index + 1);
      return String(currentId) !== String(jobId);
    });
    
    // Also remove applications tied to this specific job title to remain unified
    const jobToDelete = jobs.find((job, index) => String(job.id || (index + 1)) === String(jobId));
    const deleteTitle = jobToDelete ? (jobToDelete.title || jobToDelete.designation || jobToDelete.role) : '';
    
    const updatedApps = applications.filter(app => {
      const appJobTitle = app.appliedFor || app.jobTitle || '';
      return appJobTitle !== deleteTitle;
    });

    // Save states back down into localized storage variables instantly
    setJobs(updatedJobs);
    setApplications(updatedApps);
    localStorage.setItem('hireflow_jobs', JSON.stringify(updatedJobs));
    localStorage.setItem('hireflow_applications', JSON.stringify(updatedApps));
  };

  // --- 3. DYNAMIC METRIC COMPILER LOGIC ---
  const totalJobsCount = jobs.length;
  const totalAppsCount = applications.length;
  const totalUsersCount = users.length;
  const activeJobsCount = jobs.filter(job => {
    const currentStatus = (job.status || 'active').toLowerCase();
    return currentStatus === 'active' || currentStatus === 'open';
  }).length;

  // Extract unique locations dynamically for search bar filter drop-downs
  const uniqueLocations = [...new Set(jobs.map(job => job.location || job.city || 'Remote').filter(Boolean))];

  // --- 4. DATA FILTER MATCHING COMPILER ---
  const filteredJobs = jobs.filter(job => {
    const title = (job.title || job.designation || job.role || '').toLowerCase();
    const company = (job.company || '').toLowerCase();
    const loc = (job.location || job.city || 'Remote').toLowerCase();

    const matchesSearch = title.includes(searchQuery.toLowerCase()) || company.includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || loc === locationFilter.toLowerCase();

    return matchesSearch && matchesLocation;
  });

  // --- 5. RECHARTS GRAPH ENGINE COMPILER ---
  // Chart A: Applications Distribution Volume Matrix
  const barChartData = jobs.map((job, index) => {
    const jobTitle = job.title || job.designation || job.role || `Job #${index + 1}`;
    const matchCount = applications.filter(app => {
      const appTitle = app.appliedFor || app.jobTitle || '';
      return appTitle.toLowerCase() === jobTitle.toLowerCase();
    }).length;

    return { name: jobTitle, Applications: matchCount };
  });

  // Chart B: Geographic Proportions Slices Matrix
  const locationCounts = jobs.reduce((acc, job) => {
    const cityKey = job.location || job.city || 'Remote';
    acc[cityKey] = (acc[cityKey] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(locationCounts).map(city => ({
    name: city,
    value: locationCounts[city]
  }));

  const COLORS = ['#2e6da4', '#4caf50', '#ff9800', '#9c27b0', '#e74c3c', '#00bcd4'];

  return (
    <div style={styles.dashboardContainer}>
      {/* --- SIDEBAR WORKSPACE LEFT --- */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>HireFlow Portal</h2>
        </div>
        <nav style={styles.sidebarMenu}>
          <a href="#dashboard" style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}>
            📊 Dashboard
          </a>
          <a href="#jobs" style={styles.sidebarLink}>
            💼 Jobs & Applicants
          </a>
          <a href="#analytics" style={styles.sidebarLink}>
            📈 Analytics
          </a>
          <a href="#settings" style={styles.sidebarLink}>
            ⚙️ Settings
          </a>
        </nav>
      </aside>

      {/* --- MAIN MAIN AREA RIGHT --- */}
      <div style={styles.mainLayout}>
        <header style={styles.navbar}>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#2c3e50' }}>Admin Analytics Dashboard</h1>
          <div style={styles.navProfile}>
            <span style={{ fontWeight: 500 }}>Welcome, Admin</span>
            <button style={styles.logoutBtn} onClick={() => alert('Logging out...')}>Logout</button>
          </div>
        </header>

        <main style={styles.contentWrapper}>
          {/* --- TOP ROW STAT CARDS (KPI BLOCK) --- */}
          <section style={styles.statCardsContainer}>
            <div style={{ ...styles.card, ...styles.cardBlue }}>
              <div>
                <h3 style={styles.cardHeader}>Total Jobs</h3>
                <p style={styles.cardMetric}>{totalJobsCount}</p>
              </div>
              <span style={styles.cardIcon}>💼</span>
            </div>
            <div style={{ ...styles.card, ...styles.cardGreen }}>
              <div>
                <h3 style={styles.cardHeader}>Applications</h3>
                <p style={styles.cardMetric}>{totalAppsCount}</p>
              </div>
              <span style={styles.cardIcon}>📄</span>
            </div>
            <div style={{ ...styles.card, ...styles.cardPurple }}>
              <div>
                <h3 style={styles.cardHeader}>Registered Users</h3>
                <p style={styles.cardMetric}>{totalUsersCount}</p>
              </div>
              <span style={styles.cardIcon}>👥</span>
            </div>
            <div style={{ ...styles.card, ...styles.cardRed }}>
              <div>
                <h3 style={styles.cardHeader}>Active Openings</h3>
                <p style={styles.cardMetric}>{activeJobsCount}</p>
              </div>
              <span style={styles.cardIcon}>🔥</span>
            </div>
          </section>

          {/* --- MIDDLE INTERACTIVE CONTROL TOOLBAR --- */}
          <section style={styles.filterWrapper}>
            <input
              type="text"
              placeholder="🔍 Search jobs by title or company..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              style={styles.filterDropdown}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </section>

          {/* --- BOTTOM ROW COMPONENT INTERACTIVE SPLITS --- */}
          <div style={styles.bottomGrid}>
            
            {/* LEFT AREA: INTERACTIVE CARD PROFILE FEEDS */}
            <section style={styles.leftProfileArea}>
              <h3 style={styles.sectionHeading}>Active Job Profiles & Candidates</h3>
              {filteredJobs.length === 0 ? (
                <p style={{ color: '#7f8c8d', textAlign: 'center', padding: '20px' }}>No matching items located.</p>
              ) : (
                filteredJobs.map((job, index) => {
                  const displayId = job.id || (index + 1);
                  const displayTitle = job.title || job.designation || job.role || 'Untitled Role';
                  const displayCompany = job.company || 'Private Corporation';
                  const displayLocation = job.location || job.city || 'Remote';
                  const displaySalary = job.salary || 'Not Specified';

                  // Filter applicants explicitly tied to this position title block
                  const assignedApplicants = applications.filter(app => {
                    const targetJob = app.appliedFor || app.jobTitle || '';
                    return targetJob.toLowerCase() === displayTitle.toLowerCase();
                  });

                  return (
                    <div key={displayId} style={styles.jobCard}>
                      <div style={styles.jobCardMainInfo}>
                        <div style={styles.avatarBubble}>
                          {displayTitle.substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 4px 0', color: '#2c3e50' }}>{displayTitle}</h4>
                          <p style={{ margin: '0 0 4px 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                            🏢 {displayCompany} • 📍 {displayLocation} • 💰 {displaySalary}
                          </p>
                        </div>
                        <div style={styles.actionBtnGroup}>
                          <button style={styles.editBtn} onClick={() => alert(`Editing Job #${displayId}`)}>Edit</button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteJob(displayId)}>Delete</button>
                        </div>
                      </div>

                      {/* Nested Candidate Sub-lists block matching Video Interface */}
                      <div style={styles.applicantBadgeSection}>
                        <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#34495e' }}>
                          Applicants Assigned ({assignedApplicants.length})
                        </h5>
                        {assignedApplicants.length === 0 ? (
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#95a5a6', fontStyle: 'italic' }}>
                            No candidates applied yet.
                          </p>
                        ) : (
                          <div style={styles.badgeWrapper}>
                            {assignedApplicants.map((app, i) => (
                              <div key={i} style={styles.applicantBadge} title={app.email || 'No Email'}>
                                <div style={styles.miniAvatar}>{(app.name || app.applicantName || 'A').charAt(0)}</div>
                                <span>{app.name || app.applicantName || 'Anonymous'}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </section>

            {/* RIGHT AREA: GRAPH METRICS DISPLAY ENGINE */}
            <section style={styles.rightChartsArea}>
              
              <div style={styles.chartBox}>
                <h4 style={styles.chartTitle}>Job Applications Analytics</h4>
                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <BarChart data={barChartData}>
                      <XAxis dataKey="name" stroke="#7f8c8d" fontSize={11} tickLine={false} />
                      <YAxis allowDecimals={false} stroke="#7f8c8d" fontSize={11} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="Applications" fill="#2e6da4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={styles.chartBox}>
                <h4 style={styles.chartTitle}>Jobs Distributed by Location</h4>
                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- 6. CLEAN INTEGRATED STYLING SYSTEM DICTIONARY ---
const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#f4f6f9',
    overflow: 'hidden'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1e2229',
    color: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarBrand: {
    padding: '24px 20px',
    borderBottom: '1px solid #2c313c',
    textAlign: 'center'
  },
  sidebarMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0'
  },
  sidebarLink: {
    padding: '12px 20px',
    color: '#a0aab4',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s'
  },
  sidebarLinkActive: {
    color: '#fff',
    backgroundColor: '#2c313c',
    borderLeft: '4px solid #2e6da4'
  },
  mainLayout: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  navbar: {
    height: '65px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'between',
    padding: '0 25px',
    justifyContent: 'space-between'
  },
  navProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '0.95rem',
    color: '#34495e'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600
  },
  contentWrapper: {
    flex: 1,
    padding: '25px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  statCardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.04)'
  },
  cardBlue: { backgroundColor: '#2e6da4' },
  cardGreen: { backgroundColor: '#27ae60' },
  cardPurple: { backgroundColor: '#8e44ad' },
  cardRed: { backgroundColor: '#d35400' },
  cardHeader: { margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 400, opacity: 0.9, textTransform: 'uppercase' },
  cardMetric: { margin: 0, fontSize: '2rem', fontWeight: 700 },
  cardIcon: { fontSize: '2.2rem', opacity: 0.3 },
  filterWrapper: {
    display: 'flex',
    gap: '15px'
  },
  searchInput: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none'
  },
  filterDropdown: {
    width: '180px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: 'white',
    fontSize: '0.95rem',
    outline: 'none'
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '25px',
    alignItems: 'start'
  },
  leftProfileArea: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  sectionHeading: { margin: '0 0 5px 0', color: '#2c3e50', fontSize: '1.15rem' },
  jobCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '15px',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.2s'
  },
  jobCardMainInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderBottom: '1px dashed #e2e8f0',
    paddingBottom: '12px'
  },
  avatarBubble: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#eef2f7',
    color: '#2e6da4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  actionBtnGroup: {
    display: 'flex',
    gap: '8px'
  },
  editBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '5px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem'
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem'
  },
  applicantBadgeSection: {
    marginTop: '10px'
  },
  badgeWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '5px'
  },
  applicantBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#f1f5f9',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    color: '#475569',
    border: '1px solid #e2e8f0'
  },
  miniAvatar: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#2e6da4',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    fontWeight: 'bold'
  },
  rightChartsArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  chartBox: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  },
  chartTitle: { margin: '0 0 15px 0', color: '#2c3e50', fontSize: '1rem', fontWeight: 600 }
};