import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddStock from "./pages/AddStock";
import ViewStock from "./pages/ViewStock";
import StockHistory from "./pages/StockHistory";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Customer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/add-stock" element={<AddStock />} />
        <Route path="/admin/view-stock" element={<ViewStock />} />
        <Route path="/admin/history" element={<StockHistory />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}
