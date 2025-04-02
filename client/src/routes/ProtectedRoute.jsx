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

function ProtectedRoute() {
    const { isUserAuth } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuth) {
            navigate('/login');
        }
    }, [isUserAuth, navigate]); // useEffect will run when `isUserAuth` changes

    // Prevent rendering the protected component while redirecting
    if (!isUserAuth) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedRoute;
