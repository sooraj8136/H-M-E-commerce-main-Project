import UserLayout from '../layout/UserLayout';
import SellerLayout from '../layout/SellerLayout';
import Login from '../pages/shared/Login';
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
      {
        path: 'login',
        element: <Login />,
      },
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
        path: ':category',
        element: <ProductList />,
      },
      {
        path: 'productDetails/:productId',
        element: <ProductDetailsPage />,
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
            path: 'payment-success',
            element: <PaymentSuccess />,
          },
          {
            path: 'wishlist',
            element: <WishlistPage />,
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
        path: 'profile',
        element: <SellerProfile />,
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
        path: 'seller-product-details/:productId',
        element: < SellerProductDetails/>,
      },
      {
        path: 'update-product/:id',
        element: <UpdateProduct />,
      },
      {
        path: 'signup',
        element: <SellerSignup />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'admin-dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'login',
        element: <AdminLogin />,
      },
      {
        path: 'get-all-users',
        element: <GetAllUsers />,
      },
      {
        path: 'signup',
        element: <AdminSignup />,
      },
      {
        path: 'admin-profile',
        element: <AdminProfile />,
      },
    ],
  },
]);

