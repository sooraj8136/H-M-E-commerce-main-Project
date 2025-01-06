import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';

const GetAllOrders = () => {

    const { darkMode } = useSelector((state) => state.mode);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders/get-all-orders');
                setOrders(response.data);
            } catch (err) {
                setError(err?.response?.data?.message || 'Failed to fetch orders');
                toast.error(err?.response?.data?.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">All Orders</h1>
            {loading ? (
                <p>Loading all orders...</p>
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
                            <th>User Email</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.userId?.name}</td>
                                <td>{order.userId?.email}</td>
                                <td>
                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            <strong>{item.productId?.title}</strong> - Rs.{item.productId?.price} x {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    Rs.{' '}
                                    {order.items.reduce(
                                        (total, item) => total + item.quantity * item.productId?.price,
                                        0
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default GetAllOrders;
