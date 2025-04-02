const { getOrdersByUserId, getAllOrders, updateOrderStatus, getSellerOrders, getPendingRequests, updatePermissionRequest, sendPermissionRequestToAdmin, getSellerOrdersByStatus, updateStock } = require("../../controllers/orderController");
const { adminAuth } = require("../../middlewares/adminAuth");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const { userAuth } = require("../../middlewares/userAuth");

const orderRouter = require("express").Router();

orderRouter.get("/get-order-by-userid", getOrdersByUserId ) //user can fetch  their orders
orderRouter.get("/get-all-orders", adminAuth, getAllOrders )  // Admin can fetch all orders
orderRouter.get("/get-seller-orders", sellerAuth, getSellerOrders )  // seller can fetch their own product orders

orderRouter.post("/get-seller-orders-by-status", sellerAuth, getSellerOrdersByStatus )
orderRouter.get("/requests", adminAuth, getPendingRequests ) 
orderRouter.post("/requests/:requestId", adminAuth, updatePermissionRequest ) 
orderRouter.post("/permission-request", sendPermissionRequestToAdmin ) 
orderRouter.post("/update-Stock", userAuth, updateStock ) 

orderRouter.put("/orders/:orderId/status", sellerAuth, updateOrderStatus )


module.exports = orderRouter; 