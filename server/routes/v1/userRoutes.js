// const { register, login, userProfile, userLogout, checkUser, updateUserProfile, deactivateUser, activateUser, deleteUser, getAllUsers, userForgotPassword, userResetPassword } = require('../../controllers/userControllers')
// const { adminAuth } = require('../../middlewares/adminAuth')
// const { upload } = require('../../middlewares/multer')
// const { userAuth } = require('../../middlewares/userAuth')

// const userRouter = require('express').Router()

// userRouter.post("/signup", register)
// userRouter.post("/login", login)
// userRouter.post("/user-forgot-password", userForgotPassword)
// userRouter.post("/user-reset-password/:token", userResetPassword)
// userRouter.post("/logout", userAuth, userLogout)

// userRouter.get("/profile", userAuth, userProfile)
// userRouter.get("/check-user", userAuth, checkUser)
// userRouter.get("/get-all-user", adminAuth, getAllUsers)

// userRouter.put("/update-profile",upload.single("profilePic"), userAuth, updateUserProfile)
// userRouter.put("/deactivate-user/:userId", adminAuth, deactivateUser)
// userRouter.put("/activate-user/:userId", adminAuth, activateUser)
 
// userRouter.delete("/delete-user/:userId", deleteUser)

// module.exports = userRouter


const { register, login, userProfile, userLogout, checkUser, updateUserProfile, deactivateUser, activateUser, deleteUser, getAllUsers, userForgotPassword, userResetPassword } = require('../../controllers/userControllers');
const { adminAuth } = require('../../middlewares/adminAuth');
const { upload } = require('../../middlewares/multer');
const { userAuth } = require('../../middlewares/userAuth');

const userRouter = require('express').Router();

// Middleware for CORS headers
const setCorsHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://h-m-e-commerce-main-project-client.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
};

// Apply CORS headers to all routes
userRouter.use(setCorsHeaders);

// Routes
userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.post("/user-forgot-password", userForgotPassword);
userRouter.post("/user-reset-password/:token", userResetPassword);
userRouter.post("/logout", userAuth, userLogout);

userRouter.get("/profile", userAuth, userProfile);
userRouter.get("/check-user", userAuth, checkUser);
userRouter.get("/get-all-user", adminAuth, getAllUsers);

userRouter.put("/update-profile", upload.single("profilePic"), userAuth, updateUserProfile);
userRouter.put("/deactivate-user/:userId", adminAuth, deactivateUser);
userRouter.put("/activate-user/:userId", adminAuth, activateUser);

userRouter.delete("/delete-user/:userId", deleteUser);

module.exports = userRouter;
