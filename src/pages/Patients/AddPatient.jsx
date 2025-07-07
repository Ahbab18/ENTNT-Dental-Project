import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddPatient() {
  const [form, setForm] = useState({ name:"", dob:"", contact:"", healthInfo:"" });
  const nav = useNavigate();

  const handle = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {
    e.preventDefault();
    const arr = JSON.parse(localStorage.getItem("patients"))||[];
    arr.push({ ...form, id:uuidv4() });
    localStorage.setItem("patients", JSON.stringify(arr));
    nav("/patients");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
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
          Save Patient
        </button>
      </form>
    </div>
  );
}
