const { registerAdmin, loginAdmin, checkAdmin, adminLogout, updateAdminProfile, adminProfile, adminForgotPassword, adminResetPassword } = require("../../controllers/adminController")
const { adminAuth } = require("../../middlewares/adminAuth")

const adminRouter = require("express").Router()

adminRouter.post("/register-admin", registerAdmin )
adminRouter.post("/admin-login", loginAdmin )   
adminRouter.post("/admin-forgot-password", adminForgotPassword )   
adminRouter.post("/admin-reset-password/:token", adminResetPassword ) 
adminRouter.post("/admin-logout", adminAuth, adminLogout )

adminRouter.get("/check-admin", adminAuth, checkAdmin )
adminRouter.get("/admin-profile", adminAuth, adminProfile )

adminRouter.put("/update-admin-profile", adminAuth, updateAdminProfile )



module.exports = adminRouter     