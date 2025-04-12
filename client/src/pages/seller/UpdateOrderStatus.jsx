import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const UpdateOrderStatus = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axiosInstance.get("/orders/get-seller-orders");
        setOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    }, 1200); // 1.2s delay for loading effect
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
      <div className="container py-5 text-center">
        <div className={darkMode ? "text-black" : "text-white"}>
          <div className="container d-flex justify-content-start align-items-start heading-head">
            <p style={{ fontSize: "20px", fontWeight: "600", marginTop: "100px" }}>
              UPDATE ORDER STATUS
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <div className="update-order-status-container">
          {orders.length > 0 ? (
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
                      UPDATE
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
                          PERMISSION REQUEST
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateOrderStatus;
