const { registerSeller, loginSeller, checkSeller, sellerProfile, sellerLogout, updateSellerProfile, deleteSeller } = require("../../controllers/sellerController")
const { adminAuth } = require("../../middlewares/adminAuth")
const { sellerAuth } = require("../../middlewares/sellerAuth")

const sellerRouter = require("express").Router()

sellerRouter.post("/update-seller-profile", sellerAuth, updateSellerProfile )
sellerRouter.post("/register-seller", registerSeller )
sellerRouter.post("/login-seller", loginSeller )

sellerRouter.get("/check-seller", sellerAuth, checkSeller )
sellerRouter.get("/seller-profile", sellerAuth, sellerProfile )
sellerRouter.get("/seller-logout", sellerAuth, sellerLogout )

sellerRouter.delete("/delete-seller/:sellerId", adminAuth, deleteSeller )


module.exports = sellerRouter