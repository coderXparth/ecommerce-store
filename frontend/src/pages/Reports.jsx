import { useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";

export default function Reports() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get("/reports/stats", {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(res => setStats(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Daily Stock Movement</h1>

      {stats.map((s) => (
        <div key={s._id.day + s._id.type} className="bg-white p-4 shadow rounded mb-3">
          <p><b>Day:</b> {s._id.day}</p>
          <p><b>Type:</b> {s._id.type}</p>
          <p><b>Total Qty:</b> {s.total}</p>
        </div>
      ))}
    </div>
  );
}
