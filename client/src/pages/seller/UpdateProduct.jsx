import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const fetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(`/product/${productId}`);
      setProductData({
        title: data.title || "",
        price: data.price || "",
        description: data.description || "",
        category: data.category || "",
        stock: data.stock || 0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating product data:", productData);
      const response = await axiosInstance.put(`/product/update-product/${productId}`, productData);
      console.log("Response after update:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error when updating product : ", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
