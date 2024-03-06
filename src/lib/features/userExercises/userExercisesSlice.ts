import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoggingType, IUserExercise } from '@/types/IExercise';
import { logout } from '@/lib/store';
import { isError } from '@/helpers/isError';
import { IUser } from '@/types/IUser';

type UserExercisesState = {
  data: null | IUserExercise[];
  loading: null | boolean;
  err: string;
};

type DispatchExerciseMovement = {
  id: number;
  log: string;
  date: string;
  loggingType: ILoggingType;
};

type PostUserExercise = {
  exerciseId: number;
  log: string;
  date: string;
  loggingType: ILoggingType;
};

export const fetchUserExercises = createAsyncThunk(
  'userExercises/fetch',
  async () => {
    const res = await fetch('/api/user/exercises', { cache: 'no-cache' });
    return await res.json();
  },
);

export const postUserExercise = createAsyncThunk(
  'userExercises/post',
  async (movement: DispatchExerciseMovement) => {
    const data: PostUserExercise = {
      exerciseId: movement.id,
      log: movement.log,
      date: movement.date,
      loggingType: movement.loggingType,
    };

    const res = await fetch('/api/user/exercises', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (isError(json)) {
      return json;
    } else {
      return {
        exerciseId: movement.id,
        log: movement.log,
        date: movement.date,
      } as unknown as IUserExercise;
    }
  },
);

const initialState: UserExercisesState = {
  data: null,
  loading: null,
  err: '',
};

export const userExercisesSlice = createSlice({
  name: 'userExercises',
  initialState,
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
    builder.addCase(logout, () => initialState);
    builder.addCase(
      postUserExercise.fulfilled,
      (state, action: PayloadAction<IUserExercise | { err: string }>) => {
        if (!isError(action.payload)) {
          if (state.data) {
            state.data = [...state.data, action.payload];
          } else {
            state.data = [action.payload];
          }
        }
      },
    );
  },
});

export const { addSuccess, removeSuccess } = userExercisesSlice.actions;
export default userExercisesSlice.reducer;
