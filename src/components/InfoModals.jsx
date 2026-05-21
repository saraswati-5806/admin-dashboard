import { useAuth } from "../context/AuthContext";

export default function InfoModals({ type, onClose }) {
  const auth = useAuth();
  const currentUser = auth ? auth.currentUser : null;

  const getContent = () => {
    switch (type) {
      case "profile":
        return {
          title: "My Profile Details",
          body: currentUser ? (
            <div>
              <p><strong>Name / ID:</strong> {currentUser.name || currentUser.username || "Candidate Workspace Member"}</p>
              <p><strong>Email Node:</strong> {currentUser.email || "student@hireflow.edu"}</p>
              <p><strong>System Clearance:</strong> {currentUser?.role || "Guest"}</p>
              <p><strong>Storage Status:</strong> Verified Local Cache Node Active</p>
            </div>
          ) : (
            <p>Please log in to inspect your user parameters.</p>
          )
        };
      case "about":
        return {
          title: "About HireFlow",
          body: <p>HireFlow maps client-side workspace structures directly onto engineering opportunities with no structural routing latency.</p>
        };
      case "contact":
        return {
          title: "Contact Engineering Logs",
          body: <p>Electronic communication paths: <strong>support@hireflow.edu</strong></p>
        };
      case "privacy":
        return {
          title: "Isolated Memory Guidelines",
          body: <p>Data indices remain entirely isolated inside personal browser memory allocations.</p>
        };
      default:
        return { title: "", body: null };
    }
  };

  const content = getContent();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, color: "#1e293b", fontFamily: "sans-serif" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px", width: "90%", maxWidth: "450px" }}>
        <h3 style={{ marginTop: 0, color: "#0d9488" }}>{content.title}</h3>
        <div style={{ margin: "1rem 0", lineHeight: "1.5" }}>{content.body}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#0d9488", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>Close</button>
        </div>
      </div>
    </div>
  );
}