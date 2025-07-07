ENTNT Dental Center Management Dashboard
Frontend Assignment Submission for ENTNT
Role: Frontend Developer (React)
Deadline: July 8, 2025

Deployed Link: https://entntdentalproject.netlify.app/
GitHub Repository: https://github.com/Ahbab18/ENTNT-Dental-Project

📌 Project Overview
This project is a frontend-only Dental Center Management Dashboard for ENTNT. It simulates a system that manages patients, appointments (incidents), file uploads, and role-based access — all using React, TailwindCSS, and localStorage.

Users:

👨‍⚕️ Admin (Dentist): full access

🧑‍⚕️ Patient: limited view of their data

No backend or external APIs were used.

🚀 Tech Stack
React (Vite)

React Router v6

React Context API

TailwindCSS

localStorage (for all persistent data)

React Calendar (for calendar view)

🔐 Authentication

Hardcoded users: 

admin@entnt.in / admin123 (Admin)

john@entnt.in / patient123 (Patient)

Data stored in localStorage

Role-based Protected Routes using a custom ProtectedRoute component

Session persistence via localStorage

📁 Features

🔑 Authentication

Login using hardcoded credentials

Role-based access (Admin vs Patient)

👩‍⚕️ Admin Dashboard

View dashboard with KPIs (appointments, revenue, patients, etc.)

Manage Patients (Add, Edit, Delete)

Manage Appointments/Incidents

Upload & preview files (stored as base64)

Calendar view of upcoming appointments

🧑 Patient View

View own profile

View upcoming and past appointments

View treatment cost, files, and notes

🗂 File Upload & Preview

Images and PDFs converted to base64

Preview thumbnails for images

Stored per-appointment

📆 Calendar

Highlights days with appointments

Clicking a day shows relevant treatments

Uses react-calendar with custom styling

📱 Responsive Design
Mobile/tablet/desktop friendly UI

Uses Tailwind utility classes
