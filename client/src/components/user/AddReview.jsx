import { useForm } from "react-hook-form"; 
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

export const AddReview = () => {
  const { productId } = useParams();

  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handleStarClick = (value) => setRating(value);
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReview(null);
    setRating(0);
    setValue("comment", "");
  };
  const handleShowModal = (review = null) => {
    if (review) {
      setEditingReview(review);
      setRating(review.rating);
      setValue("comment", review.comment);
    }
    setShowModal(true);
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/review/get-review/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const onSubmit = async (data) => {
    try {
      if (editingReview) {
        await axiosInstance.put(`/review/update-review/${productId}`, {
          ...data,
          rating,
          productId,
        });
        toast.success("Review updated successfully!");
      } else {
        await axiosInstance.post("/review/add-review", {
          ...data,
          productId,
          rating,
        });
        toast.success("Review added successfully!");
      }
      fetchReviews();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/review/delete-review/${productId}/${reviewId}`);
      toast.success("Review deleted successfully!");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review!");
    }
  };

  return (
    <div className="container">
      <div className="rate-product-container text-center">
        <button onClick={() => handleShowModal()} className="rate-product">
          Rate product
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <h5 className="text-center w-100">{editingReview ? "Edit" : "Add"} Your Review</h5>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2 align-items-center justify-content-center">
            <div className="d-flex gap-1 mb-3 justify-content-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="star"
                  style={{ cursor: "pointer", fontSize: "2rem", color: star <= rating ? "black" : "#d9d9d9" }}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="w-100">
              <textarea
                className="form-control rounded-2 review-textarea"
                {...register("comment", { required: true })}
                placeholder="Enter your comment"
                rows="4"
                style={{ width: "100%" }}
              />
            </div>
            <div className="w-100 text-center">
              <button type="submit" className="rating-btn w-100" disabled={rating === 0}>
                {editingReview ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="reviews-container mt-4">
        <h5 className="text-center">Customer Reviews</h5>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card p-3 border rounded-2 mb-2">
              <p><strong>Rating:</strong> {review.rating} ★</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleShowModal(review)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteReview(review._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
