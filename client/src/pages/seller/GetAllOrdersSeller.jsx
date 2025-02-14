import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { axiosInstance } from "../../config/axiosInstance";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); 

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(""); 
      setOrders([]); // Clear previous orders to avoid stale data
  
      const response = await axiosInstance.post(
        "/orders/get-seller-orders-by-status",
        { status } 
      );
  
      setOrders(response.data.data); 
      toast.success("Orders fetched successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching orders.");
      toast.error(err.response?.data?.message || "Failed to fetch orders."); 
    } finally {
      setLoading(false); // Reset the loading state
    }
  };
  
  useEffect(() => {
    if (status !== undefined) { // Only fetch if `status` is defined
      fetchOrders();
    }
  }, [status]);
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Seller Orders</h1>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="status" style={{ marginRight: "10px", fontWeight: "bold" }}>
          Filter by Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
      {!loading && !error && orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <h3>Order ID: {order._id}</h3>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id} style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      style={{ width: "50px", height: "50px", marginRight: "10px" }}
                    />
                    <span>{item.productId.title}</span> - <span>${item.productId.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
