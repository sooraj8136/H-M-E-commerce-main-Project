const OrderDb = require('../model/orderModel');

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure `req.user.id` is available
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


module.exports = { getOrdersByUserId };
