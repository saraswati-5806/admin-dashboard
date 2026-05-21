import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard"; // 🛡️ Safely preserved original tracking view
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail"; // 🌟 Integrated dynamic job tracking view
import Admin from "./pages/Admin";         // 🌟 Integrated admin dashboard interface view
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const auth = useAuth();
  const darkMode = auth ? auth.darkMode : false;

  return (
    <div className={darkMode ? "dark" : ""} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <main style={{ flex: "1 0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* 🛡️ Safely preserved original admin route connection */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* 🛡️ Protected Workspaces Layout */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/applicants" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/jobs-posted" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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