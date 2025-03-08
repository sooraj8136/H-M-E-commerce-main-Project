import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

function WishlistPage() {
  const { darkMode } = useSelector((state) => state.mode);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/wishlist/get-wishlist"
        });
        setWishlist(response?.data?.data?.products || []);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axiosInstance.delete(`/wishlist/remove-from-wishlist/${productId}`);
      setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className='text-danger' style={{ fontWeight: "700" }}>Favourites</span>
        </p>
      </div>
      <div className='text-center mb-5 mt-3'>
        <h2 className={darkMode ? 'text-black' : 'text-white'} style={{ fontSize: "40px", fontWeight: "700" }}>
          Favourites
        </h2>
      </div>

      {loading ? (
        <p className="text-center">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <Container>
          <Row className="d-flex justify-content-start">
            {wishlist.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="text-center position-relative mb-4">
                <Link to={`/productDetails/${product._id}`} className="text-decoration-none">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      marginBottom: '10px',
                      maxWidth: '1024px',
                    }}
                  />
                </Link>
                <div className="d-flex flex-column align-items-start">
                  <h3 className={darkMode ? 'text-black' : 'text-white'} style={{ fontSize: '1rem', fontWeight: "600", marginBottom: '0.5rem' }}>
                    {product.title}
                  </h3>
                  <p className={darkMode ? 'text-black' : 'text-white'} style={{ fontSize: '0.8rem', fontWeight: "500" }}>
                    Rs. {product.price}.00
                  </p>
                </div>

                <div className="position-absolute" style={{ top: '6px', right: '15px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the Link from being triggered
                      handleRemoveFromWishlist(product._id);
                    }}
                    className="btn"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default WishlistPage;
