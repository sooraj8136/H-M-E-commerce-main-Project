import React, { useEffect } from 'react';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axiosInstance';
import { clearSeller, saveSeller } from '../redux/features/sellerSlice';
import SellerHeader from '../components/seller/SellerHeader';
import SellerFooter from '../components/seller/SellerFooter';

function SellerLayout() {
    
    const { darkMode } = useSelector((state) => state.mode);

    useEffect(() => {
        document.body.style.background = darkMode ? "white" : "black";
    }, [darkMode]);

    const location = useLocation();

    const { isSellerAuth } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    const checkSeller = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/seller/check-seller",
            });

            console.log(response, "=====checkSeller");
            dispatch(saveSeller());
        } catch (error) {
            console.log(error);
            dispatch(clearSeller());
        }
    };

    console.log("isSellerAuth : - ", isSellerAuth);

    useEffect(() => {
        checkSeller();
    }, [location.pathname]);

    return (
        <>
            {isSellerAuth ? <SellerHeader /> : <Header />}
            <Outlet />
            {isSellerAuth ? <SellerFooter /> : <Footer />}
        </>
    );
}

export default SellerLayout;
