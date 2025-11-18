import { useState } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);

  async function placeOrder() {
    const token = getToken();
    if (!token) return alert("Please login first!");

    const items = cart.map((c) => ({
      product: c._id,
      qty: c.qty,
      price: c.price,
    }));

    try {
      const res = await api.post(
        "/orders",
        { items, total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // SUCCESS
      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");

    } catch (error) {
      // If backend returned insufficient stock
      if (error.response && error.response.status === 400) {
        return alert(error.response.data.error || "Insufficient stock");
      }

      // Any other error
      console.error(error);
      alert("Something went wrong! Please try again.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          {cart.map((c, i) => (
            <div key={i} className="border-b py-4 flex justify-between">
              <div>
                <h2 className="font-bold">{c.name}</h2>
                <p>Qty: {c.qty}</p>
              </div>
              <p className="font-semibold">₹{c.price * c.qty}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-6">Total: ₹{total}</h2>

          <button
            onClick={placeOrder}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
