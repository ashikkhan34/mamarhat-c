"use client";
import Image from "next/image";
import { GiFruitTree } from "react-icons/gi";


export default function Sidebar({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div
      className="
        w-full md:w-1/4 
        bg-white shadow-md rounded-xl p-5 
        md:h-[80vh] md:sticky md:top-24 
        flex flex-col
      "
    >
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="overflow-y-auto md:pr-2 space-y-2 max-h-[300px] md:max-h-full">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg 
            ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}
          `}
        >
          <GiFruitTree className="text-2xl text-red-800" />
          All Foods
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg capitalize
              ${selectedCategory === cat.name ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}
            `}
          >
            <Image
              src={cat.image}
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded"
              alt={cat.name}
            />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
