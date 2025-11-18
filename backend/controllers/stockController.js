import WarehouseStock from "../models/WarehouseStock.js";
import StockMovement from "../models/StockMovement.js";
import Warehouse from "../models/Warehouse.js";
import Product from "../models/Product.js";

// ADD STOCK
export const addStock = async (req, res) => {
  try {
    const { warehouse, product, quantity } = req.body;

    if (!warehouse || !product || !quantity) {
      return res.status(400).json({ message: "warehouse, product, quantity required" });
    }

    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Quantity must be positive" });
    }

    const wh = await Warehouse.findById(warehouse);
    if (!wh) return res.status(404).json({ message: "Warehouse not found" });

    const prod = await Product.findById(product);
    if (!prod) return res.status(404).json({ message: "Product not found" });

    let stock = await WarehouseStock.findOne({ warehouse, product });

    if (!stock) {
      stock = await WarehouseStock.create({ warehouse, product, quantity: qty });
    } else {
      stock.quantity += qty;
      await stock.save();
    }

    await StockMovement.create({
      product,
      warehouse,
      quantity: qty,
      type: "IN",
      createdBy: req.user.id,
    });

    res.json({
      message: "Stock added",
      stock,
    });
  } catch (err) {
    console.error("addStock error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// VIEW STOCK
export const viewStock = async (req, res) => {
  try {
    const list = await WarehouseStock.find({})
      .populate("product")
      .populate("warehouse");

    res.json(list);
  } catch (err) {
    console.error("viewStock error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
