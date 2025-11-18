import express from "express";
import { register, login, adminLogin } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin", adminLogin);

export default router;
