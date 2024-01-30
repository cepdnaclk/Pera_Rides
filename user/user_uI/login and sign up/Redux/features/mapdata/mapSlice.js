import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import apiConnection from "../../../apiConnection";

export const getMapData = createAsyncThunk(
  "/map/data",
  async (name, thunkAPI) => {
    try {
      const response = await apiConnection.get("/map/data");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
    mapData: [],
    isMapDataLoading: false,
    isMapDataError: false,
    };

const mapSlice = createSlice({ 
    name: "map",
    initialState,
    extraReducers: (builder) => {  
        builder.addCase(getMapData.pending, (state) => {
            state.isMapDataLoading = true;
        });

        builder.addCase(getMapData.fulfilled, (state, action) => {
            state.isMapDataLoading = false;
            state.mapData = action.payload;
            state.isMapDataError = false;
            console.log(action.payload);
        });

        builder.addCase(getMapData.rejected, (state) => {
            state.isMapDataError = true;
        });
    }

});

export default mapSlice.reducer;