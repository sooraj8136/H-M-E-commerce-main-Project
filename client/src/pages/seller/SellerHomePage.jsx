import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Barchart from '../../components/seller/Barchart';
import { useSelector } from 'react-redux';

function SellerHomePage() {
  const { darkMode } = useSelector((state) => state.mode);
  return (
    <Container className="p-5" style={{ minHeight: 450 }}>
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className="text-danger" style={{ fontWeight: "700" }}>Dashboard</span>
        </p>
      </div>
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <Barchart role="seller" />
        </Col>
      </Row>
    </Container>
  )
}

export default SellerHomePage