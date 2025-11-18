import mongoose from "mongoose";

const WarehouseStockSchema = new mongoose.Schema(
  {
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.WarehouseStock ||
  mongoose.model("WarehouseStock", WarehouseStockSchema);
