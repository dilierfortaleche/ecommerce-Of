const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // No permite valores negativos
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, min: 0 } // No permite valores negativos
},

// Maneja automáticamente createdAt y updatedAt
{ timestamps: true }); 

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
