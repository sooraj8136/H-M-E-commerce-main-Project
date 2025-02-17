import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRouteSeller() {
    const { isSellerAuth } = useSelector((state) => state.seller);

    const navigate = useNavigate();

    if (!isSellerAuth) {
        navigate("/seller/login");
        return null;
    }

    return (
        <Outlet />
    );
}

export default ProtectedRouteSeller;
