// import React, { useEffect } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { axiosInstance } from '../config/axiosInstance';
// import { clearUser, saveUser } from '../redux/features/userSlice';
// import Header from '../components/user/Header';
// import Footer from '../components/user/Footer';
// import UserHeader from '../components/user/UserHeader';
// import UserFooter from '../components/user/UserFooter';

// function UserLayout() {

//     const { darkMode } = useSelector((state) => state.mode);
    
//     useEffect(() => {
//         document.body.style.background = darkMode ? "white" : "black";
//     }, [darkMode]);
    
//     const location = useLocation();

//     const { isUserAuth } = useSelector((state) => state.user);
//     const dispatch = useDispatch();

//     const checkUser = async () => {
//         try {
//             const response = await axiosInstance({
//                 method: "GET",
//                 url: "/user/check-user"
//             });
//             console.log("checkUser Response", response?.data);
//             dispatch(saveUser(response?.data));
//         } catch (error) {
//             console.error("User check failed:", error);
//             dispatch(clearUser());
//         }
//     };

//     useEffect(() => {
//         checkUser();
//     }, [location.pathname]);

//     console.log("isUserAuth:", isUserAuth);

//     return (
//         <>
//             {isUserAuth ? <UserHeader /> : <Header />}
//             <Outlet />
//             {isUserAuth ? <UserFooter /> : <Footer />}
//         </>
//     );
// }

// export default UserLayout;


import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../config/axiosInstance';
import { clearUser, saveUser } from '../redux/features/userSlice';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import UserHeader from '../components/user/UserHeader';
import UserFooter from '../components/user/UserFooter';

function UserLayout() {
    const { darkMode } = useSelector((state) => state.mode);

    useEffect(() => {
        document.body.style.background = darkMode ? "white" : "black";
    }, [darkMode]);

    const location = useLocation();
    const { isUserAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user"
            });
            console.log("checkUser Response", response?.data);
            dispatch(saveUser(response?.data));
        } catch (error) {
            console.error("User check failed:", error);
            dispatch(clearUser());
        }
    };

    useEffect(() => {
        const excludeRoutes = ["/signup", "/login"];
        if (!excludeRoutes.includes(location.pathname)) {
            checkUser();
        }
    }, [location.pathname]);

    console.log("isUserAuth:", isUserAuth);

    return (
        <>
            {isUserAuth ? <UserHeader /> : <Header />}
            <Outlet />
            {isUserAuth ? <UserFooter /> : <Footer />}
        </>
    );
}

export default UserLayout;
