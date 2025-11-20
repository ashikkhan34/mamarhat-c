"use client";

export default function CartItem({ item, removeFromCart }) {
  console.log(item)
  return (
    <div className="p-4 rounded-xl shadow-md flex justify-between items-center bg-white">
      <div>
        <h2 className="text-xl font-semibold">{item.foodId.title}</h2>
        <p className="text-gray-700">Price: ${item.foodId.price}</p>
        <p className="text-gray-600">Qty: {item.quantity}</p>
      </div>
      <button
        onClick={() => removeFromCart(item._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Remove
      </button>
    </div>
  );
}
