const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Obtener token del header
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'no token, authorization danied' });
    }

    // Verificar token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usar dotenv
        req.user = decoded; // ✅ Esto asigna correctamente el `id` y el `role`
        next();
    } catch (err) {
        res.status(401).json({ msg: 'the token is not valid' });
    }
};