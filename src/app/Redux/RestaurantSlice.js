import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/restaurant";

// 🔹 Fetch all restaurants
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  }
);

// 🔹 Fetch single restaurant
export const fetchSingleRestaurant = createAsyncThunk(
  "restaurants/fetchSingleRestaurant",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }
);

// 🔹 Add restaurant
export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (restaurantData) => {
    const res = await axios.post(`${BASE_URL}/create-restaurant`, restaurantData);
    return res.data;
  }
);

// 🔹 Update restaurant
export const updateRestaurant = createAsyncThunk(
  "restaurants/updateRestaurant",
  async ({ id, updatedData }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return res.data;
  }
);

// 🔹 Delete restaurant
export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id; // return id for filtering
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: [],
    singleRestaurant: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch all restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single restaurant
      .addCase(fetchSingleRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.singleRestaurant = action.payload;
      })
      .addCase(fetchSingleRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add restaurant
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurants.push(action.payload);
      })

      // Update restaurant
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) state.restaurants[index] = action.payload;
      })

      // Delete restaurant
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});

export default restaurantSlice.reducer;
