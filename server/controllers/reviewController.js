const reviewDb = require("../model/reviewModel");
const OrderDb = require('../model/orderModel');
const productDb = require("../model/productModel")


const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const product = await productDb.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const order = await OrderDb.findOne({
            userId: userId,
            "items.productId": productId,
            orderStatus: "delivered",
        });

        if (!order) {
            return res
                .status(400)
                .json({ message: "You must purchase the product to add your review!" });
        }

        const existingReview = await reviewDb.findOne({
            productId: productId,
            userId: userId,
        });

        if (existingReview) {
            return res
                .status(400)
                .json({ message: "You have already reviewed this product" });
        }

        const review = await reviewDb.findOneAndUpdate(
            { userId, productId },
            { rating, comment },
            { new: true, upsert: true }
        );

        await review.save();

        res.status(200).json({
            message: "Review added successfully",
            data: review,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


const editReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const product = await productDb.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingReview = await reviewDb.findOne({
            productId: productId,
            userId: userId,
        });

        if (!existingReview) {
            return res.status(400).json({
                message: "You need to add a review before editing it",
            });
        }

        existingReview.rating = rating;
        existingReview.comment = comment;

        await existingReview.save();

        res.status(200).json({
            message: "Review updated successfully",
            data: existingReview,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



const getReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await reviewDb.find({ productId });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
    }
};


const deleteReview = async (req, res) => {
    const { productId, reviewId } = req.params;
    const userId = req.user?.id;

    console.log({ productId, reviewId, userId });

    try {
        if (!productId || !reviewId || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const review = await reviewDb.findOne({ _id: reviewId, productId, userId });

        if (!review) {
            return res.status(404).json({ message: 'Review not found or you are not authorized to delete this review' });
        }

        await reviewDb.deleteOne({ _id: reviewId });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete review', error: err.message });
    }
};


const getAverageRating = async (req, res) => {
    const { productId } = req.params;

    try {

        const reviews = await reviewDb.find({ productId });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this course" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ message: "average ratign fetched", data: averageRating });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { addReview, getReviews, deleteReview, getAverageRating, editReview };
