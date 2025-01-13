const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            maxLength: 30,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            minLength: 10,
            maxLength: 15
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        profilePic: {
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
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

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); 
