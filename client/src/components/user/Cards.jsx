import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../config/axiosInstance';
import { FaTrashAlt } from 'react-icons/fa';
import WishlistButton from '../../api/WishlistButton';
import { Link } from 'react-router-dom';

function ProductCards({ product }) {
  const { darkMode } = useSelector((state) => state.mode);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await axiosInstance.get('/wishlist/get-wishlist');
        const wishlistProducts = response.data.data.products;

        setIsInWishlist(wishlistProducts.some((p) => p._id === product?._id));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    checkWishlist();
  }, [product]);

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <div className="text-center position-relative mx-1 text-start">
        <Link to={`/productDetails/${product?._id}`} className="text-decoration-none">
          <img
            src={product?.image}
            alt={product?.title}
            style={{
              objectFit: 'cover',
              marginBottom: '6px',
              maxWidth: '1024px',
              width: '265px',
            }}
          />
          <div className="d-flex flex-column align-items-start">
            <h3
              className={darkMode ? 'text-black' : 'text-white'}
              style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}
            >
              {product?.title}
            </h3>
            <p className={darkMode ? 'text-black' : 'text-white'} style={{ fontSize: '0.8rem', fontWeight: '500' }}>
              Rs. {product?.price}.00
            </p>
          </div>
        </Link>
        <div className="position-absolute" style={{ top: '-15px', right: '-1px' }}>
          <WishlistButton productId={product?._id} isInWishlist={isInWishlist} setIsInWishlist={setIsInWishlist} />
        </div>
      </div>
    </Container>
  );
}



export const CartCards = ({ item, handleUpdate }) => {
  const { darkMode } = useSelector((state) => state.mode);

  return (
    <Container>
      <div className="cart-card">
        <div className="cart-card-image">
          <img
            src={item?.productId?.image}
            alt={item?.productId?.title || 'cart-item'}
            className="product-image"
          />
        </div>
        <div className="cart-card-details">
          <h2 className="product-title">{item?.productId?.title}</h2>
          <h3 className="product-price">Rs. {item?.price}.00</h3>
          <h4 className="product-quantity">
            <button
              className="btn btn-decrement"
              onClick={() => handleUpdate(item?.productId?._id, 'remove')}
            >
              -
            </button>
            {item?.count}
            <button
              className="btn btn-increment"
              onClick={() => handleUpdate(item?.productId?._id, 'add')}
            >
              +
            </button>
          </h4>
          <h4 className="product-total">Total : Rs. {item?.totalAmount}.00</h4>
        </div>

        <div className="cart-card-actions">
          <button
            className="btn"
            onClick={() => handleUpdate(item?.productId?._id, 'delete')} 
          >
            <FaTrashAlt className="text-lg text-red-500" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProductCards;
