const { cloudinaryInstance } = require("../config/cloudinaryConfig")
const productDb = require("../model/productModel")
const sellerDb = require("../model/sellerModel")

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
        const { image, title, price, description, materials, careguid, stock, category, sizes } = req.body;
        const sellerId = req.user.id;

        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        if (!title || !price || !description || !materials || !careguid || !stock || !category || !sizes || sizes.length === 0) {
            return res.status(400).json({ message: "All fields, including sizes, are required." });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
        console.log('Uploaded File:', uploadResult);

        const newProduct = new productDb({
            title,
            price,
            description,
            materials,
            careguid,
            category,
            sizes,
            image: uploadResult.url,
            stock,
            seller: sellerId,
        });

        const savedProduct = await newProduct.save();

        await sellerDb.findOneAndUpdate(
            { _id: sellerId },
            { $push: { products: savedProduct._id } },
            { new: true }
        );

        res.status(200).json({ message: "New product created successfully", data: savedProduct });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};



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

const getSellerProducts = async (req, res) => {
    try {
        const userId = req.user.id;

        const products = await sellerDb.findById(userId).populate("products");

        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }

        res.status(200).json({ message: "Products fetched successfully", data: products });
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
};


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
        const productId = req.params.id;
        const { image, title, price, description, category, stock } = req.body;
        const updateFields = {};

        if (image !== undefined && image !== "") updateFields.image = image;
        if (title !== undefined && title !== "") updateFields.title = title;
        if (price !== undefined && price !== null) updateFields.price = price;
        if (description !== undefined && description !== "") updateFields.description = description;
        if (category !== undefined && category !== "") updateFields.category = category;
        if (stock !== undefined && stock !== null) updateFields.stock = stock;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        const savedProduct = await productDb.findByIdAndUpdate(productId, updateFields, { new: true }).select("-password");

        if (!savedProduct) {
            return res.status(400).json({ message: "Sorry, Product not updated" });
        }

        res.status(200).json({ message: "Product updated successfully", data: savedProduct });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};


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


module.exports = { getAllProduct, createProduct, getProduct, deleteProduct, updateProduct, productCategory, getSellerProducts }