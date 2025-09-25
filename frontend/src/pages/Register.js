import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../styles/form.css';

export default function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
}
