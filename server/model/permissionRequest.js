const mongoose = require("mongoose");

const permissionRequestSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
            required: true,
        },
        status: {
            type: String,
            enum: ["processing", "transit", "out-for-delivery", "delivered"],
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("PermissionRequest", permissionRequestSchema);
