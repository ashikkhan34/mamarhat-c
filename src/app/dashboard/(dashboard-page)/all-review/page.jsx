"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, addReview, updateReview, deleteReview } from "@/app/Redux/ReviewSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function AllReview() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const [editingReview, setEditingReview] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { user: "", food: "", rating: 0, comment: "" },
  });

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (editingReview) {
      dispatch(updateReview({ id: editingReview, updatedData: data }));
      setEditingReview(null);
    } else {
      dispatch(addReview(data));
    }
    reset();
  };

  const handleEdit = (rev) => {
    setEditingReview(rev._id);
    setValue("user", rev.user?._id || "");
    setValue("food", rev.food?._id || "");
    setValue("rating", rev.rating);
    setValue("comment", rev.comment);
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
        dispatch(deleteReview(id));
        Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">All Reviews</h1>

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold mb-2">{editingReview ? "Edit Review" : "Add Review"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("user")} placeholder="User ID" className="border p-2 rounded" />
          <input {...register("food")} placeholder="Food ID" className="border p-2 rounded" />
          <input type="number" step="0.1" {...register("rating")} placeholder="Rating" className="border p-2 rounded" />
          <input {...register("comment")} placeholder="Comment" className="border p-2 rounded" />
          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${editingReview ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {editingReview ? "Update Review" : "Add Review"}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Food</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Comment</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{rev.user?.name || rev.user}</td>
                <td className="py-3 px-4">{rev.food?.title || rev.food}</td>
                <td className="py-3 px-4">{rev.rating}</td>
                <td className="py-3 px-4">{rev.comment}</td>
                <td className="py-3 px-4 space-x-2">
                  <button onClick={() => handleEdit(rev)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(rev._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
