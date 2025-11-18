import { useEffect, useState } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";

export default function AddStock() {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({
    product: "",
    warehouse: "",
    quantity: ""
  });

  useEffect(() => {
    // Load products
    api.get("/products").then((res) => setProducts(res.data));

    // Load warehouses (requires admin token)
    api
      .get("/warehouse", {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then((res) => setWarehouses(res.data));
  }, []);

  async function submit(e) {
    e.preventDefault();

    await api.post("/stock/add", form, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    alert("Stock added successfully!");
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add Stock</h1>

      <form onSubmit={submit}>
        <select
          className="w-full p-2 border mb-4"
          onChange={(e) => setForm({ ...form, product: e.target.value })}
        >
          <option>Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border mb-4"
          onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
        >
          <option>Select Warehouse</option>
          {warehouses.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 border mb-4"
          placeholder="Quantity"
          type="number"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Add Stock
        </button>
      </form>
    </div>
  );
}
