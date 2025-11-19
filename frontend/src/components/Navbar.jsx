import { Link } from "react-router-dom";
import { getToken, logout } from "../services/auth";

export default function Navbar() {
  const token = getToken();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Smart Warehouse</h1>

      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <Link to="/cart" className="hover:text-blue-600">Cart</Link>

        {!token ? (
          <>
            <Link to="/login" className="text-green-600">Login</Link>
            <Link to="/register" className="text-green-600">Register</Link>
            <Link to="/admin-login" className="text-red-600 font-semibold">Admin</Link>
          </>
        ) : (
          <button onClick={() => { logout(); window.location = "/"; }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
