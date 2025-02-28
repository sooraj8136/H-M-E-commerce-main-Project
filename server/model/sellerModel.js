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
            maxLength: 30
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
            minLength: 8,
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
        profilePic: {
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
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