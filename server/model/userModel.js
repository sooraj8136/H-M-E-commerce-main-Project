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
            minLength: [8, 'Password must be at least 8 characters long'] 
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

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); 
