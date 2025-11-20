"use client";

import useUser from "@/app/Hooks/useUser";
import { useCart } from "@/app/Hooks/useCart";
import CartItem from "../Components/CartItem/CartItem";
import { MdOutlineDeleteSweep } from "react-icons/md";

export default function CartPage() {
  const user = useUser();
  console.log(user)
  const { cart, loading, totalPrice, removeFromCart, clearCart } = useCart(user);
  console.log(cart)

  if (!user) return <p className="text-center p-10 text-xl">Please login first</p>;
  if (loading) return <p className="text-center p-10 text-xl">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto pt-22">
      <div className="flex justify-between mx-4">
        <h1 className="text-3xl font-semibold text-gray-600 mb-6">Your Cart</h1>
        <button onClick={clearCart} className="flex text-white font-bold items-center gap-2  rounded-sm bg-red-500 cursor-pointer px-10 ">Clear All <MdOutlineDeleteSweep className="text-white"/>
        </button>
      </div>
      {cart?.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-5">
          {cart?.map(item => (
            <CartItem key={item._id} item={item} removeFromCart={removeFromCart} />
          ))}
        </div>
      )}

      {cart?.length > 0 && (
        <div className="mt-6 text-right text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}
