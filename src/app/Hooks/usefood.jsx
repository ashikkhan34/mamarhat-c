"use client";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

export const useFoods = () => {
  const [foods, setFoods] = useState([]);
  console.log(foods)
  const [trendingFoods, setTrendingFoods] = useState([]);
  const [freeDeliveryFoods, setFreeDeliveryFoods] = useState([]);
  const [offerItems, setOfferItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        
        const res = await axiosPublic.get("/api/food");
        const apiData = res.data; 

        console.log("API DATA:", apiData);

        const allFoods = apiData?.data || [];
        setFoods(allFoods);

        // filters
        setTrendingFoods(allFoods.filter((item) => item?.isTrending === true));
        setFreeDeliveryFoods(
          allFoods.filter((item) => item?.isFreeDelivery === true)
        );
        setOfferItems(allFoods.filter((item) => item?.isOffer === true));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchFoods();
  }, [axiosPublic]);

  return {
    foods,
    trendingFoods,
    freeDeliveryFoods,
    offerItems,
    loading,
    error,
  };
};
