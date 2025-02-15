import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Barchart from '../../components/seller/Barchart';

function SellerHomePage() {
  return (
    <Container className="p-5" style={{ minHeight: 450 }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col>
          <Barchart role="seller" />
        </Col>
      </Row>
    </Container>
  )
}

export default SellerHomePage