document.addEventListener('DOMContentLoaded', function () {
    
    // --- STEP 1: FETCH AUTHENTIC DATA FROM USER STORAGE ---
    let jobs = JSON.parse(localStorage.getItem('hireflow_jobs')) || [];
    let applications = JSON.parse(localStorage.getItem('hireflow_applications')) || [];
    let users = JSON.parse(localStorage.getItem('hireflow_users')) || [];

    let applicationsChart = null;
    let categoryChart = null;

    // --- STEP 2: REFRESH KPI COUNTER CARDS ---
    function updateKPICards() {
        const totalJobsEl = document.getElementById('total-jobs');
        const totalAppsEl = document.getElementById('total-apps');
        const totalUsersEl = document.getElementById('total-users');
        const activeJobsEl = document.getElementById('active-jobs');

        if (totalJobsEl) totalJobsEl.innerText = jobs.length;
        if (totalAppsEl) totalAppsEl.innerText = applications.length;
        if (totalUsersEl) totalUsersEl.innerText = users.length;
        
        if (activeJobsEl) {
            // Flexible status check (handles 'active', 'open', or missing field defaults)
            const activeCount = jobs.filter(job => !job.status || job.status === 'active' || job.status === 'open').length;
            activeJobsEl.innerText = activeCount;
        }
    }

    // --- STEP 3: RENDER THE LIVE DATA TABLES ---
    function renderTables(filteredJobs = jobs) {
        const jobsTableBody = document.getElementById('jobs-table-body');
        if (jobsTableBody) {
            jobsTableBody.innerHTML = ''; 
            filteredJobs.forEach((job, index) => {
                // AUTO-DETECT PROPERTY NAMES: Checks if your project uses 'title' or 'designation'/'role'
                const displayTitle = job.title || job.designation || job.role || 'Untitled Position';
                const displayCategory = job.category || job.corporateEntity || 'General';
                const displayStatus = job.status || 'Active';
                const displayId = job.id || (index + 1);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${displayId}</td>
                    <td><strong>${displayTitle}</strong></td>
                    <td>${displayCategory}</td>
                    <td><span style="color: ${displayStatus.toLowerCase() === 'active' ? '#4caf50' : '#e74c3c'}">${displayStatus.toUpperCase()}</span></td>
                    <td><button class="logout-btn" style="padding: 4px 8px; font-size: 0.8rem; margin: 0;" onclick="deleteJob('${displayId}')">Delete</button></td>
                `;
                jobsTableBody.appendChild(row);
            });
        }

        const appsTableBody = document.getElementById('apps-table-body');
        if (appsTableBody) {
            appsTableBody.innerHTML = ''; 
            applications.forEach(app => {
                const displayAppName = app.name || app.applicantName || 'Anonymous';
                const displayAppliedJob = app.appliedFor || app.jobTitle || app.designation || 'Viewed Position';
                const displayEmail = app.email || 'No Email Registered';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${displayAppName}</td>
                    <td>${displayAppliedJob}</td>
                    <td>${displayEmail}</td>
                `;
                appsTableBody.appendChild(row);
            });
        }
    }

    // --- STEP 4: SAFE STORAGE DELETION CONTROLLER ---
    window.deleteJob = function(jobId) {
        // Keeps item if string or number values don't match the targeted deletion ID
        jobs = jobs.filter((job, index) => String(job.id || (index + 1)) !== String(jobId));
        localStorage.setItem('hireflow_jobs', JSON.stringify(jobs));
        
        updateKPICards();
        renderTables();
        generateCharts(); 
    };

    // --- STEP 5: LIVE FILTERING OPERATIONS ---
    function filterJobsData() {
        const searchInput = document.getElementById('jobSearch')?.value.toLowerCase() || '';
        const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';

        const filtered = jobs.filter(job => {
            const title = (job.title || job.designation || job.role || '').toLowerCase();
            const category = (job.category || job.corporateEntity || '');
            
            const matchesSearch = title.includes(searchInput);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderTables(filtered);
    }

    document.getElementById('jobSearch')?.addEventListener('input', filterJobsData);
    document.getElementById('categoryFilter')?.addEventListener('change', filterJobsData);

    // --- STEP 6: DYNAMIC LIVE CHART GENERATION ---
    function generateCharts() {
        if (applicationsChart) applicationsChart.destroy();
        if (categoryChart) categoryChart.destroy();

        const jobTitles = jobs.map(j => j.title || j.designation || j.role || 'Untitled');
        const appCounts = jobTitles.map(title => {
            return applications.filter(app => {
                const appJob = app.appliedFor || app.jobTitle || app.designation || '';
                return appJob === title;
            }).length;
        });

        const categories = [...new Set(jobs.map(j => j.category || j.corporateEntity || 'General'))];
        const categoryCounts = categories.map(cat => {
            return jobs.filter(job => (job.category || job.corporateEntity || 'General') === cat).length;
        });

        const ctxBar = document.getElementById('applicationsChart');
        if (ctxBar) {
            applicationsChart = new Chart(ctxBar.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: jobTitles.length ? jobTitles : ['No Live Data'],
                    datasets: [{
                        label: 'Applications Received',
                        data: appCounts.length ? appCounts : [0],
                        backgroundColor: '#2e6da4'
                    }]
                },
                options: { responsive: true, scales: { y: { beginAtZero: true } } }
            });
        }

        const ctxPie = document.getElementById('categoryChart');
        if (ctxPie) {
            categoryChart = new Chart(ctxPie.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: categories.length ? categories : ['No Live Data'],
                    datasets: [{
                        data: categoryCounts.length ? categoryCounts : [0],
                        backgroundColor: ['#2e6da4', '#4caf50', '#ff9800', '#9c27b0']
                    }]
                },
                options: { responsive: true }
            });
        }
    }

    // --- EXECUTE ON LOAD ---
    updateKPICards();
    renderTables();
    generateCharts();
});