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
const { catchErrorHandler } = require("../utils/catchErrorHandler.js");

const userAuth = async (req, res, next) => {
  try {
    // Get token
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    // Handle no token
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Decoding token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle no decoded
    if (!decoded) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Set user
    req.user = decoded;
    
    next();
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

module.exports = { userAuth };
