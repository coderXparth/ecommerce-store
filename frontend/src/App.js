import './styles/global.css';
import './styles/navbar.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Cart from "./pages/cart";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  // ✅ Keep user state here
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // ✅ update state
  };

  // Optional: persist user in localStorage if it changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <span>Welcome, {user.name} ({user.role})</span>}
        {user && <button onClick={logout}>Logout</button>}
        {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
        {user && <Link to="/cart">cart</Link>}

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* ✅ Pass setUser to Login */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
