import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axiosInstance';
import { clearAdmin, saveAdmin } from '../redux/features/adminSlice'; // Assumed admin slice
import AdminHeader from '../components/admin/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';

function AdminLayout() {

    const { darkMode } = useSelector((state) => state.mode);

    useEffect(() => {
        document.body.style.background = darkMode ? "white" : "black";
    }, [darkMode]);

    const location = useLocation();

    const { isAdminAuth } = useSelector((state) => state.admin); 
    const dispatch = useDispatch();

    const checkAdmin = async (req, res) => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/admin/check-admin", 
            });

            console.log(response, "=====checkAdmin");
            dispatch(saveAdmin()); 
        } catch (error) {
            console.log(error);
            dispatch(clearAdmin()); 
        }
    };

    console.log("isAdminAuth : - ", isAdminAuth);

    useEffect(() => {
        checkAdmin();
    }, [location.pathname]);

    return (
        <>
            {isAdminAuth ? <AdminHeader /> : <Header />} 
            <Outlet />
            {isAdminAuth ? <AdminFooter /> : <Footer />} 
        </>
    );
}

export default AdminLayout;
