const cartDb = require("../model/cartModel")
const productDb = require("../model/productModel")

const getCart = async (req, res) => {

    try {

        const userId = req.user.id

        const cart = await cartDb.findOne({ userId }).populate("products.productId")

        if (!cart) {
            return res.status(404).json({ message: "Sorry, Cart not found" })
        }

        res.status(200).json({ message: "cart fetched successfully", data: cart })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


const addToCart = async (req, res) => {
    
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "please provide productId" });
        }

        const product = await productDb.findById(productId);
        if (!product) {
            console.log("Product : ", product)
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await cartDb.findOne({ userId });
        if (!cart) {
            cart = new cartDb({ userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex((item) =>
            item.productId.equals(productId)
        );

        if (existingProductIndex > -1) {

            cart.products[existingProductIndex].count += 1;
        } else {

            cart.products.push({
                productId,
                price: product.price,
                count: 1,
            });
        }

        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ message: "Product added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        
        let cart = await cartDb.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        const productToRemove = cart.products[productIndex];

        if (productToRemove.count > 1) {
            productToRemove.count -= 1
        } else {
            cart.products.splice(productIndex, 1) 
        }

        if (typeof cart.calculateTotalPrice === "function") {
            cart.calculateTotalPrice() 
        }

        await cart.save();

        res.status(200).json({ message: "Cart item removed successfully", data: cart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal server error", error })
    }
};



const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await cartDb.findOne({ userId });
        cart.products = [];
        cart.calculateTotalPrice();
        await cart.save();

        res.status(200).json({ message: "Your cart has been cleared successfully", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


module.exports = { getCart, addToCart, removeProductFromCart, clearCart }