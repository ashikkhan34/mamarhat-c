"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods, addFood, updateFood, deleteFood } from "@/app/Redux/FoodSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AllFood() {
  const dispatch = useDispatch();
  const { foods, loading, error } = useSelector((state) => state.foods);

  const [editingFood, setEditingFood] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: "",
      oldPrice: "",
      discount: "",
      isTrending: false,
      isOffer: false,
      isFreeDelivery: false,
      category: "",
      rating: "",
    },
  });

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (editingFood) {
      dispatch(updateFood({ id: editingFood, updatedData: data }));
      setEditingFood(null);
    } else {
      dispatch(addFood(data));
    }
    reset();
  };

  const handleEdit = (food) => {
    setEditingFood(food._id);
    for (const key in food) {
      if (key in food && key !== "__v" && key !== "_id") {
        if (typeof food[key] === "object" && food[key] !== null) {
          setValue(key, food[key]._id || "");
        } else {
          setValue(key, food[key]);
        }
      }
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFood(id));
        Swal.fire({
          title: "Deleted!",
          text: "Food has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">All Foods</h1>

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold mb-2">{editingFood ? "Edit Food" : "Add Food"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("title")} placeholder="Title" className="border p-2 rounded" />
          <input {...register("description")} placeholder="Description" className="border p-2 rounded" />
          <input {...register("image")} placeholder="Image URL" className="border p-2 rounded" />
          <input type="number" {...register("price")} placeholder="Price" className="border p-2 rounded" />
          <input type="number" {...register("oldPrice")} placeholder="Old Price" className="border p-2 rounded" />
          <input type="number" {...register("discount")} placeholder="Discount %" className="border p-2 rounded" />
          <input {...register("category")} placeholder="Category ID" className="border p-2 rounded" />
          <input type="number" step="0.1" {...register("rating")} placeholder="Rating" className="border p-2 rounded" />
          <div className="flex items-center space-x-2">
            <label><input type="checkbox" {...register("isTrending")} /> Trending</label>
            <label><input type="checkbox" {...register("isOffer")} /> Offer</label>
            <label><input type="checkbox" {...register("isFreeDelivery")} /> Free Delivery</label>
          </div>
          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${editingFood ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {editingFood ? "Update Food" : "Add Food"}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={food.image} alt={food.title} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{food.title}</td>
                <td className="py-3 px-4">{food.price}</td>
                <td className="py-3 px-4">{food.category?.name || food.category}</td>
                <td className="py-3 px-4 space-x-2">
                  <button onClick={() => handleEdit(food)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(food._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
