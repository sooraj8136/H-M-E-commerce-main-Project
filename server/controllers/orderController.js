const OrderDb = require('../model/orderModel');
const { catchErrorHandler } = require('../utils/catchErrorHandler');
const productDb = require("../model/productModel")

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

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["processing", "transit", "out-for-delivery", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await OrderDb.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
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



module.exports = { getOrdersByUserId, getAllOrders, updateOrderStatus, getSellerOrders };
