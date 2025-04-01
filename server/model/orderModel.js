// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "products",
//           required: true,
//         },
//         name: String,
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     orderStatus: {
//       type: String,
//       enum: ["processing", "transit", "out-for-delivery", "delivered"],
//       default: "processing",
//     },
//     canUpdate: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("order", orderSchema);


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "transit", "out-for-delivery", "delivered"],
      default: "processing",
    },
    canUpdate: {
      type: Boolean,
      default: false,
    },
    stripeSessionId: { 
      type: String, 
      required: true, // Optional, you can set this after payment is initiated
    },
    paymentStatus: {
      type: String,
      enum: [a"paid", "failed"],
      default: "paid", // Default is 'pending' until payment is completed
    },
    paymentIntentId: { 
      type: String, 
      required: false, // Optional, can be useful for tracking the payment attempt
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
