import { useState } from "react";
import api from "../services/api";
import { saveToken } from "../services/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await api.post("/auth/admin", { email, password });
    saveToken(res.data.token);
    window.location = "/admin";
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Admin Login</h2>

      <form onSubmit={submit}>
        <input className="w-full p-2 border mb-4" placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-2 border mb-4" placeholder="Password"
          type="password" onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-red-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
