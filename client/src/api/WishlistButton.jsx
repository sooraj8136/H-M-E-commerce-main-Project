import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ productId }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await axiosInstance.get('/wishlist/get-wishlist');
        const wishlistProducts = response?.data?.data?.products || [];
        setIsInWishlist(wishlistProducts.some((product) => product._id === productId));
      } catch (error) {
        if (error?.response?.status !== 401) {
          toast.error(error?.response?.data?.message || 'Failed to load wishlist');
        }   
      }
    };
    checkWishlist();
  }, [productId]);

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await axiosInstance.delete(`/wishlist/remove-from-wishlist/${productId}`);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await axiosInstance.post('/wishlist/add-to-wishlist', { productId });
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
  
      if (error?.response?.status === 401) {
        toast.error('You have to log in to add items to your wishlist.');
        navigate('/login'); 
      } else {
        toast.error(error?.response?.data?.message || 'Failed to update wishlist');
      }
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
        <FaHeart style={{ fontSize: '32px', color: 'red', margin: '0', padding: '4px' }} />
      ) : (
        <FaRegHeart style={{ fontSize: '32px', color: 'black', margin: '0', padding: '4px' }} />
      )}
    </button>
  );
};

export default WishlistButton;
