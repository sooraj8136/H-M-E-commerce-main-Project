const wishlistDb = require("../model/wishlistModel");

const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?.id; 

    console.log("User Id ====", userId);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    try {
        let wishlist = await wishlistDb.findOne({ userId });

        if (!wishlist) {
            wishlist = new wishlistDb({ userId, products: [] }); 
        }

        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
            return res.status(200).json({ message: "Item added to wishlist", wishlist });
        }

        return res.status(400).json({ message: "Item already in wishlist" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        let wishlist = await wishlistDb.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
        await wishlist.save();

        return res.status(200).json({ message: "Item removed from wishlist", wishlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistDb.findOne({ userId: req.user.id }).populate("products");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        return res.status(200).json({ message: "Wishlist fetched successfully", data: wishlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
