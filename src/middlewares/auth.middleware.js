const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Récupération du token dans l'en-tête Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Vérification si le token est présent
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        // Vérification et décodage du token
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;
