import { useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";

export default function StockHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/reports/history", {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(res => setHistory(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Stock History</h1>

      {history.map(h => (
        <div key={h._id} className="bg-white p-4 shadow rounded mb-4">
          <p><b>Product:</b> {h.product?.name}</p>
          <p><b>Warehouse:</b> {h.warehouse?.name}</p>
          <p><b>Qty:</b> {h.quantity}</p>
          <p><b>Type:</b> {h.type}</p>
          <p><b>Date:</b> {new Date(h.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
