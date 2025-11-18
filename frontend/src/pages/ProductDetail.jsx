import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get("/products").then((res) => {
      const item = res.data.find((x) => x._id === id);
      setP(item);
    });
  }, [id]);

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...p, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  if (!p) return "Loading...";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">{p.name}</h1>
      <p className="text-gray-500 mb-4">{p.description}</p>

      <p className="text-2xl font-semibold mb-4">₹{p.price}</p>

      <input
        type="number"
        className="w-20 border p-2 mb-4"
        min="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />

      <br />

      <button onClick={addToCart} className="bg-blue-600 text-white px-6 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
