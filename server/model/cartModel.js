const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema( 
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                count: {
                    type: Number,
                    default: 0,
                    min: 0,
                },
                totalAmount: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.products.reduce((total, product) => 
    total + product.price * product.count, 0);
};


module.exports = new mongoose.model("carts", cartSchema);   