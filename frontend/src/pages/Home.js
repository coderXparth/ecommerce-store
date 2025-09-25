import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Dana Paani Restaurant</h1>
      <button
        onClick={() => navigate("/register")}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Start
      </button>
    </div>
  );
}
