import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from 'react-redux';

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
    <div className={`order-list-wrapper ${darkMode ? "light-mode" : "dark-mode"}`}>
      <h1 className="order-list-header">ORDER SUMMARY</h1>
      {orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>₹{order.totalAmount.toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ul className="order-items-list">
                    {order.items.map((item, index) => (
                      <li key={index} className="order-item-detail">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-orders-text">You have no orders yet.</p>
      )}
    </div>
  );
  
  
};

export default OrderList;
