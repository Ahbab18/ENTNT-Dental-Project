import { useAuth } from "../context/AuthContext";

const PatientView = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">My Patient View</h2>
      <p>Patient ID: {user?.patientId}</p>
      <p>Upcoming appointments: (Simulated)</p>
      {/* You can fetch from localStorage here */}
    </div>
  );
};

export default PatientView;
