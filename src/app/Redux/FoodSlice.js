import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://mamarhat-s.vercel.app/api/food/";

// All foods fetch
export const fetchFoods = createAsyncThunk(
  "foods/fetchFoods",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  }
);

//  Single food fetch
export const fetchSingleFood = createAsyncThunk(
  "foods/fetchSingleFood",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }
);

// Add food
export const addFood = createAsyncThunk(
  "foods/addFood",
  async (foodData) => {
    const res = await axios.post(`${BASE_URL}/create-food`, foodData);
    return res.data;
  }
);

// Update food
export const updateFood = createAsyncThunk(
  "foods/updateFood",
  async ({ id, updatedData }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return res.data;
  }
);

//  Delete food
export const deleteFood = createAsyncThunk(
  "foods/deleteFood",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id; // return id for filtering
  }
);

const foodSlice = createSlice({
  name: "foods",
  initialState: {
    foods: [],
    singleFood: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 Fetch all foods
      .addCase(fetchFoods.pending, (state) => { state.loading = true })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })

      // 🔹 Fetch single food
      .addCase(fetchSingleFood.pending, (state) => { state.loading = true })
      .addCase(fetchSingleFood.fulfilled, (state, action) => {
        state.loading = false;
        state.singleFood = action.payload;
      })

      // 🔹 Add food
      .addCase(addFood.fulfilled, (state, action) => {
        state.foods.push(action.payload);
      })

      // 🔹 Update food
      .addCase(updateFood.fulfilled, (state, action) => {
        const index = state.foods.findIndex(f => f._id === action.payload._id);
        if (index !== -1) {
          state.foods[index] = action.payload;
        }
      })

      // 🔹 Delete food
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.foods = state.foods.filter(f => f._id !== action.payload);
      });
  },
});

export default foodSlice.reducer;
