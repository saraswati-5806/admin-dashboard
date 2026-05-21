// ==========================================================================
// 📦 HIREFLOW SYSTEM ENGINE - BROWSER LOCALSTORAGE DATA LAYER (FIXED & SYNCHRONOUS)
// ==========================================================================

const KEYS = {
  JOBS: "hireflow_jobs",
  APPLICATIONS: "hireflow_applications",
  USERS: "users",
  CURRENT_USER: "currentUser"
};

function seedDatabase() {
  if (typeof window === "undefined") return;

  // 1. Initial Seed Matrix: 22 Full Professional Jobs
  if (!localStorage.getItem(KEYS.JOBS)) {
    const defaultJobs = [
      { id: "j_1", title: "Senior Frontend Engineer", company: "AuraStream Tech", location: "Remote, India", type: "Full Time", salary: "₹18L - ₹24L", category: "Tech", description: "Build scalable UI architectures with modern core state tracking systems.", requirements: ["React", "TypeScript", "Tailwind CSS"], postedBy: "emp_infosys" },
      { id: "j_2", title: "Data Analyst", company: "FinTech Solutions", location: "Mumbai, MH", type: "Full Time", salary: "₹12L - ₹18L", category: "Data", description: "Interpret complex core metric data frameworks and build pipeline dashboards.", requirements: ["Python", "SQL", "Tableau"], postedBy: "emp_infosys" },
      { id: "j_3", title: "Product Designer", company: "Vertex Design", location: "Bangalore, KA", type: "Full Time", salary: "₹14L - ₹20L", category: "Design", description: "Own the end-to-end design lifecycle for our consumer fintech application matrix.", requirements: ["Figma", "Prototyping", "Wireframing"], postedBy: "emp_tata" },
      { id: "j_4", title: "Operations Manager", company: "BioGrowth Labs", location: "Chicago, IL", type: "Full Time", salary: "$95k - $130k", category: "Management", description: "Oversee operational efficiency and lab deployment pipelines across regions.", requirements: ["Logistics", "Agile Management", "Budgets"], postedBy: "emp_tata" },
      { id: "j_5", title: "Junior React Developer", company: "CloudScale Inc", location: "Remote", type: "Internship", salary: "₹35,000/mo", category: "Tech", description: "Assist engineering teams with component library migrations and structural unit verification.", requirements: ["React", "JavaScript", "CSS"], postedBy: "emp_infosys" },
      { id: "j_6", title: "Backend Systems Architect", company: "Nexus Cyber", location: "Hyderabad, TS", type: "Full Time", salary: "₹25L - ₹35L", category: "Tech", description: "Design ultra-low-latency distributed data processing pipes.", requirements: ["Go", "Kubernetes", "gRPC"], postedBy: "emp_tata" },
      { id: "j_7", title: "DevOps Pipeline Engineer", company: "Stratum Cloud", location: "Pune, MH", type: "Full Time", salary: "₹16L - ₹22L", category: "Tech", description: "Maintain automation runners, secure staging containers, and deploy microservices.", requirements: ["AWS", "Docker", "GitHub Actions"], postedBy: "emp_infosys" },
      { id: "j_8", title: "HR Generalist", company: "TalentGrid Global", location: "Delhi NCR", type: "Full Time", salary: "₹6L - ₹9L", category: "HR", description: "Manage candidate lifecycles, payroll onboarding, and employee relations.", requirements: ["Communication", "Sourcing", "Onboarding"], postedBy: "emp_infosys" },
      { id: "j_9", title: "Product Marketing Specialist", company: "Vivid Scale", location: "Remote", type: "Contract", salary: "₹8L - ₹12L", category: "Marketing", description: "Execute high-impact launch campaigns for native software services.", requirements: ["SEO", "Google Analytics", "Copywriting"], postedBy: "emp_tata" },
      { id: "j_10", title: "iOS Mobile Engineer", company: "SwiftWave Apps", location: "Bangalore, KA", type: "Full Time", salary: "₹15L - ₹22L", category: "Tech", description: "Develop performance-optimized swift modules for live video consumer tools.", requirements: ["Swift", "SwiftUI", "CoreData"], postedBy: "emp_tata" },
      { id: "j_11", title: "Customer Success Lead", company: "SaaSify Metrics", location: "Remote", type: "Full Time", salary: "₹10L - ₹14L", category: "Customer Support", description: "Manage enterprise account lifecycles, ensuring retention and driving renewal optimization.", requirements: ["CRM Software", "Negotiation", "Technical Support"], postedBy: "emp_infosys" },
      { id: "j_12", title: "Sales Development Representative", company: "HyperGrowth CRM", location: "Mumbai, MH", type: "Full Time", salary: "₹5L - ₹8L", category: "Sales", description: "Identify outbound corporate leads and qualify active enterprise prospects.", requirements: ["Cold Outreach", "Lead Scoring", "HubSpot"], postedBy: "emp_infosys" },
      { id: "j_13", title: "Machine Learning Researcher", company: "Cortex Intelligence", location: "Remote", type: "Full Time", salary: "₹30L - ₹45L", category: "Tech", description: "Train context-aware transformer models for multi-modal text classification.", requirements: ["PyTorch", "Transformers", "CUDA"], postedBy: "emp_tata" },
      { id: "j_14", title: "QA Automation Tester", company: "Valid8 Software", location: "Chennai, TN", type: "Full Time", salary: "₹8L - ₹11L", category: "Tech", description: "Write robust end-to-end integration test runs for checkout pipelines.", requirements: ["Playwright", "Selenium", "Jest"], postedBy: "emp_infosys" },
      { id: "j_15", title: "Scrum Master", company: "Agile Consulting Group", location: "Kolkata, WB", type: "Contract", salary: "₹14L - ₹18L", category: "Management", description: "Facilitate sprint planning, daily sync run-throughs, and clear systemic scope blocks.", requirements: ["Jira", "Agile Coaching", "Risk Mitigation"], postedBy: "emp_tata" },
      { id: "j_16", title: "Full Stack Developer", company: "TechFlow", location: "Bangalore, KA", type: "Full Time", salary: "₹15L - ₹25L", category: "Tech", description: "Join our team to build scalable web applications using React and Node architectures.", requirements: ["React", "Node.js", "Express"], postedBy: "emp_techflow" },
      { id: "j_17", title: "UI/UX Intern", company: "Pixel Studio", location: "Delhi, DL", type: "Internship", salary: "₹25,000/mo", category: "Design", description: "Collaborate closely with product managers to map layout systems and structural interface mockups.", requirements: ["Figma", "User Research"], postedBy: "emp_techflow" },
      { id: "j_18", title: "Financial Risk Analyst", company: "Prism Capital", location: "Mumbai, MH", type: "Full Time", salary: "₹16L - ₹22L", category: "Other", description: "Evaluate macro portfolio credit exposures using quant risk metrics.", requirements: ["Excel VBA", "R", "Quantitative Modeling"], postedBy: "emp_tata" },
      { id: "j_19", title: "Content Strategist", company: "WordCraft Media", location: "Remote", type: "Part-Time", salary: "₹4L - ₹6L", category: "Marketing", description: "Draft whitepapers, corporate newsletters, and optimization logs.", requirements: ["Technical Writing", "CMS", "SEO"], postedBy: "emp_infosys" },
      { id: "j_20", title: "Full Stack Generalist", company: "Starlight Software", location: "Ahmedabad, GJ", type: "Full Time", salary: "₹10L - ₹15L", category: "Tech", description: "Maintain internal billing tools, configure state forms, and coordinate storage logic.", requirements: ["JavaScript", "React", "SQL"], postedBy: "emp_techflow" },
      { id: "j_21", title: "Business Analyst", company: "Strategy Partners", location: "Pune, MH", type: "Full Time", salary: "₹11L - ₹15L", category: "Management", description: "Bridge the gap between product requirements and developer output metrics.", requirements: ["Agile Documentation", "SQL", "UML Modeling"], postedBy: "emp_tata" },
      { id: "j_22", title: "Technical Support Tier 2", company: "Core Hosters", location: "Remote", type: "Full Time", salary: "₹6L - ₹8L", category: "Customer Support", description: "Investigate API communication drops, server runtime errors, and domain blocks.", requirements: ["Linux Shell", "DNS Configuration", "APIs"], postedBy: "emp_infosys" }
    ];
    localStorage.setItem(KEYS.JOBS, JSON.stringify(defaultJobs));
  }

  if (!localStorage.getItem(KEYS.APPLICATIONS)) {
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify([]));
  }
}

seedDatabase();

// 2. DATA READ INTERFACES (SYNCHRONOUS FIX)
export function getJobs() {
  try {
    const data = localStorage.getItem(KEYS.JOBS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function getJobById(id) {
  const jobs = getJobs();
  return jobs.find(j => j.id === id) || null;
}

// 3. EMPLOYER WRITE/UPDATE/DELETE INTERFACES (Full CRUD - SYNCHRONOUS FIX)
export function addJob(jobData) {
  const jobs = getJobs();
  const newJob = {
    ...jobData,
    id: "j_" + Math.random().toString(36).substr(2, 9),
    requirements: Array.isArray(jobData.requirements) ? jobData.requirements : ["React", "JavaScript"]
  };
  jobs.push(newJob);
  localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
  return newJob;
}

export function updateJob(updatedJob) {
  const jobs = getJobs();
  const index = jobs.findIndex(j => j.id === updatedJob.id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
    localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
    return true;
  }
  return false;
}

export function deleteJob(id) {
  const jobs = getJobs();
  const filtered = jobs.filter(j => j.id !== id);
  localStorage.setItem(KEYS.JOBS, JSON.stringify(filtered));
  
  // Clean up orphan records from application registries
  const apps = getApplications();
  const filteredApps = apps.filter(a => a.jobId !== id);
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(filteredApps));
  return { success: true };
}

// 4. CANDIDATE SUBMISSION INTERFACES (SYNCHRONOUS FIX)
export function addApplication(appData) {
  const apps = getApplications();
  const newApp = {
    ...appData,
    id: "app_" + Math.random().toString(36).substr(2, 9),
    appliedAt: new Date().toLocaleDateString()
  };
  apps.push(newApp);
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
  return { success: true };
}

// 5. ROLE-SPECIFIC DASHBOARD COMPILING DATA (SYNCHRONOUS FIX)
export function getEmployerDashboard(employerId) {
  const jobs = getJobs();
  const apps = getApplications();

  const myJobs = jobs.filter(j => j.postedBy === employerId);
  const myJobIds = myJobs.map(j => j.id);
  const myApps = apps.filter(a => myJobIds.includes(a.jobId)).map(a => {
    const jobMatch = myJobs.find(j => j.id === a.jobId);
    return { ...a, job_title: jobMatch ? jobMatch.title : "Position" };
  });

  return { totalJobs: myJobs.length, totalApplications: myApps.length, applications: myApps };
}

export function getCandidateApplications(candidateId) {
  const jobs = getJobs();
  const apps = getApplications();
  
  const myApps = apps.filter(a => a.candidateId === candidateId);
  return myApps.map(a => {
    const jobMatch = jobs.find(j => j.id === a.jobId);
    return {
      ...a,
      title: jobMatch ? jobMatch.title : "Position",
      company: jobMatch ? jobMatch.company : "Corporate Organization",
      location: jobMatch ? jobMatch.location : "Remote"
    };
  });
}

// 6. USER CHANNEL & PERSISTENCE LAYER CONTROLS (FULL WORKING IMPLEMENTATION)
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
  } catch (e) {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user) { 
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user)); 
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function clearCurrentUser() { 
  localStorage.removeItem(KEYS.CURRENT_USER); 
}

export function getApplications() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.APPLICATIONS)) || [];
  } catch (e) {
    return [];
  }
}

export function getApplicationsByJob(jobId) {
  const apps = getApplications();
  return apps.filter(app => app.jobId === jobId);
}

export function getApplicationsByCandidate(candidateId) {
  const apps = getApplications();
  return apps.filter(app => app.candidateId === candidateId);
}

export function hasApplied(jobId, candidateId) {
  const apps = getApplications();
  return apps.some(app => app.jobId === jobId && app.candidateId === candidateId);
}

export function seedDemoData() {}

/* ==========================================================================
   🎨 INJECT CUSTOM "COOL WATERS" STYLE VARIABLES 
   ========================================================================== */
if (typeof document !== "undefined") {
  const existing = document.querySelectorAll("style[data-theme='cool-waters']");
  existing.forEach(e => e.remove());

  const style = document.createElement("style");
  style.setAttribute("data-theme", "cool-waters");
  style.innerHTML = `
    :root {
      --primary-teal: #0d9488 !important;   
      --dark-teal: #115e59 !important;      
      --slate-dark: #0f172a !important;     
      --ice-blue: #e0f2fe !important;       
      --bg-canvas: #f8fafc !important;      
    }
    body { background-color: var(--bg-canvas) !important; color: var(--slate-dark) !important; font-family: 'Inter', sans-serif !important; }
    nav, .navbar { background-color: var(--ice-blue) !important; border-bottom: 2px solid var(--primary-teal) !important; }
    nav a, .navbar-brand, .nav-link { color: var(--dark-teal) !important; font-weight: 600 !important; }
    nav a:hover { color: var(--primary-teal) !important; }
    .btn, button, .btn-primary { background-color: var(--primary-teal) !important; border: none !important; color: white !important; font-weight: 600 !important; border-radius: 6px !important; padding: 0.5rem 1rem !important; cursor: pointer !important; }
    .btn:hover, button:hover { background-color: var(--dark-teal) !important; }
    input, select, textarea { border: 1px solid #cbd5e1 !important; border-radius: 6px !important; padding: 0.6rem !important; }
    input:focus { outline: 2px solid var(--primary-teal) !important; }
  `;
  document.head.appendChild(style);
}