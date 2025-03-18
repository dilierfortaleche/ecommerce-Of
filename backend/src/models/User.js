const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    rol: {type: String, enum: ['user', 'supplier', 'admin'], default: 'user' },
    fechaRegistro: {type: Date, default: Date.now}
    });
    
module.exports = User = mongoose.model('user', UserSchema);
