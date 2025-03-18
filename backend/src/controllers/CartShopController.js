const CartShop = require("../models/CartShop");

const CartShopController = {
    addToCart: async (req, res) => {
        try {
            const { user, product, quantity } = req.body;
            let cartItem = await CartShop.findOne({ user, product });

            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                cartItem = new CartShop({ user, product, quantity });
                await cartItem.save();
            }

            res.status(201).json({ message: "Producto agregado al carrito", cartItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await CartShop.find({ user: req.user.id }).populate("product");
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            await CartShop.findByIdAndDelete(req.params.id);
            res.json({ message: "Producto eliminado del carrito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    clearCart: async (req, res) => {
        try {
            await CartShop.deleteMany({ user: req.user.id });
            res.json({ message: "Carrito vaciado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = CartShopController;
