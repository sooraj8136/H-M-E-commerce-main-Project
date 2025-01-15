import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusToUpdate, setStatusToUpdate] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/get-seller-orders');
        console.log("API Response:", response.data);
        setOrders(response.data.data || []); // Adjust based on your API's response structure
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch orders');
        toast.error(err?.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusToUpdate((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    const status = statusToUpdate[orderId];
    try {
      const response = await axiosInstance.put(`/orders/orders/${orderId}/status`, { status });
      toast.success(response.data.message);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update order status');
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Update Order Status</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Items</th>
              <th>Current Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name || "N/A"}</td> {/* Display User Name */}
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <strong>{item.productId?.title}</strong> - {item.quantity} x Rs.
                      {item.productId?.price}
                    </div>
                  ))}
                </td>
                <td>{order.orderStatus}</td>
                <td>
                  <Form.Select
                    className="mb-2"
                    value={statusToUpdate[order._id] || order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="transit">In Transit</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </Form.Select>
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleUpdateStatus(order._id)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UpdateOrderStatus;
