import React, { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { CartCards } from '../../components/user/Cards'
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';
import { loadStripe } from "@stripe/stripe-js";


function Cart() {

    const [productDetails, error] = useFetch("/cart/get-cart")


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
                    <CartCards item={value} key={value._id} handleRemove={handleRemoveProduct}/>
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
                <h1> cart is empty </h1>
            )}
        </div>
    )
}

export default Cart