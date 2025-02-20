import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const [productData, setProductData] = useState({
    image: null,
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    size: "",
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
        stock: data.stock || 0,
        size: data.size || "",
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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Size:</label>
          <input
            type="text"
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Materials:</label>
          <input
            type="text"
            name="materials"
            value={productData.materials}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Care Guide:</label>
          <textarea
            name="careguid"
            value={productData.careguid}
            onChange={handleChange}
            className="w-full border rounded p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;