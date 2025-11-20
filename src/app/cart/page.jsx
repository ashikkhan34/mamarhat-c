"use client";

import useUser from "@/app/Hooks/useUser";
import { useCart } from "@/app/Hooks/useCart";
import CartItem from "../Components/CartItem/CartItem";

export default function CartPage() {
  const user = useUser();
  const { cart, loading, removeFromCart } = useCart(user);
  console.log(cart)

  const totalPrice = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) return <p className="text-center p-10 text-xl">Please login first</p>;

  if (loading) return <p className="text-center p-10 text-xl">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-5">
          {cart?.items.map((item) => (
            <CartItem key={item._id} item={item} removeFromCart={removeFromCart} />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-right text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}
