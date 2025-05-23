const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            minLength: 10,
            maxLength: 15,
        },
        password: {
            type: String,
            required: true,
            minLength: [8, 'Password must be at least 8 characters long']
        },
        storeName: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["seller"], 
            default: "seller"
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        resetToken: {
            type: String
        }, 
        resetTokenExpires: {
            type: Date
        },
        
        products: [{ type: mongoose.Types.ObjectId, ref: "products" }],
    },
    { timestamps: true }
);

module.exports = new mongoose.model("seller", sellerSchema);