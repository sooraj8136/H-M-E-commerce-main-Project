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
  });

  const fetchProduct = async () => {
    try {
      
      const response = await axiosInstance.get(`/product/${productId}`);
      console.log('Fetched product data:', response.data); 

      setProductData({
        title: response.data.title || "",
        price: response.data.price !== null ? response.data.price : "", 
        description: response.data.description || "",
        category: response.data.category || "",
      });
    } catch (error) {
      console.error('Error fetching product details:', error); 
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
      console.log('Updating product data:', productData);
      
      const response = await axiosInstance.put(`/product/update-product/${productId}`, productData);
      console.log('Response after update:', response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || "Failed to update product");
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

