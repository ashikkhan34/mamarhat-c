"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../Redux/FoodSlice";
import { fetchCategories } from "../Redux/CategorySlice";
import { fetchUsers } from "../Redux/UserSlice";
import { fetchRestaurants } from "../Redux/RestaurantSlice";
import { fetchReviews } from "../Redux/ReviewSlice";
import { useFoods } from "../Hooks/usefood";

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useSession } from "next-auth/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardHome() {
    
      // CUSTOM LOGIN USER (localStorage)
      const [localUser, setLocalUser] = useState(null);
    
      useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setTimeout(() => {
          setLocalUser(JSON.parse(savedUser));
        }, 0); // ✔ async - safe
      }
    }, []);
    
    
      // NEXTAUTH SOCIAL LOGIN USER
      const { data: session } = useSession();
    
      const user = session?.user || localUser;
  const dispatch = useDispatch();
  const { offerItems, freeDeliveryFoods, trendingFoods } = useFoods();

  const {
    foods,
    loading: foodsLoading,
    error: foodsError,
  } = useSelector((state) => state.foods);
  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useSelector((state) => state.categories);
  const {
    users,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  const {
    restaurants,
    loading: resLoading,
    error: resError,
  } = useSelector((state) => state.restaurants);
  const {
    reviews,
    loading: revLoading,
    error: revError,
  } = useSelector((state) => state.reviews);

  // Fetch all Redux data
  useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchCategories());
    dispatch(fetchUsers());
    dispatch(fetchRestaurants());
    dispatch(fetchReviews());
  }, [dispatch]);

  const loading =
    foodsLoading || catLoading || userLoading || resLoading || revLoading;
  const error = foodsError || catError || userError || resError || revError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // ---------------- Charts ----------------
  const barData = {
    labels: [
      "Foods",
      "Categories",
      "Users",
      "Restaurants",
      "Reviews",
      "Offer Items",
      "Free Delivery",
      "Trending Foods",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          foods?.length,
          categories?.length,
          users?.length,
          restaurants?.length,
          reviews?.length,
          offerItems?.length,
          freeDeliveryFoods?.length,
          trendingFoods?.length,
        ],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#facc15",
          "#8b5cf6",
          "#ec4899",
          "#6366f1",
          "#14b8a6",
          "#f43f5e",
        ],
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ["Offer Items", "Free Delivery", "Trending Foods"],
    datasets: [
      {
        label: "Food Types",
        data: [
          offerItems?.length,
          freeDeliveryFoods?.length,
          trendingFoods?.length,
        ],
        backgroundColor: ["#6366f1", "#14b8a6", "#f43f5e"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Dashboard <span className="text-blue-500 font-bold">{user?.name}</span></h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Foods" value={foods?.length} color="bg-blue-500" />
        <StatCard
          title="Categories"
          value={categories?.length}
          color="bg-green-500"
        />
        <StatCard title="Users" value={users?.length} color="bg-yellow-500" />
        <StatCard
          title="Restaurants"
          value={restaurants?.length}
          color="bg-purple-500"
        />
        <StatCard title="Reviews" value={reviews?.length} color="bg-pink-500" />
        <StatCard
          title="Offer Items"
          value={offerItems?.length}
          color="bg-indigo-500"
        />
        <StatCard
          title="Free Delivery"
          value={freeDeliveryFoods?.length}
          color="bg-teal-500"
        />
        <StatCard
          title="Trending Foods"
          value={trendingFoods?.length}
          color="bg-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4">Overall Counts</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4">Food Types Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

// ---------------------- StatCard Component ----------------------
function StatCard({ title, value, color }) {
  return (
    <div
      className={`flex flex-col justify-center items-center rounded-xl p-6 text-white ${color} shadow-lg`}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-2">{title}</p>
    </div>
  );
}
