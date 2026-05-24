import { useNavigate } from "react-router-dom";

export default function JobCard({ job, onApply, showAction = true }) {
  const navigate = useNavigate();

  const jobId = job?.id || job?._id;

  return (
    <div
      className="job-card"
      onClick={() => {
        if (jobId) {
          navigate(`/jobs/${jobId}`);
        }
      }}
      style={{
        padding: "1.5rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        margin: "1rem 0",
        background: "#ffffff",
        cursor: "pointer",
      }}
    >
      <h3
        style={{
          margin: "0 0 0.5rem 0",
          color: "#0d9488",
        }}
      >
        {job.title}
      </h3>

      <p>
        🏢 {job.company || "Unknown Company"}
      </p>

      <p>
        💰 {job.salary || "Not Disclosed"}
      </p>

      <p>
        {job.description}
      </p>

      {Array.isArray(job.requirements) &&
        job.requirements.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {job.requirements.map((req, index) => (
              <span
                key={index}
                style={{
                  background: "#f1f5f9",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                {req}
              </span>
            ))}
          </div>
        )}

      {showAction && onApply && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(jobId);
          }}
          style={{
            background: "#0d9488",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Apply Now
        </button>
      )}
    </div>
  );
}