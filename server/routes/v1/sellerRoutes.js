const { registerSeller, loginSeller, checkSeller, sellerProfile, sellerLogout, updateSellerProfile, deleteSeller, getAllSellers, sellerForgotPassword, sellerResetPassword } = require("../../controllers/sellerController")
const { adminAuth } = require("../../middlewares/adminAuth")
const { sellerAuth } = require("../../middlewares/sellerAuth")

const sellerRouter = require("express").Router()

sellerRouter.get("/register-seller", registerSeller )
sellerRouter.post("/login-seller", loginSeller )
sellerRouter.post("/seller-forgot-password", sellerForgotPassword )
sellerRouter.post("/seller-reset-password/:token", sellerResetPassword )
sellerRouter.post("/seller-logout", sellerAuth, sellerLogout )

sellerRouter.get("/get-all-sellers", adminAuth, getAllSellers )
sellerRouter.get("/check-seller", sellerAuth, checkSeller )
sellerRouter.get("/seller-profile", sellerAuth, sellerProfile )

sellerRouter.put("/update-seller-profile", sellerAuth, updateSellerProfile )

sellerRouter.delete("/delete-seller/:sellerId", deleteSeller )

module.exports = sellerRouter