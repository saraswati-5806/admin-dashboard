import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard"; 
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";       
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const auth = useAuth();
  const darkMode = auth ? auth.darkMode : false;

  return (
    <div className={darkMode ? "dark" : ""} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* This renders once at the absolute top of every page layout */}
      <Navbar />
      
      <main style={{ flex: "1 0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* 🏢 Protected Employer Dashboard Workspace */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 📊 Brand New Feature: Protected Admin Dashboard Analytics Workspace */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* 👥 Protected Applicants Grid View */}
          <Route 
            path="/applicants" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 📋 Protected Employer Job Posting Grid View */}
          <Route 
            path="/jobs-posted" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 📥 Protected Candidate Application Tracking Pipeline */}
          <Route 
            path="/my-applications" 
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}