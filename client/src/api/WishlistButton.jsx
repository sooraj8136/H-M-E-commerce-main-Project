import React, { useState, useEffect } from 'react'; 
import { axiosInstance } from '../config/axiosInstance'; // Make sure the axiosInstance is properly set up
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistButton = ({ productId }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if the product is already in the wishlist
    const checkWishlist = async () => {
      try {
        const response = await axiosInstance.get('/wishlist/get-wishlist'); // Use the axiosInstance
        console.log('Wishlist Response:', response.data); // Log the response for debugging

        const wishlistProducts = response.data.data.products; // Ensure this is an array of product objects
        console.log('Wishlist Products:', wishlistProducts);

        // Check if productId exists in wishlist
        const isInWishlist = wishlistProducts.some((product) => product._id === productId); // Updated check
        setIsInWishlist(isInWishlist); // Set the state accordingly
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
        await axiosInstance.delete(`/wishlist/remove-from-wishlist/${productId}`); // Updated route
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
