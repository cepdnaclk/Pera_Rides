import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  currentAdmin: null,
  isFetching: false,
  isError: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.isFetching = false;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },

    extraReducers: (builder) => {
      builder.addCase(PURGE, (state) => {
        // Clear relevant state when PURGE action is dispatched
        state.currentAdmin = null;
        state.isFetching = false;
        state.isError = false;
      });
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  adminSlice.actions;
export default adminSlice.reducer;
