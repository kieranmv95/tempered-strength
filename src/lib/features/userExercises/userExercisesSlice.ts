import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserExercise } from '@/app/api/user/exercises/route';

type UserExercisesState = {
  data: null | IUserExercise[];
  loading: null | boolean;
  err: string;
};

export const fetchUserExercises = createAsyncThunk(
  'userExercises/fetch',
  async () => {
    const res = await fetch('/api/user/exercises', { cache: 'no-cache' });
    return await res.json();
  },
);

export const userExercisesSlice = createSlice({
  name: 'userExercises',
  initialState: {
    data: null,
    loading: null,
    err: '',
  } as UserExercisesState,
  reducers: {
    addSuccess: (state, action: PayloadAction<IUserExercise>) => {
      if (state.data) {
        state.data = [...state.data, action.payload];
      } else {
        state.data = [action.payload];
      }
    },
    removeSuccess: (state, action: PayloadAction<{ id: number }>) => {
      if (state.data) {
        state.data = state.data.filter(item => item.id !== action.payload.id);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserExercises.rejected, (state, _) => {
      state.loading = false;
      state.data = [];
      state.err = 'Error loading user exercises';
    });
    builder.addCase(fetchUserExercises.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchUserExercises.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = '';
    });
  },
});

export const { addSuccess, removeSuccess } = userExercisesSlice.actions;
export default userExercisesSlice.reducer;
