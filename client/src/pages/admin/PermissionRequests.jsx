import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const PendingPermissionRequests = () => {
    const { darkMode } = useSelector((state) => state.mode);
    const [requests, setRequests] = useState([]);

    const fetchPendingRequests = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/orders/requests"
            });
            setRequests(response.data.requests || []);
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            toast.error("Failed to fetch pending requests.");
        }
    };

    const handleUpdateRequest = async (requestId, isApproved) => {
        try {
            const response = await axiosInstance.post(`/orders/requests/${requestId}`,
                { isApproved: Boolean(isApproved) }
            );
            toast.success(response.data.message);
            fetchPendingRequests();
        } catch (error) {
            console.error("Error updating request:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to update request.");
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    return (
        <Container className="d-flex flex-column align-items-center py-5">
            <div className="container  d-flex justify-content-center align-items-center heading-head  mt-4">
                <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className='text-danger' style={{
                    fontWeight: "800"
                }}>Pending requests</span> </p>
            </div>
            <h1 className="text-center mt-4 mb-4" style={{ color: darkMode ? "black" : "white", fontSize: 'x-large', fontWeight: '600' }}>
                Pending requests
            </h1>
            <Row className="w-100 d-flex flex-column align-items-center">
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <Col key={request._id} xs={12} className="mb-4">
                            <Card className="w-100 border-0 shadow-sm" style={{ borderRadius: "0" }}>
                                <Card.Body>
                                    <Card.Text><strong>Order ID:</strong> {request.orderId._id}</Card.Text>
                                    <Card.Text><strong>Requested Status:</strong> {request.status}</Card.Text>
                                    <Card.Text><strong>Requested At:</strong> {new Date(request.createdAt).toLocaleString()}</Card.Text>
                                    <div className="d-flex gap-3">
                                        <button onClick={() => handleUpdateRequest(request._id, true)} style={{
                                            textDecoration: "none",
                                            color: "white",
                                            backgroundColor: "black",
                                            border: "1px solid white",
                                            padding: "8px 12px",
                                            fontSize: 'small',
                                            display: "inline-block",
                                            fontWeight: "600"
                                        }}>
                                            Approve
                                        </button>
                                        <button onClick={() => handleUpdateRequest(request._id, false)} style={{
                                            textDecoration: "none",
                                            color: "white",
                                            backgroundColor: "black",
                                            border: "1px solid white",
                                            padding: "8px 12px",
                                            fontSize: 'small',
                                            display: "inline-block",
                                            fontWeight: "600"
                                        }}>
                                            Deny
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center mt-4" style={{fontWeight: '600'}}>No pending requests!</p>
                )}
            </Row>
        </Container>
    );
};

export default PendingPermissionRequests;
