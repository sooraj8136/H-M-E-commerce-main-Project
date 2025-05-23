import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const GetAllOrders = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/get-all-orders");
        setOrders(response.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch orders");
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container data-theme={darkMode ? "dark" : "light"} className="py-5">
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "120px" }}
      >
        <p
          className={darkMode ? "text-dark" : "text-white"}
          style={{ fontSize: "40px", fontWeight: "600" }}
        >
          ALL ORDERS
        </p>
      </div>

      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "180px" }}>
          <div className="dot-spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <span className={`mt-3 ${darkMode ? "text-black" : "text-white"}`} style={{ letterSpacing: "2px", marginLeft: "12px" }}>Loading...</span>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 mb-4"
                >
                  <Row className="mb-3">
                    <Col xs={12} sm={6}>
                      <h6 className="mb-0">ORDER ID: {order._id}</h6>
                    </Col>
                    <Col xs={12} sm={6} className="text-sm-end mt-2 mt-sm-0">
                      <span
                        className="d-inline-block d-sm-inline"
                        style={{ fontWeight: "bold" }}
                      >
                        {order.orderStatus}
                      </span>
                    </Col>
                  </Row>
                  <p>
                    <strong>USER NAME:</strong> {order.userId?.name}
                  </p>
                  <p>
                    <strong>USER EMAIL:</strong> {order.userId?.email}
                  </p>
                  <p>
                    <strong>TOTAL AMOUNT:</strong> ₹
                    {order.items
                      .reduce(
                        (total, item) =>
                          total + item.quantity * item.productId?.price,
                        0
                      )
                      .toFixed(2)}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="fw-bold">Items:</ListGroup.Item>
                    {order.items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col xs={6}>{item.productId?.title}</Col>
                          <Col xs={3} className="text-center">
                            {item.quantity}
                          </Col>
                          <Col xs={3} className="text-end">
                            ₹
                            {(item.quantity * item.productId?.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              ))
            ) : (
              <div className={darkMode ? "text-black" : "text-white"}>
                <h1
                  className="text-center"
                  style={{ fontWeight: "700", fontSize: "xx-large" }}
                >
                  No orders found.
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default GetAllOrders;
