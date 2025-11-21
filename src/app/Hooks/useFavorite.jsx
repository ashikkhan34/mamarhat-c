"use client";

import { useEffect, useState } from "react";
import useAxiosPublic from "@/app/Hooks/useAxiosPublic";
import toast from "react-hot-toast";



export const useFavorite = (userId) => {
  const axiosPublic = useAxiosPublic();

  const [favorites, setFavorites] = useState([]);
  console.log(favorites)
  const [loading, setLoading] = useState(true);

  // ⛳ Fetch User Favorites
  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const res = await axiosPublic.get(`/api/favorite/${userId}`);
        setFavorites(res.data.data || []);
      } catch (err) {
        console.log("Favorite fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  // ❤️ Add to Favorite
  const addFavorite = async (foodId) => {
    if (!userId) return;

    try {
      const res = await axiosPublic.post("/api/favorite/add", {
        userId,
        foodId,
      });

      // UI update instantly
      setFavorites((prev) => [
        ...prev,
        { ...res.data.data, foodId },
      ]);
    } catch (err) {
      console.log("Add favorite error:", err);
    }
  };

  // 💔 Remove Favorite
  const removeFavorite = async (foodId) => {
    if (!userId) return;

    try {
      await axiosPublic.post("/api/favorite/remove", {
        userId,
        foodId,
      });

      setFavorites((prev) =>
        prev.filter(
          (fav) =>
            fav.foodId !== foodId &&
            (typeof fav.foodId === "object" ? fav.foodId._id !== foodId : true)
        ),
        toast.success("food delete successful")

      );
    } catch (err) {
      console.log("Remove favorite error:", err);
    }
  };

  // ⭐ Check if a food is already favorite
  const isFavorite = (foodId) => {
    return favorites.some(
      (fav) =>
        fav.foodId === foodId ||
        (typeof fav.foodId === "object" && fav.foodId._id === foodId)
    );
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
