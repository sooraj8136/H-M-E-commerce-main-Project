const { cloudinaryInstance } = require("../config/cloudinaryConfig")
const productDb = require("../model/productModel")

const getAllProduct = async (req, res) => {

    try {

        const allProduct = await productDb.find().select("title price image description category ")

        if (!allProduct) {
            res.status(400).json({ message: "Sorry, Product not recieved" })
        }

        res.status(200).json({ message: "Product list fetched successfully", data: allProduct })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const createProduct = async (req, res) => {

    try {

        const { image, title, price, description, category } = req.body

        const {userId} = req.user;

        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);


        if (!title || !price || !description || !category) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path)
        console.log(uploadResult)


        const newProduct = new productDb({ title, price, description, category, image: uploadResult.url, seller: userId });
        const savedProduct = await newProduct.save()

        res.status(200).json({ message: "New product created successfully", data: savedProduct })


    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const getProduct = async (req, res) => {
    try {

        const productId = req.params.id

        const singleProduct = await productDb.findById(productId).populate("seller")

        if (!singleProduct) {
            return res.status(400).json({ message: "Sorry, Product not found" })
        }

        res.status(200).json({ message: "Recieved a Product", data: singleProduct })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


const deleteProduct = async (req, res) => {

    try {

        const productId = req.params.id

        const deleteProduct = await productDb.findByIdAndDelete(productId, req.body)

        if (!deleteProduct) {
            return res.status(400).json({ message: "Sorry, Product not deleted" })
        }

        res.status(200).json({ message: "Product deleted successfully" })


    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const updateProduct = async (req, res) => {

    try {

        const productId = req.params.id

        const savedProduct = await productDb.findByIdAndUpdate(productId, req.body, { new: true }).select("-password")

        if (!savedProduct) {
            return res.status(400).json({ message: "Sorry, Product not updated" })
        }

        res.status(200).json({ message: "Product updated successfully", data: savedProduct })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const productCategory = async (req, res) => {

    try {
        const { category } = req.params;

        console.log(category)

        const products = await productDb.find({ category });
        res.status(200).json({ data: products })

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }

}



module.exports = { getAllProduct, createProduct, getProduct, deleteProduct, updateProduct, productCategory }