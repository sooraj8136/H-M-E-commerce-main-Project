import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from 'react-redux';
import { Container, Badge, ListGroup, Button, Row, Col } from "react-bootstrap";
import { AddReview } from "../../components/user/AddReview";

const OrderList = () => {

  const { darkMode } = useSelector((state) => state.mode)
  console.log(darkMode)

  const [orders, setOrders] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/orders/get-order-by-userid",
      });

      setOrders(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  console.log("Orders==============", orders);

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
              <Col xs={12} sm={6} className="text-sm-end mt-2 mt-sm-0">
                <span className="d-inline-block d-sm-inline" style={{fontWeight:"bold"}}>
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
