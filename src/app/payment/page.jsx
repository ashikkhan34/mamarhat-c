"use client"
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useUser from "../Hooks/useUser";
import { useCart } from "../Hooks/useCart";

// ⚡ Your Stripe Publishable Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

function CheckoutForm() {
    const axiosPublic = useAxiosPublic()
    const stripe = useStripe();
    const elements = useElements();
    const user = useUser()
    const { cart } = useCart()

    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1️⃣ Create payment intent from backend
            const initiateRes = await axiosPublic.post("/api/payment/init", {
                userId: user,
                cartId: cart[0]?._id,
                amount: amount,
                currency: "usd",
                paymentMethod: "stripe",
            });

            const clientSecret = initiateRes.data.data.clientSecret;

            // 2️⃣ Confirm payment using Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (error) {
                setMessage(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                // 3️⃣ Confirm payment in backend
                await axiosPublic.post(`/api/payment/confirm/${paymentIntent.id}`);

                setMessage("Payment Successful! 🎉");
            }
        } catch (err) {
            setMessage("Payment failed!");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto pt-22  shadow-xl rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Stripe Payment</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    className="w-full border p-2 rounded"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <div className="border p-3 rounded">
                    <CardElement />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Processing..." : `Pay ${amount}`}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center font-semibold text-green-600">{message}</p>
            )}
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}
