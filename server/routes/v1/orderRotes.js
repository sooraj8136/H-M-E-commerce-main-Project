const { getOrdersByUserId, getAllOrders, updateOrderStatus, getSellerOrders, getPendingRequests, updatePermissionRequest, sendPermissionRequestToAdmin, getSellerOrdersByStatus, updateStock, cancellOrder } = require("../../controllers/orderController");
const { adminAuth } = require("../../middlewares/adminAuth");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const { userAuth } = require("../../middlewares/userAuth");

const orderRouter = require("express").Router();

orderRouter.post("/get-seller-orders-by-status", sellerAuth, getSellerOrdersByStatus )
orderRouter.post("/requests/:requestId", adminAuth, updatePermissionRequest ) 
orderRouter.post("/permission-request", sendPermissionRequestToAdmin ) 
orderRouter.post("/update-Stock", userAuth, updateStock ) 

orderRouter.get("/requests", adminAuth, getPendingRequests ) 
orderRouter.get("/get-order-by-userid", userAuth, getOrdersByUserId ) //user can fetch  their orders
orderRouter.get("/get-all-orders", adminAuth, getAllOrders )  // Admin can fetch all orders
orderRouter.get("/get-seller-orders", sellerAuth, getSellerOrders )  // seller can fetch their own product orders

orderRouter.put("/orders/:orderId/status", sellerAuth, updateOrderStatus )
orderRouter.put("/cancel-order/:orderId", userAuth, cancellOrder )


module.exports = orderRouter; 