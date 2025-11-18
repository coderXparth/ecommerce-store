import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const createProduct = async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
};

export const updateProduct = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
