import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="text-gray-500">{p.description}</p>
            <p className="text-lg font-semibold mt-2">₹{p.price}</p>

            <Link
              to={`/products/${p._id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
