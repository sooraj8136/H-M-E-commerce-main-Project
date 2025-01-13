const { register, login, userProfile, userLogout, checkUser, updateUserProfile, deactivateUser, activateUser, deleteUser, getAllUsers, userForgotPassword, userResetPassword } = require('../../controllers/userControllers')
const { adminAuth } = require('../../middlewares/adminAuth')
const { userAuth } = require('../../middlewares/userAuth')

const userRouter = require('express').Router()

userRouter.post("/signup", register)
userRouter.post("/login", login)
userRouter.post("/user-forgot-password", userForgotPassword)
userRouter.post("/user-reset-password/:token", userResetPassword)

userRouter.get("/profile", userAuth, userProfile)
userRouter.get("/logout", userAuth, userLogout)
userRouter.get("/check-user", userAuth, checkUser)
userRouter.get("/get-all-user", adminAuth, getAllUsers)

userRouter.put("/update-profile", userAuth, updateUserProfile)
userRouter.put("/deactivate-user/:userId", adminAuth, deactivateUser)
userRouter.put("/activate-user/:userId", adminAuth, activateUser) 
userRouter.delete("/delete-user/:userId", adminAuth, deleteUser)

module.exports = userRouter