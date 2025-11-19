import { useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";

export default function ViewStock() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/stock/view", {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Stock Overview</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-3">Product</th>
            <th className="p-3">Warehouse</th>
            <th className="p-3">Quantity</th>
          </tr>
        </thead>

        <tbody>
          {data.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.product?.name}</td>
              <td className="p-3">{s.warehouse?.name}</td>
              <td className="p-3 font-bold">{s.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
