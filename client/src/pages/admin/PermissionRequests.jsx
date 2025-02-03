import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const PendingPermissionRequests = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/orders/requests");
            setRequests(response.data.requests || []);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error fetching pending requests:", error);
            setMessage("Failed to fetch pending requests.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRequest = async (requestId, isApproved) => {
        try {
            isApproved = Boolean(isApproved);

            const response = await axiosInstance.post(
                `/orders/requests/${requestId}`,
                { isApproved }
            );
            setMessage(response.data.message);
            fetchPendingRequests();
        } catch (error) {
            console.error("Error updating request:", error.response?.data || error.message);
            setMessage(
                error.response?.data?.message || "Failed to update permission request."
            );
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    return (
        <div className="pending-requests-container">
            <h1 className="heading">Pending Permission Requests</h1>

            {message && <p className="message">{message}</p>}

            {loading ? (
                <p className="loading">Loading requests...</p>
            ) : requests.length > 0 ? (
                <ul className="request-list">
                    {requests.map((request) => (
                        <li key={request._id} className="request-item">
                            <div className="request-info">
                                <p>
                                    <strong>Order ID:</strong> {request.orderId._id}
                                </p>
                                <p>
                                    <strong>Status Requested:</strong> {request.status}
                                </p>
                                <p>
                                    <strong>Requested At:</strong> {new Date(request.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="request-actions">
                                <button
                                    className="approve-button"
                                    onClick={() => handleUpdateRequest(request._id, true)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="deny-button"
                                    onClick={() => handleUpdateRequest(request._id, false)}
                                >
                                    Deny
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-requests">No pending requests.</p>
            )}
        </div>
    );
};

export default PendingPermissionRequests;
