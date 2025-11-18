import Warehouse from "../models/Warehouse.js";

export const createWarehouse = async (req, res) => {
  const w = await Warehouse.create(req.body);
  res.json(w);
};

export const getWarehouses = async (req, res) => {
  const w = await Warehouse.find({});
  res.json(w);
};
