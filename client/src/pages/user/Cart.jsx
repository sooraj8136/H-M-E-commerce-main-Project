// import React from 'react';
// import { useFetch } from '../../hooks/useFetch';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import { axiosInstance } from '../../config/axiosInstance';
// import { loadStripe } from '@stripe/stripe-js';
// import { CartCards } from '../../components/user/Cards'
// import { Container } from 'react-bootstrap';

// function Cart() {
//   const [productDetails, error, refreshData] = useFetch('/cart/get-cart');
//   const { darkMode } = useSelector((state) => state.mode);

//   const handleUpdateProduct = async (productId, action) => {
//     try {
//       let url;
//       let data;

//       if (action === 'add' || action === 'remove') {
//         url = '/cart/update-count';
//         data = { productId, action };
//       } else if (action === 'delete') {
//         url = '/cart/remove-from-cart';
//         data = { productId };
//       } else {
//         throw new Error('Invalid action');
//       }

//       const response = await axiosInstance({
//         method: 'PUT',
//         url: url,
//         data: data,
//       });

//       toast.success(response.data.message || 'count updated successfully');
//       refreshData();
//     } catch (error) {
//       console.error(error);
//     }
//     useEffect(() => {
//       handleUpdateProduct()
//     },);
//   };


//   const makePayment = async () => {
//     try {
//       const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

//       const session = await axiosInstance({
//         url: '/payment/create-checkout-session',
//         method: 'POST',
//         data: { products: productDetails?.products },
//       });

//       await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
//     } catch (error) {
//       toast.error('Failed to initiate payment');
//       console.error(error);
//     }
//   };

//   return (
//     <Container>
//       <div className="container  d-flex justify-content-center align-items-center heading-head">
//           <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
//             fontWeight: "700",
//           }}>Shopping bag</span> </p>
//         </div>
//           <div className="empty-cart">
//             <p className={darkMode ? 'text-black' : 'text-white'}>
//               Free shipping above Rs.1999
//             </p>
//             <p className={darkMode ? 'text-black' : 'text-white'}>
//               Free & flexible 15 days return
//             </p>
//             <p className={darkMode ? 'text-black' : 'text-white'}>
//               Estimated delivery time: 2-7 days
//             </p>
//           </div>
//           <div className='shopping-bag-head'>
//             <p>Shopping bag</p>
//           </div>
//       <div className="cart-container">
//         <div className="cart-items">
//           {productDetails?.products?.map((value) => (
//             <CartCards
//               item={value}
//               key={value._id}
//               handleUpdate={handleUpdateProduct}
//             />
//           ))}
//         </div>
//         {productDetails?.products?.length ? (
//           <div className="price-summary">
//             <div className='price-summery'>
//               <div className='order-value'>
//                 <p>order value</p>
//               </div>
//               <div className='price-summary-price'>
//                 <p>Rs .{productDetails?.totalPrice}.00</p>
//               </div>
//             </div>
//             <div className='price-summery'>
//               <div className='delivery'>
//                 <p>Delivery</p>
//               </div>
//               <div className='free'>
//                 <p>FREE</p>
//               </div>
//             </div>
//             <hr />
//             <div className='total-price'>
//               <div>
//                 <h2>Total</h2>
//               </div>
//               <div>
//                 <h2> Rs. {productDetails?.totalPrice}.00</h2>
//               </div>
//             </div>
//             <button className="mt-3 add-to-cart" onClick={makePayment} style={{ backgroundColor: "black" }}>
//               Countinue to Place order
//             </button>
//           </div>
//         ) : (
//           <div className={darkMode ? 'text-black' : 'text-white'}>
//             <h1
//               className="text-center"
//               style={{ fontWeight: '700', fontSize: 'xx-large' }}
//             >
//               Your Shopping Bag is empty!
//             </h1>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// }

// export default Cart;


import React, { useState, useEffect } from 'react';
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

  const handleUpdateProduct = async (productId, action) => {
    try {
      let updatedCart = [...cartData];

      if (action === 'add') {
        updatedCart = updatedCart.map((item) =>
          item._id === productId ? { ...item, count: item.count + 1 } : item
        );
      } else if (action === 'remove') {
        updatedCart = updatedCart.map((item) =>
          item._id === productId ? { ...item, count: Math.max(1, item.count - 1) } : item
        );
      } else if (action === 'delete') {
        updatedCart = updatedCart.filter((item) => item._id !== productId);
      } else {
        throw new Error('Invalid action');
      }

      setCartData(updatedCart); // ✅ Update UI immediately

      const url = action === 'delete' ? '/cart/remove-from-cart' : '/cart/update-count';
      const data = { productId, action };

      await axiosInstance.put(url, data);
      toast.success('Cart updated successfully');

      refreshData();

    } catch (error) {
      console.error(error);
      toast.error('Failed to update cart');
    }
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      const session = await axiosInstance.post('/payment/create-checkout-session', {
        products: cartData,
      });

      await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
    } catch (error) {
      toast.error('Failed to initiate payment');
      console.error(error);
    }
  };

  return (
    <Container data-theme={darkMode ? "dark" : "light"}>
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white "}>
          HM.com / <span className='text-danger' style={{ fontWeight: "700" }}>Shopping bag</span>
        </p>
      </div>
      <div className="empty-cart">
        <p className={darkMode ? 'text-black' : 'text-white'}>Free shipping above Rs.1999</p>
        <p className={darkMode ? 'text-black' : 'text-white'}>Free & flexible 15 days return</p>
        <p className={darkMode ? 'text-black' : 'text-white'}>Estimated delivery time: 2-7 days</p>
      </div>
      <div className='shopping-bag-head'>
        <p className={darkMode ? 'text-black' : 'text-white'}>Shopping bag</p>
      </div>
      <div className="cart-container" >
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
            <button className="mt-3 add-to-cart" onClick={makePayment} style={{ backgroundColor: "black" }}>
              Continue to Place Order
            </button>
          </div>
        ) : (
          <div className={darkMode ? 'text-black' : 'text-white'}>
            <h1 className="text-center" style={{ fontWeight: '700', fontSize: 'xx-large' }}>
              Your Shopping Bag is empty!
            </h1>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Cart;
