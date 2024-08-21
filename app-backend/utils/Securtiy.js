const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' }); // If no token, return 401
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' }); // If token is invalid, return 403
        }

        req.user = user; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
