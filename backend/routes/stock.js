import express from "express";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { addStock, viewStock } from "../controllers/stockController.js";

const router = express.Router();

// Add stock (admin only)
router.post("/add", protect, requireRole("admin"), addStock);

// View stock (admin only)
router.get("/view", protect, requireRole("admin"), viewStock);

export default router;
