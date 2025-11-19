import { useState } from "react";
import api from "../services/api";
import { saveToken } from "../services/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      saveToken(res.data.token);
      window.location = "/";
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Register</h2>

      <form onSubmit={submit}>
        <input
          className="w-full p-2 border mb-4"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
