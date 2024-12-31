const jwt = require('jsonwebtoken');

const sellerAuth = (req, res, next) => {

    try {
        const { seller_token: token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Seller token not provided in cookies" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "seller not authorized" });
        }

        if (decoded.role == "admin" && decoded.role == "user") {
            return res.status(403).json({ message: "Only seller can access" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};


module.exports = { sellerAuth }