import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsersDB = createAsyncThunk(
  "/users/getUsers",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  allUsers: [],
  isLoading: false,
  isErrorLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deletUser: (state, action) => {
      const userId = action.payload;
      const newUsers = state.allUsers.filter((user) => user._id !== userId);
      state.allUsers = newUsers;
    },
    addNewUser: (state, action) => {
      if (action.payload) {
        state.allUsers.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsersDB.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllUsersDB.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
      // console.log(action.payload);
    });

    builder.addCase(getAllUsersDB.rejected, (state) => {
      state.isLoading = false;
      state.isErrorLoading = true;
    });
  },
});

export const { deletUser, addNewUser } = usersSlice.actions;
export default usersSlice.reducer;
