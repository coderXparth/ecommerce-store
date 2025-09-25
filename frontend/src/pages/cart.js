// frontend/src/pages/Cart.js
import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setTotal(storedCart.reduce((sum, item) => sum + item.price * item.qty, 0));
  }, []);

  const updateQty = (productId, delta) => {
    const updatedCart = cart.map(item => {
      if (item.productId === productId) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 }; // minimum 1
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.qty, 0));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(updatedCart.reduce((sum, item) => sum + item.price * item.qty, 0));
  };

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to purchase");

    const orderItems = cart.map((item) => ({
      product: item.productId, // must match backend schema
      name: item.name,
      price: item.price,
      qty: item.qty,
    }));

    try {
      await api.post(
        "/orders",
        { orderItems, totalPrice: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Purchase successful! Confirmation email sent.");
      localStorage.removeItem("cart");
      setCart([]);
      setTotal(0);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          {item.name} - ₹{item.price} x {item.qty} = ₹{item.price * item.qty}
          <div>
            <button onClick={() => updateQty(item.productId, -1)}>-</button>
            <button onClick={() => updateQty(item.productId, 1)}>+</button>
            <button onClick={() => removeItem(item.productId)}>Remove</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button onClick={handleBuy}>Buy Now</button>
        </>
      )}
    </div>
  );
}
