"use client";

import useAxiosPublic from "@/app/Hooks/useAxiosPublic";
import { BadgeInfo, MapPinCheck, Star } from "lucide-react";
import Image from "next/image";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";

export default function Restaurant() {
  const axiosPublic = useAxiosPublic();
  const [restaurants, setRestaurants] = useState([]); 

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axiosPublic.get("/api/restaurant");
        const data = res.data.data;
        setRestaurants(data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchRestaurant();
  }, [axiosPublic]);

  return (
    <div className=" container mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Most Popular Restaurant</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-full h-40 overflow-hidden group">
              <Image
                src={restaurant?.image}
                alt={restaurant.name}
                width={400}
                height={200}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>

            <div className="p-4 space-y-1">
              <h2 className="text-lg font-semibold flex gap-2 justify-between ">
                {restaurant.name} <span className="items-center flex gap-1 text-sm text-gray-400 "><MapPinCheck className="text-green-500" size={16}/> Gulshan,Dhaka </span>
              </h2>
              <p className="flex items-center gap-1 text-gray-400"><MdOutlineMarkEmailRead className="text-black"/> {restaurant.email}</p>
              <p className="flex items-center gap-1 text-gray-400"><FaPhone className="text-black"/> {restaurant.phone}</p>
                <p className="text-gray-400 text-sm">
                  {restaurant.aboutRestaurant}
                </p>
              

              <div className="flex justify-between items-center py-3 mx-2">
                {restaurant.isActive ? (
                  <p className="text-white px-2 border-gray-500 bg-green-300 rounded-sm">Open</p>
                ) : (
                  <p className="text-white bg-red-300 border-red-600 px-2 rounded-sm">Close</p>
                )}

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {restaurant.rating || 4.5}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
