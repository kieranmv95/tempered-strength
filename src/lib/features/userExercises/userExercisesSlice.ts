import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoggingType, IUserExercise } from '@/types/IExercise';
import { logout } from '@/lib/store';
import { isError } from '@/helpers/isError';

type UserExercisesState = {
  data: null | IUserExercise[];
  loading: null | boolean;
  err: string;
};

type DispatchExerciseMovement = {
  id: number;
  log?: string;
  duration?: string;
  date: string;
  loggingType: ILoggingType;
};

type PostUserExercise = {
  exerciseId: number;
  log?: string;
  duration?: string;
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
      duration: movement.duration,
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
        id: json.insertId,
        exerciseId: movement.id,
        log: movement.log,
        duration: movement.duration,
        date: movement.date,
      } as unknown as IUserExercise;
    }
  },
);

export const deleteUserExercise = createAsyncThunk(
  'userExercises/delete',
  async (id: number) => {
    const res = await fetch('/api/user/exercises', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    return await res.json();
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
  reducers: {},
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
    builder.addCase(
      deleteUserExercise.fulfilled,
      (state, action: PayloadAction<{ id: number } | { err: string }>) => {
        console.log('REMOVE', action.payload);
        if (!isError(action.payload)) {
          const id = action.payload.id;
          console.log('REMOVE ID', id);
          if (state.data) {
            state.data = state.data.filter(item => item.id !== id);
          }
        }
      },
    );
  },
});

export default userExercisesSlice.reducer;
