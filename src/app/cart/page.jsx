"use client";

import useUser from "@/app/Hooks/useUser";
import { useCart } from "@/app/Hooks/useCart";
import CartItem from "../Components/CartItem/CartItem";
import { TbCoinTaka } from "react-icons/tb";
import { MdOutlineDeleteSweep, MdOutlineShoppingCartCheckout } from "react-icons/md";
import Link from "next/link";

export default function CartPage() {
  const user = useUser();
  const { cart, loading, totalPrice, removeFromCart, clearCart } = useCart(user);
  console.log(cart)

  if (!user) return <p className="text-center pt-20 text-xl">Please login first</p>;
  if (loading) return <p className="text-center pt-20 text-xl">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto pt-22">
      <div className="flex justify-between mx-4">
        <h1 className="text-3xl font-semibold text-gray-500 mb-6">Your Cart</h1>
        <button onClick={clearCart} className="flex text-white font-bold items-center gap-2  rounded-sm bg-red-500 cursor-pointer px-10 ">Clear All <MdOutlineDeleteSweep className="text-white" />
        </button>
      </div>
      {cart?.length === 0 ? (
        <>
        <p className="text-red-600 mb-12 text-4xl text-center">Your cart is empty.</p>
        <Link href='/allFood'><button className="text-semibold px-12 cursor-pointer hover:bg-green-800 py-2 bg-green-400 text-white rounded-md justify-center flex mx-auto mb-12">Order Now</button></Link>
        </>
      ) : (
        <div className="space-y-5">
          {cart?.map(item => (
            <CartItem key={item._id} item={item} removeFromCart={removeFromCart} />
          ))}
        </div>
      )}

      {cart?.length > 0 && (
        <div className="w-96 py-6 bg-gray-100 rounded-md shadow-md hover:shadow-blue-500 mb-12 ">
          <h1 className=" text-center text-2xl text-gray-400 font-semibold">Order Summary</h1>
          <p className=" flex justify-center text-gray-500 ">Total Price :  <strong className="flex items-center gap-2">   {totalPrice.toFixed(2)} <TbCoinTaka /></strong></p>
          <Link href="/payment">
            <button className="px-6 mt-2 mx-auto flex items-center gap-2 bg-gray-300 border border-gray-500 rounded-sm cursor-pointer py-2">
              Proceed to Checkout <MdOutlineShoppingCartCheckout />
            </button>
          </Link>

        </div>
      )}
    </div>
  );
}
