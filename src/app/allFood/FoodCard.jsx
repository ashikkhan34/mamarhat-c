"use client";
import { BadgeInfo, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FoodCard({ food }) {
  return (
    <>

      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
        <div className="w-full h-40 relative mb-3">
          <Image
            src={food.image}
            alt={food.title}
            fill
            className="object-cover hover:scale-110 duration-300 transition-all rounded-lg"
          />
        </div>

        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{food.title}</h3>
          <Link href={`/FoodDetails/${food._id}`}>
            <p className="text-blue-400 flex items-center gap-1 hover:underline text-sm">
              See info
              <BadgeInfo size={16} />
            </p>
          </Link>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-green-600 mt-2">
            <span className="text-gray-500">Tk</span> {food.price}
          </p>
          <p className="flex items-center text-yellow-500">
            <Star></Star>
            {food.rating}
          </p>
        </div>
        <button className="px-4 py-2 rounded-sm bg-green-500 hover:bg-green-800  text-white cursor-pointer hover:scale-110 duration-500 transition-all  flex mx-auto">
          Add to Cart
        </button>
      </div>
    </>
  );
}
