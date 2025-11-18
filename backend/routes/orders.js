import express from "express";
import { protect } from "../middleware/auth.js";
import { createOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/", protect, createOrder);

// Update order status (Admin only in future, but leave open for now)
router.put("/:id/status", protect, updateOrderStatus);

export default router;
