// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../config/axiosInstance';
// import toast from 'react-hot-toast';

// const GetAllUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchUsers = async () => {
//         try {
//             const response = await axiosInstance.get('/user/get-all-user')
//             setUsers(response.data)
//         } catch (error) {
//             toast.error('Failed to fetch users');
//             console.error('Error fetching users:', error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false)
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>
//     }

//     return (
//         <div className="users-card-container">
//           <h1 className="users-title">All Users</h1>
//           {users.length === 0 ? (
//             <p className="no-users">No users found.</p>
//           ) : (
//             <div className="card">
//               <table className="users-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Actions</th> {/* Add Actions column */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id}>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td className="action-buttons">
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => handleDelete(user._id)}
//                         >
//                           Delete
//                         </button>
//                         <button
//                           className="btn btn-success"
//                           onClick={() => handleActivate(user._id)}
//                         >
//                           Activate
//                         </button>
//                         <button
//                           className="btn btn-warning"
//                           onClick={() => handleDeactivate(user._id)}
//                         >
//                           Deactivate
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       );

// };

// export default GetAllUsers;



import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/user/delete-user/${userId}`);
            toast.success('User deleted successfully');
            setUsers(users.filter(user => user._id !== userId));
            console.log("User deleted with ID:", userId);
        } catch (error) {
            toast.error('Failed to delete user');
            console.error('Error deleting user:', error.response?.data?.message || error.message);
        }
    };

    const handleActivate = async (userId) => {
        try {
            const response = await axiosInstance.put(`/user/activate-user/${userId}`);
            toast.success('User activated successfully');
            setUsers(users.map(user => user._id === userId ? { ...user, status: 'active' } : user)); // Update user status
            console.log("User activated with ID:", userId);
        } catch (error) {
            toast.error('Failed to activate user');
            console.error('Error activating user:', error.response?.data?.message || error.message);
        }
    };

    const handleDeactivate = async (userId) => {
        try {
            const response = await axiosInstance.put(`/user/deactivate-user/${userId}`);
            toast.success('User deactivated successfully');
            setUsers(users.map(user => user._id === userId ? { ...user, status: 'inactive' } : user)); // Update user status
            console.log("User deactivated with ID:", userId);
        } catch (error) {
            toast.error('Failed to deactivate user');
            console.error('Error deactivating user:', error.response?.data?.message || error.message);
        }
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
                                    <button onClick={() => handleActivate(user._id)}>Activate</button>
                                    <button onClick={() => handleDeactivate(user._id)}>Deactivate</button>
                                    <button onClick={() => handleDelete(user._id)} className='dlt-btn'>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default GetAllUsers;
