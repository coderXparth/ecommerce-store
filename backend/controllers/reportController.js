import StockMovement from "../models/StockMovement.js";

export const getStockHistory = async (req, res) => {
  const history = await StockMovement.find({})
    .populate("product warehouse createdBy")
    .sort({ createdAt: -1 });

  res.json(history);
};

export const dailyStats = async (req, res) => {
  const data = await StockMovement.aggregate([
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$createdAt" },
          type: "$type",
        },
        total: { $sum: "$quantity" },
      },
    },
  ]);

  res.json(data);
};
