const Order = require("../models/Order");

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { user, products, total } = req.body;
            const newOrder = new Order({ user, products, total });
            await newOrder.save();
            res.status(201).json({ message: "Orden creada", order: newOrder });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOrdersByUser: async (req, res) => {
        try {
            const orders = await Order.find({ user: req.params.userId }).populate("products.product");
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
            res.json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = OrderController;
