import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiConnection from "../../../apiConnection";
export const getAllStats = createAsyncThunk(
  "/users/userStats",
  async (name, thunkAPI) => {
    try {
      const response = await apiConnection.get("/stats");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  enrollments: [],
  isEnrollmentsFetching: false,
  isEnrollmentError: false,
};

const userStatsSlice = createSlice({
  name: "userStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStats.pending, (state) => {
      state.isEnrollmentsFetching = true;
    });

    builder.addCase(getAllStats.fulfilled, (state, action) => {
      state.isEnrollmentsFetching = false;
      state.enrollments = action.payload;
      state.isEnrollmentError = false;
      //   console.log(action.payload);
    });

    builder.addCase(getAllStats.rejected, (state) => {
      state.isEnrollmentError = true;
    });
  },
});

export default userStatsSlice.reducer;
