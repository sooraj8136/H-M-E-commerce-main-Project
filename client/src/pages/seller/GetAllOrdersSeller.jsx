import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/orders/get-seller-orders");

        setOrders(response.data.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching orders");
      } finally {
        setLoading(false);
      }
    };  

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h1>Seller Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <div>
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                      <span>{item.productId.title}</span> - 
                      <span>${item.productId.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
