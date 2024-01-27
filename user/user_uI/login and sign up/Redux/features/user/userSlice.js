import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isFetching: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isError = false;
    },
    loginFailure: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
