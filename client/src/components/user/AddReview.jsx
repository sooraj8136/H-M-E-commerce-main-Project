import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Collapse, Button } from 'react-bootstrap';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const AddReview = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const { productId } = useParams();
  const { userData } = useSelector((state) => state.user);   // Get logged-in user data
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [openReviews, setOpenReviews] = useState(false);

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
      console.log("Error when fetching reviews:", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const onSubmit = async (data) => {
    try {
      if (!userData?.user?._id) {
        toast.error("You have to log in to add a review");
        return;
      }

      if (editingReview) {
        await axiosInstance.put(`/review/update-review/${editingReview._id}`, {
          ...data,
          rating,
          productId,
          userId: userData?.user?._id, 
        });
        toast.success("Review updated successfully!");
      } else {
        await axiosInstance.post("/review/add-review/", {
          ...data,
          productId,
          rating,
          userId: userData?.user?._id, 
        });
        toast.success("Review added successfully");
      }

      fetchReviews();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Error when submitting review:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/review/delete-review/${productId}/${reviewId}`);
      toast.success("Review deleted successfully!");
      fetchReviews();
    } catch (error) {
      console.error("Error when deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="container">                                     {/* Rate button */}
      <div className="rate-product-container text-center">
        {userData?.user?._id && (
          <button
            onClick={() => handleShowModal()}
            className="rate-product"
            style={{ border: "1px solid white" }}
          >
            Rate product
          </button>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>                                 {/* Review adding area Star and Text area */}
        <Modal.Header closeButton>
          <h5 className="text-center w-100">{editingReview ? "Edit" : "Add"} Your Review</h5>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2 align-items-center justify-content-center"
          >
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
      <div className="reviews-container mt-4">                   {/* Open review buton */}
        <div className="d-flex w-100">
          <Button
            variant="link"
            className="align-items-center w-100"
            onClick={() => setOpenReviews(!openReviews)}
            aria-controls="reviews-collapse-text"
            aria-expanded={openReviews}
            style={{
              marginTop: '1rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            <span className={darkMode ? 'text-black' : 'text-white'}>Customer Reviews</span>
            <span className="ms-auto">
              {openReviews ? <MdKeyboardArrowUp className={darkMode ? 'text-black' : 'text-white'} size={22} /> : <MdKeyboardArrowDown className={darkMode ? 'text-black' : 'text-white'} size={22} />}
            </span>
          </Button>
        </div>
        <Collapse in={openReviews}>                                                      
          <div id="reviews-collapse-text" className="mt-3">
            {reviews.length > 0 ? (
              reviews.map((review) => {
                console.log("Logged-in User ID:", userData?._id);
                console.log("Review User ID:", review.userId);

                return (
                  <div key={review._id} className="mb-2">
                    <p className={darkMode ? 'text-black mb-0' : 'text-white mb-0'}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </p>
                    <p className={darkMode ? 'text-black mb-1' : 'text-white mb-1'}>{review.comment}</p>
                    {userData?.user?._id === review.userId && (
                      <>
                        <a
                          href="#"
                          className={darkMode ? 'text-black me-3' : 'text-white me-3'}
                          onClick={(e) => { e.preventDefault(); handleShowModal(review); }}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className={darkMode ? 'text-black me-3' : 'text-white me-3'}
                          onClick={(e) => { e.preventDefault(); deleteReview(review._id); }}
                        >
                          Delete
                        </a>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p className={darkMode ? 'text-black text-center' : 'text-white text-center'}>
                No reviews.
              </p>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};
