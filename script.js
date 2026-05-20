document.addEventListener('DOMContentLoaded', function () {
    
    // --- STEP 1: FETCH DATA USING EXACT HIREFLOW KEY STRINGS ---
    let jobs = JSON.parse(localStorage.getItem('hireflow_jobs')) || [];
    let applications = JSON.parse(localStorage.getItem('hireflow_applications')) || [];
    let users = JSON.parse(localStorage.getItem('hireflow_users')) || [];

    let applicationsChart = null;
    let categoryChart = null;

    // --- STEP 2: SAFE CARD UPDATE FUNCTION ---
    function updateKPICards() {
        const totalJobsEl = document.getElementById('total-jobs');
        const totalAppsEl = document.getElementById('total-apps');
        const totalUsersEl = document.getElementById('total-users');
        const activeJobsEl = document.getElementById('active-jobs');

        // Check if elements exist before assigning values to avoid null property errors
        if (totalJobsEl) totalJobsEl.innerText = jobs.length;
        if (totalAppsEl) totalAppsEl.innerText = applications.length;
        if (totalUsersEl) totalUsersEl.innerText = users.length;
        
        if (activeJobsEl) {
            const activeCount = jobs.filter(job => job.status === 'active').length;
            activeJobsEl.innerText = activeCount;
        }
    }

    // --- STEP 3: RENDER THE DATA TABLES ---
    function renderTables(filteredJobs = jobs) {
        const jobsTableBody = document.getElementById('jobs-table-body');
        if (jobsTableBody) {
            jobsTableBody.innerHTML = ''; 
            filteredJobs.forEach((job) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${job.id || 'N/A'}</td>
                    <td><strong>${job.title || 'Untitled'}</strong></td>
                    <td>${job.category || 'Uncategorized'}</td>
                    <td><span style="color: ${job.status === 'active' ? '#4caf50' : '#e74c3c'}">${(job.status || 'ACTIVE').toUpperCase()}</span></td>
                    <td><button class="logout-btn" style="padding: 4px 8px; font-size: 0.8rem; margin: 0;" onclick="deleteJob(${job.id})">Delete</button></td>
                `;
                jobsTableBody.appendChild(row);
            });
        }

        const appsTableBody = document.getElementById('apps-table-body');
        if (appsTableBody) {
            appsTableBody.innerHTML = ''; 
            applications.forEach(app => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${app.name || 'Anonymous'}</td>
                    <td>${app.appliedFor || app.jobTitle || 'Unknown Job'}</td>
                    <td>${app.email || 'No Email'}</td>
                `;
                appsTableBody.appendChild(row);
            });
        }
    }

    // --- STEP 4: DELETE JOB LISTING FUNCTION ---
    window.deleteJob = function(jobId) {
        jobs = jobs.filter(job => job.id !== jobId);
        localStorage.setItem('hireflow_jobs', JSON.stringify(jobs));
        
        updateKPICards();
        renderTables();
        generateCharts(); 
    };

    // --- STEP 5: INTERACTIVE SEARCH & FILTER CONTROLLER ---
    function filterJobsData() {
        const searchInput = document.getElementById('jobSearch')?.value.toLowerCase() || '';
        const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';

        const filtered = jobs.filter(job => {
            const title = (job.title || '').toLowerCase();
            const category = job.category || '';
            
            const matchesSearch = title.includes(searchInput);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderTables(filtered);
    }

    document.getElementById('jobSearch')?.addEventListener('input', filterJobsData);
    document.getElementById('categoryFilter')?.addEventListener('change', filterJobsData);

    // --- STEP 6: DYNAMIC GENERATION OF CHART.JS MAPS ---
    function generateCharts() {
        if (applicationsChart) applicationsChart.destroy();
        if (categoryChart) categoryChart.destroy();

        const jobTitles = jobs.map(j => j.title || 'Untitled');
        const appCounts = jobTitles.map(title => {
            return applications.filter(app => (app.appliedFor === title || app.jobTitle === title)).length;
        });

        const categories = [...new Set(jobs.map(j => j.category || 'Uncategorized'))];
        const categoryCounts = categories.map(cat => {
            return jobs.filter(job => (job.category || 'Uncategorized') === cat).length;
        });

        const ctxBar = document.getElementById('applicationsChart');
        if (ctxBar) {
            applicationsChart = new Chart(ctxBar.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: jobTitles.length ? jobTitles : ['No Data'],
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
                    labels: categories.length ? categories : ['No Data'],
                    datasets: [{
                        data: categoryCounts.length ? categoryCounts : [0],
                        backgroundColor: ['#2e6da4', '#4caf50', '#ff9800', '#9c27b0']
                    }]
                },
                options: { responsive: true }
            });
        }
    }

    // --- INITIALIZE EVERYTHING SAFE ON BOOT ---
    updateKPICards();
    renderTables();
    generateCharts();
});