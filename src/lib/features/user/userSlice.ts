import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserState = {
  data: null | {
    username: string;
  };
  loading: null | boolean;
  err: string;
};

export const fetchUserName = createAsyncThunk("user/fetch", async () => {
  const res = await fetch("/api/user", { cache: "no-cache" });
  return await res.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: null,
    err: "",
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserName.rejected, (state, _) => {
      state.loading = false;
      state.data = null;
      state.err = "Error loading user";
    });
    builder.addCase(fetchUserName.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchUserName.fulfilled, (state, action) => {
      state.data = {
        username: action.payload[0].username,
      };
      state.loading = false;
      state.err = "";
    });
  },
});

export default userSlice.reducer;
