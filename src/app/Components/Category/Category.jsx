"use client";
import useAxiosPublic from "@/app/Hooks/useAxiosPublic";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Category() {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosPublic.get("/api/category");
        setCategories(res.data.data);
      } catch (error) {
        console.log("failed to fetch", error.message);
      }
    };
    fetchCategory();
  }, [axiosPublic]);

  return (
    <div className="container mx-auto py-10">
    

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/category/${cat.name}`}
            className="group"
          >
            <div className="bg-white shadow-2xl hover:shadow-pink-500 transition-shadow-pink duration-300 rounded-xl p-4 border flex flex-col items-center cursor-pointer">

              <img
                src={cat.image}
                alt={cat.name}
                className="w-10 h-10 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />

              <h1 className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-green-700">
                {cat.name}
              </h1>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
