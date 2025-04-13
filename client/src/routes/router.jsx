import SellerLayout from '../layout/SellerLayout';
// import Login from '../pages/shared/Login';
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import Signup from '../pages/shared/Signup';
import Contact from '../pages/user/Contact';
import ProductPage from '../pages/user/ProductPage';
import ProductDetailsPage from '../pages/user/ProductDetailsPage';
import ErrorPage from '../pages/shared/ErrorPage';
import ProductList from '../pages/user/ProductList';
import LadiesPage from '../pages/user/LadiesPage';
import MenPage from '../pages/user/MenPage';
import KidsPage from '../pages/user/KidsPage';
import SalesPage from '../pages/user/SalesPage';
import ProfilePage from '../pages/user/ProfilePage';
import SellerLogin from '../pages/seller/SellerLogin';
import SellerProfile from '../pages/seller/SellerProfile';
import AdminLayout from '../layout/AdminLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminProfile from '../pages/admin/AdminProfile';
import SellerSignup from '../pages/seller/SellerSignup';
import AdminSignup from '../pages/admin/AdminSignup';
import WishlistPage from '../pages/user/WishlistPage';
import ProtectedRoute from './ProtectedRoute';
import Cart from '../pages/user/Cart';
import CreateProductForm from '../pages/seller/CreateProductForm';
import UpdateProduct from '../pages/seller/UpdateProduct';
import SellerProductsPage from '../pages/seller/SellerProductPage';
import SellerProductDetails from '../pages/seller/SellerProductDetails';
import SellerHomePage from '../pages/seller/SellerHomePage';
import OrderList from '../pages/user/OrderList';
import PaymentSuccess from '../pages/user/PaymentSuccess';
import AdminDashboard from '../pages/admin/AdminDashboard';
import GetAllUsers from '../pages/admin/GetAllUsers';
import AdminProductPage from '../pages/admin/AdminProductPage';
import AdminProductDetails from '../pages/admin/AdminProductDetails';
import GetAllSellers from '../pages/admin/GetAllSellers';
import GetAllOrders from '../pages/admin/GetAllOrders';
import UpdateOrderStatus from '../pages/seller/UpdateOrderStatus';
import GetAllOrdersSeller from '../pages/seller/GetAllOrdersSeller';
import ForgotPassword from '../pages/admin/ForgotPassword';
import ResetPassword from '../pages/admin/ResetPassword';
import SellerForgotPassword from '../pages/seller/SellerForgotPassword';
import SellerResetPassword from '../pages/seller/SellerResetPassword';
import UserForgotPassword from '../pages/user/UserForgotPassword';
import UserResetPassword from '../pages/user/UserResetPassword';
import PendingPermissionRequests from '../pages/admin/PermissionRequests';
import UpdateUserProfile from '../pages/user/UpdateUserProfile';
import ProtectedRouteSeller from './ProtectedRouteSeller';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import DenimRoundUp from '../pages/user/DenimRoundUp';
import TransitionalFits from '../pages/user/TransitionalFits';
import UpdateSellerProfile from '../pages/seller/UpdateSellerProfile';
import UpdateAdminProfile from '../pages/admin/UpdateAdminProfile';
import UserLayout from '../layout/UserLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      // {
      //   path: 'login',
      //   element: <Login />,
      // },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'sales-page',
        element: <SalesPage />,
      },
      {
        path: 'ladies-page',
        element: <LadiesPage />,
      },
      {
        path: 'men-page',
        element: <MenPage />,
      },
      {
        path: 'kids-page',
        element: <KidsPage />,
      },
      {
        path: 'product',
        element: <ProductPage />,
      },
      {
        path: 'denim-roundup',
        element: <DenimRoundUp />,
      },
      {
        path: 'transitional-fits',
        element: <TransitionalFits/>,
      },
      {
        path: ':category',
        element: <ProductList />,
      },
      {
        path: 'productDetails/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: '/user/user-forgot-password',
        element: <UserForgotPassword />,
      },
      {
        path: '/user/user-reset-password/:token',
        element: <UserResetPassword />,
      },
      {
        element: <ProtectedRoute />,
        path: 'user',
        children: [
          {
            path: 'cart',
            element: <Cart />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'orders',
            element: <OrderList />,
          },
          {
            path: 'payment_success',
            element: <PaymentSuccess />,
          },
          {
            path: 'wishlist',
            element: <WishlistPage />,
          },
          {
            path: 'update-user-profile',
            element: <UpdateUserProfile />,
          },
        ],
      },
    ],
  },
  {
    path: '/seller',
    element: <SellerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <SellerLogin />,
      },
      {
        path: 'signup',
        element: <SellerSignup />,
      },
      {
        path: 'seller-forgot-password',
        element: <SellerForgotPassword />,
      },
      {
        path: 'seller-reset-password/:token',
        element: <SellerResetPassword />,
      },
      {
        element: <ProtectedRouteSeller />,
        path: '',
        children: [
          {
            path: 'profile',
            element: <SellerProfile />,
          },
          {
            path: 'update-seller-profile',
            element: <UpdateSellerProfile />,
          },
          {
            path: 'seller-product',
            element: <SellerProductsPage />,
          },
          {
            path: 'seller-home',
            element: <SellerHomePage />,
          },
          {
            path: 'create-product',
            element: <CreateProductForm />,
          },
          {
            path: 'get-orders-seller',
            element: <GetAllOrdersSeller />,
          },
          {
            path: 'update-order-status',
            element: <UpdateOrderStatus />,
          },
          {
            path: 'seller-product-details/:productId',
            element: < SellerProductDetails />,
          },
          {
            path: 'update-product/:id',
            element: <UpdateProduct />,
          },
        ]
      }
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',
        element: <AdminSignup />,
      },
      {
        path: 'login',
        element: <AdminLogin />,
      },
      {
        path: 'admin-forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'admin-reset-password/:token',
        element: <ResetPassword />,
      },
      {
        element: <ProtectedRouteAdmin />,
        path: '',
        children: [
          {
            path: 'admin-dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'get-all-users',
            element: <GetAllUsers />,
          },
          {
            path: 'get-sellers',
            element: <GetAllSellers />,
          },
          {
            path: 'get-all-orders',
            element: <GetAllOrders />,
          },
          {
            path: 'admin-products',
            element: <AdminProductPage />,
          },
          {
            path: 'admin-product-details/:productId',
            element: <AdminProductDetails />,
          },

          {
            path: 'admin-profile',
            element: <AdminProfile />,
          },
          {
            path: 'update-admin-profile',
            element: <UpdateAdminProfile />,
          },
          {
            path: 'pending-requests',
            element: <PendingPermissionRequests />,
          },
        ]
      }
    ],
  },
]);

