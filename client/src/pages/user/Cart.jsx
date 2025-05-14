// import React, { useEffect, useState } from 'react';
// import { useFetch } from '../../hooks/useFetch';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { axiosInstance } from '../../config/axiosInstance';
// import { loadStripe } from '@stripe/stripe-js';
// import { CartCards } from '../../components/user/Cards';
// import { Container } from 'react-bootstrap';

// function Cart() {
//   const [productDetails, isLoading, error, refreshData] = useFetch('/cart/get-cart');
//   const { darkMode } = useSelector((state) => state.mode);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (productDetails?.products) {
//       setCartData(productDetails.products);
//     }
//   }, [productDetails]);

// const handleUpdateProduct = async (productId, action) => {
//   try {
//     // Determine new cart state
//     let newCart = [];

//     if (action === 'add' || action === 'remove') {
//       newCart = cartData.map(item =>
//         item._id === productId
//           ? { ...item, count: action === 'add' ? item.count + 1 : Math.max(1, item.count - 1) }
//           : item
//       );
//     } else if (action === 'delete') {
//       newCart = cartData.filter(item => item._id !== productId);
//     } else {
//       toast.error('Invalid action');
//       return;
//     }

//     setCartData(newCart); // Optimistic update

//     // Send update to backend
//     await axiosInstance({
//       method: action === 'delete' ? 'DELETE' : 'PUT',
//       url: action === 'delete'
//         ? `/cart/remove-from-cart/${productId}`
//         : '/cart/update-count',
//       data: { productId, action },
//     });

//     toast.success('Cart updated successfully');
//     refreshData();
//   } catch (error) {
//     console.error(error);
//     toast.error('Failed to update cart');
//   }
// };

//   const makePayment = async () => {
//     try {
//       const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
//       const session = await axiosInstance.post('/payment/create-checkout-session', {
//         products: cartData,
//       });

//       const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionId });

//       if (result?.error) {
//         toast.error(result.error.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to complete payment');
//     }
//   };

//   return (
//     <Container data-theme={darkMode ? "dark" : "light"}>
//       <div
//         className="container d-flex justify-content-start align-items-start heading-head"
//         style={{ marginTop: "120px" }}>
//         <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
//           SHOPPING BAG
//         </p>
//       </div>
//       <div className="cart-container">
//         <div className="cart-items">
//           {cartData.map((value) => (
//             <CartCards
//               item={value}
//               key={value._id}
//               handleUpdate={handleUpdateProduct}
//             />
//           ))}
//         </div>
//         {cartData.length ? (
//           <div className="price-summary">
//             <div className='price-summery'>
//               <div className='order-value'>
//                 <p>Order value</p>
//               </div>
//               <div className='price-summary-price'>
//                 <p>Rs. {productDetails?.totalPrice}.00</p>
//               </div>
//             </div>
//             <div className='price-summery'>
//               <div className='delivery'><p>Delivery</p></div>
//               <div className='free'><p>FREE</p></div>
//             </div>
//             <hr />
//             <div className='total-price'>
//               <div><h2>Total</h2></div>
//               <div><h2>Rs. {productDetails?.totalPrice}.00</h2></div>
//             </div>
//             <button className="mt-3 add-to-cart" onClick={makePayment} style={{ backgroundColor: "black", fontWeight: "500" }}>
//               PLACE ORDER
//             </button>
//           </div>
//         ) : (
//           <div className={`w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
//             <div className="d-flex justify-content-start align-items-start">
//               <h1 style={{ fontWeight: '500', fontSize: '1rem' }}>
//                 YOUR SHOPPING BAG IS EMPTY!
//               </h1>
//             </div>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// }

// export default Cart;


import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { loadStripe } from '@stripe/stripe-js';
import { CartCards } from '../../components/user/Cards';
import { Container } from 'react-bootstrap';

function Cart() {
  const [productDetails, isLoading, error, refreshData] = useFetch('/cart/get-cart');
  const { darkMode } = useSelector((state) => state.mode);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (productDetails?.products) {
      setCartData(productDetails.products);
    }
  }, [productDetails]);

  // If loading, return loading message
  if (isLoading) {
    return
    <div style={{ textAlign: "center", marginBottom: "15px" }}>
      <div className="dot-spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="text-dark mt-2" style={{ fontSize: "16px" }}>Loading...</p>
    </div>;
  }

  const handleUpdateProduct = async (productId, action) => {
    try {
      // Determine new cart state
      let newCart = [];

      if (action === 'add' || action === 'remove') {
        newCart = cartData.map(item =>
          item._id === productId
            ? { ...item, count: action === 'add' ? item.count + 1 : Math.max(1, item.count - 1) }
            : item
        );
      } else if (action === 'delete') {
        newCart = cartData.filter(item => item._id !== productId);
      } else {
        toast.error('Invalid action');
        return;
      }

      setCartData(newCart); // Optimistic update

      // Send update to backend
      await axiosInstance({
        method: action === 'delete' ? 'DELETE' : 'PUT',
        url: action === 'delete'
          ? `/cart/remove-from-cart/${productId}`
          : '/cart/update-count',
        data: { productId, action },
      });

      toast.success('Cart updated successfully');
      refreshData();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update cart');
    }
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      const session = await axiosInstance.post('/payment/create-checkout-session', {
        products: cartData,
      });

      const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionId });

      if (result?.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to complete payment');
    }
  };

  return (
    <Container data-theme={darkMode ? "dark" : "light"}>
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "120px" }}>
        <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
          SHOPPING BAG
        </p>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {cartData.map((value) => (
            <CartCards
              item={value}
              key={value._id}
              handleUpdate={handleUpdateProduct}
            />
          ))}
        </div>
        {cartData.length ? (
          <div className="price-summary">
            <div className='price-summery'>
              <div className='order-value'>
                <p>Order value</p>
              </div>
              <div className='price-summary-price'>
                <p>Rs. {productDetails?.totalPrice}.00</p>
              </div>
            </div>
            <div className='price-summery'>
              <div className='delivery'><p>Delivery</p></div>
              <div className='free'><p>FREE</p></div>
            </div>
            <hr />
            <div className='total-price'>
              <div><h2>Total</h2></div>
              <div><h2>Rs. {productDetails?.totalPrice}.00</h2></div>
            </div>
            <button className="mt-3 add-to-cart" onClick={makePayment} style={{ backgroundColor: "black", fontWeight: "500" }}>
              PLACE ORDER
            </button>
          </div>
        ) : (
          <div className={`w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
            <div className="d-flex justify-content-start align-items-start">
              <h1 style={{ fontWeight: '500', fontSize: '1rem' }}>
                YOUR SHOPPING BAG IS EMPTY!
              </h1>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Cart;
