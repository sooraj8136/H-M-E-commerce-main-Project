const { ObjectId } = require('mongoose').Types; // Import ObjectId
const OrderDb = require('../model/orderModel');

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Handle if userId is not provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Get user order details
    const userOrder = await OrderDb.find({ userId: new ObjectId(userId) }) // Use new ObjectId(userId)
      .populate("items.productId", "title price image") // Ensure schema matches
      .exec();

    // Handle orders not found
    if (!userOrder || userOrder.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Send data to the frontend
    return res.status(200).json({
      message: "User orders fetched successfully",
      data: userOrder,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

module.exports = { getOrdersByUserId };
