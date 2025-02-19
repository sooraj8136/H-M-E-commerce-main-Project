const { getAllProduct, createProduct, getProduct, deleteProduct, updateProduct, productCategory, getSellerProducts } = require("../../controllers/productControllers")
const { upload } = require("../../middlewares/multer")
const { sellerAuth } = require("../../middlewares/sellerAuth")

const productRouter = require("express").Router()


productRouter.get("/get-all-products", getAllProduct )
productRouter.get("/get-product/:id", getProduct )
productRouter.get("/get-seller-products", sellerAuth, getSellerProducts )
productRouter.get("/:category", productCategory )

productRouter.post("/create-product", sellerAuth, upload.single("image"), createProduct )

productRouter.delete("/delete-product/:id",sellerAuth, deleteProduct )

productRouter.put("/update-product/:id",sellerAuth,upload.single("image"), updateProduct )



module.exports = productRouter


