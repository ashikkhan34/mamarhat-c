"use client";

import { useState, useEffect } from "react";
import useAxiosPublic from "@/app/Hooks/useAxiosPublic";
import toast from "react-hot-toast";

export const useCart = (userId) => {
  const axiosPublic = useAxiosPublic();
  const [cart, setCart] = useState([]); 
  const [loading, setLoading] = useState(true);
  console.log(cart)

  // ---------------- FETCH CART ----------------
  const fetchCart = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axiosPublic.get(`/api/cart/${userId}`);
      setCart(res.data.data || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // ---------------- ADD TO CART ----------------
  const addToCart = async (food, quantity = 1) => {
    if (!userId) return toast.error("Please login first");

    const payload = {
      userId,
      foodId: food._id,
      quantity,
    };

    try {
      await axiosPublic.post("/api/cart/add", payload);
      toast.success(`${food.title} added to cart 🎉`, { duration: 1500 });
      await fetchCart(); // fetchCart must be awaited
    } catch (err) {
      console.log("Add to cart error:", err);
      toast.error("Failed to add item!");
    }
  };

  // ---------------- REMOVE SINGLE ITEM ----------------
  const removeFromCart = async (itemId) => {
    if (!userId) return;
    try {
      await axiosPublic.delete(`/api/cart/item/${itemId}`);
      toast.success("Item removed");
      await fetchCart();
    } catch (err) {
      console.log("Remove item error:", err);
    }
  };

  // ---------------- CLEAR CART ----------------
  const clearCart = async () => {
    if (!userId) return;
    
    try {
      await axiosPublic.delete(`/api/cart/${userId}`);
      toast.success("Cart cleared");
      setCart([]); 
    } catch (err) {
      console.log("Clear cart error:", err);
    }
  };

  // ---------------- TOTAL PRICE ----------------
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.foodId?.price * item.quantity,
    0
  );

  return {
    cart,
    loading,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
  };
};
