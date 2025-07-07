import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddIncident() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", comments: "", appointmentDate: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const newIncident = { ...form, id: uuidv4(), patientId };
    localStorage.setItem("incidents", JSON.stringify([...all, newIncident]));
    navigate(`/appointments/${patientId}`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Appointment</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-4">
        <input type="text" name="title" required placeholder="Title" className="w-full border p-2" onChange={handleChange} />
        <textarea name="description" required placeholder="Description" className="w-full border p-2" onChange={handleChange}></textarea>
        <textarea name="comments" placeholder="Comments" className="w-full border p-2" onChange={handleChange}></textarea>
        <input type="datetime-local" name="appointmentDate" required className="w-full border p-2" onChange={handleChange} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
