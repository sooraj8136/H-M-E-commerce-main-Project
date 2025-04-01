// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Outlet, useNavigate } from 'react-router-dom'

// function ProtectedRoute() {

//     const { isUserAuth } = useSelector((state) => state.user)

//     const navigate = useNavigate();

//     if (!isUserAuth) {
//         navigate("/login");
//         return;
//     }

//     return (
//         <Outlet />
//     )
// }

// export default ProtectedRoute

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const isLoading = useSelector(state => state.auth.isLoading); // Add this if you have an authentication loading state

    useEffect(() => {
        if (!user && !isLoading) {
            navigate('/login');
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return <p>Loading...</p>; // Show loading state while checking auth
    }

    return user ? <Outlet /> : null;
};

export default ProtectedRoute;

