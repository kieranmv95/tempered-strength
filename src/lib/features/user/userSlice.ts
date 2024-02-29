import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/IUser';
import { UpdateUserParams } from '@/app/api/user/route';
import { isError } from '@/helpers/isError';
import { logout } from '@/lib/store';

type UserState = {
  data: null | IUser;
  loading: null | boolean;
  err: string;
};

export const fetchUserName = createAsyncThunk('user/fetch', async () => {
  const res = await fetch('/api/user', { cache: 'no-cache' });
  return await res.json();
});

export const fetchUpdateUser = createAsyncThunk(
  'user/patch',
  async (userChanges: UpdateUserParams) => {
    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: JSON.stringify(userChanges),
    });

    return await res.json();
  },
);

export const fetchCreateUser = createAsyncThunk(
  'user/create',
  async (data: { username: string }) => {
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

const initialState: UserState = {
  data: null,
  loading: null,
  err: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
    builder.addCase(
      fetchUpdateUser.fulfilled,
      (state, action: PayloadAction<IUser | { err: string }>) => {
        if (!isError(action.payload)) {
          state.data = action.payload;
        }
      },
    );
    builder.addCase(
      fetchCreateUser.fulfilled,
      (state, action: PayloadAction<IUser | { err: string }>) => {
        if (!isError(action.payload)) {
          state.data = action.payload;
        }
      },
    );
    builder.addCase(logout, () => initialState);
  },
});

export default userSlice.reducer;
