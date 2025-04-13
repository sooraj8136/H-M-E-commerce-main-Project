import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

function WishlistPage() {
  const { darkMode } = useSelector((state) => state.mode);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/wishlist/get-wishlist"
        });
        setTimeout(() => {
          setWishlist(response?.data?.data?.products || []);
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/wishlist/remove-from-wishlist/${productId}`
      });
      setWishlist((prevWishlist) => prevWishlist.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}>
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <>
          <Container className="mt-2">
            <div
              className="container d-flex justify-content-start align-items-start heading-head"
              style={{ marginTop: "100px" }}>
              <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "400", fontSize: "0.9rem", color: "#a0a0a0" }}>
                SM.COM / <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "red" }}>FAVOURITES</span>
              </p>
            </div>
            <div
              className="container d-flex justify-content-start align-items-start heading-head"
              style={{ marginTop: "40px" }}>
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
                          onClick={() => handleRemoveFromWishlist(product._id)}
                          className="btn">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </Container>
        </>
      )}
    </>
  );
}

export default WishlistPage;
