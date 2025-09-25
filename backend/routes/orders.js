// backend/routes/orders.js
import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Create the order
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();

    // ✅ Send email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app password
      },
    });

    const itemsList = orderItems.map(
      (item) => `${item.name} x${item.qty} - ₹${item.price}`
    ).join("\n");

    await transporter.sendMail({
      from: `"E-Shop" <${process.env.EMAIL_USER}>`,
      to: req.user.email,
      subject: "Purchase Confirmation",
      text: `Hello ${req.user.name},\n\nYour purchase is successful!\n\nItems:\n${itemsList}\n\nTotal: ₹${totalPrice}\n\nThank you for shopping with us!`,
    });

    res.status(201).json({ message: "Order placed and email sent", order: createdOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Purchase failed", error: err.message });
  }
});

export default router;
