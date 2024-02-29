import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoggingType } from '@/types/IExercise';
import { logout } from '@/lib/store';

export type ICelebration = {
  existingPersonalBest?: string | number;
  exercise: string;
  score: string | number;
  loggingType: ILoggingType;
};

type CelebrationState = {
  data: ICelebration | null;
};

const initialState: CelebrationState = {
  data: null,
};

export const celebrationSlice = createSlice({
  name: 'celebration',
  initialState,
  reducers: {
    celebrate(state, action: PayloadAction<ICelebration>) {
      state.data = action.payload;
    },
    clearCelebration(state) {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export const { celebrate, clearCelebration } = celebrationSlice.actions;
export default celebrationSlice.reducer;
