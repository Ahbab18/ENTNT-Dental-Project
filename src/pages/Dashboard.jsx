import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Welcome, {user.email}</h1>
      <p className="mb-6">Role: <strong>{user.role}</strong></p>

      {user.role === "Admin" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Next Appts", "Top Patients", "Pending Treatments", "Revenue"].map((tile, i) => (
            <div key={i} className="bg-white shadow p-4 rounded flex flex-col justify-between">
              <div className="text-gray-500">{tile}</div>
              <div className="text-2xl font-bold">--</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">My Upcoming Appointments</h2>
          <p>(Nothing yet – coming soon!)</p>
        </div>
      )}
    </div>
  );
}
