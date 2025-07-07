import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4">ENTNT Dashboard</h2>
        <nav className="flex-1 px-4 space-y-2">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "block px-3 py-2 bg-blue-700 rounded" : "block px-3 py-2 hover:bg-blue-700 rounded"}>
            Dashboard
          </NavLink>
          {user.role === "Admin" && <>
            <NavLink to="/patients" className={({isActive}) => isActive ? "block px-3 py-2 bg-blue-700 rounded" : "block px-3 py-2 hover:bg-blue-700 rounded"}>
              Patients
            </NavLink>
          </>}
        </nav>
        <NavLink to="/calendar" className={({isActive}) => isActive ? "block px-3 py-2 bg-blue-700 rounded" : "block px-3 py-2 hover:bg-blue-700 rounded"}>
          Calendar
        </NavLink>
        <button
          className="m-4 bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
          onClick={() => { logout(); }}
        >
          Logout
        </button>
      </aside>

  
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
