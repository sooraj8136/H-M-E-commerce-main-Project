import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance'; 

const CreateProductForm = () => {
  const [productDetails, setProductDetails] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null,
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
    formData.append('title', productDetails.title);
    formData.append('price', productDetails.price);
    formData.append('description', productDetails.description);
    formData.append('category', productDetails.category);
    formData.append('image', productDetails.image);

    try {
      const response = await axiosInstance.post('/product/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      toast.success('Product created successfully!');
      console.log('Product created:', response.data);
    } catch (error) {
      toast.error('Failed to create product');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Product Title
          <input
            type="text"
            name="title"
            value={productDetails.title}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Product Price
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Product Description
          <textarea
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Product Category
          <input
            type="text"
            name="category"
            value={productDetails.category}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Product Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </label>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductForm;


