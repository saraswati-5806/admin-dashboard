import { useState } from "react";

export default function JobForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    company: initialData?.company || "",
    salary: initialData?.salary || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements || [], // 🌟 Initialized as Array
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label>Job Title</label>
        <input 
          type="text" 
          value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
          required 
        />
      </div>
      
      <div>
        <label>Company Name</label>
        <input 
          type="text" 
          value={form.company} 
          onChange={(e) => setForm({ ...form, company: e.target.value })} 
          required 
        />
      </div>

      <div>
        <label>Salary Package</label>
        <input 
          type="text" 
          value={form.salary} 
          onChange={(e) => setForm({ ...form, salary: e.target.value })} 
          required 
        />
      </div>

      <div>
        <label>Requirements (Comma Separated)</label>
        <input 
          type="text" 
          value={Array.isArray(form.requirements) ? form.requirements.join(",") : ""} // 🌟 Safe join format conversion
          onChange={(e) => setForm({ ...form, requirements: e.target.value.split(",") })} // 🌟 Split conversion back to storage array
          placeholder="React, Node, CSS"
          required 
        />
      </div>

      <div>
        <label>Description</label>
        <textarea 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
          required 
        />
      </div>

      <button type="submit" style={{ background: "#0d9488", color: "white", padding: "0.75rem", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
        Submit Post Configuration
      </button>
    </form>
  );
}