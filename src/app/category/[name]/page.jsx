"use client";

import { useFoods } from "@/app/Hooks/usefood";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const { name } = params;

  const { foods } = useFoods();
  
  // filter foods that match the category name
  const filteredFoods = foods.filter(food => food.title.toLowerCase() === name.toLowerCase());

  console.log("Params =", params);
  console.log("Filtered Foods =", filteredFoods);

  return (
    <div className="pt-22 px-4">
      <h1 className="text-2xl font-bold mb-4">Category: {name}</h1>

      {filteredFoods.length === 0 ? (
        <p>No foods found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFoods.map(food => (
            <div key={food.id} className="border p-4 rounded-lg shadow">
              <img src={food.image} alt={food.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h2 className="text-lg font-semibold">{food.title}</h2>
              <p className="text-gray-600">{food.description}</p>
              <p className="font-bold mt-2">${food.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
