import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWorkout } from '@/types/IWorkout';
import { logout } from '@/lib/store';
import { isError } from '@/helpers/isError';

type UserWorkoutsState = {
  data: null | IUserWorkout[];
  loading: null | boolean;
  err: string;
};

type DispatchWorkoutMovement = {
  workoutId: number;
  log: string;
  date: string;
};

export const fetchUserWorkouts = createAsyncThunk(
  'userWorkouts/fetch',
  async () => {
    const res = await fetch('/api/user/workouts', { cache: 'no-cache' });
    return await res.json();
  },
);

export const postUserWorkout = createAsyncThunk(
  'userWorkouts/post',
  async (movement: DispatchWorkoutMovement) => {
    const res = await fetch('/api/user/workouts', {
      method: 'POST',
      body: JSON.stringify(movement),
    });

    const json = await res.json();

    if (isError(json)) {
      return json;
    } else {
      return {
        id: json.insertId,
        workoutId: movement.workoutId,
        log: movement.log,
        date: movement.date,
      } as unknown as IUserWorkout;
    }
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
    builder.addCase(
      postUserWorkout.fulfilled,
      (state, action: PayloadAction<IUserWorkout | { err: string }>) => {
        if (!isError(action.payload)) {
          if (state.data) {
            state.data = [...state.data, action.payload];
          } else {
            state.data = [action.payload];
          }
        }
      },
    );
    builder.addCase(logout, () => initialState);
  },
});

export const { removeSuccess } = userWorkoutsSlice.actions;
export default userWorkoutsSlice.reducer;
