import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", dob:"", contact:"", healthInfo:"" });

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("patients"))||[];
    const found = arr.find(p=>p.id===id);
    if (!found) return nav("/patients");
    setForm(found);
  }, []);

  const handle = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {
    e.preventDefault();
    const arr = JSON.parse(localStorage.getItem("patients"))||[];
    const updated = arr.map(p=>p.id===id ? form : p);
    localStorage.setItem("patients", JSON.stringify(updated));
    nav("/patients");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Patient</h2>
      <form onSubmit={submit} className="bg-white shadow p-6 rounded space-y-4">
        {[
          {label:"Full Name",name:"name",type:"text"},
          {label:"Date of Birth",name:"dob",type:"date"},
          {label:"Contact",name:"contact",type:"text"}
        ].map(f=>(
          <div key={f.name}>
            <label className="block mb-1">{f.label}</label>
            <input 
              type={f.type} name={f.name} required 
              value={form[f.name]} onChange={handle}
              className="w-full mb-2 border px-3 py-2 rounded" />
          </div>
        ))}
        <div>
          <label className="block mb-1">Health Info</label>
          <textarea
            name="healthInfo" value={form.healthInfo} onChange={handle}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Update Patient
        </button>
      </form>
    </div>
  );
}
