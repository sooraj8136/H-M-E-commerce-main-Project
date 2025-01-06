const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
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
            maxLength: 60
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            minLength: 10,
            maxLength: 15,
        },
        role: {
            type: String,
            enum: ["admin", "seller"],
            default: 'admin'
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        profilePic: {
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        },
        qualification: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        resetToken: {
            type: String
        }, // For password reset
        resetTokenExpires: {
            type: Date
        }, // Token expiration time

        products: [{ type: mongoose.Types.ObjectId, ref: "products" }],
    },
    { timestamps: true }
);

module.exports = new mongoose.model("admin", adminSchema);