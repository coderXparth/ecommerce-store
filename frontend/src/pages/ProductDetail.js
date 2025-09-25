import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/product.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((r) => setProduct(r.data))
      .catch(console.error);
  }, [id]);

const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const index = cart.findIndex((i) => i.productId === product._id);
  if (index >= 0) {
    cart[index].qty += 1;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};


  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-card" style={{ margin: "24px auto", width: "300px" }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      {/* ✅ Price formatted in Indian Rupees */}
      <p className="price">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(product.price)}
      </p>

      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
