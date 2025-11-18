import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import warehouseRoutes from "./routes/warehouse.js";
import stockRoutes from "./routes/stock.js";
import reportRoutes from "./routes/reports.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/reports", reportRoutes);

export default app;
