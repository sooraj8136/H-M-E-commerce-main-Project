const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
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
        materials: {
            type: String,
            required: true,
        },
        careguid: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Ladies", "Preppy luxe", "New neutrals", "Modern romance", "Activewear-by-Move",
                "Hot-sellers", "New-utilitarian", "Denim", "Transitional-fits",
                "Kids", "Baby", "Kids9-14y", "Kids2-8y",
                "accessories"]
        },
        sizes: {
            type: [String],
            required: true,
            validate: {
                validator: function (sizes) {
                    return sizes && sizes.length > 0;
                },
                message: "At least one size must be provided.",
            },
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        seller: { type: mongoose.Types.ObjectId, ref: "seller" },
    },
    { timestamps: true }
);

module.exports = new mongoose.model("products", productSchema);