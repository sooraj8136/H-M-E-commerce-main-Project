import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

const SellerOrders = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setOrders([]);
      const response = await axiosInstance.post(
        "/orders/get-seller-orders-by-status",
        { status }
      );
      setOrders(response.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders.");
    }
  };

  useEffect(() => {
    if (status !== undefined) {
      fetchOrders();
    }
  }, [status]);

  return (
    <Container data-theme={darkMode ? "dark" : "light"} className="py-5">
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "140px" }}>
        <p style={{ fontWeight: "400", fontSize: "3rem", color: "black" }}>
          ORDERS
        </p>
      </div>  
      <div className="mb-4">
        <label
          htmlFor="status"
          className={darkMode ? "text-black" : "text-white"}
          style={{ marginRight: "10px", fontWeight: "bold", fontSize: "16px" }}
        >
          Filter by Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px",
            border: darkMode ? "1px solid #555" : "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          <option value="">All</option>
          <option value="processing">Processing</option>
          <option value="transit">Transit</option>
          <option value="out-for-delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {orders.length === 0 ? (
            <div className={darkMode ? "text-black" : "text-white"}>
              <h1 className="text-center" style={{ fontWeight: "700", fontSize: "xx-large" }}>
                You have no orders yet!
              </h1>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 mb-4">
                <Row className="mb-3">
                  <Col xs={12} sm={6}>
                    <h6 className="mb-0">Order ID: {order._id}</h6>
                  </Col>
                  <Col xs={12} sm={6} className="text-sm-end mt-2 mt-sm-0">
                    <span className="d-inline-block d-sm-inline" style={{ fontWeight: "bold" }}>
                      {order.orderStatus}
                    </span>
                  </Col>
                </Row>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <ListGroup variant="flush" className="mb-3">
                  <ListGroup.Item className="fw-bold">Items:</ListGroup.Item>
                  {order.items.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col xs={6}>{item.name}</Col>
                        <Col xs={3} className="text-center"> {item.quantity}</Col>
                        <Col xs={3} className="text-end">₹{(item.quantity * item.price).toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default SellerOrders;
