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
            return res.status(400).json({ message: "Please provide productId" });
        }

        const product = await productDb.findById(productId);
        if (!product) {
            console.log("Product: ", product);
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
            cart.products[existingProductIndex].totalAmount =
                cart.products[existingProductIndex].price *
                cart.products[existingProductIndex].count;
        } else {
            cart.products.push({
                productId,
                price: product.price,
                count: 1,
                totalAmount: product.price,
            });
        }

        cart.totalPrice = cart.products.reduce(
            (sum, item) => sum + item.totalAmount, 0
        );

        await cart.save();

        res.status(200).json({ message: "Product added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


const updateCount = async (req, res) => {

    try {
        const userId = req.user.id;
        const { productId, action } = req.body; 

        if (!productId || !action) {
            return res.status(400).json({ message: "Please provide productId and action" });
        }

        const product = await productDb.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await cartDb.findOne({ userId });
        if (!cart) {
            cart = new cartDb({ userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex((item) =>
            item.productId.equals(productId)
        );

        if (action === "add") {
            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].count += 1;
                cart.products[existingProductIndex].totalAmount =
                    cart.products[existingProductIndex].price *
                    cart.products[existingProductIndex].count;
            } else {
                cart.products.push({
                    productId,
                    price: product.price,
                    count: 1,
                    totalAmount: product.price,
                });
            }
        } else if (action === "remove") {
            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].count -= 1;
                if (cart.products[existingProductIndex].count === 0) {
                    cart.products.splice(existingProductIndex, 1);
                } else {
                    cart.products[existingProductIndex].totalAmount =
                        cart.products[existingProductIndex].price *
                        cart.products[existingProductIndex].count;
                }
            } else {
                return res.status(404).json({ message: "Product not found in cart" });
            }
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        cart.totalPrice = cart.products.reduce(
            (sum, item) => sum + item.totalAmount,
            0
        );

        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", data: cart });
    } catch (error) {
        console.error(error);
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

        cart.products.splice(productIndex, 1);

        cart.totalPrice = cart.products.reduce(
            (sum, item) => sum + (item.price * item.count),
            0
        );

        await cart.save();

        res.status(200).json({ message: "Product removed from cart successfully", data: cart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal server error", error });
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
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


module.exports = { getCart, addToCart, removeProductFromCart, clearCart, updateCount }