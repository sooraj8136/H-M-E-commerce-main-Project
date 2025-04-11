import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { loadStripe } from '@stripe/stripe-js';
import { CartCards } from '../../components/user/Cards';
import { Container, Spinner } from 'react-bootstrap';

function Cart() {
  const [productDetails, isLoading, error, refreshData] = useFetch('/cart/get-cart');
  const { darkMode } = useSelector((state) => state.mode);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (productDetails?.products) {
      setTimeout(() => {
        setCartData(productDetails.products);
        setLoading(false)
      }, 1000)
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

      setCartData(updatedCart); // Update UI immediately

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
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      const session = await axiosInstance.post('/payment/create-checkout-session', {
        products: cartData,
      });

      const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionId });

      if (result?.error) {
        toast.error(result.error.message);
        return;
      }

    } catch (error) {
      toast.error('Failed to complete payment');
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" >
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <>
          <Container data-theme={darkMode ? "dark" : "light"}>
            <div
              className="container d-flex justify-content-start align-items-start heading-head"
              style={{ marginTop: "120px" }}>
              <p style={{ fontSize: "40px", fontWeight: "600" }}>
                SHOPPING BAG
              </p>
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
                  <button className="mt-3 add-to-cart" onClick={makePayment} style={{ backgroundColor: "black",fontWeight:"500" }}>
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
        </>
      )}
    </>
  );
}

export default Cart;
