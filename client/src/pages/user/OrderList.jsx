import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

const OrderList = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get("/orders/get-order-by-userid");
        setOrders(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrderDetails();
  }, []);

  return (
    <Container data-theme={darkMode ? "dark" : "light"} className="py-5">
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className='text-danger' style={{ fontWeight: "700" }}>Orders</span>
        </p>
      </div>
      <div className="empty-cart">
        <p className={darkMode ? 'text-black' : 'text-white'}>Free shipping above Rs.1999</p>
        <p className={darkMode ? 'text-black' : 'text-white'}>Free & flexible 15 days return</p>
        <p className={darkMode ? 'text-black' : 'text-white'}>Estimated delivery time: 2-7 days</p>
      </div>
      <div className='shopping-bag-head'>
        <h3 className={darkMode ? 'text-black' : 'text-white'}>Your Orders</h3>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 mb-4">
                <Row className="mb-3">
                  <Col xs={12} sm={6}>
                    <h6 className="mb-0">Order ID: {order._id}</h6>
                  </Col>
                  <Col xs={12} sm={6} className="text-sm-end mt-1 mt-sm-0">
                    <span className="d-inline-block d-sm-inline" style={{ fontWeight: "bold" }}>
                      {order.orderStatus}
                    </span>
                  </Col>
                </Row>
                <p><strong>Total Amount:</strong> Rs. {order.totalAmount.toFixed(2)}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <h6 style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Items:</h6>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <Row className="mb-1">
                      <Col xs={6} style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.name}</Col>
                      <Col xs={3} className="text-center" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.quantity}</Col>
                      <Col xs={3} className="text-end" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{(item.quantity * item.price).toFixed(2)}</Col>
                    </Row>
                    <hr />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className={darkMode ? 'text-black' : 'text-white'}>
              <h1 className="text-center" style={{ fontWeight: '700', fontSize: 'xx-large' }}>
                You have no orders yet!
              </h1>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OrderList;
