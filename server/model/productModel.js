const mongoose = require('mongoose')

const productchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_GOhUXbTBGraHVj2z0UFnXvCcTRBsY_hXBg&s",
        },
        title: {
            type: String,
            required: true,
            minLength: 3,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 300,
        },
        category: {
            type: String,
            required: true,
            enum: ["Men", "Ladies", "Baby", "Kids", "Preppy", "Iconic_graphics", "Kidsnew", "Hello-kitty", "Babynew", "accessories", "office", "Denim"]
        },
        seller: { type: mongoose.Types.ObjectId, ref: "seller" },
    },
    { timestamps: true }
);

module.exports = new mongoose.model("product", productchema);