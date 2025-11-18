import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", protect, requireRole("admin"), createProduct);

router.put("/:id", protect, requireRole("admin"), updateProduct);

router.delete("/:id", protect, requireRole("admin"), deleteProduct);

export default router;
