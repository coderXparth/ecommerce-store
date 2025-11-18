import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
    quantity: Number,
    type: { type: String, enum: ["IN", "OUT"] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.StockMovement ||
  mongoose.model("StockMovement", StockMovementSchema);
