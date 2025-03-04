import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateProduct = () => {
  const { darkMode } = useSelector((state) => state.mode); 
  
  const { id: productId } = useParams();
  const [productData, setProductData] = useState({
    image: null,
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    materials: "",
    careguid: "",
  });

  const fetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(`/product/${productId}`);
      setProductData({
        title: data.title || "",
        price: data.price || "",
        description: data.description || "",
        category: data.category || "",
        stock: data.stock || "",
        materials: data.materials || "",
        careguid: data.careguid || "",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in productData) {
        if (productData[key]) {
          formData.append(key, productData[key]);
        }
      }

      const response = await axiosInstance.put(`/product/update-product/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error when updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com /
          <span className="text-danger" style={{ fontWeight: "800" }}>
            Update Product
          </span>
        </p>
      </div>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center" style={{ fontSize: "20px", fontWeight: "bold" }}>
          Update Your Product
        </h1>
      </div>
      <br />
      <div
        className={darkMode ? "text-black" : "text-white"}
        style={{ fontSize: "0.9rem", fontWeight: "500" }}
      >
        <p className="text-center">
          Update your product details
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Image:
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-100 pass-input mt-1"
          />
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Title:
          </label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          />
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Price:
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          />
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Description:
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Category:
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          />
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Stock:
          </label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          />
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Product Materials:
          </label>
          <input
            type="text"
            name="materials"
            value={productData.materials}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          />
        </div>
        <div className="mb-3">
          <label className={`d-block ${darkMode ? "text-black" : "text-white"} fw-normal`}>
            Care Guidelines:
          </label>
          <textarea
            name="careguid"
            value={productData.careguid}
            onChange={handleChange}
            className="w-100 pass-input mt-1"
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="bg-black signin-btn"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            Update Product
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProduct;
