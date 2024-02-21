import { configureStore } from '@reduxjs/toolkit';
import userExercisesReducer from '@/lib/features/userExercises/userExercisesSlice';
import userReducer from '@/lib/features/user/userSlice';
import teamsReducer from '@/lib/features/teams/teamsSlice';
import userTeamsReducer from '@/lib/features/userTeams/userTeamsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      exercises: userExercisesReducer,
      user: userReducer,
      userTeams: userTeamsReducer,
      teams: teamsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
