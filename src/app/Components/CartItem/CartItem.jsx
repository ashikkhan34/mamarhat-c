"use client";

import Image from "next/image";


export default function CartItem({ item, removeFromCart  }) {


  return (
    <div className="p-4 rounded-xl shadow-md bg-white mb-4">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">
              <Image
              width={400}
              height={200}
                src={item.foodId.image}
                alt={item.foodId.title}
                className="w-16 h-16 object-cover rounded"
              />
            </td>
            <td className="py-2">{item.foodId.title}</td>
            <td className="py-2">৳ {item.foodId.price}</td>
            <td className="py-2">
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
