const { getCart, addToCart, removeProductFromCart, clearCart } = require("../../controllers/cartControllers");
const { userAuth } = require("../../middlewares/userAuth");

const cartRouter = require("express").Router()

cartRouter.get("/get-cart", userAuth, getCart )
cartRouter.post("/add-to-cart", userAuth, addToCart )
cartRouter.delete("/remove-from-cart", userAuth, removeProductFromCart )
cartRouter.post("/clear-cart", userAuth, clearCart )


module.exports = cartRouter;    