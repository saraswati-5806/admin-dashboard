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
  // --- 1. STATE INITIALIZATION MATRIX ---
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  // --- 2. MOUNT EFFECT LOGIC (MATCHED DIRECTLY TO YOUR NATIVE STRINGS) ---
  useEffect(() => {
    // Queries exact native system keys to synchronize data loops cleanly
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const savedApps = JSON.parse(localStorage.getItem('applications')) || [];
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    setJobs(savedJobs);
    setApplications(savedApps);
    setUsers(savedUsers);
  }, []);

  // --- 3. SECURE CARD DELETION ACTIONS ---
  const handleDeleteJob = (jobId) => {
    const updatedJobs = jobs.filter((job, index) => {
      const currentId = job.id || (index + 1);
      return String(currentId) !== String(jobId);
    });
    
    const jobToDelete = jobs.find((job, index) => String(job.id || (index + 1)) === String(jobId));
    const targetTitle = jobToDelete ? (jobToDelete.title || jobToDelete.designation || jobToDelete.role) : '';
    
    const updatedApps = applications.filter(app => {
      const appJobTitle = app.appliedFor || app.jobTitle || '';
      return appJobTitle.toLowerCase() !== targetTitle.toLowerCase();
    });

    setJobs(updatedJobs);
    setApplications(updatedApps);
    
    // Save cleanly back to your native storage locations
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    localStorage.setItem('applications', JSON.stringify(updatedApps));
  };

  // --- 4. DATA METRIC SYNCHRONIZERS ---
  const totalJobsCount = jobs.length;
  const totalAppsCount = applications.length;
  const totalUsersCount = users.length;
  const activeJobsCount = jobs.filter(job => {
    const currentStatus = (job.status || 'active').toLowerCase();
    return currentStatus === 'active' || currentStatus === 'open';
  }).length;

  const uniqueLocations = [...new Set(jobs.map(job => job.location || job.city || 'Remote').filter(Boolean))];

  // --- 5. SEARCH FILTER STRINGS NORMALIZER ---
  const filteredJobs = jobs.filter(job => {
    const title = (job.title || job.designation || job.role || '').toLowerCase();
    const company = (job.company || '').toLowerCase();
    const loc = (job.location || job.city || 'Remote').toLowerCase();

    const matchesSearch = title.includes(searchQuery.toLowerCase()) || company.includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || loc === locationFilter.toLowerCase();

    return matchesSearch && matchesLocation;
  });

  // --- 6. VISUAL DATA DATASET MATRIX GENERATORS (RECHARTS) ---
  const barChartData = jobs.map((job, index) => {
    const jobTitle = job.title || job.designation || job.role || `Job #${index + 1}`;
    const matchCount = applications.filter(app => {
      const appTitle = app.appliedFor || app.jobTitle || '';
      return appTitle.toLowerCase() === jobTitle.toLowerCase();
    }).length;

    return { name: jobTitle, Applications: matchCount };
  });

  const locationCounts = jobs.reduce((acc, job) => {
    const cityKey = job.location || job.city || 'Remote';
    acc[cityKey] = (acc[cityKey] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(locationCounts).map(city => ({
    name: city,
    value: locationCounts[city]
  }));

  const COLORS = ['#2e6da4', '#4caf50', '#ff9800', '#9c27b0', '#e74c3c'];

  return (
    <div style={styles.dashboardContainer}>
      {/* --- SIDEBAR PANEL WORKSPACE --- */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>HireFlow Admin</h2>
        </div>
        <nav style={styles.sidebarMenu}>
          <a href="#dashboard" style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}>📊 Dashboard</a>
          <a href="#jobs" style={styles.sidebarLink}>💼 Jobs & Applicants</a>
          <a href="#analytics" style={styles.sidebarLink}>📈 Analytics</a>
        </nav>
      </aside>

      {/* --- MAIN CORE PANEL WORKSPACE --- */}
      <div style={styles.mainLayout}>
        <header style={styles.navbar}>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#2c3e50' }}>Admin Analytics Control Panel</h1>
          <div style={styles.navProfile}>
            <span>Welcome, Admin</span>
            <button style={styles.logoutBtn}>Logout</button>
          </div>
        </header>

        <main style={styles.contentWrapper}>
          {/* --- KPI STAT CARDS DISPLAY ROWS --- */}
          <section style={styles.statCardsContainer}>
            <div style={{ ...styles.card, ...styles.cardBlue }}>
              <div><h3 style={styles.cardHeader}>Total Jobs</h3><p style={styles.cardMetric}>{totalJobsCount}</p></div>
              <span style={styles.cardIcon}>💼</span>
            </div>
            <div style={{ ...styles.card, ...styles.cardGreen }}>
              <div><h3 style={styles.cardHeader}>Applications</h3><p style={styles.cardMetric}>{totalAppsCount}</p></div>
              <span style={styles.cardIcon}>📄</span>
            </div>
            <div style={{ ...styles.card, ...styles.cardPurple }}>
              <div><h3 style={styles.cardHeader}>Registered Users</h3><p style={styles.cardMetric}>{totalUsersCount}</p></div>
              <span style={styles.cardIcon}>👥</span>
            </div>
            <div style={{ ...styles.card, ...styles.cardRed }}>
              <div><h3 style={styles.cardHeader}>Active Openings</h3><p style={styles.cardMetric}>{activeJobsCount}</p></div>
              <span style={styles.cardIcon}>🔥</span>
            </div>
          </section>

          {/* --- INTERACTIVE STAT FILTERS TOOLBAR --- */}
          <section style={styles.filterWrapper}>
            <input
              type="text"
              placeholder="🔍 Filter matching profiles by title or enterprise..."
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

          {/* --- SPLIT DISPLAY FLEX CONTAINER INTERACTION PANELS --- */}
          <div style={styles.bottomGrid}>
            
            {/* LEFT COMPONENT COLUMN: ACTIVE CARDS PROFILE SUITE */}
            <section style={styles.leftProfileArea}>
              <h3 style={styles.sectionHeading}>Active Post Profiles & Tracking Pipelines</h3>
              {filteredJobs.length === 0 ? (
                <p style={{ color: '#7f8c8d', textAlign: 'center', padding: '20px' }}>No entries found inside the local workspace strings.</p>
              ) : (
                filteredJobs.map((job, index) => {
                  const displayId = job.id || (index + 1);
                  const displayTitle = job.title || job.designation || job.role || 'Untitled Role';
                  const displayCompany = job.company || 'Corporate Enterprise';
                  const displayLocation = job.location || job.city || 'Remote';
                  const displaySalary = job.salary || 'Negotiable';

                  const assignedApplicants = applications.filter(app => {
                    const targetJob = app.appliedFor || app.jobTitle || '';
                    return targetJob.toLowerCase() === displayTitle.toLowerCase();
                  });

                  return (
                    <div key={displayId} style={styles.jobCard}>
                      <div style={styles.jobCardMainInfo}>
                        <div style={styles.avatarBubble}>{displayTitle.substring(0, 2).toUpperCase()}</div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 4px 0', color: '#2c3e50', fontSize: '1.05rem' }}>{displayTitle}</h4>
                          <p style={{ margin: '0 0 4px 0', color: '#7f8c8d', fontSize: '0.88rem' }}>
                            🏢 {displayCompany} • 📍 {displayLocation} • 💰 {displaySalary}
                          </p>
                        </div>
                        <div style={styles.actionBtnGroup}>
                          <button style={styles.editBtn} onClick={() => alert(`Editing profile data hook: #${displayId}`)}>Edit</button>
                          <button style={styles.deleteBtn} onClick={() => handleDeleteJob(displayId)}>Delete</button>
                        </div>
                      </div>

                      {/* Nest candidate data lists cleanly below individual cards */}
                      <div style={styles.applicantBadgeSection}>
                        <h5 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', color: '#34495e' }}>
                          Candidates Applied ({assignedApplicants.length})
                        </h5>
                        {assignedApplicants.length === 0 ? (
                          <p style={{ margin: 0, fontSize: '0.78rem', color: '#95a5a6', fontStyle: 'italic' }}>No active applicants linked to this title.</p>
                        ) : (
                          <div style={styles.badgeWrapper}>
                            {assignedApplicants.map((app, i) => (
                              <div key={i} style={styles.applicantBadge}>
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

            {/* RIGHT COMPONENT COLUMN: RECHARTS GRAPH ENGINE MODULES */}
            <section style={styles.rightChartsArea}>
              <div style={styles.chartBox}>
                <h4 style={styles.chartTitle}>Job Applications Volume Matrix</h4>
                <div style={{ width: '100%', height: 210 }}>
                  <ResponsiveContainer>
                    <BarChart data={barChartData}>
                      <XAxis dataKey="name" stroke="#7f8c8d" fontSize={10} tickLine={false} />
                      <YAxis allowDecimals={false} stroke="#7f8c8d" fontSize={10} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Applications" fill="#2e6da4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={styles.chartBox}>
                <h4 style={styles.chartTitle}>Geographic Allocations Matrix</h4>
                <div style={{ width: '100%', height: 210 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
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

// --- 7. EXTERNALIZED HOOK ARCHITECTURE CSS MODULES ---
const styles = {
  dashboardContainer: { display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f4f6f9', overflow: 'hidden' },
  sidebar: { width: '230px', backgroundColor: '#1e2229', color: '#ecf0f1', display: 'flex', flexDirection: 'column' },
  sidebarBrand: { padding: '20px 15px', borderBottom: '1px solid #2c313c', textAlign: 'center' },
  sidebarMenu: { display: 'flex', flexDirection: 'column', padding: '10px 0' },
  sidebarLink: { padding: '12px 20px', color: '#a0aab4', textDecoration: 'none', fontSize: '0.92rem', display: 'flex', alignItems: 'center' },
  sidebarLinkActive: { color: '#fff', backgroundColor: '#2c313c', borderLeft: '4px solid #2e6da4' },
  mainLayout: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  navbar: { height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'between', padding: '0 25px', justifyContent: 'space-between' },
  navProfile: { display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.9rem' },
  logoutBtn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' },
  contentWrapper: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' },
  statCardsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  card: { padding: '15px 20px', borderRadius: '6px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardBlue: { backgroundColor: '#2e6da4' },
  cardGreen: { backgroundColor: '#27ae60' },
  cardPurple: { backgroundColor: '#8e44ad' },
  cardRed: { backgroundColor: '#d35400' },
  cardHeader: { margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 400, opacity: 0.9 },
  cardMetric: { margin: 0, fontSize: '1.8rem', fontWeight: 700 },
  cardIcon: { fontSize: '2rem', opacity: 0.3 },
  filterWrapper: { display: 'flex', gap: '15px' },
  searchInput: { flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' },
  filterDropdown: { width: '170px', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
  bottomGrid: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px', alignItems: 'start' },
  leftProfileArea: { backgroundColor: 'white', borderRadius: '6px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  sectionHeading: { margin: '0 0 5px 0', color: '#2c3e50', fontSize: '1.05rem', fontWeight: 600 },
  jobCard: { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', backgroundColor: '#fff' },
  jobCardMainInfo: { display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px' },
  avatarBubble: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#eef2f7', color: '#2e6da4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' },
  actionBtnGroup: { display: 'flex', gap: '6px' },
  editBtn: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' },
  deleteBtn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' },
  applicantBadgeSection: { marginTop: '8px' },
  badgeWrapper: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' },
  applicantBadge: { display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '15px', fontSize: '0.75rem', color: '#475569' },
  miniAvatar: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#2e6da4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 'bold' },
  rightChartsArea: { display: 'flex', flexDirection: 'column', gap: '20px' },
  chartBox: { backgroundColor: 'white', borderRadius: '6px', padding: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  chartTitle: { margin: '0 0 10px 0', color: '#2c3e50', fontSize: '0.92rem', fontWeight: 600 }
};