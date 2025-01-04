const { getOrdersByUserId } = require("../../controllers/orderController");
const { userAuth } = require("../../middlewares/userAuth");

const orderRouter = require("express").Router();

orderRouter.get("/get-orders", userAuth, getOrdersByUserId )


module.exports = orderRouter; 