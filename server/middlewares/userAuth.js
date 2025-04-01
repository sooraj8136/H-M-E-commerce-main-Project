// const jwt = require('jsonwebtoken');

// const userAuth = (req, res, next) => {
//     try {
//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).json({ message: "token not provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         console.log(decoded, "====decoded token");

//         if (!decoded) {
//             return res.status(401).json({ message: "user not autherized" });
//         }

//         req.user = decoded;
//         next();

//     } catch (error) {
//         res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
//     }
// };




// module.exports = { userAuth }

const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        // Check for token in cookies
        let token = req.cookies?.token;

        // If no token in cookies, check Authorization header
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "User not authorized" });
        }

        console.log(decoded, "==== decoded token");

        // Attach user data to request
        req.user = decoded;
        next();

    } catch (error) {
        let errorMessage = "Internal server error";
        if (error.name === "JsonWebTokenError") {
            errorMessage = "Invalid token";
        } else if (error.name === "TokenExpiredError") {
            errorMessage = "Token expired, please login again";
        }

        res.status(401).json({ message: errorMessage });
    }
};

module.exports = { userAuth };
