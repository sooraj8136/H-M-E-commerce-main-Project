import React, { useEffect, useState } from 'react'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../config/axiosInstance'
import { clearUser, saveUser } from '../redux/features/userSlice'
import UserHeader from '../components/user/UserHeader'
import UserFooter from '../components/user/UserFooter'

function userLayout() {

    const { darkMode } = useSelector((state) => state.mode)

    useEffect(() => {
        document.body.style.background = darkMode ? "white" : "black";
    }, [darkMode]);

    const location = useLocation()

    const { isUserAuth } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user",
            });

            console.log(response, "=====checkUser");
            dispatch(saveUser())
        } catch (error) {
            console.log(error);
            dispatch(clearUser())
        }
    };

    console.log("isuserAuth : - ", isUserAuth);

    useEffect(() => {
        checkUser();
    }, [location.pathname]);

    return (
        <>
            {isUserAuth ? <UserHeader /> : <Header />}
            <Outlet />
            {isUserAuth ? <UserFooter /> : <Footer />}
        </>
    )
}

export default userLayout


