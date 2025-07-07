import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import PatientView from "./pages/PatientView";
import { useAuth } from "./context/AuthContext";
import ListPatients from "./pages/Patients/ListPatients";
import AddPatient from "./pages/Patients/AddPatient";
import EditPatient from "./pages/Patients/EditPatient";
import IncidentList from "./pages/Appointments/IncidentList";
import AddIncident from "./pages/Appointments/AddIncident";
import EditIncident from "./pages/Appointments/EditIncident";
import CalendarView from "./pages/Calendar/CalendarView";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<ListPatients />} />
      <Route path="/patients/add" element={<AddPatient />} />
      <Route path="/patients/edit/:id" element={<EditPatient />} />
      <Route path="/appointments/:id" element={<ProtectedRoute role="Admin"><IncidentList /></ProtectedRoute>} />
      <Route path="/appointments/add/:id" element={<ProtectedRoute role="Admin"><AddIncident /></ProtectedRoute>} />
      <Route path="/appointments/edit/:id" element={<ProtectedRoute role="Admin"><EditIncident /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute role="Admin"><CalendarView /></ProtectedRoute>} />
    </Route>
    </Routes>
  );
}

export default App;
