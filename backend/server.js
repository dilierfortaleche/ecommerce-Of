const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Inicializar Express
const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(express.json()); 

// Conectar a MongoDB
connectDB();

// Importar rutas
const categoryRoutes = require('./src/routes/CategoryRoutes');
const orderRoutes = require('./src/routes/OrdenRoutes');
const paymentRoutes = require('./src/routes/PaymentRoutes');
const productRoutes = require('./src/routes/ProductRouter');
const reviewRoutes = require('./src/routes/ReviewRoutes');
const userRoutes = require('./src/routes/UserRoutes');
const cartShopRoutes = require('./src/routes/CartShopRoutes');
const authRoutes = require('./src/routes/authRolesRoutes');

// Configurar rutas
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartShopRoutes);
app.use('/api/auth', authRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
