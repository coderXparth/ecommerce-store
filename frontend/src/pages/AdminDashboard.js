import React, {useEffect, useState} from "react";
import api from "../services/api";
import '../styles/admin.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name:"", description:"", price:0, countInStock:0 });

  useEffect(()=> { fetchProducts(); },[]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", form);
      setForm({ name:"", description:"", price:0, countInStock:0 });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating product");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={create}>
        <input placeholder="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="desc" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input placeholder="price" type="number" value={form.price} onChange={e=>setForm({...form, price:+e.target.value})} />
        <input placeholder="stock" type="number" value={form.countInStock} onChange={e=>setForm({...form, countInStock:+e.target.value})} />
        <button type="submit">Create</button>
      </form>

      <h3>Products</h3>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ${p.price} - stock: {p.countInStock}
            <button onClick={() => remove(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
