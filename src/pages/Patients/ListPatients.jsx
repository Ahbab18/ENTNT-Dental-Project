import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListPatients() {
  const [patients, setPatients] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  const deletePatient = id => {
    if (!confirm("Delete this patient?")) return;
    const updated = patients.filter(p=>p.id!==id);
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={()=>nav("/patients/add")}>
          + Add
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-100">
            <tr>
              {["Name","DOB","Contact","Health","Actions"].map(h=>(
                <th key={h} className="px-4 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.length===0 && (
              <tr><td colSpan="5" className="text-center py-4">No patients found</td></tr>
            )}
            {patients.map(p=>(
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.dob}</td>
                <td className="px-4 py-2">{p.contact}</td>
                <td className="px-4 py-2">{p.healthInfo}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline" onClick={()=>nav(`/patients/edit/${p.id}`)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={()=>deletePatient(p.id)}>Delete</button>
                </td>
                <td>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    onClick={() => nav(`/appointments/${p.id}`)}
                  >
                  View Appointments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
