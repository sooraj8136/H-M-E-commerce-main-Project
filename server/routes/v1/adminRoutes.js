const { registerAdmin, loginAdmin, checkAdmin, adminLogout, updateAdminProfile, adminProfile } = require("../../controllers/adminController")
const { adminAuth } = require("../../middlewares/adminAuth")

const adminRouter = require("express").Router()

adminRouter.post("/register-admin", registerAdmin )
adminRouter.post("/admin-login", loginAdmin )   

adminRouter.get("/check-admin", adminAuth, checkAdmin )
adminRouter.get("/admin-logout", adminAuth, adminLogout )
adminRouter.get("/admin-profile", adminAuth, adminProfile )

adminRouter.put("/update-admin-profile", adminAuth, updateAdminProfile )


//fetch-all-users
//deactivate-or-activate-usres
//fetch-all-sellers


module.exports = adminRouter    