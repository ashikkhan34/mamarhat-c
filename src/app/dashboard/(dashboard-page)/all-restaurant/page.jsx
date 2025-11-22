"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } from "@/app/Redux/RestaurantSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AllRestaurant() {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector((state) => state.restaurants);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { name: "", image: "" },
  });

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (editingRestaurant) {
      dispatch(updateRestaurant({ id: editingRestaurant, updatedData: data }));
      setEditingRestaurant(null);
    } else {
      dispatch(addRestaurant(data));
    }
    reset();
  };

  const handleEdit = (res) => {
    setEditingRestaurant(res._id);
    setValue("name", res.name);
    setValue("image", res.image);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRestaurant(id));
        Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">All Restaurants</h1>

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold mb-2">{editingRestaurant ? "Edit Restaurant" : "Add Restaurant"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("name")} placeholder="Restaurant Name" className="border p-2 rounded" />
          <input {...register("image")} placeholder="Image URL" className="border p-2 rounded" />
          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${editingRestaurant ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {editingRestaurant ? "Update Restaurant" : "Add Restaurant"}
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
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res) => (
              <tr key={res._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={res.image} alt={res.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{res.name}</td>
                <td className="py-3 px-4 space-x-2">
                  <button onClick={() => handleEdit(res)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(res._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
