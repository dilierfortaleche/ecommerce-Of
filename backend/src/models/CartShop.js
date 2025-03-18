const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia a User
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        stock: { type: Number, required: true, min: 0 } // Evita valores negativos
    }]
}, { timestamps: true }); // Agrega createdAt y updatedAt

module.exports = mongoose.model('CartShop', CartSchema);
