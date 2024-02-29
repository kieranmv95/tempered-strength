import { configureStore } from '@reduxjs/toolkit';
import userExercisesReducer from '@/lib/features/userExercises/userExercisesSlice';
import userWorkoutsReducer from '@/lib/features/userWorkouts/userWorkoutsSlice';
import userReducer from '@/lib/features/user/userSlice';
import teamsReducer from '@/lib/features/teams/teamsSlice';
import userTeamsReducer from '@/lib/features/userTeams/userTeamsSlice';
import celebrationReducer from '@/lib/features/celebration/celebrationSlice';
import { createAction } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      exercises: userExercisesReducer,
      userWorkouts: userWorkoutsReducer,
      user: userReducer,
      userTeams: userTeamsReducer,
      teams: teamsReducer,
      celebration: celebrationReducer,
    },
  });
};

export const logout = createAction('USER_LOGOUT');

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
