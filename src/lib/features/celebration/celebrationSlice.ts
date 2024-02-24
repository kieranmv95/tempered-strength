import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoggingType } from '@/types/IExercise';

export type ICelebration = {
  existingPersonalBest?: string | number;
  exercise: string;
  score: string | number;
  loggingType: ILoggingType;
};

type CelebrationState = {
  data: ICelebration | null;
};

export const celebrationSlice = createSlice({
  name: 'celebration',
  initialState: {
    data: null,
  } as CelebrationState,
  reducers: {
    celebrate(state, action: PayloadAction<ICelebration>) {
      state.data = action.payload;
    },
    clearCelebration(state) {
      state.data = null;
    },
  },
});

export const { celebrate, clearCelebration } = celebrationSlice.actions;
export default celebrationSlice.reducer;
