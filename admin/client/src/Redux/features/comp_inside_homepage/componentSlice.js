import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: true,
  manageUsers: false,
  addUser: false,
  calender: false,
  pay: false,
  barChart: false,
  pieChar: false,
  lineChart: false,
};

// Function to reset all values to 0
const resetState = (object) => {
  for (const key in object) {
    object[key] = false;
  }
};

const setState = (object, propKey) => {
  for (const key in object) {
    if (key === propKey) {
      object[key] = true;
    }
  }
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setComponent: (state, action) => {
      resetState(state);
      setState(state, action.payload);
      // action comes with key
    },
  },
});

export default componentSlice.reducer;
export const { setComponent } = componentSlice.actions;
