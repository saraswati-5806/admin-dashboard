// ── STORAGE MANAGEMENT ENGINE ──

export function seedDemoData() {
  if (localStorage.getItem("hireflow_seeded") === "true") return;

  // 🔐 Mandated Core Testing Profile Metrics with lowercase role parameters
  const coreEmployer = {
    id: "user_emp_1",
    name: "Employer 1",
    email: "emp123@nova.com",
    password: "emp123",
    role: "employer",
    company: "NovaSpark Solutions"
  };

  const candidateDemo = {
    id: "user_cand_demo",
    name: "Ananya Iyer",
    email: "ananya@nova.com",
    password: "demo123",
    role: "candidate",
    company: ""
  };

  // 💼 Generation Matrix: 22 Distinct Corporate Openings Linked to user_emp_1
  const coreJobs = [
    { id: "n_job_1", title: "React Native Developer", company: "NovaSpark Solutions", location: "Mumbai, MH", salary: "12-16 LPA", description: "Architect cross-platform mobile frameworks.", requirements: ["React Native", "TypeScript", "iOS Deployment"], postedBy: "user_emp_1" },
    { id: "n_job_2", title: "Cloud Security Specialist", company: "NovaSpark Solutions", location: "Remote", salary: "18-24 LPA", description: "Design cloud native defensive barriers and secure edge architectures.", requirements: ["AWS", "IAM", "Kubernetes", "DevSecOps"], postedBy: "user_emp_1" },
    { id: "n_job_3", title: "UI/UX Product Designer", company: "NovaSpark Solutions", location: "Bangalore, KA", salary: "9-14 LPA", description: "Map out workflow user journeys and premium high-fidelity systems panels.", requirements: ["Figma", "Design Systems", "Prototyping"], postedBy: "user_emp_1" },
    { id: "n_job_4", title: "Lead DevOps Architect", company: "NovaSpark Solutions", location: "Pune, MH", salary: "22-28 LPA", description: "Maintain and orchestrate declarative serverless pipeline tracking channels.", requirements: ["Docker", "Terraform", "GitHub Actions"], postedBy: "user_emp_1" },
    { id: "n_job_5", title: "Data Platform Engineer", company: "NovaSpark Solutions", location: "Hyderabad, TS", salary: "15-20 LPA", description: "Construct scalable real-time collection telemetry infrastructure logs.", requirements: ["Python", "Apache Kafka", "PostgreSQL"], postedBy: "user_emp_1" },
    { id: "n_job_6", title: "Staff Backend Engineer", company: "NovaSpark Solutions", location: "Remote", salary: "20-26 LPA", description: "Optimize distributed thread systems execution architectures using Go.", requirements: ["Golang", "gRPC", "Redis Systems"], postedBy: "user_emp_1" },
    { id: "n_job_7", title: "QA Automation Engineer", company: "NovaSpark Solutions", location: "Chennai, TN", salary: "8-11 LPA", description: "Write automated runtime execution assertions and performance diagnostics.", requirements: ["Playwright", "Jest", "CI/CD Matrix"], postedBy: "user_emp_1" },
    { id: "n_job_8", title: "Technical Product Manager", company: "NovaSpark Solutions", location: "Mumbai, MH", salary: "16-22 LPA", description: "Coordinate delivery roadmaps with technical layout deployment targets.", requirements: ["Agile Lifecycle", "Jira", "System Scoping"], postedBy: "user_emp_1" },
    { id: "n_job_9", title: "Frontend Core Specialist", company: "NovaSpark Solutions", location: "Remote", salary: "11-15 LPA", description: "Implement layout views optimizing accessibility tree structures.", requirements: ["Next.js", "TailwindCSS", "Web Vitals"], postedBy: "user_emp_1" },
    { id: "n_job_10", title: "AI/ML Integration Lead", company: "NovaSpark Solutions", location: "Bangalore, KA", salary: "25-35 LPA", description: "Deploy vector token pipelines and custom data execution models.", requirements: ["PyTorch", "OpenAI API", "Vector Databases"], postedBy: "user_emp_1" },
    { id: "n_job_11", title: "Full Stack Engineer", company: "NovaSpark Solutions", location: "Delhi, NCR", salary: "10-14 LPA", description: "Maintain internal administrative metrics and system data portals.", requirements: ["Node.js", "React.js", "MongoDB"], postedBy: "user_emp_1" },
    { id: "n_job_12", title: "Solutions Consultant", company: "NovaSpark Solutions", location: "Remote", salary: "14-19 LPA", description: "Translate technical system layouts to corporate ecosystem customers.", requirements: ["System Architecture", "Client Relations"], postedBy: "user_emp_1" },
    { id: "n_job_13", title: "Scrum Master Facilitator", company: "NovaSpark Solutions", location: "Pune, MH", salary: "9-13 LPA", description: "Unblock software engineering velocity metrics across vertical lines.", requirements: ["Scrum Framework", "Process Alignment"], postedBy: "user_emp_1" },
    { id: "n_job_14", title: "Cyber Security Analyst", company: "NovaSpark Solutions", location: "Hyderabad, TS", salary: "12-17 LPA", description: "Perform active monitoring audits against internal routing channels.", requirements: ["SIEM Tools", "Network Scanning", "Linux"], postedBy: "user_emp_1" },
    { id: "n_job_15", title: "Site Reliability Specialist", company: "NovaSpark Solutions", location: "Remote", salary: "19-25 LPA", description: "Maximize up-time thresholds across cloud infrastructure platforms.", requirements: ["Prometheus", "Grafana", "Linux Systems"], postedBy: "user_emp_1" },
    { id: "n_job_16", title: "Database Operations Engineer", company: "NovaSpark Solutions", location: "Chennai, TN", salary: "11-16 LPA", description: "Tune query execution tables and query structural configurations.", requirements: ["MySQL Optimization", "NoSQL Clusters"], postedBy: "user_emp_1" },
    { id: "n_job_17", title: "Technical Writer Lead", company: "NovaSpark Solutions", location: "Remote", salary: "7-10 LPA", description: "Author system documentation structures and developer API logs.", requirements: ["Markdown", "OpenAPI Spec", "GitDocs"], postedBy: "user_emp_1" },
    { id: "n_job_18", title: "Infrastructure Security Architect", company: "NovaSpark Solutions", location: "Bangalore, KA", salary: "24-30 LPA", description: "Implement defensive structural policies on perimeter access frameworks.", requirements: ["Zero Trust", "Firewalls", "SAML SSO"], postedBy: "user_emp_1" },
    { id: "n_job_19", title: "iOS Application Engineer", company: "NovaSpark Solutions", location: "Mumbai, MH", salary: "13-18 LPA", description: "Refine hardware performance profiles on native application loops.", requirements: ["SwiftUI", "CoreData", "XCode Profiling"], postedBy: "user_emp_1" },
    { id: "n_job_20", title: "Data Analyst Executive", company: "NovaSpark Solutions", location: "Pune, MH", salary: "8-12 LPA", description: "Compile operational delivery metrics into structured reporting view fields.", requirements: ["SQL Queries", "Tableau", "Excel Data"], postedBy: "user_emp_1" },
    { id: "n_job_21", title: "Cloud FinOps Manager", company: "NovaSpark Solutions", location: "Remote", salary: "15-21 LPA", description: "Audit and maximize efficiency metrics across infrastructure investments.", requirements: ["Cloud Cost Optimization", "Budget Allocation"], postedBy: "user_emp_1" },
    { id: "n_job_22", title: "Principal Systems Engineer", company: "NovaSpark Solutions", location: "Bangalore, KA", salary: "30-40 LPA", description: "Design foundational operating systems blocks for the enterprise loop.", requirements: ["C++ Architecture", "Kernel Level Compilation"], postedBy: "user_emp_1" }
  ];

  const initialApps = [
    { id: "app_mock_1", jobId: "n_job_1", candidateId: "user_cand_demo", candidateName: "Ananya Iyer", candidateEmail: "ananya@nova.com", resumeText: "Passionate mobile engineer with 2+ years React experience.", appliedAt: new Date().toLocaleDateString() },
    { id: "app_mock_2", jobId: "n_job_3", candidateId: "user_cand_demo", candidateName: "Ananya Iyer", candidateEmail: "ananya@nova.com", resumeText: "Expert in product dashboard UI patterns and prototyping.", appliedAt: new Date().toLocaleDateString() }
  ];

  localStorage.setItem("hireflow_users", JSON.stringify([coreEmployer, candidateDemo]));
  localStorage.setItem("hireflow_jobs", JSON.stringify(coreJobs));
  localStorage.setItem("hireflow_applications", JSON.stringify(initialApps));
  localStorage.setItem("hireflow_seeded", "true");
}

export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser");
}

export function getJobs() {
  seedDemoData();
  return JSON.parse(localStorage.getItem("hireflow_jobs") || "[]");
}

export function getJobById(jobId) {
  const jobs = getJobs();
  return jobs.find((j) => j.id === jobId) || null;
}

export function addJob(jobData) {
  const jobs = getJobs();

  const newJob = {
    ...jobData,
    id:
      "job_" +
      Math.random()
        .toString(36)
        .substring(2, 11),

    category: jobData.category || "IT",

    status: jobData.status || "ACTIVE",

    createdAt: new Date().toISOString()
  };

  jobs.push(newJob);

  localStorage.setItem(
    "hireflow_jobs",
    JSON.stringify(jobs)
  );

  return newJob;
}

export function updateJob(updatedJob) {
  const jobs = getJobs().map((job) =>
    job.id === updatedJob.id
      ? {
          ...job,
          ...updatedJob
        }
      : job
  );

  localStorage.setItem(
    "hireflow_jobs",
    JSON.stringify(jobs)
  );

  return updatedJob;
}

export function deleteJob(jobId) {
  const jobs = getJobs().filter((j) => j.id !== jobId);
  localStorage.setItem("hireflow_jobs", JSON.stringify(jobs));
  
  const apps = getApplications().filter((a) => a.jobId !== jobId);
  localStorage.setItem("hireflow_applications", JSON.stringify(apps));
}

export function getApplications() {
  return JSON.parse(localStorage.getItem("hireflow_applications") || "[]");
}

export function getApplicationsByJob(jobId) {
  const apps = getApplications();
  return apps.filter((a) => a.jobId === jobId);
}

export function addApplication(appData) {
  const apps = getApplications();

  const existing = apps.find(
    (a) =>
      a.jobId === appData.jobId &&
      a.candidateId === appData.candidateId
  );

  if (existing) {
    return existing;
  }

  const newApp = {
    ...appData,

    id:
      "app_" +
      Math.random()
        .toString(36)
        .substring(2, 10),

    appliedAt:
      new Date().toLocaleDateString()
  };

  apps.push(newApp);

  localStorage.setItem(
    "hireflow_applications",
    JSON.stringify(apps)
  );

  return newApp;
}

export function getEmployerDashboard(employerId) {
  const allJobs = getJobs();
  const employerJobs = allJobs.filter((j) => j.postedBy === employerId);
  const allApps = getApplications();

  const employerJobIds = employerJobs.map((j) => j.id);
  const filteredApps = allApps.filter((a) => employerJobIds.includes(a.jobId));

  const structuredApps = filteredApps.map((a) => {
    const matchJob = employerJobs.find((j) => j.id === a.jobId);
    return {
      ...a,
      job_title: matchJob ? matchJob.title : "Corporate System Operations Node"
    };
  });

  return {
    totalJobs: employerJobs.length,
    postedJobs: employerJobs,
    applications: structuredApps
  };
}

export function getCandidateApplications(candidateId) {
  const allApps = getApplications().filter((a) => a.candidateId === candidateId);
  const allJobs = getJobs();

  return allApps.map((a) => {
    const associatedJob = allJobs.find((j) => j.id === a.jobId);
    return {
      id: a.id,
      title: associatedJob ? associatedJob.title : "Archived Assignment",
      company: associatedJob ? associatedJob.company : "NovaSpark Inc",
      location: associatedJob ? associatedJob.location : "Remote Operations",
      appliedAt: a.appliedAt
    };
  });
}