import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";

const Payment = () => {
  const price=useSelector((store)=>store.user.price)
  const makePayment = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: price, // replace with the actual amount
            }),
        });
          console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const session = await response.json();

        // redirect to Stripe Checkout
        const stripe = await loadStripe('pk_test_51OZr9PSDOCfpHPvYlRyQfEtHuAZl2L3mPkgoijpwAbeMQCqtAwxTLR0UdA1QALCBUleMKETN1HCyHnMkJKWvNLze00uDQjdNJ8'); // replace with your publishable key
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
        }
    } catch (error) {
        console.log(error);
    }
};
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment Methods" />
      <div className="pb-10">
        <p>Card Payment Avilable</p>
    
          <button onClick={makePayment} className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Pay and Order
          </button>
        
      </div>
    </div>
  );
};

export default Payment;
