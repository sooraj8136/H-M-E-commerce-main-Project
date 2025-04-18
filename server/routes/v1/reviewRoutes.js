const express = require('express');
const { addReview, getReviews, getAverageRating, deleteReview, editReview } = require('../../controllers/reviewController');
const { userAuth } = require('../../middlewares/userAuth');

const reviewRouter = express.Router();

reviewRouter.get('/get-review/:productId', getReviews);
reviewRouter.get('/get-average-review/:productId', getAverageRating);

reviewRouter.post('/add-review', userAuth, addReview);

reviewRouter.put('/update-review/:productId', userAuth, editReview);

reviewRouter.delete('/delete-review/:productId/:reviewId', userAuth, deleteReview);

module.exports = reviewRouter;
