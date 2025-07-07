import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";

export default function CalendarView() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const incidents = JSON.parse(localStorage.getItem("incidents")) || [];
    setAppointments(incidents);
  }, []);

  useEffect(() => {
    const formatted = format(selectedDate, "yyyy-MM-dd");
    const dayAppointments = appointments.filter(a =>
      a.appointmentDate.startsWith(formatted)
    );
    setFiltered(dayAppointments);
  }, [selectedDate, appointments]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>

      <div className="bg-white shadow rounded p-4 mb-6">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const formatted = format(date, "yyyy-MM-dd");
            return appointments.some(a => a.appointmentDate.startsWith(formatted))
              ? "highlight"
              : "";
          }}
        />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">
          Appointments on {format(selectedDate, "PPP")}
        </h3>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No appointments</p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((appt, idx) => (
              <li key={idx} className="border-b pb-2">
                <div className="font-semibold">{appt.title}</div>
                <div className="text-sm text-gray-600">{new Date(appt.appointmentDate).toLocaleTimeString()}</div>
                <div className="text-sm">{appt.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
