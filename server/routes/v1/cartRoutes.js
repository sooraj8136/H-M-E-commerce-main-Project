const { getCart, addToCart, removeProductFromCart, clearCart, updateCount } = require("../../controllers/cartControllers");
const { userAuth } = require("../../middlewares/userAuth");

const cartRouter = require("express").Router()

cartRouter.get("/get-cart", userAuth, getCart )
cartRouter.post("/add-to-cart", userAuth, addToCart )
cartRouter.put("/remove-from-cart", userAuth, removeProductFromCart )
cartRouter.post("/clear-cart", userAuth, clearCart )
cartRouter.put("/update-count", userAuth, updateCount )


module.exports = cartRouter;    