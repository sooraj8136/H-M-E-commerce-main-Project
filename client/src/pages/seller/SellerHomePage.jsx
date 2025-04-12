import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Barchart from '../../components/seller/Barchart';
import { useSelector } from 'react-redux';

function SellerHomePage() {
  const { darkMode } = useSelector((state) => state.mode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="p-5" style={{ minHeight: 450 }}>
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "50px" }}>
        <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
          SELLER DASHBOARD
        </p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <Row className="d-flex justify-content-center align-items-center">
          <Col>
            <Barchart role="seller" />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default SellerHomePage;
