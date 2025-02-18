const OrderDb = require('../model/orderModel');
const { catchErrorHandler } = require('../utils/catchErrorHandler');
const productDb = require("../model/productModel");
const PermissionRequest = require('../model/permissionRequest');
const { default: mongoose } = require('mongoose');

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching orders for user ID:", userId);

    const orders = await OrderDb.find({ userId })
      .populate("items.productId", "title price image")
      .exec();

    console.log("Orders fetched from DB:", orders);
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Admin Auth
const getAllOrders = async (req, res) => {
  try {

    const orders = await OrderDb.find()
      .populate('userId', 'name email')
      .populate('items.productId', 'title price');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error });
  }
};


const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    if (!sellerId) {
      return res.status(400).json({ error: "Seller not found" });
    }

    console.log("Seller Id: ", sellerId);

    const sellerProducts = await productDb.find({ seller: sellerId }).select("_id");

    if (!sellerProducts.length) {
      return res.status(404).json({ message: "No products found for this seller" });
    }

    const productIds = sellerProducts.map((product) => product._id);

    let orders = await OrderDb.find({
      "items.productId": { $in: productIds },
    })
      .populate("items.productId", "title price image")
      .populate("userId", "name email");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this seller" });
    }

    res.status(200).json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    catchErrorHandler(res, error);
  }
};



// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     if (!["processing", "transit", "out-for-delivery", "delivered"].includes(status)) {
//       return res.status(400).json({ message: "Invalid order status" });
//     }

//     const updatedOrder = await OrderDb.findByIdAndUpdate(
//       orderId,
//       { orderStatus: status },
//       { new: true, runValidators: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }

// };


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["processing", "transit", "out-for-delivery", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await OrderDb.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.canUpdate) {
      await sendPermissionRequestToAdmin(orderId, status);
      return res.status(403).json({
        message: "Permission denied. A request has been sent to the admin for approval.",
      });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


const sendPermissionRequestToAdmin = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    console.log("Request Body:", req.body);

    // Validate request data
    const validStatuses = ["processing", "transit", "out-for-delivery", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided." });
    }

    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID provided." });
    }

    // Save the permission request
    const permissionRequest = new PermissionRequest({
      orderId,
      status,
      createdAt: new Date(),
    });

    await permissionRequest.save();

    res.status(200).json({ message: "Permission request sent successfully." });
  } catch (error) {
    console.error("Error handling permission request:", error);
    res.status(500).json({ message: "Failed to send permission request." });
  }
};


const updatePermissionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { isApproved } = req.body;

    if (typeof isApproved !== "boolean") {
      return res.status(400).json({ message: "Invalid isApproved value. Must be true or false." });
    }

    const permissionRequest = await PermissionRequest.findById(requestId).populate("orderId");
    if (!permissionRequest) {
      return res.status(404).json({ message: "Permission request not found" });
    }

    permissionRequest.isApproved = isApproved;
    await permissionRequest.save();

    if (isApproved) {
      const order = await OrderDb.findById(permissionRequest.orderId);
      if (order) {
        order.canUpdate = true;
        await order.save();
      }
    }

    res.status(200).json({
      message: `Permission request ${isApproved ? "approved" : "denied"} successfully`,
    });
  } catch (error) {
    console.error("Error updating permission request:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const getPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await PermissionRequest.find({ isApproved: false }).populate("orderId");
    res.status(200).json({ message: "Pending requests fetched successfully", requests: pendingRequests });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getSellerOrdersByStatus = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure the user is authenticated

    const { status } = req.body; // Status filter from the request body

    if (!userId) {
      return res.status(400).json({ error: "Seller not authorized" });
    }

    // Get all products associated with this seller
    const sellerProducts = await productDb.find({ seller: userId }).select("_id");

    if (!sellerProducts.length) {
      return res.status(404).json({ message: "No products found for this seller" });
    }

    // Extract product IDs to filter orders
    const productIds = sellerProducts.map((product) => product._id);

    const query = {
      "items.productId": { $in: productIds },
    };

    if (status) query.orderStatus = status; // Add status filter if provided

    // Fetch orders with the necessary details
    const ordersByStatus = await OrderDb.find(query).populate(
      "items.productId",
      "title price image"
    );

    if (!ordersByStatus.length) {
      return res.status(404).json({ message: "No orders found for this seller" });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      data: ordersByStatus,
    });
  } catch (error) {
    console.error("Error in getSellerOrdersByStatus:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error",
    });
  }
};


const updateStock = async (req, res) => {
  try {
    const userId = req.user.id;

    const order = await OrderDb.findOne({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    console.log("USER ID === ", userId);

    // Update stock for each product in the order
    const updatedProducts = await Promise.all(
      order.items.map(async (item) => {
        const product = item.productId;

        if (product) {
          // Validate stock availability
          if (item.quantity > product.stock) {
            throw new Error(
              `Insufficient stock for ${product.title.trim()}. Available: ${product.stock}`
            );
          }

          const newStock = product.stock - item.quantity;

          product.stock = Math.max(0, newStock);

          await product.save();

          console.log(
            `Updated stock for ${product.title.trim()}: ${product.stock}`
          );

          return {
            title: product.title,
            price: product.price,
            updatedStock: product.stock,
          };
        }
      })
    );

    return res.status(200).json({
      message: "Stock updated successfully",
      updatedProducts,
    });
  } catch (error) {
    console.error("Error in updating stock:", error.message);
    return res.status(400).json({ message: error.message });
  }
};


module.exports = { getOrdersByUserId, getAllOrders, updateOrderStatus, getSellerOrders, updatePermissionRequest, getPendingRequests, sendPermissionRequestToAdmin, getSellerOrdersByStatus, updateStock };
