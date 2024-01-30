import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiConnection from "../../../apiConnection";

export const getStationsStats = createAsyncThunk(
  "/station/status",
  async (name, thunkAPI) => {
    try {
      const response = await apiConnection.get("/info/all/bikes/user");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  stationsArray: [],
  isStationsLoading: false,
  isStationsError: false,
};

const satationSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    // getStationsStart: (state) => {
    //   state.stationsArray = [];
    //   state.isStationsLoading = true;
    //   state.isStationsError = false;
    // },
    // getStationsSuccess: (state, action) => {
    //   state.stationsArray = action.payload;
    //   state.isStationsLoading = false;
    //   state.isStationsError = false;
    // },
    // getStationsFailure: (state) => {
    //   state.stationsArray = [];
    //   state.isStationsLoading = false;
    //   state.isStationsError = true;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getStationsStats.pending, (state) => {
      state.isStationsLoading = true;
    });

    builder.addCase(getStationsStats.fulfilled, (state, action) => {
      state.isStationsLoading = false;
      state.stationsArray = action.payload;
      state.isStationsError = false;
      console.log(action.payload);
    });

    builder.addCase(getStationsStats.rejected, (state) => {
      state.isStationsError = true;
    });
  },
});

export default satationSlice.reducer;
