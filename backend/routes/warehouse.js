import express from "express";
import {
  createWarehouse,
  getWarehouses,
} from "../controllers/warehouseController.js";
import { protect } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

router.post("/", protect, requireRole("admin"), createWarehouse);
router.get("/", protect, getWarehouses);

export default router;
