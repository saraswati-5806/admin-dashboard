# Hireflow 🚀

A modern, highly responsive Admin Analytics Dashboard designed to track real-time job statistics, monitor application frequencies, and manage incoming candidate streams efficiently.

---

## 🔗 Live Demo

🌐 **Vercel Deployment Link:** [https://admin-dashboard-hazel-xi.vercel.app/](https://admin-dashboard-hazel-xi.vercel.app/)

---

## ✨ Features

### 📊 Brand New Feature: Admin Analytics Dashboard
* 📉 **Applications per Job Graph:** A custom-built vertical bar chart rendering application volume tallies across key developer positions.
* 🍕 **Category Distribution Pie Chart:** A responsive SVG circle chart mapping sector breakdowns mathematically into IT, Design, and Marketing segments.
* 💬 **Interactive Pop-up Tooltips:** Clean state hooks showing precise metric overlays and data tallies when mouse pointers hover directly over chart vectors.
* 🗃️ **Status Matrix Summary Cards:** Top-tier block counters capturing Total Jobs Posted, Total Applications, Registered Users, and Active Openings instantly.

### 🏢 Employer Panel & Management
* ➕ **Inject New Job Listings:** Add new job configurations dynamically with instant array updates via an intuitive input action node.
* 🛠️ **Edit Posted Jobs:** Modify active parameters, location tags, and packages smoothly without altering core layout code.
* ❌ **Delete Jobs:** Safely pull down or remove outdated system allocation records from the feed instantly.
* 📋 **Recent Job Listings Table:** Access a full structured administrative grid keeping track of Job IDs, Titles, Categories, and live statuses (`ACTIVE` / `CLOSED`).
* 👥 **Recent Applicants Stream:** Trace incoming candidate profiles, submission pitches, and contact details (e.g., Ananya Iyer) in real-time.

### 🔒 Authentication & Data Features
* 🔑 **Role-Based Access Control:** Strict permission layers routing users to unique views based on Employer (`emp123@nova.com`) or Admin contexts.
* 🛡️ **Protected Routes:** Navigation middleware parameters preventing unauthorized access to private workspace modules.
* 📦 **LocalStorage State Persistence:** Data management strategy ensuring mutated job fields and status records survive browser reboots.
* 🛑 **Event Propagation Isolation:** Wrapped dashboard child controls in `e.stopPropagation()` loops to avoid nested layout routing bugs during action clicks.

---

## 🛠️ Tech Stack

* **Frontend Library:** React.js
* **Routing Engine:** React Router DOM
* **Programming Language:** JavaScript (ES6+)
* **Styling Architecture:** CSS3 & Inline UI Component Styles
* **Structure Standard:** HTML5
* **Bundler & Dev Server:** Vite

---

## 📂 Sections Included

* 📊 **Admin Analytics Dashboard Core:** Main control view housing matrix cards and interactive charts.
* 🏢 **Employer Dashboard / Panel:** Centralized tracking layout monitoring global summaries across 22 active system rows.
* 🛠️ **Manage Jobs Workspace:** Administrative table panel to handle core active open listings.
* 👥 **Applicants Tracking Grid:** Stream views displaying dedicated candidate information records.
* 🔐 **Login & Signup Pages:** Secure authentication entry paths.

---

## 📁 Folder Structure

```text
admin-dashboard/
├── public/
├── src/
│   ├── components/      # Reusable functional components
│   ├── context/         # Context API for global auth and state management
│   ├── data/            # Local static files and dummy datasets
│   ├── layouts/         # Base page skeletons, header, and sidebars
│   ├── pages/           # AdminDashboard.jsx and Dashboard.jsx core views
│   ├── routes/          # Navigation path definitions and protected rules
│   ├── styles/          # Global layout stylesheets
│   ├── utils/           # Auxiliary functional logic utilities
│   ├── App.jsx          # Root layout module mounting the tree
│   └── main.jsx         # DOM anchor entry execution process
├── package.json
├── vite.config.js
└── README.md

```

---

## 🚀 Deployment

This project is hosted on Vercel.

### 🌐 Deploy Steps

1. Push project changes to your repository hub via GitHub.
2. Log into the Vercel Web Console.
3. Import the `admin-dashboard` repository.
4. Click Deploy with standard configuration parameters.
5. Your application web workspace is instantly live! 🎉

---

## 🔧 Setup Instructions

### Clone Repository

```bash
git clone [https://github.com/saraswati-5806/admin-dashboard.git](https://github.com/saraswati-5806/admin-dashboard.git)

```

### Install Dependencies

```bash
npm install

```

### Run Project Locally

```bash
npm run dev

```

```

```