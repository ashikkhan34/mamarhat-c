import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/review";

// 🔹 Fetch all reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  }
);

// 🔹 Fetch single review
export const fetchSingleReview = createAsyncThunk(
  "reviews/fetchSingleReview",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }
);

// 🔹 Add review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData) => {
    const res = await axios.post(`${BASE_URL}/create-review`, reviewData);
    return res.data;
  }
);

// 🔹 Update review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, updatedData }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return res.data;
  }
);

// 🔹 Delete review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id; // return id for filtering
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    singleReview: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch all reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single review
      .addCase(fetchSingleReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleReview.fulfilled, (state, action) => {
        state.loading = false;
        state.singleReview = action.payload;
      })
      .addCase(fetchSingleReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add review
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })

      // Update review
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) state.reviews[index] = action.payload;
      })

      // Delete review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});

export default reviewSlice.reducer;
