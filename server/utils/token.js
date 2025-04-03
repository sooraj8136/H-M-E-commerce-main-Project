// const jwt = require('jsonwebtoken');

// const generateToken = (user, role, res) => {
//     try {
//         const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET );
       
//         return (token)

//     } catch (error) {
//         res.status(error.status || 500).json({ error: error.message || "Internal server Error" })
//     }
// }

// module.exports = { generateToken }



const jwt = require("jsonwebtoken");

const generateToken = (user, role, res) => {
    try {
        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: `${process.env.TOKEN_EXPIRATION}m` } // Expiry from .env
        );

        // ✅ Send token as a cookie (for better security)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "Strict",
            maxAge: process.env.TOKEN_EXPIRATION * 60 * 1000, // Convert minutes to milliseconds
        });

        return token;
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};

module.exports = { generateToken };
