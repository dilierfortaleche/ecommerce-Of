const PaymentMethod = require("../models/Payment");

const PaymentMethodController = {
    addPaymentMethod: async (req, res) => {
        try {
            const paymentMethod = new PaymentMethod({ ...req.body, user: req.user.id });
            await paymentMethod.save();
            res.status(201).json({ message: "Método de pago agregado", paymentMethod });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserPaymentMethods: async (req, res) => {
        try {
            const methods = await PaymentMethod.find({ user: req.user.id });
            res.json(methods);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deletePaymentMethod: async (req, res) => {
        try {
            await PaymentMethod.findByIdAndDelete(req.params.id);
            res.json({ message: "Método de pago eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PaymentMethodController;
