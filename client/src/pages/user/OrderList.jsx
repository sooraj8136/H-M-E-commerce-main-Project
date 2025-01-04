import React, { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Retrieve userId dynamically from local storage
  const userId = localStorage.getItem("userId"); // Ensure "userId" is the correct key
  console.log("Retrieved User ID:", userId);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("User ID not found. Please log in.");
        return;
      }

      try {
        const response = await axiosInstance.get(`/orders/get-orders?userId=${userId}`);
        console.log("Fetched Orders:", response.data); // Debug fetched orders
        setOrders(response.data.data || []); // Ensure response structure matches
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      }
    };

    fetchOrders();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.orderStatus}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
