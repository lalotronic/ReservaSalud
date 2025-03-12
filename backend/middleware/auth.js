// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // 1. Extraer el token del header "Authorization"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"

    // 2. Si no hay token, denegar acceso
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    // 3. Verificar el token con la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Token inválido/expirado
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        // 4. Adjuntar los datos del usuario al objeto "req"
        req.user = user;
        next(); // Continuar al siguiente middleware o controlador
    });
};

module.exports = { authenticateToken };