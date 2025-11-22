import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/user";

// 🔹 Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  }
);

// 🔹 Fetch single user
export const fetchSingleUser = createAsyncThunk(
  "users/fetchSingleUser",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }
);

// 🔹 Add user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData) => {
    const res = await axios.post(`${BASE_URL}/create-user`, userData);
    return res.data;
  }
);

// 🔹 Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return res.data;
  }
);

// 🔹 Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id; // return id for filtering
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    singleUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single user
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
