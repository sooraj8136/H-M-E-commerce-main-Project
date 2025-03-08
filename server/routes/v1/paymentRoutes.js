const { reateCheckoutSession, sessionStatus } = require("../../controllers/paymentController");
const { userAuth } = require("../../middlewares/userAuth")

const paymentRouter = require("express").Router();

paymentRouter.post("/create-checkout-session", userAuth,reateCheckoutSession )
paymentRouter.get("/session-status",sessionStatus) 


module.exports = paymentRouter;