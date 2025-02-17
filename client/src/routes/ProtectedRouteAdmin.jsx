import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRouteAdmin() {
    const { isAdminAuth } = useSelector((state) => state.admin);

    const navigate = useNavigate();

    if (!isAdminAuth) {
        navigate("/admin/login");
        return null;
    }
    
    return (
        <Outlet />
    );
}

export default ProtectedRouteAdmin;
