import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/product.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(item => item.productId === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p._id} className="product-card">
          <img src={p.image || "/images/placeholder.jpg"} alt={p.name} />
          <h3>{p.name}</h3>
          <p className="price">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(p.price)}
          </p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
          <Link to={`/product/${p._id}`}>
          </Link>
        </div>
      ))}
    </div>
  );
}
