const { getOrdersByUserId, getAllOrders, updateOrderStatus } = require("../../controllers/orderController");
const { adminAuth } = require("../../middlewares/adminAuth");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const { userAuth } = require("../../middlewares/userAuth");

const orderRouter = require("express").Router();

orderRouter.get("/get-order-by-userid", userAuth, getOrdersByUserId )
orderRouter.get("/get-all-orders", adminAuth, getAllOrders )

orderRouter.put("/orders/:orderId/status", sellerAuth, updateOrderStatus )


module.exports = orderRouter; 