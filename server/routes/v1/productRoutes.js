const { getAllProduct, createProduct, getProduct, deleteProduct, updateProduct, productCategory } = require("../../controllers/productControllers")
const { upload } = require("../../middlewares/multer")
const { sellerAuth } = require("../../middlewares/sellerAuth")

const productRouter = require("express").Router()


productRouter.get("/get-all-products", getAllProduct )
productRouter.get("/get-product/:id", getProduct )
productRouter.get("/:category", productCategory )

productRouter.post("/create-product", sellerAuth, upload.single("image"), createProduct )

productRouter.delete("/delete-product/:id", deleteProduct )

productRouter.put("/update-product/:id", updateProduct )



module.exports = productRouter


