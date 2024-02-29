import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoggingType } from '@/types/IExercise';
import { logout } from '@/lib/store';
import { IWorkoutLoggingType } from '@/types/IWorkout';
import { timeDiff, weightAndRepsDiff } from '@/helpers/personalBestDiffs';

type IPersonalBestData = {
  pb: boolean;
  diff: string | null;
};

export type ICelebration = {
  existingPersonalBest?: string | number;
  exercise: string;
  score: string | number;
  loggingType: ILoggingType | IWorkoutLoggingType;
};

type CelebrationState = {
  data: ICelebration | null;
  pbData: IPersonalBestData | null;
};

const initialState: CelebrationState = {
  data: null,
  pbData: null,
};

export const celebrationSlice = createSlice({
  name: 'celebration',
  initialState,
  reducers: {
    celebrate(state, action: PayloadAction<ICelebration>) {
      if (action.payload.existingPersonalBest) {
        if (action.payload.loggingType === 'duration') {
          state.pbData = timeDiff(
            action.payload.existingPersonalBest as string,
            action.payload.score as string,
          );
        }
        if (
          action.payload.loggingType === 'weight' ||
          action.payload.loggingType === 'reps'
        ) {
          state.pbData = weightAndRepsDiff(
            action.payload.existingPersonalBest as string,
            action.payload.score as string,
          );
        }
      }
      state.data = action.payload;
    },
    clearCelebration(state) {
      state.data = null;
      state.pbData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, () => initialState);
  },
});

export const { celebrate, clearCelebration } = celebrationSlice.actions;
export default celebrationSlice.reducer;
