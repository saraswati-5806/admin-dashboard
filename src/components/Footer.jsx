import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InfoModals from "./InfoModals";

export default function Footer() {
  const navigate = useNavigate();
  const auth = useAuth();

  const currentUser = auth ? auth.currentUser : null;
  const darkMode = auth ? auth.darkMode : false;

  const [activeModal, setActiveModal] = useState(null);

  const userRole = currentUser?.role?.trim().toLowerCase();

  return (
    <footer
      className="footer"
      style={{
        borderTop: "2px solid #0d9488",
        padding: "2rem 1.5rem",
        marginTop: "auto",
        fontFamily: "sans-serif",
        background: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "#f8fafc" : "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <h3 style={{ color: "#0d9488" }}>HireFlow</h3>

          <p
            style={{
              fontSize: "0.85rem",
              color: darkMode ? "#cbd5e1" : "#475569",
            }}
          >
            Dynamic frontend pipeline mapping student engineers to placement loops.
          </p>
        </div>

        <div>
          <h4>For Candidates</h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <span
              onClick={() => navigate("/jobs")}
              style={{ cursor: "pointer" }}
            >
              🔍 Browse Jobs
            </span>

            <span
              onClick={() =>
                userRole === "candidate"
                  ? setActiveModal("profile")
                  : navigate("/login")
              }
              style={{ cursor: "pointer" }}
            >
              👤 My Profile
            </span>

            <span
              onClick={() =>
                userRole === "candidate"
                  ? navigate("/my-applications")
                  : navigate("/login")
              }
              style={{ cursor: "pointer" }}
            >
              📄 My Applications
            </span>
          </div>
        </div>

        <div>
          <h4>For Employers</h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <span
              onClick={() =>
                userRole === "employer"
                  ? navigate("/dashboard")
                  : navigate("/login")
              }
              style={{ cursor: "pointer" }}
            >
              💼 Post a Job
            </span>

            <span
              onClick={() =>
                userRole === "employer"
                  ? navigate("/dashboard")
                  : navigate("/login")
              }
              style={{ cursor: "pointer" }}
            >
              🤝 Find Talent
            </span>
          </div>
        </div>

        <div>
          <h4>Company</h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <span
              onClick={() => setActiveModal("about")}
              style={{ cursor: "pointer" }}
            >
              ℹ️ About Us
            </span>

            <span
              onClick={() => setActiveModal("contact")}
              style={{ cursor: "pointer" }}
            >
              📞 Contact
            </span>

            <span
              onClick={() => setActiveModal("privacy")}
              style={{ cursor: "pointer" }}
            >
              🔒 Privacy Policy
            </span>
          </div>
        </div>
      </div>

      {activeModal && (
        <InfoModals
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </footer>
  );
}