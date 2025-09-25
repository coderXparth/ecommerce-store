import express from "express";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// GET all products (public)
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// GET single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  res.status(404).json({ message: "Product not found" });
});

// CREATE product (admin)
router.post("/", protect, admin, async (req, res) => {
  const { name, description, price, image, countInStock } = req.body;
  const product = new Product({ name, description, price, image, countInStock });
  const created = await product.save();
  res.status(201).json(created);
});

// UPDATE product (admin)
router.put("/:id", protect, admin, async (req, res) => {
  const { name, description, price, image, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ?? product.price;
  product.image = image || product.image;
  product.countInStock = countInStock ?? product.countInStock;
  const updated = await product.save();
  res.json(updated);
});

// DELETE product (admin)
router.delete("/:id", protect, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.remove();
  res.json({ message: "Product removed" });
});

export default router;
