import React, { useState, useEffect } from 'react';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";

function WishlistPage() {
  const { darkMode } = useSelector((state) => state.mode);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/wishlist/get-wishlist",
        });
        console.log(response);
        setWishlist(response?.data?.data?.products || []);
      } catch (error) {
        console.error('Try again to fetch favourites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axiosInstance({
        method:"DELETE",
        url:`/wishlist/remove-from-wishlist/${productId}`
      });
      setWishlist((prevWishlist) =>
        prevWishlist.filter((product) => product._id !== productId)
      );
      toast.success("Removed from favourites");
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast.error("Failed to remove item");
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "180px" }}>
        <div className="dot-spinner">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <span className={`mt-3 ${darkMode ? "text-black" : "text-white"}`} style={{ letterSpacing: "2px", marginLeft: "12px" }}>Loading...</span>
      </div>
    );
  }

  return (
    <Container className="mt-2">
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "120px" }}>
        <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
          FAVOURITES
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="container d-flex flex-column justify-content-start align-items-start heading-head mt-4">
          <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "0.8rem", fontWeight: "800" }}>
            SAVE YOUR FAVOURITE ITEMS
          </p>
          <div className="d-flex justify-content-start">
            <button className="brows-now mt-3">
              <a href='/' style={{ textDecoration: "none", color: 'white' }}>Browse now</a>
            </button>
          </div>
        </div>
      ) : (
        <Container>
          <Row className="d-flex justify-content-start">
            {wishlist.map((product) => {
              const secureImage = product.image?.replace(/^http:\/\//i, 'https://');
              return (
                <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="text-center position-relative mb-4">
                  <Link to={`/productDetails/${product._id}`} className="text-decoration-none">
                    <img
                      src={secureImage}
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
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="btn">
                      <FaTrashAlt />
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default WishlistPage;
