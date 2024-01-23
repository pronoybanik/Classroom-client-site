import React from "react";
import CheckoutFrom from "./CheckoutFrom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Pyment_Gateway_PK);


const Payment = () => {
  return (
    <div>
      <div className="text-center py-2 border-b border-black pb-2 w-64  mx-auto text-3xl font-semibold my-6">
        Please Payment
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutFrom  />
      </Elements>
    </div>
  );
};

export default Payment;
