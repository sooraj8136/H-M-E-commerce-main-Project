import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Collapse, Button } from "react-bootstrap";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { axiosInstance } from "../../config/axiosInstance";

function GetReview() {
  const { darkMode } = useSelector((state) => state.mode);
  const { productId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [openReviews, setOpenReviews] = useState(false);

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

  return (
    <div className="container">
      <div className="reviews-container mt-4">
        <div className="d-flex w-100">
          <Button
            variant="link"
            className="align-items-center w-100"
            onClick={() => setOpenReviews(!openReviews)}
            aria-controls="reviews-collapse-text"
            aria-expanded={openReviews}
            style={{
              marginTop: "1rem",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            <span className={darkMode ? "text-black" : "text-white"}>
              Customer Reviews
            </span>
            {openReviews ? (
              <MdKeyboardArrowUp
                size={22}
                className={darkMode ? "text-black" : "text-white"}
              />
            ) : (
              <MdKeyboardArrowDown
                size={22}
                className={darkMode ? "text-black" : "text-white"}
              />
            )}
          </Button>
        </div>
  
        <Collapse in={openReviews}>
          <div id="reviews-collapse-text" className="mt-3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="mb-2">
                  <p className="mb-0">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                  <p>
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className={darkMode ? "text-black" : "text-white"}>
                <p className="text-center">No reviews yet</p>
              </div>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );  
}

export default GetReview;
