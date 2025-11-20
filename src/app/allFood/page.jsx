"use client";
import { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import FoodCard from "./FoodCard";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useFoods } from "../Hooks/usefood";
import Image from "next/image";
import { Search } from "lucide-react";

export default function AllFoodPage() {
  const axiosPublic = useAxiosPublic();
  const { foods } = useFoods();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    isFreeDelivery: false,
    isOffer: false,
    isTrending: false,
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosPublic.get("/api/category");
        setCategories(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, [axiosPublic]);

  // Filter foods based on selected category, search query, and additional filters
  const filteredFoods = useMemo(() => {
    let result = foods;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (food) => food.category?.name === selectedCategory
      );
    }

    // Filter by search query (title and category)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (food) =>
          food.title?.toLowerCase().includes(query) ||
          food.category?.name?.toLowerCase().includes(query)
      );
    }

    // Filter by additional filters (isFreeDelivery, isOffer, isTrending)
    if (filters.isFreeDelivery) {
      result = result.filter((food) => food.isFreeDelivery === true);
    }

    if (filters.isOffer) {
      result = result.filter((food) => food.isOffer === true);
    }

    if (filters.isTrending) {
      result = result.filter((food) => food.isTrending === true);
    }

    return result;
  }, [foods, selectedCategory, searchQuery, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      isFreeDelivery: false,
      isOffer: false,
      isTrending: false,
    });
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto pt-6 md:px-0 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Right Panel - Food Cards */}
      <div className="flex-1">
        <div className="pt-16">
          <Image
            width={600}
            height={200}
            alt="image"
            src="/image/h.png"
            className="md:w-full object-cover"
          />

          <div className="md:flex justify-between">
            {/* Search Section */}
            <div className="py-4 ">
              <form className="flex items-center" onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-2 text-center rounded-2xl bg-[#498839] text-white placeholder-gray-200"
                  placeholder="Search Foods"
                />
                <Search className="-ml-7 text-white " size={16}/>
              </form>
            </div>

            {/* Additional Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isFreeDelivery}
                      onChange={() => handleFilterChange("isFreeDelivery")}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium">Free Delivery</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isOffer}
                      onChange={() => handleFilterChange("isOffer")}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium">Special Offer</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isTrending}
                      onChange={() => handleFilterChange("isTrending")}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium">Trending</span>
                  </label>
                </div>

                {/* Clear Filters Button */}
                {(filters.isFreeDelivery ||
                  filters.isOffer ||
                  filters.isTrending ||
                  selectedCategory !== "all" ||
                  searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Active Filters Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedCategory !== "all" && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Category: {selectedCategory}
                  </span>
                )}
                {filters.isFreeDelivery && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Free Delivery
                  </span>
                )}
                {filters.isOffer && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Special Offer
                  </span>
                )}
                {filters.isTrending && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Trending
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    Search: {searchQuery}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => <FoodCard key={food._id} food={food} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No foods found 😔</p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
