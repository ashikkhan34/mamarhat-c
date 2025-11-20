"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import useAxiosPublic from "@/app/Hooks/useAxiosPublic";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFoods } from "@/app/Hooks/usefood";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "@/app/Hooks/useCart";
import useUser from "@/app/Hooks/useUser";

export default function FoodDetailsPage() {
  const user = useUser();
  const { addToCart } = useCart(user);
  const params = useParams();
  const { foods } = useFoods();
  const { id } = params;

  const axiosPublic = useAxiosPublic();
  const [food, setFood] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");


  // Fetch Single Food
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/api/food/${id}`);
        const data = res.data.data;
        setFood(data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [axiosPublic, id]);

  // Related Foods Filter
  useEffect(() => {
    if (food && foods?.length > 0) {
      const filtered = foods.filter(
        (item) =>
          item.category?.name?.toLowerCase() ===
          food.category?.name?.toLowerCase()
      );

      // Remove currently opened food from related list
      const withoutCurrent = filtered.filter((item) => item._id !== food._id);

      setRelated(withoutCurrent);
    }
  }, [food, foods]);


  if (loading) {
    return (
      <div className="p-10 grid pt-20 grid-cols-1 md:grid-cols-2 gap-10 animate-pulse max-w-4xl mx-auto">
        <div className="h-80 bg-gray-300 rounded-2xl"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-5 pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Image Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <Image
            src={food?.image}
            alt={food?.title}
            width={500}
            height={500}
            className="rounded-3xl"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm">
            {food?.title}
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            {food?.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 text-2xl font-semibold mt-3">
            <span className="text-green-600">৳{food?.price}</span>
            <span className="line-through text-gray-400 text-lg">
              ৳{food?.oldPrice}
            </span>
            <span className="text-red-500 text-sm">-{food?.discount} tk </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-3">
            {food?.isTrending && (
              <span className="px-3 py-1 text-sm bg-yellow-400 text-black rounded-full">
                🔥 Trending
              </span>
            )}
            {food?.isOffer && (
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full">
                ✨ Special Offer
              </span>
            )}
            {food?.isFreeDelivery && (
              <span className="px-3 py-1 text-sm bg-green-600 text-white rounded-full">
                🚚 Free Delivery
              </span>
            )}
          </div>

          <p className="text-lg text-gray-700">⭐ {food?.rating} / 5</p>

          <p className="text-sm text-gray-500">
            Category: <b className="text-green-700">{food?.category?.name}</b>
          </p>

          {/* Add to Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(food)}
            className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg shadow-md flex items-center gap-2 text-center justify-center"
          >
            Add to Cart <FaCartArrowDown />
          </motion.button>

          {cartMessage && (
            <p className="text-green-700 font-semibold">{cartMessage}</p>
          )}
        </motion.div>
      </motion.div>


      {/* Related Foods Section */}
      {related.length > 0 && (
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-green-800 mb-5">
            Related Foods
          </h2>

          <div className="grid  md:grid-cols-2 gap-6">
            {related.map((food) => (
              <motion.div
                key={food._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition  flex"
              >
                <Image
                  src={food.image}
                  alt={food.title}
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
                <div className="ml-22">
                  <div className="justify-between flex">
                    <h3 className="text-lg font-semibold mt-3">{food.title}</h3>
                    <p className="text-green-600 font-bold">⭐{food.rating}</p>
                  </div>
                  <p className="text-gray-500">{food.description}</p>
                  <div className="flex">
                    <p className="text-green-600 font-bold">Tk : {food.price}</p>
                    <button onClick={() => addToCart(food)} className="ml-20 flex items-center border border-gray-500 px-2 rounded-sm gap-2 cursor-pointer hover:border-blue-600 bg-gray-100">Add to cart<FaCartArrowDown className="text-xm hover:text-green-600 text-blue-500"></FaCartArrowDown></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
