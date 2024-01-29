import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiConnection from "../../../apiConnection";
export const getRevenueStats = createAsyncThunk(
  "/income/status",
  async (name, thunkAPI) => {
    try {
      const response = await apiConnection.get("/income/status");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  revenue: [],
  isRevenueFetching: false,
  isRevenueError: false,
};

const paymentStatsSlice = createSlice({
  name: "paymentStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevenueStats.pending, (state) => {
      state.isRevenueFetching = true;
    });

    builder.addCase(getRevenueStats.fulfilled, (state, action) => {
      state.isRevenueFetching = false;
      state.revenue = action.payload;
      state.isRevenueError = false;
      //   console.log(action.payload);
    });

    builder.addCase(getRevenueStats.rejected, (state) => {
      state.isRevenueError = true;
    });
  },
});

export default paymentStatsSlice.reducer;
