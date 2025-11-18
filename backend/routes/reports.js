import express from "express";
import { getStockHistory, dailyStats } from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

router.get("/history", protect, requireRole("admin"), getStockHistory);
router.get("/stats", protect, requireRole("admin"), dailyStats);

export default router;
