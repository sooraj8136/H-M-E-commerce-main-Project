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

        console.log('request Body = ', req.body);
        console.log('uploaded File  = ', req.file);

        let parsedSizes = sizes;
        if (typeof sizes === 'string') {
            parsedSizes = JSON.parse(sizes);
        }

        if (!title || !price || !description || !materials || !careguid || !stock || !category || !parsedSizes || parsedSizes.length === 0) {
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
            sizes: parsedSizes,
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
        const { image, title, price, description, category, stock, size, materials, careguid } = req.body;

        const updateFields = { image, title, price, description, category, stock, size, materials, careguid };

        // Remove undefined or empty fields
        Object.keys(updateFields).forEach((key) => {
            if (!updateFields[key]) delete updateFields[key];
        });

        // Check if there are fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields for update" });
        }

        const updatedProductData = await productDb.findByIdAndUpdate(productId, updateFields, { new: true }).select("-password");

        if (!updatedProductData) {
            return res.status(400).json({ message: "Sorry, Product not updated" });
        }

        res.status(200).json({ message: "Product updated successfully", data: updatedProductData });

    } catch (error) {
        console.error(error);
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