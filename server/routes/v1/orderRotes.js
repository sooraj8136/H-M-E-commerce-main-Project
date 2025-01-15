const { getOrdersByUserId, getAllOrders, updateOrderStatus, getSellerOrders } = require("../../controllers/orderController");
const { adminAuth } = require("../../middlewares/adminAuth");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const { userAuth } = require("../../middlewares/userAuth");

const orderRouter = require("express").Router();

orderRouter.get("/get-order-by-userid", userAuth, getOrdersByUserId ) //user can fetch  their orders
orderRouter.get("/get-all-orders", adminAuth, getAllOrders )  // Admin can fetch all orders
orderRouter.get("/get-seller-orders", sellerAuth, getSellerOrders )  // seller can fetch thir own product orders

orderRouter.put("/orders/:orderId/status", sellerAuth, updateOrderStatus )


module.exports = orderRouter; 