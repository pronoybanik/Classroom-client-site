import React, { useContext, useEffect, useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import { MdOutlinePayments } from "react-icons/md";
import { AuthContext } from "../../shared/AuthPovider";

const CheckoutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const price = parseInt(priceValue);

  const handleSubmitAmount = (event) => {
    event.preventDefault();

    if (price) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            console.log(data.clientSecret);
            setClientSecret(data.clientSecret);
          } else {
            console.error("Invalid clientSecret received from server");
          }
        })
        .catch((error) => {
          console.error("Error fetching clientSecret:", error);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unKnown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
    }
    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      setCardError("");
      setTransactionId(transactionId);
      setTimeout(() => {
        alert("Your Payment was Done");
      }, 1000);
    }
  };

  return (
    <section>
      <div className="w-2/5 border mx-auto rounded border-black p-6 bg-slate-200">
        {/* set amount section */}
        <form
          onSubmit={handleSubmitAmount}
          className="relative flex items-center justify-between gap-2 my-6"
        >
          <div className="absolute text-2xl ml-2">
            <MdOutlinePayments />
          </div>

          <input
            type="number"
            className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
            placeholder="Payment  Amount"
            onChange={(e) => setPriceValue(e.target.value)}
            required
          />
          <button className="btn btn-info btn-sm ">submit</button>
        </form>

        {/* stripe card */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-info btn-sm mt-6"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </form>
      </div>
      <div className="text-center mt-4">
        {cardError && (
          <p className="text-red-600 text-lg font-bold">{cardError}</p>
        )}
        {transactionId && (
          <p className="text-green-500 text-lg font-bold">
            Transaction Complete:- {transactionId}
          </p>
        )}
      </div>
    </section>
  );
};

export default CheckoutFrom;
