import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectedRoute() {

    const { isUserAuth } = useSelector((state) => state.user)

    const navigate = useNavigate();

    if (!isUserAuth) {
        navigate("/login");
        return;
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute