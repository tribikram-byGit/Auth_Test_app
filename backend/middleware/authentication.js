const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    // Expecting header format: "Authorization: Bearer <TOKEN>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; 
        next(); 
    } catch (error) {
        console.error("CRITICAL AUTH ERROR:", error); 
    
        res.status(403).json({ 
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;