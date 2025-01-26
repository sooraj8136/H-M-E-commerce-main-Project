import React, { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { CartCards } from '../../components/user/Cards'
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';
import { loadStripe } from "@stripe/stripe-js";


function Cart() {

    const [productDetails, error] = useFetch("/cart/get-cart")
    const { darkMode } = useSelector((state) => state.mode);

    const handleRemoveProduct = async (productId) => {

        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-from-cart",
                data: { productId },
            });

            toast.success("Product removed successfully");
        } catch (error) {
            console.log(error);
        }
    }


    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: productDetails?.products },
            });

            console.log(session, "=======session");
            const result = stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="">
            <div>
                {productDetails?.products?.map((value) => (
                    <CartCards item={value} key={value._id} handleRemove={handleRemoveProduct} />
                ))}
            </div>
            {productDetails?.products?.length ? (
                <div className="w-6/12 bg-base-300 flex flex-col items-center gap-5">
                    <h2>Price summary</h2>

                    <h2>Total Price: {productDetails?.totalPrice}</h2>

                    <button className="btn btn-success" onClick={makePayment}>
                        Checkout
                    </button>
                </div>
            ) : (
                <>
                    <div className='empty-cart'>
                        <p className={darkMode ? 'text-black' : 'text-white'}>Free shipping above Rs.1999</p>
                        <p className={darkMode ? 'text-black' : 'text-white'}>Free & flexible 15 days return</p>
                        <p className={darkMode ? 'text-black' : 'text-white'}>Estimated delivery time: 2-7 days</p>
                    </div>
                    <div className={darkMode ? 'text-black' : 'text-white'}>
                        <h1 className='text-center'
                            style={{ fontWeight: '700', fontSize: 'xx-large' }}> Your Shopping Bag is empty! </h1>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart