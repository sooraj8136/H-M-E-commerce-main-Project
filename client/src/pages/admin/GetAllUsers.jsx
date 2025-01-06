// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../config/axiosInstance';
// import toast from 'react-hot-toast';

// const GetAllUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axiosInstance.get('/user/get-all-user');
//                 setUsers(response.data);
//             } catch (error) {
//                 toast.error('Failed to fetch users');
//                 console.error('Error fetching users:', error.response?.data?.message || error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleDelete = async (userId) => {
//         try {
//             const response = await axiosInstance.delete(`/user/delete-user/${userId}`);
//             toast.success('User deleted successfully');
//             setUsers(users.filter(user => user._id !== userId));
//             console.log("User deleted with ID:", userId);
//         } catch (error) {
//             toast.error('Failed to delete user');
//             console.error('Error deleting user:', error.response?.data?.message || error.message);
//         }
//     };

//     const handleActivate = async (userId) => {
//         try {
//             const response = await axiosInstance.put(`/user/activate-user/${userId}`);
//             toast.success('User activated successfully');
//             setUsers(users.map(user => user._id === userId ? { ...user, status: 'active' } : user)); // Update user status
//             console.log("User activated with ID:", userId);
//         } catch (error) {
//             toast.error('Failed to activate user');
//             console.error('Error activating user:', error.response?.data?.message || error.message);
//         }
//     };

//     const handleDeactivate = async (userId) => {
//         try {
//             const response = await axiosInstance.put(`/user/deactivate-user/${userId}`);
//             toast.success('User deactivated successfully');
//             setUsers(users.map(user => user._id === userId ? { ...user, status: 'inactive' } : user)); // Update user status
//             console.log("User deactivated with ID:", userId);
//         } catch (error) {
//             toast.error('Failed to deactivate user');
//             console.error('Error deactivating user:', error.response?.data?.message || error.message);
//         }
//     };
//     return (
//         <div>
//             <h1 className='heading text-center'>All Users</h1>
//             {users.length === 0 ? (
//                 <p>No users found.</p>
//             ) : (
//                 <div className="user-cards">
//                     {users.map((user) => (
//                         <div className="user-card" key={user._id}>
//                             <div className="user-card-content">
//                                 <h3>{user.name}</h3>
//                                 <p>{user.email}</p>
//                                 <p>{user.mobile}</p>
//                                 <div className="user-actions">
//                                     <button onClick={() => handleActivate(user._id)}>Activate</button>
//                                     <button onClick={() => handleDeactivate(user._id)}>Deactivate</button>
//                                     <button onClick={() => handleDelete(user._id)} className='dlt-btn'>Delete</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };


// export default GetAllUsers;





import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Modal } from 'react-bootstrap';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ show: false, action: '', userId: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/user/get-all-user');
                setUsers(response.data);
            } catch (error) {
                toast.error('Failed to fetch users');
                console.error('Error fetching users:', error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
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
                setUsers(users.map(user => user._id === userId ? { ...user, status: 'active' } : user));
            } else if (action === 'deactivate') {
                await axiosInstance.put(`/user/deactivate-user/${userId}`);
                toast.success('User deactivated successfully');
                setUsers(users.map(user => user._id === userId ? { ...user, status: 'inactive' } : user));
            }
        } catch (error) {
            toast.error(`Failed to ${action} user`);
            console.error(`Error during ${action}:`, error.response?.data?.message || error.message);
        } finally {
            setModal({ show: false, action: '', userId: '' });
        }
    };

    const handleModal = (action, userId) => {
        setModal({ show: true, action, userId });
    };

    return (
        <div>
            <h1 className='heading text-center'>All Users</h1>
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
