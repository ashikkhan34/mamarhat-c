import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/category";

// 🔹 Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  }
);

// 🔹 Fetch single category
export const fetchSingleCategory = createAsyncThunk(
  "categories/fetchSingleCategory",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.data;
  }
);

// 🔹 Add category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData) => {
    const res = await axios.post(`${BASE_URL}/create-category`, categoryData);
    return res.data;
  }
);

// 🔹 Update category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return res.data;
  }
);

// 🔹 Delete category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id; // return id for filtering
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    singleCategory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single category
      .addCase(fetchSingleCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCategory = action.payload;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })

      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
