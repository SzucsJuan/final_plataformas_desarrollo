const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "No tienes permiso para realizar esta acción" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};

module.exports = {isAdmin};