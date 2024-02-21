import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/IUser';

type UserState = {
  data: null | IUser;
  loading: null | boolean;
  err: string;
};

export const fetchUserName = createAsyncThunk('user/fetch', async () => {
  const res = await fetch('/api/user', { cache: 'no-cache' });
  return await res.json();
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: null,
    err: '',
  } as UserState,
  reducers: {
    updateUsername(state, action: PayloadAction<string>) {
      state.data = {
        id: state.data?.id || '',
        username: action.payload,
        onboarding: state.data?.onboarding || 1,
        weight: state.data?.onboarding || null,
      };
    },
    updateWeight(state, action: PayloadAction<number | null>) {
      state.data = {
        id: state.data?.id || '',
        username: state.data?.username || '',
        onboarding: state.data?.onboarding || 1,
        weight: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserName.rejected, (state, _) => {
      state.loading = false;
      state.data = null;
      state.err = 'Error loading user';
    });
    builder.addCase(fetchUserName.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserName.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.data = action.payload[0];
        state.loading = false;
        state.err = '';
      },
    );
  },
});

export const { updateUsername, updateWeight } = userSlice.actions;
export default userSlice.reducer;
