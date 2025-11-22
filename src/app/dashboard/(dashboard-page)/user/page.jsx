"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "@/app/Redux/UserSlice";
import Swal from "sweetalert2";

export default function UserPage() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Dispatch Redux delete action
                dispatch(deleteUser(id));

                // Success alert
                Swal.fire({
                    title: "Deleted!",
                    text: "The user has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };
    const startEdit = (user) => {
        setEditingUser(user._id);
        setName(user.name);
        setEmail(user.email);
    };

    const handleUpdate = () => {
        dispatch(updateUser({ id: editingUser, updatedData: { name, email } }));
        setEditingUser(null);
        setName("");
        setEmail("");
    };

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-xl">Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Users Table</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <img
                                        src={user.image || user.photoURL}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="py-3 px-4">
                                    {editingUser === user._id ? (
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingUser === user._id ? (
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="py-3 px-4 space-x-2">
                                    {editingUser === user._id ? (
                                        <>
                                            <button
                                                onClick={handleUpdate}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingUser(null)}
                                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEdit(user)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
