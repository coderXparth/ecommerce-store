import WarehouseStock from "../models/WarehouseStock.js";

export const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Validate each item has enough warehouse stock
        for (const item of items) {
            const { product, quantity } = item;

            // Get total stock across all warehouses
            const totalStock = await WarehouseStock.aggregate([
                { $match: { product: product } },
                { $group: { _id: null, total: { $sum: "$quantity" } } }
            ]);

            const available = totalStock.length > 0 ? totalStock[0].total : 0;

            if (totalStock < qty) {
    return res.status(400).json({
        error: "Insufficient stock available"
    });
}

        }

        // If stock is OK, create the order
        const newOrder = await Order.create({
            user: userId,
            items,
            status: "Pending"
        });

        return res.json(newOrder);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updated = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.json(updated);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

