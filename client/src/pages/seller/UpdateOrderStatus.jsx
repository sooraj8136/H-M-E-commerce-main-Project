import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateOrderStatus = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders/get-seller-orders");
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  const requestPermission = async (orderId, status) => {
    try {
      const response = await axiosInstance.post("/orders/permission-request", {
        orderId,
        status,
      });
      toast.success(response.data.message);
      fetchOrders();
    } catch (error) {
      console.error("Error requesting permission:", error);
      toast.error(error.response?.data?.message || "Failed to request permission.");
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await axiosInstance.put(
        `/orders/orders/${orderId}/status`,
        { status }
      );
      toast.success(response.data.message);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.response?.data?.message || "Failed to update order status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white"}>
          H&M / <span className='text-danger' style={{ fontWeight: "700" }}>Update ordre status</span>
        </p>
      </div>
      <div className="update-order-status-container">
        {orders.length > 0 && (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0'
                }}>
                <div className="order-info">
                  <p style={{ fontSize: 'small', fontWeight: '600' }}>
                    <strong style={{ fontSize: 'small' }}>Order ID:</strong> {order._id}
                  </p>
                  <p style={{ fontSize: 'small', fontWeight: '600' }}>
                    <strong style={{ fontSize: 'small' }}>User ID:</strong> {order.userId.name}
                  </p>
                  <p style={{ fontSize: 'small', fontWeight: '600' }}>
                    <strong style={{ fontSize: 'small' }}>Status:</strong> {order.orderStatus}
                  </p>
                  <p style={{ fontSize: 'small', fontWeight: '600' }}>
                    <strong style={{ fontSize: 'small' }}>Can Update:</strong> {order.canUpdate ? "Yes" : "No"}
                  </p>
                </div>
                <ul className="order-items">
                  {order.items?.map((item, index) => (
                    <li key={index} className="order-item-details">
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.title}
                        className="product-image"
                      />
                      <div className="item-info">
                        <p style={{ fontSize: 'small', fontWeight: '600' }}>
                          <strong style={{ fontSize: 'small' }}>Item Name:</strong> {item.productId?.title}
                        </p>
                        <p style={{ fontSize: 'small', fontWeight: '600' }}>
                          <strong style={{ fontSize: 'small' }}>Quantity:</strong> {item.quantity}
                        </p>
                        <p style={{ fontSize: 'small', fontWeight: '600' }}>
                          <strong style={{ fontSize: 'small' }}>Price:</strong> Rs. {item.productId?.price || 0}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="status-update">
                  <label htmlFor={`status-${order._id}`} className="label">
                    Update Status:
                  </label>
                  <select
                    id={`status-${order._id}`}
                    className="status-select"
                    value={selectedStatus[order._id] || ""}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setSelectedStatus((prev) => ({
                        ...prev,
                        [order._id]: selectedValue,
                      }));
                    }}
                    disabled={!order.canUpdate}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="processing">Processing</option>
                    <option value="transit">Transit</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <button
                    className="update-button"
                    onClick={() =>
                      handleUpdateStatus(order._id, selectedStatus[order._id])
                    }
                    disabled={!selectedStatus[order._id]}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "black",
                      border: "1px solid white",
                      padding: "8px 12px",
                      fontWeight: "600",
                      fontSize: 'small',
                      display: "inline-block",
                      borderRadius: '0'
                    }}
                  >
                    Update
                  </button>

                  {!order.canUpdate && (
                    <>
                      <p className="permission-denied mt-4" style={{ fontSize: 'X-small', textAlign: 'start' }}>
                        Permission required to update the status.
                      </p>
                      <button
                        className="request-permission-button"
                        onClick={() =>
                          requestPermission(order._id, selectedStatus[order._id] || order.orderStatus)
                        }
                        style={{
                          textDecoration: "none",
                          color: "white",
                          backgroundColor: "black",
                          border: "1px solid white",
                          padding: "8px 12px",
                          fontSize: 'small',
                          display: "inline-block",
                          fontWeight: "600"
                        }}
                      >
                        Request Permission
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UpdateOrderStatus;
