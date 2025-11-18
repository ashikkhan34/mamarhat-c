"use client";

import { useFoods } from "@/app/Hooks/usefood";
import { BadgeInfo, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const { name } = params;

  const { foods } = useFoods();

  // filter foods that match the category name
  const filteredFoods = foods.filter(food => food.title.toLowerCase() === name.toLowerCase());

  console.log("Params =", params);
  console.log("Filtered Foods =", filteredFoods);

  if(!filteredFoods) {
    return <p className="text-center text-2xl ">loading...</p>
  }

  return (
    <div className="pt-22 px-4 container mb-12 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Category: {name}</h1>

      {filteredFoods.length === 0 ? (
        <p>No foods found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
          {filteredFoods.map(food => (
            <div key={food._id} className=" p-4 rounded-lg hover:shadow-blue-600 shadow-sm hover:scale-105 transition-all duration-500">
              <img src={food.image} alt={food.title} className="w-full h-40 object-cover rounded-md mb-2 hover:scale-110 transition-all duration-500" />
              <h2 className="text-lg font-semibold">{food.title}</h2>
              <Link href={`/FoodDetails/${food._id}`}>
                <p className="text-blue-400 flex items-center gap-1 hover:underline text-sm">See info<BadgeInfo size={16} /></p>
              </Link>
              <p className="text-green-500">৳ {food.price}</p>
              <div className="flex justify-between items-center py-3 mx-2">
                {food.isOffer ? (
                  <p className="text-black px-2 border-gray-500 bg-gray-300 rounded-sm">Offer Food</p>
                ) : (
                  ''
                  // <p className="text-white bg-red-500 border-red-600 px-2 rounded-sm"></p>
                )}

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {food.rating || 4.5}
                  </span>
                </div>
              </div>
              <button className="px-3 rounded-sm mx-auto flex cursor-pointer py-2 text-white bg-green-600">Add to Cart </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
