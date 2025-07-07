import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function IncidentList() {
  const { id: patientId } = useParams();
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(all.filter(i => i.patientId === patientId));
  }, [patientId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments for Patient ID: {patientId}</h2>
      <button className="bg-green-600 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(`/appointments/add/${patientId}`)}>
        + Add Appointment
      </button>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Title</th><th>Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 && <tr><td colSpan="4" className="text-center py-4">No appointments yet</td></tr>}
            {incidents.map((i, idx) => (
              <tr key={idx} className="border-t">
                <td>{i.title}</td>
                <td>{new Date(i.appointmentDate).toLocaleString()}</td>
                <td>{i.status || 'Scheduled'}</td>
                <td>
                  <button className="text-blue-600 mr-2" onClick={() => navigate(`/appointments/edit/${i.id}`)}>Edit</button>
                </td>
                <td>
                    <button
  className="text-blue-500 underline mb-4"
  onClick={() => navigate('/patients')}
>
  ← Back to Patient List
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
