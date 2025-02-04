import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistButton = ({ productId }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await axiosInstance.get('/wishlist/get-wishlist');

        console.log('Wishlist Response:', response.data); // Debugging

        // Ensure data exists before accessing products
        const wishlistProducts = response?.data?.data?.products || [];

        console.log('Wishlist Products:', wishlistProducts); // Debugging

        // Check if product is in wishlist
        setIsInWishlist(wishlistProducts.some((product) => product._id === productId));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    checkWishlist();
  }, [productId]);


  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await axiosInstance.delete(`/wishlist/remove-from-wishlist/${productId}`);
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        await axiosInstance.post('/wishlist/add-to-wishlist', { productId }); // Updated route
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7px',
        width: '38px',
        height: '60px',
      }}
    >
      {isInWishlist ? (
        <FaHeart
          style={{
            fontSize: '32px',
            color: 'red',
            margin: '0',
            padding: '4px',
          }}
        />
      ) : (
        <FaRegHeart
          style={{
            fontSize: '32px',
            color: 'black',
            margin: '0',
            padding: '4px',
          }}
        />
      )}
    </button>
  );
};

export default WishlistButton;
