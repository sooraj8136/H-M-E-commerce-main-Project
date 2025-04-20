import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner, Card, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Barchart from "../../components/seller/Barchart";
import { axiosInstance } from "../../config/axiosInstance";

function SellerDashboard() {
  const { darkMode } = useSelector((state) => state.mode);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/get-seller-orders");
        setOrders(res.data.data);
        console.log("Orders=====", res.data.data);
        // Filter the orders that are processing
        const processing = res.data.data.filter(order => order.orderStatus === 'processing');
        setProcessingOrders(processing.length); // Set the number of processing orders
        console.log("Processinggggggggggg=========", processing.length);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };

    const fetchProductCount = async () => {
      try {
        const res = await axiosInstance.get("/product/get-seller-products");
        setProductsCount(res.data.data.products);
        console.log("Product Count=====", res.data.data.products);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchSellerOrders();
    fetchProductCount();

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant={darkMode ? "light" : "dark"} />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <div
        className="p-3"
        style={{
          width: "100%",
          maxWidth: "250px",
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1000,
        }}
      >
        <Nav className="flex-column" style={{ marginTop: "100px" }}>
          <Nav.Item>
            <Link to="/seller/seller-home" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              DASHBOARD
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/seller/seller-product" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              MANAGE PRODUCTS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/seller/create-product" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              CREATE PRODUCTS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/seller/get-orders-seller" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              YOUR ORDERS
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/seller/update-order-status" className={`nav-link ${darkMode ? "text-dark" : "text-light"}`}>
              UPDATE STATUS
            </Link>
          </Nav.Item>
        </Nav>
      </div>

      <div className="flex-grow-1 p-4" style={{ backgroundColor: "transparent", borderRadius: "0px" }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className={darkMode ? "text-white" : "text-dark"}>Seller Dashboard</h2>
          </div>

          <Row className="gy-4">
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <h5>Total Sales</h5>
                  <p className="h5">$12,450</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <h5>Total Orders</h5>
                  <p className="h5">{orders?.length || 0}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <h5>Processing Orders</h5>
                  <p className="h5">{processingOrders}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Card className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ borderRadius: "0px" }}>
                <Card.Body>
                  <h5>Products</h5>
                  <p className="h5">{productsCount?.length || 0}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-5">
            <Barchart role="seller" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
