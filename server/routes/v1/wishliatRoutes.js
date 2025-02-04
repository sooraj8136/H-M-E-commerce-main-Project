const { addToWishlist, removeFromWishlist, getWishlist } = require("../../controllers/wishlistController");
const { userAuth } = require("../../middlewares/userAuth");

const wishlistRouter = require("express").Router()

wishlistRouter.post("/add-to-wishlist", userAuth, addToWishlist);
wishlistRouter.delete("/remove-from-wishlist/:productId", userAuth, removeFromWishlist);
wishlistRouter.get("/get-wishlist", userAuth, getWishlist);


module.exports = wishlistRouter;    