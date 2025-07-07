import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditIncident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const found = all.find(i => i.id === id);
    if (found) setIncident(found);
    else navigate("/dashboard");
  }, [id]);

  const handleChange = e => setIncident({ ...incident, [e.target.name]: e.target.value });
  const [previews, setPreviews] = useState([]);

  const handleFileUpload = async (e) => {
  const files = e.target.files;
  const fileArray = [];

  for (let file of files) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    await new Promise((resolve) => {
      reader.onload = () => {
        fileArray.push({ name: file.name, url: reader.result });
        resolve();
      };
    });
  }

  const updatedFiles = [...(incident.files || []), ...fileArray];
  setIncident({ ...incident, files: updatedFiles });
  setPreviews(updatedFiles);
};


  const handleSubmit = e => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const updated = all.map(i => (i.id === id ? incident : i));
    localStorage.setItem("incidents", JSON.stringify(updated));
    navigate(`/appointments/${incident.patientId}`);
  };

  if (!incident) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Update Appointment</h2>
      <div>
  <label className="block mb-2">Upload Files</label>
  <input type="file" multiple accept="image/*,.pdf" onChange={handleFileUpload} className="mb-4" />

        <div className="flex gap-4 flex-wrap">
        {(previews.length > 0 ? previews : incident?.files || []).map((file, idx) => (
            <div key={idx} className="border p-2 rounded shadow">
                {file.url.includes("image") ? (
          <img src={file.url} alt={file.name} className="w-24 h-24 object-cover" />
        ) : (
          <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{file.name}</a>
        )}
        </div>
        ))}
        </div>
    </div>

      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-4">
        <input type="text" name="title" value={incident.title} className="w-full border p-2" onChange={handleChange} />
        <input type="datetime-local" name="appointmentDate" value={incident.appointmentDate} className="w-full border p-2" onChange={handleChange} />
        <textarea name="comments" value={incident.comments} className="w-full border p-2" onChange={handleChange}></textarea>
        <input type="text" name="cost" value={incident.cost || ''} placeholder="Cost" className="w-full border p-2" onChange={handleChange} />
        <input type="text" name="treatment" value={incident.treatment || ''} placeholder="Treatment" className="w-full border p-2" onChange={handleChange} />
        <select name="status" value={incident.status || ''} className="w-full border p-2" onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
