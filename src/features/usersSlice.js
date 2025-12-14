import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "./usersService";


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      return await fetchUsersAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (u) => u.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (u) => u.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
