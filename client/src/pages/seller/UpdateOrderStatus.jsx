// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../config/axiosInstance';
// import toast from 'react-hot-toast';
// import Container from 'react-bootstrap/Container';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// const UpdateOrderStatus = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [statusToUpdate, setStatusToUpdate] = useState({});

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axiosInstance.get('/orders/get-seller-orders');
//         console.log("API Response:", response.data);
//         setOrders(response.data.data || []); 
//       } catch (err) {
//         setError(err?.response?.data?.message || 'Failed to fetch orders');
//         toast.error(err?.response?.data?.message || 'Failed to fetch orders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusChange = (orderId, newStatus) => {
//     setStatusToUpdate((prev) => ({
//       ...prev,
//       [orderId]: newStatus,
//     }));
//   };

//   const handleUpdateStatus = async (orderId) => {
//     const status = statusToUpdate[orderId];
//     try {
//       const response = await axiosInstance.put(`/orders/orders/${orderId}/status`, { status });
//       toast.success(response.data.message);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, orderStatus: status } : order
//         )
//       );
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Failed to update order status');
//     }
//   };

//   return (
//     <Container className="my-5">
//       <h1 className="text-center mb-4">Update Order Status</h1>
//       {loading ? (
//         <p>Loading orders...</p>
//       ) : error ? (
//         <p className="text-danger">{error}</p>
//       ) : orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>User Name</th>
//               <th>Items</th>
//               <th>Current Status</th>
//               <th>Change Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.userId?.name || "N/A"}</td> {/* Display User Name */}
//                 <td>
//                   {order.items.map((item, index) => (
//                     <div key={index}>
//                       <strong>{item.productId?.title}</strong> - {item.quantity} x Rs.
//                       {item.productId?.price}
//                     </div>
//                   ))}
//                 </td>
//                 <td>{order.orderStatus}</td>
//                 <td>
//                   <Form.Select
//                     className="mb-2"
//                     value={statusToUpdate[order._id] || order.orderStatus}
//                     onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                   >
//                     <option value="processing">Processing</option>
//                     <option value="transit">In Transit</option>
//                     <option value="out-for-delivery">Out for Delivery</option>
//                     <option value="delivered">Delivered</option>
//                   </Form.Select>
//                   <Button
//                     className="btn btn-primary"
//                     onClick={() => handleUpdateStatus(order._id)}
//                   >
//                     Update
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default UpdateOrderStatus;


import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const UpdateOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({}); // Track selected status for each order

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/orders/get-seller-orders");
      setOrders(response.data.data || []);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async (orderId, status) => {
    try {
      const response = await axiosInstance.post("/orders/permission-request", {
        orderId,
        status,
      });

      setMessage(response.data.message);
      fetchOrders(); // Refresh orders after sending permission request
    } catch (error) {
      console.error("Error requesting permission:", error);
      setMessage(
        error.response?.data?.message || "Failed to request permission."
      );
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await axiosInstance.put(
        `/orders/orders/${orderId}/status`,
        { status }
      );
      setMessage(response.data.message);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      setMessage(
        error.response?.data?.message || "Failed to update order status."
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="update-order-status-container">
      <h1 className="heading">Update Order Status</h1>

      {message && <p className="message">{message}</p>}

      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <div className="order-info">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Can Update:</strong> {order.canUpdate ? "Yes" : "No"}
                </p>
              </div>

              <h4>Order Items:</h4>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index} className="order-item-details">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="product-image"
                    />
                    <div className="item-info">
                      <p>
                        <strong>Item Name:</strong>{" "}
                        {item.productId?.title || "N/A"}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> Rs. {item.productId?.price || 0}
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
                >
                  Update
                </button>

                {!order.canUpdate && (
                  <>
                    <p className="permission-denied">
                      Permission required to update the status.
                    </p>
                    <button
                      className="request-permission-button"
                      onClick={() =>
                        requestPermission(order._id, selectedStatus[order._id] || order.orderStatus)
                      }
                    >
                      Request Permission
                    </button>

                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-orders">Sorry No orders found!</p>
      )}
    </div>
  );
};

export default UpdateOrderStatus;






