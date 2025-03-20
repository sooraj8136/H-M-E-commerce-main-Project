import React from 'react';
import Nav from "react-bootstrap/Nav";
import { Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';

function SellerProductCard({ product }) {
  const { darkMode } = useSelector((state) => state.mode);

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Nav.Link href={`/seller/seller-product-details/${product?._id}`} className="text-decoration-none">
          <div>
            <img
              src={product?.image}
              alt={product?.title}
              className="img-fluid"
              style={{
                objectFit: "cover",
                maxWidth: "100%",
                height: "auto",
                marginBottom: "10px",
                borderRadius: "0", 
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
          </div>
        </Nav.Link>
      </Row>
    </Container>
  );
}

export default SellerProductCard;
