import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  validated: false,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    validate: (state) => {
      state.validated = true;
    },
    notValidate: (state) => {
      state.validated = false;
    },
  },
});

export const { validate, notValidate } = otpSlice.actions;
export default otpSlice.reducer;
