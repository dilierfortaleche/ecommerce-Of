const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario que realiza el pago
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CartShop', required: true }, // Carrito relacionado con el pago
    total: { type: Number, required: true, min: 0 }, // Total pagado
    paymentMethod: { type: String, enum: ['Tarjeta', 'Efectivo', 'Transferencia'], required: true }, // Método de pago
    status: { type: String, enum: ['Pendiente', 'Pagado', 'Fallido'], default: 'Pendiente' }, // Estado del pago
    transactionId: { type: String, unique: true }, // ID de la transacción (para métodos electrónicos)
    fechaPago: { type: Date, default: Date.now } // Fecha del pago
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
