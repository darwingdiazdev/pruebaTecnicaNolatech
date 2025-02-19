const jwt = require("jsonwebtoken");
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Acceso denegado. Token requerido." });

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Token inválido o expirado." });

            req.user = decoded;

            // Verificar roles
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "No tienes permisos para acceder." });
            }

            next();
        });
    };
};

module.exports = authMiddleware;
