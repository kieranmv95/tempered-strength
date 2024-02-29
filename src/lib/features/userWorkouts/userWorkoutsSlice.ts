import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWorkout } from '@/types/IWorkout';
import { PostWorkoutParams } from '@/app/api/user/workouts/route';
import { logout } from '@/lib/store';

type UserWorkoutsState = {
  data: null | IUserWorkout[];
  loading: null | boolean;
  err: string;
};

export const fetchUserWorkouts = createAsyncThunk(
  'userWorkouts/fetch',
  async () => {
    const res = await fetch('/api/user/workouts', { cache: 'no-cache' });
    return await res.json();
  },
);

const initialState: UserWorkoutsState = {
  data: null,
  loading: null,
  err: '',
};

export const userWorkoutsSlice = createSlice({
  name: 'userExercises',
  initialState,
  reducers: {
    addSuccess: (state, action: PayloadAction<IUserWorkout>) => {
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
    builder.addCase(fetchUserWorkouts.rejected, (state, _) => {
      state.loading = false;
      state.data = [];
      state.err = 'Error loading user exercises';
    });
    builder.addCase(fetchUserWorkouts.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchUserWorkouts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = '';
    });
    builder.addCase(logout, () => initialState);
  },
});

export const { addSuccess, removeSuccess } = userWorkoutsSlice.actions;
export default userWorkoutsSlice.reducer;
