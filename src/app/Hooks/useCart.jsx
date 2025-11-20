"use client";

import { useState, useEffect } from "react";
import useAxiosPublic from "@/app/Hooks/useAxiosPublic";

export const useCart = (user) => {
  const axiosPublic = useAxiosPublic();
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);

  const getUserIdOrEmail = () => user?.id || user?.email;

  const fetchCart = async () => {
    if (!getUserIdOrEmail()) return;
    try {
      setLoading(true);
      const res = await axiosPublic.get(`/api/cart/${getUserIdOrEmail()}`);
      setCart(res.data.data || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Add to cart
  const addToCart = async (food, quantity = 1) => {
    if (!getUserIdOrEmail()) return alert("Please login first");

    const payload = {
      userId: user?.id || null,
      items: [{ foodId: food._id, quantity }],
      totalPrice: food.price * quantity
    };

    try {
      await axiosPublic.post(`/api/cart/add`, payload);
      fetchCart();
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    if (!getUserIdOrEmail()) return;
    try {
      await axiosPublic.delete(`/api/cart/${getUserIdOrEmail()}/${itemId}`);
      fetchCart();
    } catch (err) {
      console.log("Remove from cart error:", err);
    }
  };

  return { cart, loading, addToCart, removeFromCart, fetchCart };
};
