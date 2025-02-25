import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";

const GetAllUsers = () => {
    const { darkMode } = useSelector((state) => state.mode);
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState({ show: false, action: '', userId: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/user/get-all-user');
                setUsers(response.data);
            } catch (error) {
                toast.error('Failed to fetch users');
                console.error('Error fetching users:', error.response?.data?.message || error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleConfirm = async () => {
        const { action, userId } = modal;
        try {
            if (action === 'delete') {
                await axiosInstance.delete(`/user/delete-user/${userId}`);
                toast.success('User deleted successfully');
                setUsers(users.filter(user => user._id !== userId));
            } else if (action === 'activate') {
                await axiosInstance.put(`/user/activate-user/${userId}`);
                toast.success('User activated successfully');
                setUsers(users.map(user => user._id === userId ? { ...user, isActive: true } : user));
            } else if (action === 'deactivate') {
                await axiosInstance.put(`/user/deactivate-user/${userId}`);
                toast.success('User deactivated successfully');
                setUsers(users.map(user => user._id === userId ? { ...user, isActive: false } : user));
            }
        } catch (error) {
            toast.error(`Failed to ${action} user`);
            console.error(`Error when ${action}:`, error.response?.data?.message || error.message);
        } finally {
            setModal({ show: false, action: '', userId: '' });
        }
    };
    

    const handleModal = (action, userId) => {
        setModal({ show: true, action, userId });
    };

    return (
        <div>
            <div className="container  d-flex justify-content-center align-items-center heading-head  mt-4">
                <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className='text-danger' style={{
                    fontWeight: "800"
                }}>All users</span> </p>
            </div>
            <h1 className="text-center mt-4 mb-4" style={{ color: darkMode ? "black" : "white", fontSize: 'x-large', fontWeight: '600' }}>
                All Users
            </h1>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="user-cards">
                    {users.map((user) => (
                        <div className="user-card" key={user._id}>
                            <div className="user-card-content">
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                                <p>{user.mobile}</p>
                                <p className="card-text">
                                    <strong>Status:</strong>
                                    {user.isActive ? (
                                        <span className="text-success"> Active</span>
                                    ) : (
                                        <span className="text-danger"> Deactive</span>
                                    )}
                                </p>
                                <div className="user-actions">
                                    <button

                                        onClick={() => handleModal('activate', user._id)}
                                    >
                                        Activate
                                    </button>
                                    <button

                                        onClick={() => handleModal('deactivate', user._id)}
                                    >
                                        Deactivate
                                    </button>
                                    <button

                                        onClick={() => handleModal('delete', user._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Modal show={modal.show} onHide={() => setModal({ show: false, action: '', userId: '' })}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {modal.action.charAt(0).toUpperCase() + modal.action.slice(1)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {modal.action} this user?
                </Modal.Body>
                <Modal.Footer>
                    <div className="user-actions confirm-btn">
                        <button onClick={() => setModal({ show: false, action: '', userId: '' })}>
                            Cancel
                        </button>
                        <button onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GetAllUsers;
