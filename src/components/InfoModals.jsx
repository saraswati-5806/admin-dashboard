import { useAuth } from "../context/AuthContext";

export default function InfoModals({ type, onClose }) {
  const auth = useAuth();

  const currentUser = auth ? auth.currentUser : null;
  const darkMode = auth ? auth.darkMode : false;

  const getContent = () => {
    switch (type) {
      case "profile":
        return {
          title: "My Profile Details",
          body: currentUser ? (
            <div>
              <p>
                <strong>Name:</strong>{" "}
                {currentUser.name ||
                  currentUser.username ||
                  "Candidate"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email || "No Email"}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {currentUser.role || "Guest"}
              </p>
            </div>
          ) : (
            <p>Please login first.</p>
          ),
        };

      case "about":
        return {
          title: "About HireFlow",
          body: (
            <p>
              HireFlow is a recruitment platform connecting
              candidates and employers efficiently.
            </p>
          ),
        };

      case "contact":
        return {
          title: "Contact",
          body: (
            <p>
              support@hireflow.com
            </p>
          ),
        };

      case "privacy":
        return {
          title: "Privacy Policy",
          body: (
            <p>
              User data is securely stored using browser localStorage.
            </p>
          ),
        };

      default:
        return {
          title: "",
          body: null,
        };
    }
  };

  const content = getContent();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: darkMode ? "#1e293b" : "#ffffff",
          color: darkMode ? "#f8fafc" : "#0f172a",
          padding: "2rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "450px",
        }}
      >
        <h3 style={{ color: "#0d9488" }}>
          {content.title}
        </h3>

        <div style={{ margin: "1rem 0" }}>
          {content.body}
        </div>

        <button
          onClick={onClose}
          style={{
            background: "#0d9488",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}