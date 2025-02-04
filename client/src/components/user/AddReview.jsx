// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { axiosInstance } from "../../config/axiosInstance";
// import Button from "react-bootstrap/esm/Button";
// import { useState } from "react";

// export const AddReview = () => {
//   const { productId } = useParams();

//   const [rating, setRating] = useState(0);

//   const { register, handleSubmit } = useForm();

//   const navigate = useNavigate();

//   const handleStarClick = (value) => {
//     setRating(value);  
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axiosInstance.post("/review/add-review", {
//         ...data,
//         productId,
//         rating,  
//       });

//       if (response) {
//         toast.success("Review added successfully!");
//         navigate(`/product-details/${productId}`);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit(onSubmit)} className="login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3">
//         <h3 className="mt-2 fw-bold text-black">Add Review</h3>

//         <div className="d-flex gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => handleStarClick(star)}
//               className="star"
//               style={{
//                 cursor: "pointer",
//                 fontSize: "2rem",
//                 color: star <= rating ? "#ffcc00" : "#d9d9d9",
//               }}
//             >
//               ★
//             </span>
//           ))}
//         </div>

//         {/* Comment Input */}
//         <div>
//           <textarea
//             className="form-control rounded-2"
//             {...register("comment", { required: true })}
//             placeholder="Enter your comment"
//             aria-label="Comment"
//             rows="4"
//           />
//         </div>

//         {/* Submit Button */}
//         <div>
//           <Button
//             className="rounded-2 border-0 px-4 py-2 text-center text-white mt-1"
//             type="submit"
//             variant="dark"
//             disabled={rating === 0}  // Disable button if no rating is selected
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };



import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export const AddReview = () => {
  const { productId } = useParams();

  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/review/add-review", {
        ...data,  
        productId,
        rating,
      });

      if (response) {
        toast.success("Review added successfully!");
        navigate("/user/success-review");
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container">
      <div className="rate-product-container text-center">
        <button onClick={handleShowModal} className="rate-product">
          Rate product
        </button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <h5 className="text-center w-100">Add Your Review</h5>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2 align-items-center justify-content-center"
            style={{ width: "100%" }}
          >
            <div className="d-flex gap-1 mb-3 justify-content-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="star"
                  style={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: star <= rating ? "black" : "#d9d9d9",
                  }}
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
                aria-label="Comment"
                rows="4"
                style={{ width: "100%", minWidth: "250px", maxWidth: "100%" }}
              />
            </div>

            <div className="w-100 text-center">
              <button
                type="submit"
                className="rating-btn w-100"
                disabled={rating === 0}
                style={{ maxWidth: "250px", minWidth: "150px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
