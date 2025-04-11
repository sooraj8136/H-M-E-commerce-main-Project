import React, { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const CreateProductForm = () => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.mode);
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    materials: "",
    careguid: "",
    stock: "",
    image: null,
    sizes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductDetails({
      ...productDetails,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", productDetails.title);
    formData.append("price", productDetails.price);
    formData.append("description", productDetails.description);
    formData.append("category", productDetails.category);
    formData.append("materials", productDetails.materials);
    formData.append("careguid", productDetails.careguid);
    formData.append("stock", productDetails.stock);
    formData.append(
      "sizes",
      JSON.stringify(productDetails.sizes.split(",").map((size) => size.trim()))
    );
    formData.append("image", productDetails.image);

    try {
      const response = await axiosInstance.post("/product/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully!");
      console.log("Product created:", response.data);
      navigate("/seller/seller-product");
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="container py-5 text-center">
          <div className={darkMode ? "text-black" : "text-white"} >
            <div
              className="container d-flex justify-content-start align-items-start heading-head">
              <p style={{ fontSize: "20px", fontWeight: "600", marginTop: "100px" }}>
                CREATE YOUR PRODUCT
              </p>
            </div>
          </div>
        </div>
        <br />
        <form onSubmit={handleSubmit} className="p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Title:
            </label>
            <input
              type="text"
              name="title"
              value={productDetails.title}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Price:
            </label>
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Description:
            </label>
            <textarea
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Category:
            </label>
            <input
              type="text"
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Materials:
            </label>
            <input
              type="text"
              name="materials"
              value={productDetails.materials}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Care Guidelines:
            </label>
            <textarea
              name="careguid"
              value={productDetails.careguid}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Stock:
            </label>
            <input
              type="number"
              name="stock"
              value={productDetails.stock}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Sizes (comma-separated):
            </label>
            <input
              type="text"
              name="sizes"
              value={productDetails.sizes}
              onChange={handleInputChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="mb-3">
            <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
              Product Image:
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-100 pass-input mt-1"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="bg-black signin-btn"
              style={{ maxWidth: "400px", width: "100%" }}
            >
              CREATE PRODUCT
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreateProductForm;
