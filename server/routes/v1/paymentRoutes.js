const { CreateCheckoutSession, sessionStatus, handlePaymentComplete } = require("../../controllers/paymentController");
const { userAuth } = require("../../middlewares/userAuth")

const paymentRouter = require("express").Router();

paymentRouter.post("/create-checkout-session", userAuth,CreateCheckoutSession )
paymentRouter.get("/session-status",sessionStatus) 
paymentRouter.put("/payment-completed",userAuth, handlePaymentComplete) 


module.exports = paymentRouter;