import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/dashboard");
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();
    if (login(email, password)) nav("/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ENTNT Login</h1>
        <label className="block mb-2">Email</label>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-4 border px-3 py-2 rounded" />

        <label className="block mb-2">Password</label>
        <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-6 border px-3 py-2 rounded" />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
